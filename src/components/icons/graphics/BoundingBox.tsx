import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const BoundingBox: React.FC<IconProps> = ({ 
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
        d="M2 2H3H7H8V3V4H16V3V2H17H21H22V3V7V8H21H20.0001V16H21H22V17V21V22H21H17H16V21V20H8V21V22H7H3H2V21V17V16H3H4.00001L4.00009 8H3H2V7V3V2ZM18.0001 8H17H16V7V6H8V7V8H7H6.00009L6.00001 16H7H8V17V18H16V17V16H17H18.0001V8ZM4 4V6H6V4H4ZM4 18V20H6V18H4ZM18 20V18H20V20H18ZM18 6V4H20V6H18Z" 
        fill={fill}
      />
    </svg>
  )
}

export default BoundingBox
