import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Subtract: React.FC<IconProps> = ({ 
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
        d="M4 2C2.89543 2 2 2.89543 2 4V15C2 16.1046 2.89543 17 4 17H8V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8H17V4C17 2.89543 16.1046 2 15 2H4ZM4 4L15 4V15H4V4Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Subtract
