import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Stack: React.FC<IconProps> = ({ 
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
        d="M12 2L22 7L12 12L2 7L12 2ZM4.76369 15.6182L2 17L12 22L22 17L19.2363 15.6182L12 19.2363L4.76369 15.6182ZM2 12L4.76369 10.6182L12 14.2363L19.2363 10.6182L22 12L12 17L2 12Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Stack
