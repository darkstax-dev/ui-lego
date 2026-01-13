import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DashboardCard as DashboardCardType } from './types'
import SelectField from '../inputs/SelectField'
import InputField from '../inputs/InputField'
import RichTextEditor from './RichTextEditor'
import './DashboardCard.css'

interface DashboardCardProps {
  card: DashboardCardType
  onCardClick?: (card: DashboardCardType) => void
  onDragStart?: (card: DashboardCardType, e: React.DragEvent) => void
  onDragEnd?: () => void
  onDeleteCard?: (card: DashboardCardType) => void
  onUpdateCard?: (card: DashboardCardType) => void
  style?: React.CSSProperties
}

const notebookCellOptions = [
  { value: '', label: 'Select notebook cell' },
  { value: 'cell1', label: 'Cell 1' },
  { value: 'cell3', label: 'Cell 3' },
]

const gridSizeOptions = [
  { value: '', label: 'Default' },
  { value: '1', label: '1 (25%)' },
  { value: '2', label: '2 (50%)' },
  { value: '3', label: '3 (75%)' },
  { value: '4', label: '4 (100%)' },
]

const DashboardCard: React.FC<DashboardCardProps> = ({
  card,
  onCardClick,
  onDragStart,
  onDragEnd,
  onDeleteCard,
  onUpdateCard,
  style
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [localCard, setLocalCard] = useState<DashboardCardType>(card)
  const [showHyperlinkInput, setShowHyperlinkInput] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  // Sync local card with external updates
  useEffect(() => {
    setLocalCard(card)
  }, [card])

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click when interacting with inputs
    if ((e.target as HTMLElement).tagName === 'INPUT' || 
        (e.target as HTMLElement).tagName === 'SELECT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA' ||
        (e.target as HTMLElement).closest('.select-field') ||
        (e.target as HTMLElement).closest('.input-field') ||
        (e.target as HTMLElement).closest('.rich-text-editor')) {
      return
    }
    onCardClick?.(card)
  }

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', card.id)
    onDragStart?.(card, e)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false)
    onDragEnd?.()
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDeleteCard?.(card)
  }

  const handleAddHyperlink = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowHyperlinkInput(!showHyperlinkInput)
  }

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(true)
  }

  const handleToggleCardType = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newType: 'data' | 'text' = localCard.cardType === 'text' ? 'data' : 'text'
    const updatedCard: DashboardCardType = { 
      ...localCard, 
      cardType: newType,
      title: newType === 'text' ? 'Text Card' : 'Select Notebook Cell'
    }
    setLocalCard(updatedCard)
    onUpdateCard?.(updatedCard)
  }

  const handleCloseModal = () => {
    setIsExpanded(false)
  }

  useEffect(() => {
    // Use a small delay to ensure DOM is fully rendered
    const checkScrollbar = () => {
      const cardBody = document.getElementById(`card-body-${card.id}`)
      if (cardBody) {
        const hasScroll = cardBody.scrollHeight > cardBody.clientHeight
        setHasScrollbar(hasScroll)
      }
    }
    
    // Check immediately
    checkScrollbar()
    
    // Also check after a short delay to catch any async rendering
    const timer = setTimeout(checkScrollbar, 100)
    
    return () => clearTimeout(timer)
  }, [card.id, localCard, showHyperlinkInput])

  const updateField = (field: keyof DashboardCardType, value: string | number | undefined) => {
    const updatedCard = { ...localCard, [field]: value }
    setLocalCard(updatedCard)
    onUpdateCard?.(updatedCard)
  }

  const cardType = localCard.cardType || 'data'

  const renderDataCardContent = () => (
    <>
      <SelectField
        label="Notebook Cell"
        options={notebookCellOptions}
        value={localCard.notebookCell}
        onChange={(value) => updateField('notebookCell', value)}
        placeholder="Select notebook cell"
      />
      <InputField
        label="Table Height"
        value={localCard.tableHeight}
        onChange={(value) => updateField('tableHeight', value)}
        placeholder="Enter table height"
        leadingIcon={null}
      />
      <InputField
        label="Table Column Width"
        value={localCard.tableColumnWidth}
        onChange={(value) => updateField('tableColumnWidth', value)}
        placeholder="Enter column width"
        leadingIcon={null}
      />
      <InputField
        label="Default Table Page Size"
        value={localCard.defaultTablePageSize}
        onChange={(value) => updateField('defaultTablePageSize', value)}
        placeholder="Enter page size"
        leadingIcon={null}
      />
      <SelectField
        label="Card Width (Grid Units)"
        options={gridSizeOptions}
        value={localCard.cardWidth?.toString() || ''}
        onChange={(value) => updateField('cardWidth', value ? parseInt(value) : undefined)}
        placeholder="Select width"
      />
      <SelectField
        label="Card Height (Grid Units)"
        options={gridSizeOptions}
        value={localCard.cardHeight?.toString() || ''}
        onChange={(value) => updateField('cardHeight', value ? parseInt(value) : undefined)}
        placeholder="Select height"
      />
      {showHyperlinkInput && (
        <InputField
          label="Hyperlink"
          value={localCard.hyperlink || ''}
          onChange={(value) => updateField('hyperlink', value)}
          placeholder="Enter hyperlink URL"
          leadingIcon={null}
        />
      )}
    </>
  )

  const renderTextCardContent = () => (
    <>
      <div className="text-card-editor-wrapper">
        <label className="text-card-label">Content</label>
        <RichTextEditor
          value={localCard.textContent || ''}
          onChange={(value) => updateField('textContent', value)}
          placeholder="Start typing or use the toolbar to format your content..."
        />
        <div className="text-card-help">
          💡 Use the toolbar to format text, add images, links, and more!
        </div>
      </div>
      <SelectField
        label="Card Width (Grid Units)"
        options={gridSizeOptions}
        value={localCard.cardWidth?.toString() || ''}
        onChange={(value) => updateField('cardWidth', value ? parseInt(value) : undefined)}
        placeholder="Select width"
      />
      <SelectField
        label="Card Height (Grid Units)"
        options={gridSizeOptions}
        value={localCard.cardHeight?.toString() || ''}
        onChange={(value) => updateField('cardHeight', value ? parseInt(value) : undefined)}
        placeholder="Select height"
      />
    </>
  )

  const modalContent = isExpanded ? createPortal(
    <div className="dashboard-card-modal-overlay" onClick={handleCloseModal}>
      <div className="dashboard-card-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-card-modal__header">
          <h3 className="dashboard-card-modal__title">{card.title} - Configuration</h3>
          <button
            className="dashboard-card-modal__close-btn"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="dashboard-card-modal__body">
          {cardType === 'data' ? renderDataCardContent() : renderTextCardContent()}
        </div>
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      <div 
        className={`dashboard-card ${isDragging ? 'dashboard-card-dragging' : ''} ${cardType === 'text' ? 'dashboard-card--text' : ''}`}
        onClick={handleCardClick}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={style}
      >
        <div className="dashboard-card__header">
          <h3 className="dashboard-card__title">{localCard.title}</h3>
          <div className="dashboard-card__actions">
            {/* Toggle button - always visible on every card */}
            <button
              className="dashboard-card__toggle-btn"
              onClick={handleToggleCardType}
              aria-label={cardType === 'text' ? 'Switch to Data Card' : 'Switch to Text Card'}
              title={cardType === 'text' ? 'Switch to Data Card' : 'Switch to Text Card'}
            >
              {cardType === 'text' ? (
                // Data card icon (table/grid)
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                // Text card icon (document/text lines)
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4h12M2 8h12M2 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
            
            {/* Expand button - only show if has scrollbar */}
            {hasScrollbar && (
              <button
                className="dashboard-card__expand-btn"
                onClick={handleExpand}
                aria-label="Expand card"
                title="Expand to view all configurations"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            
            <button
              className="dashboard-card__add-link-btn"
              onClick={handleAddHyperlink}
              aria-label="Add hyperlink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.333v9.334M3.333 8h9.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="dashboard-card__delete-btn"
              onClick={handleDelete}
              aria-label="Delete card"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="dashboard-card__body" id={`card-body-${card.id}`}>
          {cardType === 'data' ? renderDataCardContent() : renderTextCardContent()}
        </div>
      </div>
      {modalContent}
    </>
  )
}

export default DashboardCard