import React from 'react'
import './BackButton.css'

export interface BackButtonProps {
  onClick?: () => void
  label?: string
  disabled?: boolean
  className?: string
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = 'Back',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      className={`back-button ${disabled ? 'back-button--disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={`Go back to ${label}`}
    >
      <div className="back-button__icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="back-button__label">{label}</span>
    </button>
  )
}

export default BackButton
