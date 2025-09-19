import React from 'react'
import './LinkButton.css'

export type LinkButtonState = 'default' | 'hover' | 'disabled'

interface LinkButtonProps {
  children: React.ReactNode
  state?: LinkButtonState
  onClick?: () => void
  disabled?: boolean
  showIcon?: boolean
  icon?: React.ReactNode
  className?: string
  href?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  state = 'default',
  onClick,
  disabled = false,
  showIcon = true,
  icon,
  className = '',
  href,
  ...props
}) => {
  const actualState = disabled ? 'disabled' : state
  
  const linkClass = [
    'link-button',
    `link-button--${actualState}`,
    className
  ].filter(Boolean).join(' ')

  const defaultIcon = (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <g clipPath="url(#clip0_link_asterisk)">
        <path 
          d="M8.66667 2.5V7.34467L12.8627 4.92267L13.5293 6.07733L9.33401 8.49933L13.5293 10.9227L12.8627 12.0773L8.66667 9.65467V14.5H7.33334V9.65467L3.13734 12.0773L2.47067 10.9227L6.66601 8.5L2.47067 6.07733L3.13734 4.92267L7.33334 7.34467V2.5H8.66667Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_link_asterisk">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
      </defs>
    </svg>
  )

  const content = (
    <>
      <div className="link-button__content">
        <span className="link-button__text">{children}</span>
        {showIcon && (
          <div className="link-button__icon">
            {icon || defaultIcon}
          </div>
        )}
      </div>
      <div className="link-button__underline"></div>
    </>
  )

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={linkClass}
        onClick={onClick}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={linkClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  )
}

export default LinkButton
