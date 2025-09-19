import React from 'react'
import './PaginationPage.css'

interface PaginationPageProps {
  number: number | string
  state?: 'default' | 'hover' | 'current'
  onClick?: () => void
  disabled?: boolean
}

const PaginationPage: React.FC<PaginationPageProps> = ({
  number,
  state = 'default',
  onClick,
  disabled = false
}) => {
  const getClassName = () => {
    let classes = 'pagination-page'
    if (state === 'current') classes += ' pagination-page--current'
    if (disabled) classes += ' pagination-page--disabled'
    return classes
  }

  const handleClick = () => {
    if (!disabled && onClick && state !== 'current') {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && onClick && state !== 'current') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <button
      className={getClassName()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || state === 'current'}
      aria-current={state === 'current' ? 'page' : undefined}
      aria-label={`Page ${number}`}
    >
      {number}
    </button>
  )
}

export default PaginationPage
