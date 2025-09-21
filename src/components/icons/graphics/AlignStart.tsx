import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const AlignStart: React.FC<IconProps> = ({ 
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
        d="M2 20V4H4V20H2ZM6 4H14C15.1046 4 16 4.89543 16 6V9C16 10.1046 15.1046 11 14 11H6V4ZM20 13H6V20H20C21.1046 20 22 19.1046 22 18V15C22 13.8954 21.1046 13 20 13ZM8 9V6H14V9H8Z" 
        fill={fill}
      />
    </svg>
  )
}

export default AlignStart
