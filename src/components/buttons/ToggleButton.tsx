import React from 'react'
import './ToggleButton.css'

export type ToggleButtonMode = 'table' | 'input'

interface ToggleButtonProps {
  mode?: ToggleButtonMode
  onToggle?: (mode: ToggleButtonMode) => void
  className?: string
  disabled?: boolean
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  mode = 'table',
  onToggle,
  className = '',
  disabled = false,
  ...props
}) => {
  const handleToggle = () => {
    if (!disabled && onToggle) {
      onToggle(mode === 'table' ? 'input' : 'table')
    }
  }

  const containerClass = [
    'toggle-button',
    className
  ].filter(Boolean).join(' ')

  const tableIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_table)">
        <path 
          d="M10.8333 8.33333V11.6667H15.8333V8.33333H10.8333ZM9.16667 8.33333H4.16667V11.6667H9.16667V8.33333ZM10.8333 15.8333H15.8333V13.3333H10.8333V15.8333ZM9.16667 15.8333V13.3333H4.16667V15.8333H9.16667ZM10.8333 4.16667V6.66667H15.8333V4.16667H10.8333ZM9.16667 4.16667H4.16667V6.66667H9.16667V4.16667ZM3.33333 2.5H16.6667C16.8877 2.5 17.0996 2.5878 17.2559 2.74408C17.4122 2.90036 17.5 3.11232 17.5 3.33333V16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V3.33333C2.5 3.11232 2.5878 2.90036 2.74408 2.74408C2.90036 2.5878 3.11232 2.5 3.33333 2.5Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_table">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const inputIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_input)">
        <path 
          d="M6.66671 17.5V15.8333H9.16671V4.16667H6.66671V2.5H13.3334V4.16667H10.8334V15.8333H13.3334V17.5H6.66671ZM15.0417 5.875L19.1667 10L15.0417 14.125L13.8634 12.9467L16.81 10L13.8634 7.05333L15.0417 5.875ZM4.95837 5.875L6.13671 7.05333L3.19004 10L6.13671 12.9467L4.95837 14.125L0.833374 10L4.95837 5.875Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_input">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <div className={containerClass} {...props}>
      <div className={`toggle-button__icon ${mode === 'table' ? 'toggle-button__icon--active' : ''}`}>
        {tableIcon}
      </div>
      
      <button 
        className="toggle-button__switch"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={`Switch to ${mode === 'table' ? 'input' : 'table'} mode`}
      >
        <div className={`toggle-button__track ${mode === 'input' ? 'toggle-button__track--right' : ''}`}>
          <div className="toggle-button__thumb"></div>
        </div>
      </button>
      
      <div className={`toggle-button__icon ${mode === 'input' ? 'toggle-button__icon--active' : ''}`}>
        {inputIcon}
      </div>
    </div>
  )
}

export default ToggleButton
