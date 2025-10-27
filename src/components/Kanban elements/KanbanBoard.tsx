import React from 'react'
import './Kanban.css'
import KanbanColumn from './KanbanColumn'
import type { KanbanColumnData } from './KanbanTypes'

export interface KanbanBoardProps {
  columns: KanbanColumnData[]
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns }) => {
  return (
    <div className="kanban-board">
      {columns.map(col => (
        <KanbanColumn key={col.id} id={col.id} title={col.title} cards={col.cards} />
      ))}
    </div>
  )
}

export default KanbanBoard
export { KanbanBoard }
