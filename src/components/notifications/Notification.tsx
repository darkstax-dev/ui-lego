import React from 'react'
import './Notification.css'

export type NotificationVariant = 'new' | 'hover' | 'read'

interface NotificationProps {
  title: string
  body: string
  date: string
  avatar: string
  variant?: NotificationVariant
  hasNotificationDot?: boolean
  onClick?: () => void
  className?: string
}

const Notification: React.FC<NotificationProps> = ({
  title,
  body,
  date,
  avatar,
  variant = 'new',
  hasNotificationDot = true,
  onClick,
  className = ''
}) => {
  const classes = `notification notification--${variant} ${className}`.trim()

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className="notification__content">
        <div className="notification__avatar-container">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="notification__avatar"
          />
          {hasNotificationDot && (
            <div className="notification__avatar-indicator">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="4" fill="#FF3B31"/>
              </svg>
            </div>
          )}
        </div>
        
        <div className="notification__text-content">
          <div className="notification__text-and-date">
            <div className="notification__text">
              <h3 className="notification__title">{title}</h3>
              <p className="notification__body">{body}</p>
            </div>
            <div className="notification__date">{date}</div>
          </div>
        </div>
      </div>
      
      <div className="notification__status-indicator">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="5" fill="#78797A"/>
        </svg>
      </div>
    </div>
  )
}

export default Notification
