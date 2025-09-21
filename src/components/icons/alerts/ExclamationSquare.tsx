import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ExclamationSquare: React.FC<IconProps> = ({ 
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
        d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM19 5H5V19H19V5ZM13.4549 7.54152C13.4792 7.25001 13.2491 7 12.9566 7H11.0434C10.7509 7 10.5209 7.25004 10.5452 7.54156L11.0004 13H13L13.4549 7.54152ZM12 14C11.1716 14 10.5 14.6716 10.5 15.5C10.5 16.3284 11.1716 17 12 17C12.8284 17 13.5 16.3284 13.5 15.5C13.5 14.6716 12.8284 14 12 14Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ExclamationSquare
