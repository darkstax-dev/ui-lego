import React, { useState, useRef } from 'react'
import type { DashboardBuilderData, DashboardCard } from './types'
import DashboardCardComponent from './DashboardCard'
import './DashboardBuilder.css'

export interface DashboardBuilderProps {
  data: DashboardBuilderData
  onCardClick?: (card: DashboardCard) => void
  onCardDragStart?: (card: DashboardCard, e: React.DragEvent) => void
  onCardDragEnd?: (card: DashboardCard) => void
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

const D2DDashboardBuilder: React.FC<DashboardBuilderProps> = ({
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

  // Calculate actual card dimensions based on grid units (1-4)
  // 1 = 25%, 2 = 50%, 3 = 75%, 4 = 100% of container
  const getCardDimensions = (card: DashboardCard) => {
    const containerWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth
    const containerHeight = window.innerHeight
    
    // Convert grid units to actual dimensions
    // Each grid unit = 25% of the container
    const width = card.cardWidth 
      ? (card.cardWidth / 4) * containerWidth - cardSpacing * 2
      : DEFAULT_CARD_WIDTH
    const height = card.cardHeight 
      ? (card.cardHeight / 4) * containerHeight - cardSpacing * 2
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
    let position = { ...card.position }
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
    
    if (arrangedCards.length === 0) return
    
    // Track rows with their Y position and max height
    const rows: Array<{ 
      y: number
      maxHeight: number
      cards: Array<{ card: DashboardCard; x: number; width: number; height: number }> 
    }> = []
    
    let currentX = cardSpacing
    let currentY = cardSpacing
    let currentRowIndex = 0
    const maxRowWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth - cardSpacing
    
    // First pass: organize cards into rows
    arrangedCards.forEach((card) => {
      const dimensions = getCardDimensions(card)
      
      // Check if card fits in current row (including spacing on both sides)
      if (currentX + dimensions.width + cardSpacing > maxRowWidth && currentX > cardSpacing) {
        // Move to next row - calculate Y based on previous row's max height
        currentRowIndex++
        currentX = cardSpacing
        if (rows.length > 0) {
          const prevRow = rows[rows.length - 1]
          currentY = prevRow.y + prevRow.maxHeight + cardSpacing
        }
      }
      
      // Initialize row if it doesn't exist
      if (!rows[currentRowIndex]) {
        rows[currentRowIndex] = {
          y: currentY,
          maxHeight: 0,
          cards: []
        }
      }
      
      // Add card to current row
      rows[currentRowIndex].cards.push({
        card,
        x: currentX,
        width: dimensions.width,
        height: dimensions.height
      })
      
      // Update row's max height
      rows[currentRowIndex].maxHeight = Math.max(rows[currentRowIndex].maxHeight, dimensions.height)
      
      // Move X position for next card
      currentX += dimensions.width + cardSpacing
    })
    
    // Second pass: apply positions ensuring each row starts at correct Y
    let cumulativeY = cardSpacing
    rows.forEach((row) => {
      row.cards.forEach(({ card, x }) => {
        card.position = {
          x: x,
          y: cumulativeY
        }
      })
      // Move Y down for next row
      cumulativeY += row.maxHeight + cardSpacing
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
    
    const newCard: DashboardCard = {
      id: `card-${Date.now()}`,
      title: 'Select Notebook Cell',
      cardType: 'data',
      notebookCell: '',
      tableHeight: '',
      tableColumnWidth: '',
      defaultTablePageSize: '',
      position: { x: cardSpacing, y: cardSpacing }
    }
    
    // Find a non-overlapping position for the new card
    if (boardData.cards.length > 0) {
      const maxRowWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth - cardSpacing
      const newCardDimensions = getCardDimensions(newCard)
      
      // Build a grid of occupied positions
      const occupiedPositions = boardData.cards.map(card => {
        const dims = getCardDimensions(card)
        return {
          x1: card.position.x,
          y1: card.position.y,
          x2: card.position.x + dims.width,
          y2: card.position.y + dims.height
        }
      })
      
      // Try to find a position that doesn't overlap
      let found = false
      let testX = cardSpacing
      let testY = cardSpacing
      
      // Scan through possible positions
      for (let row = 0; row < 100 && !found; row++) {
        testX = cardSpacing
        
        for (let col = 0; col < 10 && !found; col++) {
          // Check if this position overlaps with any existing card
          const overlaps = occupiedPositions.some(occupied => {
            const newX1 = testX
            const newY1 = testY
            const newX2 = testX + newCardDimensions.width
            const newY2 = testY + newCardDimensions.height
            
            // Check if rectangles overlap
            return !(newX2 + cardSpacing <= occupied.x1 || 
                     newX1 >= occupied.x2 + cardSpacing ||
                     newY2 + cardSpacing <= occupied.y1 || 
                     newY1 >= occupied.y2 + cardSpacing)
          })
          
          if (!overlaps && testX + newCardDimensions.width <= maxRowWidth) {
            newCard.position = { x: testX, y: testY }
            found = true
            break
          }
          
          testX += DEFAULT_CARD_WIDTH + cardSpacing
        }
        
        // Move to next row
        if (!found) {
          testY += DEFAULT_CARD_HEIGHT + cardSpacing
        }
      }
      
      // If still not found, place at the bottom
      if (!found) {
        const maxBottom = Math.max(...boardData.cards.map(card => {
          const dims = getCardDimensions(card)
          return card.position.y + dims.height
        }))
        newCard.position = { x: cardSpacing, y: maxBottom + cardSpacing }
      }
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
          // Calculate dimensions based on grid units (1-4)
          const dimensions = getCardDimensions(card)
          
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
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default D2DDashboardBuilder