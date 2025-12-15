import React from 'react'
import './KubernetesIcon.css'

export type KubernetesVariant = 'green' | 'red'

export interface KubernetesIconProps {
  variant?: KubernetesVariant
  size?: number
  showIndicator?: boolean
  className?: string
}

export const KubernetesIcon: React.FC<KubernetesIconProps> = ({
  variant = 'green',
  size = 52,
  showIndicator = false,
  className = ''
}) => {
  const strokeColor = variant === 'green' ? '#23A45A' : '#FF3B31'
  const iconColor = variant === 'green' ? '#00112B' : '#FF3B31'
  
  return (
    <div 
      className={`kubernetes-icon kubernetes-icon--${variant} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        width="50" 
        height="56" 
        viewBox="0 0 50 56" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="kubernetes-icon__hexagon"
      >
        <path 
          d="M24.9355 1.0166C24.9744 0.994732 25.0256 0.994732 25.0645 1.0166L48.9541 14.4746C48.9904 14.495 49 14.5243 49 14.542V41.458C49 41.4757 48.9904 41.5049 48.9541 41.5254L25.0645 54.9834C25.0256 55.0053 24.9744 55.0053 24.9355 54.9834L1.0459 41.5254C1.00962 41.5049 1 41.4757 1 41.458V14.542C1 14.5243 1.00963 14.495 1.0459 14.4746L24.9355 1.0166Z" 
          fill="white" 
          fillOpacity="0.4" 
          stroke={strokeColor} 
          strokeWidth="2"
        />
      </svg>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="kubernetes-icon__server"
      >
        <g clipPath="url(#clip0_kubernetes)">
          <path 
            d="M5 11H19V5H5V11ZM21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4ZM19 13H5V19H19V13ZM7 15H10V17H7V15ZM7 7H10V9H7V7Z" 
            fill={iconColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_kubernetes">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
