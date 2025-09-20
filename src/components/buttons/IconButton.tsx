import React, { forwardRef } from 'react'
import './IconButton.css'
import { Slot, PolymorphicProps } from '../../utils/Slot'

export type IconButtonVariant = 'main' | 'secondary'
export type IconButtonSize = 'small' | 'medium' | 'big'
export type IconButtonState = 'default' | 'hover' | 'selected' | 'danger' | 'disabled'
export type IconButtonColor = 'default' | 'gray' | 'white'

type OwnProps = {
  variant?: IconButtonVariant
  size?: IconButtonSize
  state?: IconButtonState
  color?: IconButtonColor
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
  'aria-label'?: string
  asChild?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, PolymorphicProps<'button', OwnProps>>(function IconButton({
  variant = 'main',
  size = 'medium',
  state = 'default',
  color = 'default',
  disabled = false,
  icon,
  className = '',
  'aria-label': ariaLabel,
  asChild = false,
  ...props
}, ref) {
  const actualState = disabled ? 'disabled' : state

  const buttonClass = [
    'icon-button',
    `icon-button--${variant}`,
    `icon-button--${size}`,
    `icon-button--${actualState}`,
    variant === 'secondary' ? `icon-button--${color}` : '',
    className
  ].filter(Boolean).join(' ')

  const defaultIcon = (
    <svg width={size === 'small' ? '16' : '20'} height={size === 'small' ? '16' : '20'} viewBox={size === 'small' ? '0 0 16 16' : '0 0 20 20'} fill="none" aria-hidden="true" focusable="false">
      <g clipPath={`url(#clip0_add_${size})`}>
        <path
          d={size === 'small'
            ? "M7.33337 7.33333V3.33333H8.66671V7.33333H12.6667V8.66666H8.66671V12.6667H7.33337V8.66666H3.33337V7.33333H7.33337Z"
            : "M9.16663 9.16667V4.16667H10.8333V9.16667H15.8333V10.8333H10.8333V15.8333H9.16663V10.8333H4.16663V9.16667H9.16663Z"
          }
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`clip0_add_${size}`}>
          <rect width={size === 'small' ? '16' : '20'} height={size === 'small' ? '16' : '20'} fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const Comp: any = asChild ? Slot : (props.as ?? 'button')

  return (
    <Comp
      className={buttonClass}
      disabled={disabled}
      aria-label={ariaLabel}
      ref={ref}
      {...props}
    >
      {icon || defaultIcon}
    </Comp>
  )
})

export default React.memo(IconButton)
