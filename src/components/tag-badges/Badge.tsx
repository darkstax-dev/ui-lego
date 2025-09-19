import React from 'react'
import './Badge.css'

export type BadgeStatus = 'active' | 'canceled' | 'pending'

interface BadgeProps {
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

  return (
    <div className={badgeClass} {...props}>
      <div className="badge__flag"></div>
      <div className="badge__content">
        <span className="badge__text">{getStatusText()}</span>
      </div>
    </div>
  )
}

export default Badge
