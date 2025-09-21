import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const SymmetryVertical: React.FC<IconProps> = ({ 
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
        d="M11 4.0001C11 3.53127 10.6743 3.12538 10.2166 3.02383C9.75888 2.92229 9.29208 3.15237 9.09382 3.57722L2 20.0002H11V4.0001ZM13.7834 3.02383C13.3257 3.12538 13 3.53127 13 4.0001V20.0002H22L14.9062 3.57722C14.7079 3.15237 14.2411 2.92229 13.7834 3.02383ZM18.8596 18.0002H15V8.50769L18.8596 18.0002Z" 
        fill={fill}
      />
    </svg>
  )
}

export default SymmetryVertical
