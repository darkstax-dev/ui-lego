import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const X: React.FC<IconProps> = ({ 
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
        d="M10.5879 12L6.5 16.0879L7.91203 17.5L12 13.4121L16.088 17.5L17.5 16.0879L13.4121 12L17.5 7.91211L16.088 6.5L12 10.5879L7.91203 6.5L6.5 7.91211L10.5879 12Z" 
        fill={fill}
      />
    </svg>
  )
}

export default X
