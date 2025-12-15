import React, { useState } from 'react'
import type { DashboardCard as DashboardCardType } from './types'
import SelectField from '../inputs/SelectField'
import InputField from '../inputs/InputField'
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click when interacting with inputs
    if ((e.target as HTMLElement).tagName === 'INPUT' || 
        (e.target as HTMLElement).tagName === 'SELECT' ||
        (e.target as HTMLElement).closest('.select-field') ||
        (e.target as HTMLElement).closest('.input-field')) {
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

  const updateField = (field: keyof DashboardCardType, value: string) => {
    const updatedCard = { ...localCard, [field]: value }
    setLocalCard(updatedCard)
    onUpdateCard?.(updatedCard)
  }
  return (
    <div 
      className={`dashboard-card ${isDragging ? 'dashboard-card-dragging' : ''}`}
      onClick={handleCardClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={style}
    >
      <div className="dashboard-card__header">
        <h3 className="dashboard-card__title">{card.title}</h3>
        <div className="dashboard-card__actions">
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
      
      <div className="dashboard-card__body">
        <SelectField
          label="Notebook Cell"
          options={notebookCellOptions}
          value={localCard.notebookCell}
          onChange={(value) => updateField('notebookCell', value)}
          placeholder="Select notebook cell"
        />
        <InputField
          label="Chart Height"
          value={localCard.chartHeight}
          onChange={(value) => updateField('chartHeight', value)}
          placeholder="Enter chart height"
          leadingIcon={null}
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
        <InputField
          label="Card Width (% of screen)"
          value={localCard.cardWidth || ''}
          onChange={(value) => updateField('cardWidth', value)}
          placeholder="e.g., 25 for 25% of screen width"
          leadingIcon={null}
        />
        <InputField
          label="Card Height (% of screen)"
          value={localCard.cardHeight || ''}
          onChange={(value) => updateField('cardHeight', value)}
          placeholder="e.g., 50 for 50% of screen height"
          leadingIcon={null}
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
      </div>
    </div>
  )
}

export default DashboardCard
