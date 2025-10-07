import React, { forwardRef } from 'react'
import './Button.css'
import { Slot, PolymorphicProps } from '../../utils/Slot'

export type ButtonVariant = 'primary' | 'primary-simple' | 'secondary' | 'white'
export type ButtonSizeLegacy = 'small' | 'big'
export type ButtonSize = 'sm' | 'md' | 'lg' | ButtonSizeLegacy
export type ButtonState = 'default' | 'hover' | 'disabled'

/**
 * Props for the Button component
 */
type OwnProps = {
  /** The content to display inside the button */
  children: React.ReactNode
  /** The visual style variant of the button */
  variant?: ButtonVariant
  /** The size of the button */
  size?: ButtonSize
  /** The interaction state of the button */
  state?: ButtonState
  /** Whether the button is disabled */
  disabled?: boolean
  /** Optional icon to display in the button */
  icon?: React.ReactNode
  /** Hide the icon area entirely (no default icon, no separator) */
  hideIcon?: boolean
  /** Additional CSS classes */
  className?: string
  /** The button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Whether to render as a child component using Slot pattern */
  asChild?: boolean
}

function mapSizeToClass(size: ButtonSize): 'small' | 'big' {
  if (size === 'small' || size === 'sm') return 'small'
  return 'big'
}

const Button = forwardRef<HTMLButtonElement, PolymorphicProps<'button', OwnProps>>(function Button(
  {
    children,
    variant = 'primary',
    size = 'big',
    state = 'default',
    disabled = false,
    icon,
    hideIcon = false,
    className = '',
    type = 'button',
    asChild = false,
    ...props
  },
  ref
) {
  const actualState = disabled ? 'disabled' : state
  const sizeClass = mapSizeToClass(size)

  const buttonClass = [
    'button',
    `button--${variant}`,
    `button--${sizeClass}`,
    `button--${actualState}`,
    hideIcon ? 'button--noicon' : '',
    className
  ].filter(Boolean).join(' ')

  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <g clipPath="url(#clip0_button_add)">
        <path
          d="M9.16669 9.16667V4.16667H10.8334V9.16667H15.8334V10.8333H10.8334V15.8333H9.16669V10.8333H4.16669V9.16667H9.16669Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_button_add">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const Comp: any = asChild ? Slot : (props.as ?? 'button')

  return (
    <Comp
      className={buttonClass}
      disabled={disabled}
      type={type}
      ref={ref}
      {...props}
    >
      <div className="button__content">
        {children}
      </div>
      {(variant === 'primary' || variant === 'white') && !hideIcon && (
        <div className="button__icon" aria-hidden="true">
          {icon || defaultIcon}
        </div>
      )}
    </Comp>
  )
})

export default React.memo(Button)
