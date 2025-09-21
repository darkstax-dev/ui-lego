// This is a template for creating placeholder icons
// Replace ICON_NAME with the actual icon name
import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const PlaceholderIcon: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'var(--text-blue-main)' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_placeholder)">
        <path
          d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_placeholder">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default PlaceholderIcon
