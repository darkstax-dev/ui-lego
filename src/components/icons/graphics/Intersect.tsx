import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Intersect: React.FC<IconProps> = ({ 
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
        d="M4 2C2.89543 2 2 2.89543 2 4V15C2 16.1046 2.89543 17 4 17L7 17V20C7 21.1046 7.89543 22 9 22H20C21.1046 22 22 21.1046 22 20V9C22 7.89543 21.1046 7 20 7H17V4C17 2.89543 16.1046 2 15 2H4ZM9 20V17L17 17V9H20V20H9ZM15 7V4H4V15L7 15V7H15Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Intersect
