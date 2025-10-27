import React from 'react'
import './Kanban.css'
import KanbanCard from './KanbanCard'
import type { KanbanCardData } from './KanbanTypes'

export interface KanbanColumnProps {
  id: string
  title: string
  cards: KanbanCardData[]
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, cards }) => {
  return (
    <section className="kanban-column" aria-labelledby={`kanban-col-${id}`}> 
      <header className="kanban-column__header">
        <h3 id={`kanban-col-${id}`} className="kanban-column__title">{title}</h3>
        <button className="kanban-column__menu" aria-label={`${title} menu`} type="button">⋮</button>
      </header>

      <div>
        {cards.map(card => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>

      {/* Placeholder to match reference mock for add/empty area */}
      <div style={{
        minHeight: 40,
        border: '1px dashed var(--divider-light)',
        background: 'var(--color-gray-200)'
      }} />
    </section>
  )
}

export default KanbanColumn
