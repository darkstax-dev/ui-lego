import React from 'react'
import './Tooltip.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  title: string
  body?: string
  hasBody?: boolean
  placement?: TooltipPlacement
  children?: React.ReactNode
  visible?: boolean
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  body = 'Body text',
  hasBody = true,
  placement = 'top',
  children,
  visible = true,
  className = ''
}) => {
  const tooltipClass = [
    'tooltip',
    `tooltip--${placement}`,
    visible ? 'tooltip--visible' : 'tooltip--hidden',
    className
  ].filter(Boolean).join(' ')

  const renderBeak = () => {
    const beakProps = {
      width: "12",
      height: "12", 
      viewBox: "0 0 12 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: `tooltip__beak tooltip__beak--${placement}`
    }

    switch (placement) {
      case 'top':
        return (
          <svg {...beakProps}>
            <path d="M6 0.0500031L11.6569 5.70686L6 11.3637L0.343146 5.70686L6 0.0500031Z" fill="#DFDFDF" />
          </svg>
        )
      case 'bottom':
        return (
          <svg {...beakProps}>
            <path d="M6 11.95L11.6569 6.29315L6 0.636292L0.343146 6.29315L6 11.95Z" fill="var(--tooltip-background)" />
          </svg>
        )
      case 'left':
        return (
          <svg {...beakProps}>
            <path d="M0.0500031 6L5.70686 11.6569L11.3637 6L5.70686 0.343146L0.0500031 6Z" fill="var(--tooltip-background)" />
          </svg>
        )
      case 'right':
        return (
          <svg {...beakProps}>
            <path d="M11.95 6L6.29314 11.6569L0.636289 6L6.29314 0.343146L11.95 6Z" fill="var(--tooltip-background)" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={tooltipClass}>
      {(placement === 'bottom' || placement === 'right') && (
        <div className="tooltip__beak-container">
          {renderBeak()}
        </div>
      )}
      
      <div className="tooltip__content">
        <div className="tooltip__title">{title}</div>
        {hasBody && body && (
          <div className="tooltip__body">{body}</div>
        )}
      </div>

      {(placement === 'top' || placement === 'left') && (
        <div className="tooltip__beak-container">
          {renderBeak()}
        </div>
      )}
    </div>
  )
}

export default Tooltip
