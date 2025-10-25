import React from 'react'
import type { KanbanBoardData, KanbanCard } from './types'
import KanbanColumn from './KanbanColumn'
import './KanbanBoard.css'

export interface KanbanBoardProps {
  data: KanbanBoardData
  onCardClick?: (card: KanbanCard) => void
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ data, onCardClick }) => {
  return (
    <div className="kanban-board">
      <div className="kanban-board-columns">
        {data.columns.map((column) => (
          <KanbanColumn key={column.id} column={column} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard
