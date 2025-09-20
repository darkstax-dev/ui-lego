import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  stroke?: string
  strokeWidth?: number
}

const ChevronUp: React.FC<IconProps> = ({ 
  width = 20, 
  height = 20, 
  className = '', 
  stroke = '#1E1E1E',
  strokeWidth = 2
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M15 12.5L10 7.5L5 12.5" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronUp
