import React from 'react'
import './SecondaryButton.css'

export type SecondaryButtonState = 'default' | 'hover' | 'disabled'

interface SecondaryButtonProps {
  children: React.ReactNode
  state?: SecondaryButtonState
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  state = 'default',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const actualState = disabled ? 'disabled' : state
  
  const buttonClass = [
    'secondary-button',
    `secondary-button--${actualState}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default SecondaryButton
