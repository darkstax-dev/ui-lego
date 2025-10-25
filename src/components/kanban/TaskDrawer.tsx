import React, { useMemo, useState } from 'react'
import Drawer, { DrawerSize } from '../drawer'
import type { KanbanCard } from './types'
import type { JSONSchemaRoot, DescriptionRule } from '../schema/SchemaTypes'
import { SchemaDisplay, SchemaForm } from '../schema/SchemaRenderer'
import { applyTemplate } from '../schema/SchemaTypes'
import '../schema/SchemaRenderer.css'
import './TaskDrawer.css'

interface TaskDrawerProps {
  card: KanbanCard | null
  isOpen: boolean
  onClose: () => void
  schema: JSONSchemaRoot
  descriptionRule?: DescriptionRule
  onSave?: (updated: any) => void
}

const Tab = {
  Details: 'details',
  Log: 'log',
} as const

const statusClass = (v?: string) => {
  switch (v) {
    case 'User Action Required':
      return 'badge-status status-user'
    case 'Customer Action Required':
      return 'badge-status status-customer'
    case 'Agents Active':
      return 'badge-status status-agents'
    case 'Blocked':
      return 'badge-status status-blocked'
    case 'Waiting':
      return 'badge-status status-waiting'
    case 'Review':
      return 'badge-status status-review'
    case 'Done':
      return 'badge-status status-done'
    case 'Archived':
      return 'badge-status status-archived'
    default:
      return 'badge-status'
  }
}

