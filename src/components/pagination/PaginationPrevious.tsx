import React from 'react'
import './PaginationPrevious.css'

interface PaginationPreviousProps {
  onClick?: () => void
  disabled?: boolean
}

const PaginationPrevious: React.FC<PaginationPreviousProps> = ({
  onClick,
  disabled = false
}) => {
  const getClassName = () => {
    let classes = 'pagination-previous'
    if (disabled) classes += ' pagination-previous--disabled'
    return classes
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && onClick) {
      event.preventDefault()
      onClick()
    }
  }

  const ArrowLeftIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="pagination-previous__icon"
    >
      <g clipPath="url(#clip0_12_2970)">
        <path 
          d="M7.21868 8.00001L10.5187 11.3L9.57601 12.2427L5.33334 8.00001L9.57601 3.75734L10.5187 4.70001L7.21868 8.00001Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_12_2970">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <button
      className={getClassName()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label="Previous page"
    >
      <ArrowLeftIcon />
      <span className="pagination-previous__text">Previous</span>
    </button>
  )
}

export default PaginationPrevious
