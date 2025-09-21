import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const SymmetryHorizontal: React.FC<IconProps> = ({ 
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
        d="M20.0001 11C20.4689 11 20.8748 10.6743 20.9764 10.2166C21.0779 9.75888 20.8478 9.29208 20.423 9.09382L4 2V11H20.0001ZM20.9764 13.7834C20.8748 13.3257 20.4689 13 20.0001 13H4V22L20.423 14.9062C20.8478 14.7079 21.0779 14.2411 20.9764 13.7834ZM6 18.8596V15H15.4925L6 18.8596Z" 
        fill={fill}
      />
    </svg>
  )
}

export default SymmetryHorizontal
