import React from 'react'
import './DropdownItem.css'
import ImageIcon from '../icons/ImageIcon'

export type DropdownItemVariant = 'default' | 'hover' | 'danger'
export type DropdownItemSize = 'small' | 'big'

interface DropdownItemProps {
  children: React.ReactNode
  variant?: DropdownItemVariant
  size?: DropdownItemSize
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  variant = 'default',
  size = 'big',
  leadingIcon,
  trailingIcon,
  showLeadingIcon = true,
  showTrailingIcon = true,
  onClick,
  disabled = false,
  className = ''
}) => {
  const classNames = [
    'dropdown-item',
    `dropdown-item--${variant}`,
    `dropdown-item--${size}`,
    className
  ].filter(Boolean).join(' ')

  // Default icons based on Figma design
  const defaultLeadingIcon = <ImageIcon width={16} height={16} />
  const defaultTrailingIcon = <ImageIcon width={16} height={16} />

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      if (onClick) {
        onClick()
      }
    }
  }

  return (
    <button
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
    >
      {showLeadingIcon && (
        <div className="dropdown-item__icon dropdown-item__leading-icon">
          {leadingIcon || defaultLeadingIcon}
        </div>
      )}
      
      <div className="dropdown-item__text">
        {children}
      </div>
      
      {showTrailingIcon && (
        <div className="dropdown-item__icon dropdown-item__trailing-icon">
          {trailingIcon || defaultTrailingIcon}
        </div>
      )}
    </button>
  )
}

export default DropdownItem
