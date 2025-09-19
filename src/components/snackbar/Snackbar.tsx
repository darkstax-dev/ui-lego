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
  
  return (
    <div className="snackbar__icon">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified diamond pattern based on the complex Figma design */}
        <g>
          {Array.from({ length: 8 }, (_, row) => 
            Array.from({ length: 8 }, (_, col) => {
              const x = col * 5
              const y = row * 5
              const isLarge = (row + col) % 3 === 0
              const size = isLarge ? '5' : '3'
              const offset = isLarge ? '0' : '1'
              
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x + parseInt(offset)}
                  y={y + parseInt(offset)}
                  width={size}
                  height={size}
                  fill={fillColor}
                  transform={`rotate(45 ${x + 2.5} ${y + 2.5})`}
                  opacity={Math.random() > 0.3 ? 1 : 0}
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
