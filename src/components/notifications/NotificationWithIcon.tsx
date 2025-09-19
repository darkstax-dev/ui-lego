import React from 'react'
import FeaturedIcon, { FeaturedIconSize, FeaturedIconColor } from './FeaturedIcon'
import './NotificationWithIcon.css'

export type NotificationWithIconVariant = 'new' | 'hover' | 'read'

interface NotificationWithIconProps {
  title: string
  body: string
  date: string
  variant?: NotificationWithIconVariant
  iconSize?: FeaturedIconSize
  iconColor?: FeaturedIconColor
  onClick?: () => void
  className?: string
}

const NotificationWithIcon: React.FC<NotificationWithIconProps> = ({
  title,
  body,
  date,
  variant = 'new',
  iconSize = 'sm',
  iconColor = 'warning',
  onClick,
  className = ''
}) => {
  const classes = `notification-with-icon notification-with-icon--${variant} ${className}`.trim()

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className="notification-with-icon__content">
        <FeaturedIcon 
          size={iconSize} 
          color={iconColor}
          className="notification-with-icon__icon"
        />
        
        <div className="notification-with-icon__text-content">
          <div className="notification-with-icon__text-and-date">
            <div className="notification-with-icon__text">
              <h3 className="notification-with-icon__title">{title}</h3>
              <p className="notification-with-icon__body">{body}</p>
            </div>
            <div className="notification-with-icon__date">{date}</div>
          </div>
        </div>
      </div>
      
      {variant !== 'read' && (
        <div className="notification-with-icon__status-indicator">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5" fill="#78797A"/>
          </svg>
        </div>
      )}
    </div>
  )
}

export default NotificationWithIcon
