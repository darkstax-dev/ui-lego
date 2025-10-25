import React, { useState } from 'react'
import type { KanbanCard as KanbanCardType, Status, Priority } from './types'
import './KanbanCard.css'

interface KanbanCardProps {
  card: KanbanCardType
  onCardClick?: (card: KanbanCardType) => void
}

const statusColors: Record<Status, string> = {
  'User Action Required': 'status-user-action',
  'Customer Action Required': 'status-customer-action',
  'Agents Active': 'status-agents-active',
  'Blocked': 'status-blocked',
  'Waiting': 'status-waiting',
  'Review': 'status-review',
  'Done': 'status-done',
  'Archived': 'status-archived'
}

const priorityColors: Record<Priority, string> = {
  'High': 'priority-high',
  'Medium': 'priority-medium',
  'Normal': 'priority-normal',
  'Low': 'priority-low'
}

const fileTypeIcons: Record<string, string> = {
  json: 'JSON',
  xls: 'XLS',
  pdf: 'PDF',
  yml: 'YML'
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, onCardClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(card)
    }
  }

  return (
    <div className="kanban-card" onClick={handleCardClick}>
      <div className="kanban-card-header">
        <div className="kanban-card-header-left">
          <div className="kanban-card-title">{card.title}</div>
          <div className={`kanban-card-status ${statusColors[card.status]}`}>
            <div className="status-flag"></div>
            <div className="status-text">{card.status}</div>
          </div>
        </div>
        <button 
          className="kanban-card-menu" 
          onClick={handleMenuToggle}
          aria-label="More options"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#00112B"/>
          </svg>
        </button>
      </div>

      <div className="kanban-card-meta">
        <div className="kanban-card-meta-row">
          <div className="kanban-card-meta-item">
            <div className="meta-label">Agent Name</div>
            <div className="meta-value">{card.agentName}</div>
          </div>
          <div className="kanban-card-meta-item">
            <div className="meta-label">Agent Role</div>
            <div className="meta-value">{card.agentRole}</div>
          </div>
        </div>

        <div className="kanban-card-meta-row">
          <div className="kanban-card-meta-item">
            <div className="meta-label">Created</div>
            <div className="meta-value">{card.created}</div>
          </div>
          {card.dueDate && (
            <div className="kanban-card-meta-item">
              <div className="meta-label">Due date</div>
              <div className="meta-value">{card.dueDate}</div>
            </div>
          )}
          {card.closeDate && (
            <div className="kanban-card-meta-item">
              <div className="meta-label">Close date</div>
              <div className="meta-value">{card.closeDate}</div>
            </div>
          )}
          <div className="kanban-card-meta-item">
            <div className="meta-label">Priority</div>
            <div className={`priority-badge ${priorityColors[card.priority]}`}>
              {card.priority}
            </div>
          </div>
        </div>
      </div>

      <div className="kanban-card-comment">
        <div className="meta-label">Agent Comment</div>
        <div className="comment-text">{card.agentComment}</div>
      </div>

      <div className="kanban-card-customer">
        <div className="meta-label">Customer</div>
        <div className="customer-value">{card.customer}</div>
      </div>

      {card.assignee && (
        <div className="kanban-card-assignee">
          <div className="meta-label">Assignee</div>
          <div className="assignee-info">
            <img src={card.assignee.avatar} alt={card.assignee.name} className="assignee-avatar" />
            <span className="assignee-name">{card.assignee.name}</span>
          </div>
        </div>
      )}

      {card.attachments && card.attachments.length > 0 && (
        <div className="kanban-card-attachments">
          <div className="meta-label">Attachments</div>
          <div className="attachments-list">
            {card.attachments.map((attachment) => (
              <div key={attachment.id} className="attachment-item">
                <div className="attachment-icon">
                  <div className={`file-type-icon file-type-${attachment.fileType}`}>
                    {fileTypeIcons[attachment.fileType]}
                  </div>
                </div>
                <div className="attachment-info">
                  <div className="attachment-name">{attachment.fileName}</div>
                  <div className="attachment-time">{attachment.timestamp}</div>
                </div>
                <button className="attachment-menu" aria-label="Attachment options">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#00112B"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default KanbanCard
