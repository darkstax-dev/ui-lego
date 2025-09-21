import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ZoomOut: React.FC<IconProps> = ({ 
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
        d="M9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C12.5376 15 15 12.5376 15 9.5C15 6.46243 12.5376 4 9.5 4ZM2 9.5C2 5.35786 5.35786 2 9.5 2C13.6421 2 17 5.35786 17 9.5C17 11.2105 16.4274 12.7873 15.4633 14.0491L16.4142 15H18L22 19L21 21L19 22L15 18V16.4142L14.0491 15.4633C12.7873 16.4274 11.2105 17 9.5 17C5.35786 17 2 13.6421 2 9.5ZM6 10.5H13V8.5H6V10.5Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ZoomOut
