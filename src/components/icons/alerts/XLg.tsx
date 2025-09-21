import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const XLg: React.FC<IconProps> = ({ 
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
        d="M10.5879 12L3.5 19.0879L4.91203 20.5L12 13.4121L19.088 20.5L20.5 19.0879L13.4121 12L20.5 4.91211L19.088 3.5L12 10.5879L4.91203 3.5L3.5 4.91211L10.5879 12Z" 
        fill={fill}
      />
    </svg>
  )
}

export default XLg
