import React from 'react'
import './Badge.css'

export type BadgeStatus = 'active' | 'canceled' | 'pending'

export interface BadgeProps {
  status: BadgeStatus
  children?: React.ReactNode
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  status,
  children,
  className = '',
  ...props
}) => {
  const badgeClass = [
    'badge',
    `badge--${status}`,
    className
  ].filter(Boolean).join(' ')

  const getStatusText = () => {
    if (children) return children
    
    switch (status) {
      case 'active':
        return 'Active'
      case 'canceled':
        return 'Canceled'
      case 'pending':
        return 'Pending'
      default:
        return status
    }
  }

  const getBackgroundColor = () => {
    switch (status) {
      case 'active':
        return '#108541'
      case 'canceled':
        return '#0E0E0E'
      case 'pending':
        return '#ED8B30'
      default:
        return '#0E0E0E'
    }
  }

  return (
    <div className={badgeClass} {...props}>
      <svg className="badge__flag" width="9" height="20" viewBox="0 0 9 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0H0V11.6667L8.59091 20H9V0Z" fill={getBackgroundColor()} />
      </svg>
      <div className="badge__content">
        <span className="badge__text">{getStatusText()}</span>
      </div>
    </div>
  )
}

export default Badge
