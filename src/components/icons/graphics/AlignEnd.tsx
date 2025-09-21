import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const AlignEnd: React.FC<IconProps> = ({ 
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
        d="M22 20V4H20V20H22ZM18 13H17H4C2.89543 13 2 13.8954 2 15V18C2 19.1046 2.89543 20 4 20H17H18V19V14V13ZM16 15V18H4V15H16ZM17 4H18V5V10V11H17H10C8.89543 11 8 10.1046 8 9V6C8 4.89543 8.89543 4 10 4H17ZM16 9V6H10V9H16Z" 
        fill={fill}
      />
    </svg>
  )
}

export default AlignEnd
