import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Slash: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'currentColor' 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M6.5 16.0879L16.088 6.5L17.5 7.91211L7.91203 17.5L6.5 16.0879Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Slash
