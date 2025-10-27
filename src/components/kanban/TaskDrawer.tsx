import React, { useMemo, useState } from 'react'
import Drawer, { DrawerSize } from '../drawer'
import type { KanbanCard } from './types'
import type { JSONSchemaRoot, DescriptionRule } from '../schema/SchemaTypes'
import { SchemaDisplay, SchemaForm } from '../schema/SchemaRenderer'
import { applyTemplate } from '../schema/SchemaTypes'
import { ArrowUpSLine, ArrowDownSLine } from '../icons/system'
import '../schema/SchemaRenderer.css'
import './TaskDrawer.css'

interface TaskDrawerProps {
  card: KanbanCard | null
  isOpen: boolean
  onClose: () => void
  schema: JSONSchemaRoot
  descriptionRule?: DescriptionRule
  onSave?: (updated: any) => void
  mode?: 'view' | 'edit' | 'create'
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

const TaskDrawer: React.FC<TaskDrawerProps> = ({ card, isOpen, onClose, schema, descriptionRule, onSave, mode = 'view' }) => {
  const [activeTab, setActiveTab] = useState<typeof Tab[keyof typeof Tab]>(Tab.Details)
  const [editing, setEditing] = useState(mode === 'create' || mode === 'edit')
  const [formValue, setFormValue] = useState<Record<string, any>>({})
  const [checklistItems, setChecklistItems] = useState<string[]>([''])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const isCreateMode = mode === 'create'

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
    onSave?.({ ...formValue, checklist: checklistItems.filter(item => item.trim() !== '') })
  }

  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, ''])
  }

  const updateChecklistItem = (index: number, value: string) => {
    const updated = [...checklistItems]
    updated[index] = value
    setChecklistItems(updated)
  }

  const removeChecklistItem = (index: number) => {
    const updated = checklistItems.filter((_, i) => i !== index)
    setChecklistItems(updated)
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

  const drawerTitle = isCreateMode ? 'New task' : 'Task details'

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={drawerTitle} 
      size="600px"
      position="right"
      appearance="light"
    >
      <div className="taskdrawer">
        {!isCreateMode && (
          <div className="taskdrawer-tabs">
            <button className={`taskdrawer-tab ${activeTab === Tab.Details ? 'is-active' : ''}`} onClick={() => setActiveTab(Tab.Details)}>Details</button>
            <button className={`taskdrawer-tab ${activeTab === Tab.Log ? 'is-active' : ''}`} onClick={() => setActiveTab(Tab.Log)}>Task log</button>
          </div>
        )}

        {(activeTab === Tab.Details || isCreateMode) && (
          <>
            {!editing && !isCreateMode && (
              <>
                {/* MAIN INFO Section */}
                <div className="main-info-section">
                  <div className="section-header-collapsible">
                    <div className="section-title-main">MAIN INFO</div>
                    <div className="collapse-icon">
                      <ArrowUpSLine width={20} height={20} fill="#78797A" />
                    </div>
                  </div>
                  
                  {/* Task Title and Info Content Card */}
                  <div className="main-info-content">
                    <div className="task-title-main">{title}</div>
                    
                    {/* Info Grid - 4 columns */}
                    <div className="info-grid-four-col">
                      <div className="info-item">
                        <div className="info-label">Created</div>
                        <div className="info-value">{created}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Due date</div>
                        <div className="info-value">{dueDate}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Status</div>
                        <div className={statusClass(status)}>{status}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Priority</div>
                        <div className={priorityClass(priority)}>{priority}</div>
                      </div>
                    </div>

                    {/* Assignee */}
                    <div className="assignee-section">
                      <div className="info-label">Assignee</div>
                      <div className="assignee-display">
                        {assigneeAvatar && <img className="assignee-avatar" src={assigneeAvatar} alt={assignee ?? ''} />}
                        <span className="assignee-name">{assignee}</span>
                      </div>
                    </div>

                    {/* Product and Customer */}
                    <div className="product-customer-grid">
                      <div className="product-section">
                        <div className="info-label">Product</div>
                        <div className="info-value">{product}</div>
                      </div>
                      <div className="customer-section">
                        <div className="info-label">Customer</div>
                        <div className="info-value">{customer}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AGENT COMMENT Section */}
                <div className="collapsible-section">
                  <div className="section-header-collapsible">
                    <div className="section-title-main">AGENT COMMENT</div>
                    <div className="collapse-icon">
                      <ArrowUpSLine width={20} height={20} fill="#78797A" />
                    </div>
                  </div>
                  <div className="section-content-gray">
                    <div className="agent-comment-text">
                      The inventory reallocation process identified shortage of 10cc syringes. 
                      Approval required for substitution with 20cc syringes.
                      <br /><br />
                      Note: Confirm compliance with client requirements before dispatch.
                    </div>
                  </div>
                </div>

                {/* CHECKLIST Section */}
                <div className="collapsible-section">
                  <div className="section-header-collapsible">
                    <div className="section-title-main">CHECKLIST</div>
                    <div className="collapse-icon">
                      <ArrowUpSLine width={20} height={20} fill="#78797A" />
                    </div>
                  </div>
                  <div className="section-content-gray">
                    <div className="checklist-items">
                      <div className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checklist-text">Validate stock levels at local warehouse</span>
                      </div>
                      <div className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checklist-text">Confirm substitution option with QA</span>
                      </div>
                      <div className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checklist-text">Send client approval request</span>
                      </div>
                      <div className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checklist-text">Update logistics with new shipment data</span>
                      </div>
                      <div className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checklist-text">Mark card as "Ready for Delivery"</span>
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
                        <div className="section-header">
                          <div className="section-title-collapsible">{sec.title.toUpperCase()}</div>
                          <div className="section-collapse-icon">^</div>
                        </div>
                        <div className="section-content">
                          <div className="text-content">{val}</div>
                        </div>
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
              </>
            )}

            {(editing || isCreateMode) && (
              <div className="taskdrawer-form">
                <div className="taskdrawer-section">
                  <div className="section-title-emphasis">Main Info</div>
                  
                  <div className="form-field">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder='e.g., "Design Login Screen", "Optimize SQL Queries"'
                      value={formValue.title || ''}
                      onChange={(e) => setFormValue({ ...formValue, title: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Write a description of the task..."
                      rows={7}
                      value={formValue.description || ''}
                      onChange={(e) => setFormValue({ ...formValue, description: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Assignee</label>
                    <div className="form-select">
                      <select
                        value={formValue.assignee || ''}
                        onChange={(e) => setFormValue({ ...formValue, assignee: e.target.value })}
                      >
                        <option value="">Select responsible team member</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Bob Johnson">Bob Johnson</option>
                      </select>
                      <svg className="form-select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_select_icon)">
                          <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#00112B"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_select_icon">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Product</label>
                    <div className="form-select">
                      <select
                        value={formValue.product || ''}
                        onChange={(e) => setFormValue({ ...formValue, product: e.target.value })}
                      >
                        <option value="">Choose related product/module</option>
                        <option value="Product A">Product A</option>
                        <option value="Product B">Product B</option>
                        <option value="Product C">Product C</option>
                      </select>
                      <svg className="form-select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip1_select_icon)">
                          <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#00112B"/>
                        </g>
                        <defs>
                          <clipPath id="clip1_select_icon">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Customer</label>
                    <div className="form-select">
                      <select
                        value={formValue.customer || ''}
                        onChange={(e) => setFormValue({ ...formValue, customer: e.target.value })}
                      >
                        <option value="">Assign client or internal stakeholder</option>
                        <option value="Customer 1">Customer 1</option>
                        <option value="Customer 2">Customer 2</option>
                        <option value="Internal Team">Internal Team</option>
                      </select>
                      <svg className="form-select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip2_select_icon)">
                          <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#00112B"/>
                        </g>
                        <defs>
                          <clipPath id="clip2_select_icon">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Created</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Auto-generated"
                      value={formValue.created || 'Auto-generated'}
                      disabled
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Due date</label>
                    <div className="form-select">
                      <input
                        type="date"
                        className="form-date-input"
                        placeholder="Select deadline date"
                        value={formValue.dueDate || ''}
                        onChange={(e) => setFormValue({ ...formValue, dueDate: e.target.value })}
                      />
                      <svg className="form-select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_calendar_icon)">
                          <path d="M14.1667 2.50065H17.5001C17.7211 2.50065 17.9331 2.58845 18.0893 2.74473C18.2456 2.90101 18.3334 3.11297 18.3334 3.33398V16.6673C18.3334 16.8883 18.2456 17.1003 18.0893 17.2566C17.9331 17.4129 17.7211 17.5007 17.5001 17.5007H2.50008C2.27907 17.5007 2.06711 17.4129 1.91083 17.2566C1.75455 17.1003 1.66675 16.8883 1.66675 16.6673V3.33398C1.66675 3.11297 1.75455 2.90101 1.91083 2.74473C2.06711 2.58845 2.27907 2.50065 2.50008 2.50065H5.83342V0.833984H7.50008V2.50065H12.5001V0.833984H14.1667V2.50065ZM16.6667 7.50065V4.16732H14.1667V5.83398H12.5001V4.16732H7.50008V5.83398H5.83342V4.16732H3.33341V7.50065H16.6667ZM16.6667 9.16732H3.33341V15.834H16.6667V9.16732ZM5.00008 10.834H9.16675V14.1673H5.00008V10.834Z" fill="#00112B"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_calendar_icon">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Status</label>
                    <div className="form-select">
                      <select
                        value={formValue.status || ''}
                        onChange={(e) => setFormValue({ ...formValue, status: e.target.value })}
                      >
                        <option value="">Choose current workflow stage</option>
                        <option value="User Action Required">User Action Required</option>
                        <option value="Customer Action Required">Customer Action Required</option>
                        <option value="Agents Active">Agents Active</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                        <option value="Archived">Archived</option>
                      </select>
                      <svg className="form-select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip3_select_icon)">
                          <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#00112B"/>
                        </g>
                        <defs>
                          <clipPath id="clip3_select_icon">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Priority</label>
                    <div className="form-select">
                      <select
                        value={formValue.priority || ''}
                        onChange={(e) => setFormValue({ ...formValue, priority: e.target.value })}
                      >
                        <option value="">Set task importance (Critical / High / Medium / Low / Normal)</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                      </select>
                      <svg className="form-select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip4_select_icon)">
                          <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#00112B"/>
                        </g>
                        <defs>
                          <clipPath id="clip4_select_icon">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-divider"></div>

                <div className="taskdrawer-section">
                  <div className="section-title-emphasis">Checklist</div>
                  
                  {checklistItems.map((item, index) => (
                    <div key={index} className="form-field">
                      <label className="form-label">Item {index + 1}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Write first checklist item…"
                        value={item}
                        onChange={(e) => updateChecklistItem(index, e.target.value)}
                      />
                    </div>
                  ))}

                  <button className="form-add-item" onClick={addChecklistItem}>
                    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 11V6H10V11H15V13H10V18H8V13H3V11H8Z" fill="black"/>
                    </svg>
                    <span>Add checklist item</span>
                  </button>
                </div>

                <div className="form-divider"></div>

                <div className="taskdrawer-section">
                  <div className="form-file-upload">
                    <div className="file-upload-content">
                      <div className="file-upload-text-bold">Upload supporting files (designs, docs, reports)</div>
                      <div className="file-upload-action">
                        <button type="button" className="file-upload-link">Click to upload</button>
                        <span className="file-upload-text">or drag and drop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === Tab.Log && !isCreateMode && (
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
                    {[...Array(Math.min(3, Math.ceil((card.taskLog?.length || 0) / rowsPerPage)))].map((_, i) => (
                      <button
                        key={i + 1}
                        className={`pagination-page ${currentPage === i + 1 ? 'is-active' : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    {Math.ceil((card.taskLog?.length || 0) / rowsPerPage) > 5 && (
                      <>
                        <span className="pagination-gap">...</span>
                        {[...Array(2)].map((_, i) => {
                          const page = Math.ceil((card.taskLog?.length || 0) / rowsPerPage) - 1 + i
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
                    disabled={currentPage >= Math.ceil((card.taskLog?.length || 0) / rowsPerPage)}
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil((card.taskLog?.length || 0) / rowsPerPage), p + 1))}
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
          {!editing && !isCreateMode ? (
            <>
              <button className="td-btn td-secondary">Archive</button>
              <button className="td-btn" onClick={beginEdit}>Edit</button>
              <button className="td-btn td-secondary">Share</button>
            </>
          ) : (
            <div className="save-task-button-wrapper">
              <button className="save-task-button" onClick={save}>
                <span className="save-task-text">Save Task</span>
                <svg className="save-task-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_save_icon)">
                    <path d="M5.83333 15.8333V10.8333H14.1667V15.8333H15.8333V6.52333L13.4767 4.16667H4.16667V15.8333H5.83333ZM3.33333 2.5H14.1667L17.5 5.83333V16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V3.33333C2.5 3.11232 2.5878 2.90036 2.74408 2.74408C2.90036 2.5878 3.11232 2.5 3.33333 2.5ZM7.5 12.5V15.8333H12.5V12.5H7.5Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_save_icon">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default TaskDrawer
