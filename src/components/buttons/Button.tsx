import React from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'white'
export type ButtonSize = 'small' | 'big'
export type ButtonState = 'default' | 'hover' | 'disabled'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'big',
  state = 'default',
  onClick,
  disabled = false,
  icon,
  className = '',
  type = 'button',
  ...props
}) => {
  const actualState = disabled ? 'disabled' : state
  
  const buttonClass = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    `button--${actualState}`,
    className
  ].filter(Boolean).join(' ')

  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      <div className="button__content">
        {children}
      </div>
      {(variant === 'primary' || variant === 'white') && (
        <div className="button__icon">
          {icon || defaultIcon}
        </div>
      )}
    </button>
  )
}

export default Button
