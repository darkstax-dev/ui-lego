import React, { forwardRef } from 'react'
import './MenuItem2.css'

export type MenuItem2Variant = 'default' | 'hover' | 'danger'
export type MenuItem2Size = 'small' | 'medium' | 'large'

interface MenuItem2Props {
  label: string
  variant?: MenuItem2Variant
  size?: MenuItem2Size
  iconLeading?: React.ReactNode
  iconTrailing?: React.ReactNode
  hasTrailingArrow?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  className?: string
  disabled?: boolean
}

const MenuItem2 = forwardRef<HTMLDivElement, MenuItem2Props>(function MenuItem2({
  label,
  variant = 'default',
  size = 'small',
  iconLeading,
  iconTrailing,
  hasTrailingArrow = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  disabled = false,
}, ref) {
  const menuItemClass = [
    'menu-item-2',
    `menu-item-2--${variant}`,
    `menu-item-2--${size}`,
    disabled && 'menu-item-2--disabled',
    className
  ].filter(Boolean).join(' ')

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  const arrowIcon = (
    <svg
      className="menu-item-2__arrow"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_menu_arrow)">
        <path
          d="M8.78145 8.00048L5.48145 4.70048L6.42411 3.75781L10.6668 8.00048L6.42411 12.2431L5.48145 11.3005L8.78145 8.00048Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_menu_arrow">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <div
      ref={ref}
      className={menuItemClass}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {iconLeading && (
        <div className="menu-item-2__icon-leading">
          {iconLeading}
        </div>
      )}
      <div className="menu-item-2__label">
        {label}
      </div>
      {(hasTrailingArrow || iconTrailing) && (
        <div className="menu-item-2__icon-trailing">
          {iconTrailing || arrowIcon}
        </div>
      )}
    </div>
  )
})

export default React.memo(MenuItem2)
