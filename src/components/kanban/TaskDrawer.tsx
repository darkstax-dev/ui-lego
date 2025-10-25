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
    <Drawer isOpen={isOpen} onClose={onClose} title={title} size={DrawerSize.LARGE}>
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
          <div className="taskdrawer-log">No activity yet.</div>
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
