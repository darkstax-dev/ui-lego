import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Info: React.FC<IconProps> = ({ 
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
        d="M12 6C11.0059 6 10.2 6.80589 10.2 7.8C10.2 8.79411 11.0059 9.6 12 9.6C12.9941 9.6 13.8 8.79411 13.8 7.8C13.8 6.80589 12.9941 6 12 6ZM9 13.2H10.9871L10.1736 15.3694C9.69631 16.6423 10.6373 18 11.9967 18C12.7341 18 13.4083 17.5834 13.7381 16.9238L14.4 15.6H12.6L14.4 10.8H9.6L9 13.2Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Info