const priorityClass = (v?: string) => {
  switch (v) {
    case 'High':
      return 'badge-priority prio-high'
    case 'Medium':
      return 'badge-priority prio-medium'
    case 'Normal':
      return 'badge-priority prio-normal'
    case 'Low':
      return 'badge-priority prio-low'
    default:
      return 'badge-priority'
  }
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ card, isOpen, onClose, schema, descriptionRule, onSave }) => {
  const [activeTab, setActiveTab] = useState<typeof Tab[keyof typeof Tab]>(Tab.Details)
  const [editing, setEditing] = useState(false)
  const [formValue, setFormValue] = useState<Record<string, any>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const flat = useMemo(() => {
    if (!card) return {}
    const f: Record<string, any> = { ...card }
    if ((card as any).assignee && typeof (card as any).assignee === 'object') {
      f.assignee = (card as any).assignee.name
      f.assigneeAvatar = (card as any).assignee.avatar
    }
    if (Array.isArray(card.attachments)) {
      f.attachments = card.attachments.map((a) => a.fileName)
    }
    if (Array.isArray((card as any).checklist)) {
      f.checklist = (card as any).checklist.map((c: any) => c.text)
    }
    return f
  }, [card])

  const title = useMemo(() => {
    if (!card) return ''
    if (descriptionRule?.template) return applyTemplate(descriptionRule.template, { ...flat })
    return card.title
  }, [card, descriptionRule, flat])

  const beginEdit = () => {
    setFormValue(flat)
    setEditing(true)
  }

  const save = () => {
    setEditing(false)
    onSave?.(formValue)
  }

  const layout = schema.layout

  const created = layout?.headerFields?.created ? (flat as any)[layout.headerFields.created] : undefined
  const dueDate = layout?.headerFields?.dueDate ? (flat as any)[layout.headerFields.dueDate] : undefined
  const status = layout?.headerFields?.status ? (flat as any)[layout.headerFields.status] : undefined
  const priority = layout?.headerFields?.priority ? (flat as any)[layout.headerFields.priority] : undefined
  const assignee = layout?.assigneeField ? (flat as any)[layout.assigneeField] : undefined
  const assigneeAvatar = (flat as any).assigneeAvatar
  const product = layout?.productField ? (flat as any)[layout.productField] : undefined
  const customer = layout?.customerField ? (flat as any)[layout.customerField] : undefined

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={"Task details"} size={DrawerSize.LARGE} appearance="light">
      <div className="taskdrawer">
        <div className="taskdrawer-tabs">
          <button className={`taskdrawer-tab ${activeTab === Tab.Details ? 'is-active' : ''}`} onClick={() => setActiveTab(Tab.Details)}>Details</button>
          <button className={`taskdrawer-tab ${activeTab === Tab.Log ? 'is-active' : ''}`} onClick={() => setActiveTab(Tab.Log)}>Task log</button>
        </div>

        {activeTab === Tab.Details && (
          <>
            <div className="taskdrawer-section">
              <div className="section-title">Main Info</div>
              <div className="info-card">
                <div className="info-title">{title}</div>
                <div className="info-grid">
                  <div className="info-item"><div className="info-label">Created</div><div className="info-value">{created}</div></div>
                  <div className="info-item"><div className="info-label">Due date</div><div className="info-value">{dueDate}</div></div>
                  <div className="info-item"><div className="info-label">Status</div><div className={statusClass(status)}>{status}</div></div>
                  <div className="info-item"><div className="info-label">Priority</div><div className={priorityClass(priority)}>{priority}</div></div>
                </div>
                <div className="info-assignee">
                  <div className="info-label">Assignee</div>
                  <div className="assignee-chip">
                    {assigneeAvatar && <img className="assignee-avatar" src={assigneeAvatar} alt={assignee ?? ''} />}
                    <span>{assignee}</span>
                  </div>
                </div>
                <div className="info-two-col">
                  <div>
                    <div className="info-label">Product</div>
                    <div className="info-value">{product}</div>
                  </div>
                  <div>
                    <div className="info-label">Customer</div>
                    <div className="info-value">{customer}</div>
                  </div>
                </div>
              </div>
            </div>

            {layout?.sections?.map((sec) => {
              const val = (flat as any)[sec.field]
              if (sec.type === 'textarea' && !editing) {
                if (!val) return null
                return (
                  <div key={sec.title} className="taskdrawer-section">
                    <div className="section-title">{sec.title}</div>
                    <div className="text-panel">{val}</div>
                  </div>
                )
              }
              if (sec.type === 'checklist' && Array.isArray(val) && val.length > 0) {
                return (
                  <div key={sec.title} className="taskdrawer-section">
                    <div className="section-title">{sec.title}</div>
                    <ul className="checklist">
                      {val.map((t: string, i: number) => (
                        <li key={i} className="checklist-item"><input type="checkbox" /> <span>{t}</span></li>
                      ))}
                    </ul>
                  </div>
                )
              }
              if (sec.type === 'attachments' && Array.isArray(val) && val.length > 0) {
                return (
                  <div key={sec.title} className="taskdrawer-section">
                    <div className="section-title with-count">{sec.title}<span className="count-dot">{val.length}</span></div>
                    <div className="attachments">
                      {val.map((name: string, i: number) => (
                        <div key={i} className="attachment-row">
                          <div className="file-icon">{name.split('.').pop()?.toUpperCase()}</div>
                          <div className="file-name">{name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            })}

            {editing && (
              <div className="taskdrawer-section">
                <SchemaForm schema={schema} value={formValue} onChange={setFormValue} />
              </div>
            )}
          </>
        )}

        {activeTab === Tab.Log && (
          <div className="taskdrawer-log-container">
            <div className="task-log-table">
              <div className="task-log-header">
                <div className="task-log-header-cell">Event type</div>
                <div className="task-log-header-cell">Event By</div>
                <div className="task-log-header-cell">Event Datetime</div>
              </div>
              <div className="task-log-body">
                {card?.taskLog && card.taskLog.length > 0 ? (
                  card.taskLog.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((event) => (
                    <div key={event.id} className="task-log-row">
                      <div className="task-log-cell">{event.eventType}</div>
                      <div className="task-log-cell">{event.eventBy}</div>
                      <div className="task-log-cell">{event.eventDatetime}</div>
                    </div>
                  ))
                ) : (
                  <div className="task-log-empty">No activity yet.</div>
                )}
              </div>
            </div>
            {card?.taskLog && card.taskLog.length > 0 && (
              <div className="task-log-pagination">
                <div className="pagination-left">
                  <span className="pagination-label">Rows per page</span>
                  <div className="pagination-select">
                    <span>{rowsPerPage}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.99999 8.78047L11.3 5.48047L12.2427 6.42314L7.99999 10.6658L3.75732 6.42314L4.69999 5.48047L7.99999 8.78047Z" fill="#00112B"/>
                    </svg>
                  </div>
                </div>
                <div className="pagination-right">
                  <button
                    className="pagination-nav pagination-prev"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.21859 8.00048L10.5186 11.3005L9.57592 12.2431L5.33325 8.00048L9.57592 3.75781L10.5186 4.70048L7.21859 8.00048Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="pagination-pages">
                    {[...Array(Math.min(3, Math.ceil(card.taskLog.length / rowsPerPage)))].map((_, i) => (
                      <button
                        key={i + 1}
                        className={`pagination-page ${currentPage === i + 1 ? 'is-active' : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    {Math.ceil(card.taskLog.length / rowsPerPage) > 5 && (
                      <>
                        <span className="pagination-gap">...</span>
                        {[...Array(2)].map((_, i) => {
                          const page = Math.ceil(card.taskLog.length / rowsPerPage) - 1 + i
                          return (
                            <button
                              key={page}
                              className={`pagination-page ${currentPage === page ? 'is-active' : ''}`}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          )
                        })}
                      </>
                    )}
                  </div>
                  <button
                    className="pagination-nav pagination-next"
                    disabled={currentPage >= Math.ceil(card.taskLog.length / rowsPerPage)}
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(card.taskLog.length / rowsPerPage), p + 1))}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.78145 8.00048L5.48145 4.70048L6.42411 3.75781L10.6668 8.00048L6.42411 12.2431L5.48145 11.3005L8.78145 8.00048Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="taskdrawer-actions">
          {!editing ? (
            <>
              <button className="td-btn td-secondary">Archive</button>
              <button className="td-btn" onClick={beginEdit}>Edit</button>
              <button className="td-btn td-secondary">Share</button>
            </>
          ) : (
            <>
              <button className="td-btn" onClick={save}>Save</button>
              <button className="td-btn td-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default TaskDrawer
