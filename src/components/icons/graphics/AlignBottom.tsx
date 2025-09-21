import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const AlignBottom: React.FC<IconProps> = ({ 
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
        d="M11 18V17V4C11 2.89543 10.1046 2 9 2H6C4.89543 2 4 2.89543 4 4V17V18H5H10H11ZM9 16H6V4H9V16ZM4 22H20V20H4V22ZM20 17V18H19H14H13V17V10C13 8.89543 13.8954 8 15 8H18C19.1046 8 20 8.89543 20 10V17ZM15 16H18V10H15V16Z" 
        fill={fill}
      />
    </svg>
  )
}

export default AlignBottom
