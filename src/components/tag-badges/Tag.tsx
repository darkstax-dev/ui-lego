import React from 'react'
import './Tag.css'

export type TagScheme = 'brand' | 'danger' | 'positive' | 'warning' | 'neutral'
export type TagState = 'default' | 'hover'

export interface TagProps {
  children: React.ReactNode
  scheme?: TagScheme
  state?: TagState
  removable?: boolean
  onRemove?: () => void
  className?: string
}

const Tag: React.FC<TagProps> = ({
  children,
  scheme = 'brand',
  state = 'default',
  removable = true,
  onRemove,
  className = '',
  ...props
}) => {
  const tagClass = [
    'tag',
    `tag--${scheme}`,
    `tag--${state}`,
    className
  ].filter(Boolean).join(' ')

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  return (
    <div className={tagClass} {...props}>
      <span className="tag__label">{children}</span>
      {removable && (
        <button 
          className="tag__remove"
          onClick={handleRemove}
          aria-label="Remove tag"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_tag_close)">
              <path 
                d="M7.99999 7.05733L11.3 3.75733L12.2427 4.7L8.94266 8L12.2427 11.3L11.3 12.2427L7.99999 8.94266L4.69999 12.2427L3.75732 11.3L7.05732 8L3.75732 4.7L4.69999 3.75733L7.99999 7.05733Z" 
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_tag_close">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      )}
    </div>
  )
}

export default Tag
