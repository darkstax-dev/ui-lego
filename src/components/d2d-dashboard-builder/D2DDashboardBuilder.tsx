import React, { useState, useRef } from 'react'
import type { DashboardBuilderData, DashboardCard } from './types'
import DashboardCardComponent from './DashboardCard'
import './D2DDashboardBuilder.css'

export interface D2DDashboardBuilderProps {
  data: DashboardBuilderData
  onCardClick?: (card: DashboardCard) => void
  onCardUpdate?: (card: DashboardCard) => void
  onCardDelete?: (card: DashboardCard) => void
  onCardAdd?: () => void
  showHeader?: boolean
  headerTitle?: string
  cardSpacing?: number
  enableAutoLayout?: boolean
}

const DEFAULT_CARD_WIDTH = 340
const DEFAULT_CARD_HEIGHT = 400
const DEFAULT_SPACING = 20

const D2DDashboardBuilder: React.FC<D2DDashboardBuilderProps> = ({
  data,
  onCardClick,
  onCardUpdate,
  onCardDelete,
  onCardAdd,
  showHeader = true,
  headerTitle = 'D2D Dashboard Builder',
  cardSpacing = DEFAULT_SPACING,
  enableAutoLayout = true,
}) => {
  const [boardData, setBoardData] = useState<DashboardBuilderData>(data)
  const [draggedCard, setDraggedCard] = useState<DashboardCard | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate actual card dimensions
  const getCardDimensions = (card: DashboardCard) => {
    const width = card.cardWidth 
      ? (parseFloat(card.cardWidth) / 100) * window.innerWidth 
      : DEFAULT_CARD_WIDTH
    const height = card.cardHeight 
      ? (parseFloat(card.cardHeight) / 100) * window.innerHeight 
      : DEFAULT_CARD_HEIGHT
    return { width, height }
  }

  // Check if two cards overlap
  const checkOverlap = (card1: DashboardCard, card2: DashboardCard) => {
    const dim1 = getCardDimensions(card1)
    const dim2 = getCardDimensions(card2)
    
    return !(
      card1.position.x + dim1.width + cardSpacing <= card2.position.x ||
      card2.position.x + dim2.width + cardSpacing <= card1.position.x ||
      card1.position.y + dim1.height + cardSpacing <= card2.position.y ||
      card2.position.y + dim2.height + cardSpacing <= card1.position.y
    )
  }

  // Find a non-overlapping position for a card
  const findNonOverlappingPosition = (card: DashboardCard, existingCards: DashboardCard[]) => {
    const position = { ...card.position }
    let attempts = 0
    const maxAttempts = 100
    
    while (attempts < maxAttempts) {
      const hasOverlap = existingCards.some(existingCard => {
        if (existingCard.id === card.id) return false
        const testCard = { ...card, position }
        return checkOverlap(testCard, existingCard)
      })
      
      if (!hasOverlap) {
        return position
      }
      
      // Try next position
      position.x += cardSpacing
      if (position.x > window.innerWidth - DEFAULT_CARD_WIDTH) {
        position.x = cardSpacing
        position.y += DEFAULT_CARD_HEIGHT + cardSpacing
      }
      
      attempts++
    }
    
    return position
  }

  // Auto-arrange all cards in a grid layout accounting for varying card sizes
  const autoArrangeCards = () => {
    const arrangedCards = [...boardData.cards]
    
    // Track current position
    let currentX = cardSpacing
    let currentY = cardSpacing
    let rowHeight = 0
    const maxRowWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth
    
    arrangedCards.forEach((card) => {
      const dimensions = getCardDimensions(card)
      
      // Check if card fits in current row
      if (currentX + dimensions.width > maxRowWidth - cardSpacing && currentX > cardSpacing) {
        // Move to next row
        currentX = cardSpacing
        currentY += rowHeight + cardSpacing
        rowHeight = 0
      }
      
      // Position the card
      card.position = {
        x: currentX,
        y: currentY
      }
      
      // Update position for next card
      currentX += dimensions.width + cardSpacing
      rowHeight = Math.max(rowHeight, dimensions.height)
    })
    
    setBoardData({ cards: arrangedCards })
    arrangedCards.forEach(card => onCardUpdate?.(card))
  }

  const handleDragStart = (card: DashboardCard, e: React.DragEvent) => {
    setDraggedCard(card)
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedCard || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    let newX = e.clientX - containerRect.left - dragOffset.x
    let newY = e.clientY - containerRect.top - dragOffset.y

    // Snap to grid for cleaner positioning
    newX = Math.round(newX / cardSpacing) * cardSpacing
    newY = Math.round(newY / cardSpacing) * cardSpacing

    // Ensure minimum position
    newX = Math.max(cardSpacing, newX)
    newY = Math.max(cardSpacing, newY)

    let updatedCard = {
      ...draggedCard,
      position: { x: newX, y: newY }
    }

    // Check for overlaps and adjust position if needed
    if (enableAutoLayout) {
      const otherCards = boardData.cards.filter(card => card.id !== draggedCard.id)
      const hasOverlap = otherCards.some(card => checkOverlap(updatedCard, card))
      
      if (hasOverlap) {
        const nonOverlappingPosition = findNonOverlappingPosition(updatedCard, otherCards)
        updatedCard = { ...updatedCard, position: nonOverlappingPosition }
      }
    }

    const newCards = boardData.cards.map(card =>
      card.id === draggedCard.id ? updatedCard : card
    )

    setBoardData({ cards: newCards })
    onCardUpdate?.(updatedCard)
    setDraggedCard(null)
  }

  const handleCardUpdate = (updatedCard: DashboardCard) => {
    const newCards = boardData.cards.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    )

    setBoardData({ cards: newCards })
    onCardUpdate?.(updatedCard)
  }

  const handleCardDelete = (cardToDelete: DashboardCard) => {
    const newCards = boardData.cards.filter(card => card.id !== cardToDelete.id)
    setBoardData({ cards: newCards })
    onCardDelete?.(cardToDelete)
  }

  const handleAddCard = () => {
    onCardAdd?.()
    
    // Calculate smart position for new card based on existing cards
    let newPosition = { x: cardSpacing, y: cardSpacing }
    
    if (boardData.cards.length > 0) {
      // Find the bottom-most card to place new card below
      let maxY = 0
      let maxYCard = boardData.cards[0]
      
      boardData.cards.forEach(card => {
        const dimensions = getCardDimensions(card)
        const cardBottom = card.position.y + dimensions.height
        if (cardBottom > maxY) {
          maxY = cardBottom
          maxYCard = card
        }
      })
      
      const maxYCardDimensions = getCardDimensions(maxYCard)
      // Try to place next to the bottom-most card first
      newPosition = {
        x: maxYCard.position.x + maxYCardDimensions.width + cardSpacing,
        y: maxYCard.position.y
      }
      
      // If it doesn't fit, place below
      const maxRowWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth
      if (newPosition.x + DEFAULT_CARD_WIDTH > maxRowWidth - cardSpacing) {
        newPosition = {
          x: cardSpacing,
          y: maxY + cardSpacing
        }
      }
    }
    
    const newCard: DashboardCard = {
      id: `card-${Date.now()}`,
      title: 'Select Notebook Cell',
      notebookCell: '',
      chartHeight: '',
      tableHeight: '',
      tableColumnWidth: '',
      defaultTablePageSize: '',
      position: newPosition
    }

    // Ensure no overlap with existing cards
    if (enableAutoLayout) {
      newCard.position = findNonOverlappingPosition(newCard, boardData.cards)
    }

    setBoardData({ cards: [...boardData.cards, newCard] })
  }

  return (
    <div className="d2d-dashboard-builder-container">
      {showHeader && (
        <div className="d2d-dashboard-builder__header">
          <h1 className="d2d-dashboard-builder__title">{headerTitle}</h1>
          <div className="d2d-dashboard-builder__actions">
            <button className="d2d-dashboard-builder__arrange-btn" onClick={autoArrangeCards}>
              Auto Arrange
            </button>
            <button className="d2d-dashboard-builder__add-btn" onClick={handleAddCard}>
              Add Cell
            </button>
          </div>
        </div>
      )}

      <div 
        className="d2d-dashboard-builder"
        ref={containerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {boardData.cards.map((card) => {
          // Use viewport units (vw/vh) for percentage-based sizing relative to screen
          const cardWidth = card.cardWidth ? `${card.cardWidth}vw` : '340px'
          const cardHeight = card.cardHeight ? `${card.cardHeight}vh` : 'auto'
          
          return (
            <DashboardCardComponent
              key={card.id}
              card={card}
              onCardClick={onCardClick}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDeleteCard={handleCardDelete}
              onUpdateCard={handleCardUpdate}
              style={{
                position: 'absolute',
                left: `${card.position.x}px`,
                top: `${card.position.y}px`,
                width: cardWidth,
                height: cardHeight
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default D2DDashboardBuilder