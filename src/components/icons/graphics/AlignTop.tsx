import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const AlignTop: React.FC<IconProps> = ({ 
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
        d="M4 4H20V2H4V4ZM9 22C10.1046 22 11 21.1046 11 20V7V6H10H5H4V7V20C4 21.1046 4.89543 22 6 22H9ZM9 8V20H6V8H9ZM20 14C20 15.1046 19.1046 16 18 16H15C13.8954 16 13 15.1046 13 14V7V6H14H19H20V7V14ZM18 14V8H15V14H18Z" 
        fill={fill}
      />
    </svg>
  )
}

export default AlignTop
