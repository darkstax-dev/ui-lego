import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesService: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = '#072B56' 
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
        d="M9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.30622 14.1652 7.41746 13 7.82929V11H20V16.1707C21.1652 16.5825 22 17.6938 22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.6938 16.8348 16.5825 18 16.1707V13H13V16.1707C14.1652 16.5825 15 17.6938 15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.6938 9.83481 16.5825 11 16.1707V13H6V16.1707C7.16519 16.5825 8 17.6938 8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.6938 2.83481 16.5825 4 16.1707V11H11V7.82929C9.83481 7.41746 9 6.30622 9 5Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesService
