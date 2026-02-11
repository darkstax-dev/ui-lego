import React from 'react'
import './ColumnHeader.css'

export interface ColumnHeaderProps {
  label: string
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | null
  onSort?: () => void
  width?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  label,
  sortable = false,
  sortDirection = null,
  onSort,
  width,
  align = 'left',
  className = ''
}) => {
  const handleClick = () => {
    if (sortable && onSort) {
      onSort()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (sortable && onSort && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onSort()
    }
  }

  return (
    <div
      className={`column-header column-header--align-${align} ${sortable ? 'column-header--sortable' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      style={{ width }}
    >
      <span className="column-header__label">{label}</span>
      {sortable && (
        <svg 
          className={`column-header__sort-icon ${sortDirection === 'desc' ? 'column-header__sort-icon--desc' : ''} ${!sortDirection ? 'column-header__sort-icon--inactive' : ''}`}
          width="8" 
          height="10" 
          viewBox="0 0 8 10" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 10L8 6.99382e-07L8.74228e-07 0L4 10Z" fill="currentColor"/>
        </svg>
      )}
    </div>
  )
}

export default ColumnHeader
