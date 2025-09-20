import React from 'react'
import './Activity.css'

interface ActivityProps {
  colour?: 'red' | 'blue'
  state?: 'default' | 'hover'
  showText?: boolean
  text?: string
  onClick?: () => void
}

const Activity: React.FC<ActivityProps> = ({
  colour = 'red',
  state = 'default',
  showText = true,
  text = 'text',
  onClick
}) => {
  const ServerIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="activity__icon"
    >
      <g clipPath="url(#clip0_server)">
        <path
          d="M4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V11H3V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM3 13H21V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V13ZM7 16V18H10V16H7ZM7 6V8H10V6H7Z"
          fill={colour === 'red' ? 'var(--color-red-600)' : 'var(--Text-Blue-text-Tetriary-text)'}
        />
      </g>
      <defs>
        <clipPath id="clip0_server">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const MoreIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none"
      className="activity__more-icon"
    >
      <g clipPath="url(#clip0_more)">
        <path 
          d="M7.99996 2C7.26663 2 6.66663 2.6 6.66663 3.33333C6.66663 4.06667 7.26663 4.66667 7.99996 4.66667C8.73329 4.66667 9.33329 4.06667 9.33329 3.33333C9.33329 2.6 8.73329 2 7.99996 2ZM7.99996 11.3333C7.26663 11.3333 6.66663 11.9333 6.66663 12.6667C6.66663 13.4 7.26663 14 7.99996 14C8.73329 14 9.33329 13.4 9.33329 12.6667C9.33329 11.9333 8.73329 11.3333 7.99996 11.3333ZM7.99996 6.66667C7.26663 6.66667 6.66663 7.26667 6.66663 8C6.66663 8.73333 7.26663 9.33333 7.99996 9.33333C8.73329 9.33333 9.33329 8.73333 9.33329 8C9.33329 7.26667 8.73329 6.66667 7.99996 6.66667Z" 
          fill="var(--color-gray-500)"
        />
      </g>
      <defs>
        <clipPath id="clip0_more">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <div 
      className={`activity activity--${colour} activity--${state}`}
      onClick={onClick}
    >
      <div className="activity__content">
        <ServerIcon />
        {state === 'hover' && <MoreIcon />}
        {showText && (
          <div className="activity__text">{text}</div>
        )}
      </div>
    </div>
  )
}

export default Activity
