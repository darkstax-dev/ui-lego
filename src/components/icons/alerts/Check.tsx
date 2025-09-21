import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Check: React.FC<IconProps> = ({ 
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
        d="M18 9.41403L11.4197 16.001L7 11.5778L8.4132 10.1636L11.4195 13.1723L16.5867 8L18 9.41403Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Check
