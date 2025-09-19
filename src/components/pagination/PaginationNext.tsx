import React from 'react'
import './PaginationNext.css'

interface PaginationNextProps {
  onClick?: () => void
  disabled?: boolean
}

const PaginationNext: React.FC<PaginationNextProps> = ({
  onClick,
  disabled = false
}) => {
  const getClassName = () => {
    let classes = 'pagination-next'
    if (disabled) classes += ' pagination-next--disabled'
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

  const ArrowRightIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="pagination-next__icon"
    >
      <g clipPath="url(#clip0_12_2995)">
        <path 
          d="M8.78132 8.00001L5.48132 4.70001L6.42399 3.75734L10.6667 8.00001L6.42399 12.2427L5.48132 11.3L8.78132 8.00001Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_12_2995">
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
      aria-label="Next page"
    >
      <span className="pagination-next__text">Next</span>
      <ArrowRightIcon />
    </button>
  )
}

export default PaginationNext
