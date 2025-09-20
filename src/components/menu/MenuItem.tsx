import React, { forwardRef } from 'react'
import './MenuItem.css'
import { Slot, PolymorphicProps } from '../../utils/Slot'

export type MenuItemState = 'default' | 'hover' | 'disabled'

type MenuItemOwnProps = {
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
  state?: MenuItemState
  hasDescription?: boolean
  hasIcon?: boolean
  hasShortcut?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
  asChild?: boolean
}

const MenuItem = forwardRef<HTMLDivElement, PolymorphicProps<'div', MenuItemOwnProps>>(function MenuItem({
  label,
  description,
  icon,
  shortcut,
  state = 'default',
  hasDescription = true,
  hasIcon = true,
  hasShortcut = true,
  onClick,
  disabled = false,
  className = '',
  asChild = false,
  ...props
}, ref) {
  const actualState = disabled ? 'disabled' : state

  const menuItemClass = [
    'menu-item',
    `menu-item--${actualState}`,
    className
  ].filter(Boolean).join(' ')

  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M9.99999 1.66669L12.575 6.88335L18.3333 7.72502L14.1667 11.7834L15.15 17.5167L9.99999 14.8084L4.84999 17.5167L5.83332 11.7834L1.66666 7.72502L7.42499 6.88335L9.99999 1.66669Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const Comp: any = asChild ? Slot : (props.as ?? 'div')

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <Comp
      className={menuItemClass}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={onKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      ref={ref}
      {...props}
    >
      {hasIcon && (
        <div className="menu-item__icon">
          {icon || defaultIcon}
        </div>
      )}
      <div className="menu-item__body">
        <div className="menu-item__row">
          <div className="menu-item__label">
            {label}
          </div>
          {hasShortcut && shortcut && (
            <div className="menu-item__shortcut">
              {shortcut}
            </div>
          )}
        </div>
        {hasDescription && description && (
          <div className="menu-item__description">
            {description}
          </div>
        )}
      </div>
    </Comp>
  )
})

export default MenuItem
