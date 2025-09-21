import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const AlignCenter: React.FC<IconProps> = ({ 
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
        d="M13 4V2H11V4H9C7.89543 4 7 4.89543 7 6V11H11V13H6C4.89543 13 4 13.8954 4 15V20H11V22H13V20H20V15C20 13.8954 19.1046 13 18 13H13V11H17V6C17 4.89543 16.1046 4 15 4H13ZM6 15H18V18H6V15ZM15 6H9V9H15V6Z" 
        fill={fill}
      />
    </svg>
  )
}

export default AlignCenter
