import React, { useState, useMemo } from 'react'
import type { KanbanBoardData, KanbanCard } from './types'
import KanbanColumn from './KanbanColumn'
import KanbanHeader from './KanbanHeader'
import './KanbanBoard.css'

export interface KanbanBoardProps {
  data: KanbanBoardData
  onCardClick?: (card: KanbanCard) => void
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void
  onSearchChange?: (value: string) => void
  onSettingsClick?: () => void
  onFilterClick?: () => void
  showHeader?: boolean
  headerTitle?: string
  onRenameColumn?: (columnId: string) => void
  onArchiveColumn?: (columnId: string) => void
  onDeleteColumn?: (columnId: string) => void
  onOpenTask?: (card: KanbanCard) => void
  onEditCardName?: (card: KanbanCard) => void
  onMoveCard?: (card: KanbanCard) => void
  onDeleteCard?: (card: KanbanCard) => void
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  data,
  onCardClick,
  onCardMove,
  onSearchChange,
  onSettingsClick,
  onFilterClick,
  showHeader = true,
  headerTitle = '[Kanban board]',
  onRenameColumn,
  onArchiveColumn,
  onDeleteColumn,
  onOpenTask,
  onEditCardName,
  onMoveCard,
  onDeleteCard
}) => {
  const [boardData, setBoardData] = useState<KanbanBoardData>(data)
  const [draggedCard, setDraggedCard] = useState<{ card: KanbanCard; columnId: string } | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [filterActive, setFilterActive] = useState(false)

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

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleFilterClick = () => {
    setFilterActive(!filterActive)
    if (onFilterClick) {
      onFilterClick()
    }
  }

  const filteredData = useMemo(() => {
    if (!searchValue) return boardData

    const searchLower = searchValue.toLowerCase()
    const filteredColumns = boardData.columns.map(column => ({
      ...column,
      cards: column.cards.filter(card =>
        card.title.toLowerCase().includes(searchLower) ||
        card.customer.toLowerCase().includes(searchLower) ||
        card.agentComment.toLowerCase().includes(searchLower) ||
        card.agentName.toLowerCase().includes(searchLower)
      )
    }))

    return { columns: filteredColumns }
  }, [boardData, searchValue])

  return (
    <div className="kanban-board-container">
      {showHeader && (
        <KanbanHeader
          title={headerTitle}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSettingsClick={onSettingsClick}
          onFilterClick={handleFilterClick}
          filterActive={filterActive}
        />
      )}

      <div className="kanban-board">
        <div className="kanban-board-columns">
          {filteredData.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onCardClick={onCardClick}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              isDragging={draggedCard !== null}
              isDropTarget={draggedCard !== null && draggedCard.columnId !== column.id}
              onRenameColumn={onRenameColumn}
              onArchiveColumn={onArchiveColumn}
              onDeleteColumn={onDeleteColumn}
              onOpenTask={onOpenTask}
              onEditCardName={onEditCardName}
              onMoveCard={onMoveCard}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
