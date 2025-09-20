import React, { forwardRef } from 'react'
import './Button.css'
import { Slot, PolymorphicProps } from '../../utils/Slot'

export type ButtonVariant = 'primary' | 'secondary' | 'white'
export type ButtonSizeLegacy = 'small' | 'big'
export type ButtonSize = 'sm' | 'md' | 'lg' | ButtonSizeLegacy
export type ButtonState = 'default' | 'hover' | 'disabled'

type OwnProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
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
      {(variant === 'primary' || variant === 'white') && (
        <div className="button__icon" aria-hidden="true">
          {icon || defaultIcon}
        </div>
      )}
    </Comp>
  )
})

export default Button
