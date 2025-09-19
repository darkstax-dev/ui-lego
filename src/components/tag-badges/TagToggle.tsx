import React from 'react'
import './TagToggle.css'

export type TagToggleState = 'on' | 'off'

interface TagToggleProps {
  children: React.ReactNode
  state?: TagToggleState
  showIcon?: boolean
  onClick?: () => void
  className?: string
}

const TagToggle: React.FC<TagToggleProps> = ({
  children,
  state = 'off',
  showIcon = true,
  onClick,
  className = '',
  ...props
}) => {
  const toggleClass = [
    'tag-toggle',
    `tag-toggle--${state}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={toggleClass}
      onClick={onClick}
      type="button"
      {...props}
    >
      {showIcon && state === 'on' && (
        <svg 
          className="tag-toggle__icon"
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <g clipPath="url(#clip0_tag_toggle_close)">
            <path 
              d="M7.99999 7.05733L11.3 3.75733L12.2427 4.7L8.94266 8L12.2427 11.3L11.3 12.2427L7.99999 8.94266L4.69999 12.2427L3.75732 11.3L7.05732 8L3.75732 4.7L4.69999 3.75733L7.99999 7.05733Z" 
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_tag_toggle_close">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )}
      <span className="tag-toggle__label">{children}</span>
    </button>
  )
}

export default TagToggle
