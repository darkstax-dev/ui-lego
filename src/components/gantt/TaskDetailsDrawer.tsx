import React, { useState, useCallback } from 'react'
import Drawer from '../drawer'
import { Badge, Tag } from '../tag-badges'
import type { BadgeVariant } from '../tag-badges'
import type { TagScheme } from '../tag-badges'
import { Checkbox } from '../checkbox'
import { Tabs } from '../tabs'
import { GanttTask } from './types'
import './TaskDetailsDrawer.css'

export interface TaskDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  task: GanttTask | null
  onTaskUpdate?: (taskId: string, updates: Partial<GanttTask>) => void
}

const DRAWER_WIDTH = '607px'

const formatDate = (date: Date): string => {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  const h = date.getHours()
  const hours12 = h % 12 || 12
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const period = h >= 12 ? 'PM' : 'AM'
  return `${mm}/${dd}/${yyyy} [${hours12}:${minutes}${period}]`
}

const formatDateShort = (date: Date): string => {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

const mapStatusToBadge = (status?: string): BadgeVariant => {
  switch (status) {
    case 'in-process': return 'in-process'
    case 'completed': return 'done'
    case 'on-hold': return 'blocked'
    case 'pending': return 'waiting'
    case 'cancelled': return 'archived'
    case 'not-started':
    default: return 'to-do'
  }
}

const mapPriorityToBadge = (priority?: string): BadgeVariant => {
  switch (priority) {
    case 'critical': return 'critical'
    case 'high': return 'high'
    case 'medium': return 'medium'
    case 'low': return 'low'
    default: return 'normal'
  }
}

const mapPriorityToTag = (priority?: string): TagScheme => {
  switch (priority) {
    case 'critical': return 'critical'
    case 'high': return 'high'
    case 'medium': return 'medium'
    case 'low': return 'low'
    default: return 'normal'
  }
}

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }}>
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TaskDetailsDrawer: React.FC<TaskDetailsDrawerProps> = ({
  isOpen,
  onClose,
  task,
  onTaskUpdate,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    mainInfo: true,
    agentComment: true,
    checklist: true,
    attachments: true,
  })
  const [activeTab, setActiveTab] = useState<'details' | 'taskLog'>('details')
  const [isEditing, setIsEditing] = useState(false)

  // Editable local state
  const [editTitle, setEditTitle] = useState('')
  const [editComment, setEditComment] = useState('')
  const [editChecklist, setEditChecklist] = useState<Array<{ text: string; checked?: boolean }>>([])
  const [editProduct, setEditProduct] = useState('')
  const [editCustomer, setEditCustomer] = useState('')
  const [newChecklistItem, setNewChecklistItem] = useState('')

  const startEditing = useCallback(() => {
    if (!task) return
    setEditTitle(task.title)
    setEditComment(task.agentComment || '')
    setEditChecklist(task.checklist ? task.checklist.map(c => ({ ...c })) : [])
    setEditProduct(task.product || '')
    setEditCustomer(task.customer || '')
    setIsEditing(true)
  }, [task])

  const saveEdits = useCallback(() => {
    if (!task || !onTaskUpdate) {
      setIsEditing(false)
      return
    }
    onTaskUpdate(task.id, {
      title: editTitle,
      agentComment: editComment,
      checklist: editChecklist,
      product: editProduct,
      customer: editCustomer,
    })
    setIsEditing(false)
  }, [task, onTaskUpdate, editTitle, editComment, editChecklist, editProduct, editCustomer])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
  }, [])

  const addChecklistItem = useCallback(() => {
    if (!newChecklistItem.trim()) return
    setEditChecklist(prev => [...prev, { text: newChecklistItem.trim(), checked: false }])
    setNewChecklistItem('')
  }, [newChecklistItem])

  const updateChecklistItemText = useCallback((index: number, text: string) => {
    setEditChecklist(prev => prev.map((item, i) => i === index ? { ...item, text } : item))
  }, [])

  const toggleChecklistItem = useCallback((index: number) => {
    setEditChecklist(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item))
  }, [])

  const removeChecklistItem = useCallback((index: number) => {
    setEditChecklist(prev => prev.filter((_, i) => i !== index))
  }, [])

  if (!task) return null

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const checklist = isEditing ? editChecklist : (task.checklist || [])

  const tabItems = [
    { value: 'details', label: 'Details' },
    { value: 'taskLog', label: 'Task log' },
  ]

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={DRAWER_WIDTH}
      appearance="light"
    >
      <div className="gantt-drawer">
        {/* Title row */}
        <div className="gantt-drawer-title-row">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 10H17M17 10L11 4M17 10L11 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="gantt-drawer-title-text">Task Details</span>
        </div>

        {/* Tabs */}
        <div className="gantt-drawer-tabs">
          <Tabs items={tabItems} activeTab={activeTab} onChange={(value: string) => setActiveTab(value as 'details' | 'taskLog')} />
        </div>

        {/* Scrollable content area */}
        <div className="gantt-drawer-content">
          {activeTab === 'details' && (
            <>
              {/* MAIN INFO accordion */}
              <div className="gantt-drawer-section">
                <button className="gantt-drawer-section-header" onClick={() => toggleSection('mainInfo')}>
                  <span className="gantt-drawer-section-title">MAIN INFO</span>
                  <ChevronIcon expanded={expandedSections.mainInfo} />
                </button>

                {expandedSections.mainInfo && (
                  <div className="gantt-drawer-section-body">
                    <div className="gantt-drawer-info-card">
                      {isEditing ? (
                        <input
                          className="gantt-drawer-edit-input gantt-drawer-edit-title"
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                        />
                      ) : (
                        <div className="gantt-drawer-info-card-title">{task.title}</div>
                      )}

                      <div className="gantt-drawer-info-grid">
                        <div className="gantt-drawer-info-item">
                          <div className="gantt-drawer-label">Created</div>
                          <div className="gantt-drawer-value">{formatDate(task.startDate)}</div>
                        </div>
                        <div className="gantt-drawer-info-item">
                          <div className="gantt-drawer-label">Due date</div>
                          <div className="gantt-drawer-value">{formatDateShort(task.endDate)}</div>
                        </div>
                        <div className="gantt-drawer-info-item">
                          <div className="gantt-drawer-label">Status</div>
                          <Badge variant={mapStatusToBadge(task.status)} />
                        </div>
                        <div className="gantt-drawer-info-item">
                          <div className="gantt-drawer-label">Priority</div>
                          <Tag scheme={mapPriorityToTag(task.priority)} removable={false}>
                            {task.priority ? task.priority.toUpperCase() : 'NORMAL'}
                          </Tag>
                        </div>
                      </div>

                      <div className="gantt-drawer-assignee-row">
                        <div className="gantt-drawer-label">Assignee</div>
                        <div className="gantt-drawer-assignee">
                          {task.assigneeAvatar ? (
                            <img className="gantt-drawer-assignee-avatar-img" src={task.assigneeAvatar} alt={task.assignee || ''} />
                          ) : (
                            <div className="gantt-drawer-assignee-avatar">
                              {(task.assignee || '?').charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="gantt-drawer-value">{task.assignee || '—'}</span>
                        </div>
                      </div>

                      <div className="gantt-drawer-two-col">
                        <div>
                          <div className="gantt-drawer-label">Product</div>
                          {isEditing ? (
                            <input
                              className="gantt-drawer-edit-input"
                              value={editProduct}
                              onChange={e => setEditProduct(e.target.value)}
                              placeholder="Product name"
                            />
                          ) : (
                            <div className="gantt-drawer-value">{task.product || '—'}</div>
                          )}
                        </div>
                        <div>
                          <div className="gantt-drawer-label">Customer</div>
                          {isEditing ? (
                            <input
                              className="gantt-drawer-edit-input"
                              value={editCustomer}
                              onChange={e => setEditCustomer(e.target.value)}
                              placeholder="Customer name"
                            />
                          ) : (
                            <div className="gantt-drawer-value">{task.customer || '—'}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dashed separator */}
              <div className="gantt-drawer-separator" />

              {/* AGENT COMMENT accordion */}
              <div className="gantt-drawer-section">
                <button className="gantt-drawer-section-header" onClick={() => toggleSection('agentComment')}>
                  <span className="gantt-drawer-section-title">AGENT COMMENT</span>
                  <ChevronIcon expanded={expandedSections.agentComment} />
                </button>

                {expandedSections.agentComment && (
                  <div className="gantt-drawer-section-body">
                    {isEditing ? (
                      <textarea
                        className="gantt-drawer-edit-textarea"
                        value={editComment}
                        onChange={e => setEditComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={4}
                      />
                    ) : (
                      <div className="gantt-drawer-text-panel">
                        {task.agentComment || 'No comments yet.'}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dashed separator */}
              <div className="gantt-drawer-separator" />

              {/* CHECKLIST accordion */}
              <div className="gantt-drawer-section">
                <button className="gantt-drawer-section-header" onClick={() => toggleSection('checklist')}>
                  <span className="gantt-drawer-section-title">CHECKLIST</span>
                  <ChevronIcon expanded={expandedSections.checklist} />
                </button>

                {expandedSections.checklist && (
                  <div className="gantt-drawer-section-body">
                    <div className="gantt-drawer-checklist-container">
                      {checklist.length > 0 ? (
                        <ul className="gantt-drawer-checklist">
                          {checklist.map((item, i) => (
                            <li key={i} className="gantt-drawer-checklist-item">
                              <Checkbox
                                checked={item.checked || false}
                                onChange={() => {
                                  if (isEditing) {
                                    toggleChecklistItem(i)
                                  }
                                }}
                              />
                              {isEditing ? (
                                <div className="gantt-drawer-checklist-edit-row">
                                  <input
                                    className="gantt-drawer-edit-input gantt-drawer-checklist-input"
                                    value={item.text}
                                    onChange={e => updateChecklistItemText(i, e.target.value)}
                                  />
                                  <button
                                    className="gantt-drawer-checklist-remove"
                                    onClick={() => removeChecklistItem(i)}
                                    aria-label="Remove item"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <span>{item.text}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="gantt-drawer-text-panel">No checklist items.</div>
                      )}
                      {isEditing && (
                        <div className="gantt-drawer-checklist-add">
                          <input
                            className="gantt-drawer-edit-input"
                            value={newChecklistItem}
                            onChange={e => setNewChecklistItem(e.target.value)}
                            placeholder="Add new item..."
                            onKeyDown={e => {
                              if (e.key === 'Enter') addChecklistItem()
                            }}
                          />
                          <button className="gantt-drawer-checklist-add-btn" onClick={addChecklistItem}>
                            + Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dashed separator */}
              <div className="gantt-drawer-separator" />

              {/* ATTACHMENTS accordion */}
              <div className="gantt-drawer-section">
                <button className="gantt-drawer-section-header" onClick={() => toggleSection('attachments')}>
                  <span className="gantt-drawer-section-title-group">
                    <span className="gantt-drawer-section-title">ATTACHMENTS</span>
                    {task.attachments && task.attachments.length > 0 && (
                      <span className="gantt-drawer-count">{task.attachments.length}</span>
                    )}
                  </span>
                  <ChevronIcon expanded={expandedSections.attachments} />
                </button>

                {expandedSections.attachments && (
                  <div className="gantt-drawer-section-body">
                    {task.attachments && task.attachments.length > 0 ? (
                      <div className="gantt-drawer-attachments">
                        {task.attachments.map((file, i) => (
                          <div key={i} className="gantt-drawer-attachment-row">
                            <div className="gantt-drawer-file-icon">
                              {file.fileName.split('.').pop()?.toUpperCase()}
                            </div>
                            <div className="gantt-drawer-file-name">{file.fileName}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="gantt-drawer-text-panel">No attachments.</div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'taskLog' && (
            <div className="gantt-drawer-task-log">No task log entries.</div>
          )}
        </div>

        {/* Action buttons at bottom */}
        <div className="gantt-drawer-actions">
          <button className="gantt-drawer-btn">Archive</button>
          {isEditing ? (
            <>
              <button className="gantt-drawer-btn" onClick={cancelEditing}>Cancel</button>
              <button className="gantt-drawer-btn gantt-drawer-btn--primary" onClick={saveEdits}>Save</button>
            </>
          ) : (
            <button className="gantt-drawer-btn" onClick={startEditing}>Edit</button>
          )}
          <button className="gantt-drawer-btn">Share</button>
        </div>
      </div>
    </Drawer>
  )
}

export default TaskDetailsDrawer
