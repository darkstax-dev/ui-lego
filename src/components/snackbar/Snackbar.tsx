import React from 'react'
import './Snackbar.css'

export type SnackbarVariant = 'success' | 'error'

interface SnackbarProps {
  variant: SnackbarVariant
  title: string
  message: string
  onClose?: () => void
}

const SnackbarIcon: React.FC<{ variant: SnackbarVariant }> = ({ variant }) => {
  const fillColor = variant === 'success' ? '#23A45A' : '#D9322A'

  // Create a consistent pattern that resembles the Figma design
  const diamondPattern = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1]
  ]

  return (
    <div className="snackbar__icon">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pattern based on the Figma design */}
        <g>
          {diamondPattern.map((row, rowIndex) =>
            row.map((shouldShow, colIndex) => {
              if (!shouldShow) return null

              const x = colIndex * 5
              const y = rowIndex * 5
              const isLarge = (rowIndex + colIndex) % 3 === 0
              const size = isLarge ? '4' : '2.5'
              const offsetX = isLarge ? x : x + 1
              const offsetY = isLarge ? y : y + 1

              return (
                <rect
                  key={`${rowIndex}-${colIndex}`}
                  x={offsetX}
                  y={offsetY}
                  width={size}
                  height={size}
                  fill={fillColor}
                  transform={`rotate(45 ${offsetX + parseFloat(size)/2} ${offsetY + parseFloat(size)/2})`}
                />
              )
            })
          )}
        </g>
      </svg>
    </div>
  )
}

const CloseIcon: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button 
    className="snackbar__close-button"
    onClick={onClick}
    aria-label="Close notification"
    type="button"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M11.9993 11.086L16.9493 6.13599L18.3633 7.54999L13.4133 12.5L18.3633 17.45L16.9493 18.864L11.9993 13.914L7.04925 18.864L5.63525 17.45L10.5853 12.5L5.63525 7.54999L7.04925 6.13599L11.9993 11.086Z" 
        fill="currentColor"
      />
    </svg>
  </button>
)

const Snackbar: React.FC<SnackbarProps> = ({
  variant,
  title,
  message,
  onClose
}) => {
  return (
    <div className={`snackbar snackbar--${variant}`} role="alert" aria-live="polite">
      <div className="snackbar__content">
        <div className="snackbar__icon-text">
          <SnackbarIcon variant={variant} />
          <div className="snackbar__text">
            <div className="snackbar__title">{title}</div>
            <div className="snackbar__message">{message}</div>
          </div>
        </div>
        {onClose && <CloseIcon onClick={onClose} />}
      </div>
    </div>
  )
}

export default Snackbar
