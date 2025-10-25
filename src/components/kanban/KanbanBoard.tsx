import React, { useState } from 'react'
import type { KanbanBoardData, KanbanCard } from './types'
import KanbanColumn from './KanbanColumn'
import './KanbanBoard.css'

export interface KanbanBoardProps {
  data: KanbanBoardData
  onCardClick?: (card: KanbanCard) => void
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ data, onCardClick, onCardMove }) => {
  const [boardData, setBoardData] = useState<KanbanBoardData>(data)
  const [draggedCard, setDraggedCard] = useState<{ card: KanbanCard; columnId: string } | null>(null)

  const handleDragStart = (card: KanbanCard, columnId: string) => {
    setDraggedCard({ card, columnId })
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedCard) return

    const { card, columnId: sourceColumnId } = draggedCard

    if (sourceColumnId === targetColumnId) {
      setDraggedCard(null)
      return
    }

    const newColumns = boardData.columns.map(column => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          cards: column.cards.filter(c => c.id !== card.id)
        }
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          cards: [...column.cards, card]
        }
      }
      return column
    })

    setBoardData({ columns: newColumns })
    
    if (onCardMove) {
      onCardMove(card.id, sourceColumnId, targetColumnId)
    }

    setDraggedCard(null)
  }

  return (
    <div className="kanban-board">
      <div className="kanban-board-columns">
        {boardData.columns.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onCardClick={onCardClick}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            isDragging={draggedCard !== null}
            isDropTarget={draggedCard !== null && draggedCard.columnId !== column.id}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard
