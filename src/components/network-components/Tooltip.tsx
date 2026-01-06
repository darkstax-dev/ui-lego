import React from 'react'
import './Tooltip.css'

export interface TooltipProps {
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  placement = 'top',
  className = ''
}) => {
  return (
    <div className={`tooltip tooltip--${placement} ${className}`}>
      <div className="tooltip__content">
        {children}
      </div>
      {placement === 'top' && (
        <div className="tooltip__arrow tooltip__arrow--bottom">
          <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 7L0.937822 0.25L13.0622 0.250001L7 7Z" fill="var(--Tooltip, #DFDFDF)"/>
          </svg>
        </div>
      )}
      {placement === 'bottom' && (
        <div className="tooltip__arrow tooltip__arrow--top">
          <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L13.0622 6.75L0.937822 6.75L7 0Z" fill="var(--Tooltip, #DFDFDF)"/>
          </svg>
        </div>
      )}
    </div>
  )
}

export default Tooltip
