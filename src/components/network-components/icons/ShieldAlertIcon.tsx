import React from 'react'
import './ShieldAlertIcon.css'

export interface ShieldAlertIconProps {
  size?: number
  className?: string
}

export const ShieldAlertIcon: React.FC<ShieldAlertIconProps> = ({
  size = 40,
  className = ''
}) => {
  return (
    <div 
      className={`shield-alert-icon ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M21 10.998C21 16.548 17.16 21.738 12 22.998C6.84 21.738 3 16.548 3 10.998V4.99805L12 0.998047L21 4.99805V10.998ZM12 20.998C15.75 19.998 19 15.538 19 11.218V6.29805L12 3.17805L5 6.29805V11.218C5 15.538 8.25 19.998 12 20.998ZM11 6.99805H13V12.998H11V6.99805ZM11 14.998H13V16.998H11V14.998Z" 
          fill="#0072FF"
        />
      </svg>
    </div>
  )
}
