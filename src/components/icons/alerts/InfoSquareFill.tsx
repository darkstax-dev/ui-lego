import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const InfoSquareFill: React.FC<IconProps> = ({ 
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
        d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM11.1559 13H9.5L10 11H14L12.5 15H14L13.4484 16.1031C13.1736 16.6528 12.6118 17 11.9972 17C10.8644 17 10.0803 15.8685 10.478 14.8078L11.1559 13ZM12 7C11.1716 7 10.5 7.67157 10.5 8.5C10.5 9.32843 11.1716 10 12 10C12.8284 10 13.5 9.32843 13.5 8.5C13.5 7.67157 12.8284 7 12 7Z" 
        fill={fill}
      />
    </svg>
  )
}

export default InfoSquareFill
