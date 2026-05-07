import React from 'react'
import './Badge.css'

export type BadgeVariant =
  | 'active'
  | 'canceled'
  | 'pending'
  | 'to-do'
  | 'in-process'
  | 'review'
  | 'done'
  | 'agents-active'
  | 'user-action-required'
  | 'customer-action-required'
  | 'blocked'
  | 'waiting'
  | 'archived'
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'normal'

export type BadgePillVariant =
  | 'to-do'
  | 'in-process'
  | 'review'
  | 'done'
  | 'agents-active'
  | 'user-action-required'
  | 'customer-action-required'
  | 'blocked'
  | 'waiting'
  | 'archived'
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'normal'

export interface BadgeProps {
  variant: BadgeVariant
  children?: React.ReactNode
  className?: string
}

export interface BadgePillProps {
  variant: BadgePillVariant
  children?: React.ReactNode
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className = '',
  ...props
}) => {
  const badgeClass = [
    'badge',
    `badge--${variant}`,
    className
  ].filter(Boolean).join(' ')

  const getStatusText = () => {
    if (children) return children
    
    switch (variant) {
      case 'active':
        return 'Active'
      case 'canceled':
        return 'Canceled'
      case 'pending':
        return 'Pending'
      case 'to-do':
        return 'TO DO'
      case 'in-process':
        return 'IN PROCESS'
      case 'review':
        return 'REVIEW'
      case 'done':
        return 'DONE'
      case 'agents-active':
        return 'AGENTS ACTIVE'
      case 'user-action-required':
        return 'USER ACTION REQUIRED'
      case 'customer-action-required':
        return 'CUSTOMER ACTION REQUIRED'
      case 'blocked':
        return 'BLOCKED'
      case 'waiting':
        return 'WAITING'
      case 'archived':
        return 'ARCHIVED'
      case 'critical':
        return 'CRITICAL'
      case 'high':
        return 'HIGH'
      case 'medium':
        return 'MEDIUM'
      case 'low':
        return 'LOW'
      case 'normal':
        return 'NORMAL'
      default:
        return variant
    }
  }

  return (
    <div className={badgeClass} {...props}>
      <span className="badge__text">{getStatusText()}</span>
    </div>
  )
}

const PILL_LABELS: Record<BadgePillVariant, string> = {
  'to-do': 'TO DO',
  'in-process': 'IN PROCESS',
  'review': 'REVIEW',
  'done': 'DONE',
  'agents-active': 'AGENTS ACTIVE',
  'user-action-required': 'USER ACTION REQUIRED',
  'customer-action-required': 'CUSTOMER ACTION REQUIRED',
  'blocked': 'BLOCKED',
  'waiting': 'WAITING',
  'archived': 'ARCHIVED',
  'critical': 'CRITICAL',
  'high': 'HIGH',
  'medium': 'MEDIUM',
  'low': 'LOW',
  'normal': 'NORMAL',
}

export const BadgePill: React.FC<BadgePillProps> = ({
  variant,
  children,
  className = '',
}) => {
  const pillClass = [
    'badge-pill',
    `badge-pill--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={pillClass}>
      {children || PILL_LABELS[variant] || variant.toUpperCase()}
    </span>
  )
}

export default Badge
