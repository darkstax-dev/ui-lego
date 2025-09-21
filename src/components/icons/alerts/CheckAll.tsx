import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const CheckAll: React.FC<IconProps> = ({ 
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
        d="M8.41968 16.001L15 9.41403L13.5867 8L8.41952 13.1723L5.4132 10.1636L4 11.5778L8.41968 16.001ZM13.4142 16.0009L19.9967 9.41855L18.5825 8.00433L12 14.5867L13.4142 16.0009Z" 
        fill={fill}
      />
    </svg>
  )
}

export default CheckAll
