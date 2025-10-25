import React, { useState } from 'react'
import type { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from './types'
import KanbanCard from './KanbanCard'
import KanbanColumnMenu from './KanbanColumnMenu'
import './KanbanColumn.css'

interface KanbanColumnProps {
  column: KanbanColumnType
  onCardClick?: (card: KanbanCardType) => void
  onDragStart?: (card: KanbanCardType, columnId: string) => void
  onDragEnd?: () => void
  onDrop?: (columnId: string) => void
  isDragging?: boolean
  isDropTarget?: boolean
  onRenameColumn?: (columnId: string) => void
  onArchiveColumn?: (columnId: string) => void
  onDeleteColumn?: (columnId: string) => void
  onOpenTask?: (card: KanbanCardType) => void
  onEditCardName?: (card: KanbanCardType) => void
  onMoveCard?: (card: KanbanCardType) => void
  onDeleteCard?: (card: KanbanCardType) => void
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onCardClick,
  onDragStart,
  onDragEnd,
  onDrop,
  isDragging = false,
  isDropTarget = false,
  onRenameColumn,
  onArchiveColumn,
  onDeleteColumn,
  onOpenTask,
  onEditCardName,
  onMoveCard,
  onDeleteCard
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (isDropTarget) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (onDrop) {
      onDrop(column.id)
    }
  }

  return (
    <div 
      className={`kanban-column ${isDragOver ? 'kanban-column-drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="kanban-column-header">
        <div className="kanban-column-title">{column.title}</div>
        <div style={{ position: 'relative' }}>
          <button
            className="kanban-column-menu"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
            aria-label="Column options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#00112B"/>
            </svg>
          </button>
          <KanbanColumnMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            onRename={() => onRenameColumn?.(column.id)}
            onArchive={() => onArchiveColumn?.(column.id)}
            onDelete={() => onDeleteColumn?.(column.id)}
          />
        </div>
      </div>
      <div className="kanban-column-cards">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            columnId={column.id}
            onCardClick={onCardClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onOpenTask={onOpenTask}
            onEditName={onEditCardName}
            onMoveTo={onMoveCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn
