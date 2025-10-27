import React from 'react'
import './Kanban.css'
import Tag, { TagScheme } from '../tag-badges/Tag'
import type { KanbanCardData, Attachment, Priority } from './KanbanTypes'

export interface KanbanCardProps {
  card: KanbanCardData
}

const priorityToScheme = (p?: Priority): TagScheme => {
  switch (p) {
    case 'CRITICAL':
    case 'HIGH':
    case 'BLOCKED':
      return 'danger'
    case 'MEDIUM':
    case 'WAITING':
      return 'warning'
    case 'LOW':
    case 'NORMAL':
    case 'ARCHIVED':
      return 'neutral'
    case 'DONE':
      return 'positive'
    default:
      return 'brand'
  }
}

const AttachmentRow: React.FC<{ a: Attachment }> = ({ a }) => {
  return (
    <div className="kanban-attachment">
      <div className="kanban-attachment__left">
        <span className="kanban-attachment__type">{a.type}</span>
        <span className="kanban-attachment__name">{a.name}</span>
      </div>
      <span className="kanban-attachment__date">{a.date}</span>
    </div>
  )
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  const meta = card.meta || {}

  return (
    <article className="kanban-card" aria-label={card.title}>
      <header className="kanban-card__header">
        <h4 className="kanban-card__title">{card.title}</h4>
        <button className="kanban-column__menu" aria-label="Card menu" type="button">⋮</button>
      </header>

      {card.statusChips && (
        <div className="kanban-card__chips">
          {card.statusChips.map((c, idx) => (
            <Tag key={idx} scheme={priorityToScheme(card.priority)} removable={false}>{c}</Tag>
          ))}
        </div>
      )}

      <div className="kanban-card__meta">
        {meta.assignee && (
          <div>
            <div className="kanban-card__section-title">Assignee</div>
            <div className="kanban-meta__value">{meta.assignee}</div>
          </div>
        )}
        {meta.agentName && (
          <div>
            <div className="kanban-card__section-title">Agent Name</div>
            <div className="kanban-meta__value">{meta.agentName}</div>
          </div>
        )}
        {meta.agentRole && (
          <div>
            <div className="kanban-card__section-title">Agent Role</div>
            <div className="kanban-meta__value">{meta.agentRole}</div>
          </div>
        )}
        {meta.createdAt && (
          <div>
            <div className="kanban-card__section-title">Created</div>
            <div className="kanban-meta__value">{meta.createdAt}</div>
          </div>
        )}
        {meta.dueDate && (
          <div>
            <div className="kanban-card__section-title">Due date</div>
            <div className="kanban-meta__value">{meta.dueDate}</div>
          </div>
        )}
        {meta.closeDate && (
          <div>
            <div className="kanban-card__section-title">Close date</div>
            <div className="kanban-meta__value">{meta.closeDate}</div>
          </div>
        )}
      </div>

      {card.priority && (
        <div style={{ marginBottom: '8px' }}>
          <div className="kanban-card__section-title">Priority</div>
          <Tag scheme={priorityToScheme(card.priority)} removable={false}>{card.priority}</Tag>
        </div>
      )}

      {card.comment && (
        <div>
          <div className="kanban-card__section-title">Agent Comment</div>
          <p className="kanban-card__comment">{card.comment}</p>
        </div>
      )}

      {meta.customer && (
        <div style={{ marginBottom: '8px' }}>
          <div className="kanban-card__section-title">Customer</div>
          <div className="kanban-meta__value">{meta.customer}</div>
        </div>
      )}

      {card.attachments && card.attachments.length > 0 && (
        <div>
          <div className="kanban-card__section-title">Attachments</div>
          <div className="kanban-attachments">
            {card.attachments.map(a => <AttachmentRow key={a.id} a={a} />)}
          </div>
        </div>
      )}
    </article>
  )
}

export default KanbanCard
