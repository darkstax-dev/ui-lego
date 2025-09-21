import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const AlignMiddle: React.FC<IconProps> = ({ 
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
        d="M11 20V13H13V17H20V13H22V11H20V9C20 7.89543 19.1046 7 18 7H15C13.8954 7 13 7.89543 13 9V11H11V6C11 4.89543 10.1046 4 9 4H6C4.89543 4 4 4.89543 4 6V11H2V13H4V20H11ZM9 18H6V6H9V18ZM15 15H18V9H15V15Z" 
        fill={fill}
      />
    </svg>
  )
}

export default AlignMiddle
