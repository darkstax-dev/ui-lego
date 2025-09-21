import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const NodeMinus: React.FC<IconProps> = ({ 
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
        d="M16 18C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6C13.027 6 10.559 8.16229 10.083 11H8V9H2V15H8V13H10.083C10.559 15.8377 13.027 18 16 18ZM13 11V13H19V11H13Z" 
        fill={fill}
      />
    </svg>
  )
}

export default NodeMinus
