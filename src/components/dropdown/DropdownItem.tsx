import React, { forwardRef } from 'react'
import './DropdownItem.css'
import ImageIcon from '../icons/ImageIcon'
import { Slot, PolymorphicProps } from '../../utils/Slot'

export type DropdownItemVariant = 'default' | 'hover' | 'danger'
export type DropdownItemSize = 'small' | 'big'

type DropdownItemOwnProps = {
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
  asChild?: boolean
}

const DropdownItem = forwardRef<HTMLButtonElement, PolymorphicProps<'button', DropdownItemOwnProps>>(function DropdownItem({
  children,
  variant = 'default',
  size = 'big',
  leadingIcon,
  trailingIcon,
  showLeadingIcon = true,
  showTrailingIcon = true,
  onClick,
  disabled = false,
  className = '',
  asChild = false,
  ...props
}, ref) {
  const classNames = [
    'dropdown-item',
    `dropdown-item--${variant}`,
    `dropdown-item--${size}`,
    className
  ].filter(Boolean).join(' ')

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

  const Comp: any = asChild ? Slot : (props.as ?? 'button')

  return (
    <Comp
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      ref={ref}
      {...props}
    >
      {showLeadingIcon && (
        <div className="dropdown-item__icon dropdown-item__leading-icon" aria-hidden="true">
          {leadingIcon || defaultLeadingIcon}
        </div>
      )}

      <div className="dropdown-item__text">
        {children}
      </div>

      {showTrailingIcon && (
        <div className="dropdown-item__icon dropdown-item__trailing-icon" aria-hidden="true">
          {trailingIcon || defaultTrailingIcon}
        </div>
      )}
    </Comp>
  )
})

export default React.memo(DropdownItem)
