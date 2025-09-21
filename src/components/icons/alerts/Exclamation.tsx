import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Exclamation: React.FC<IconProps> = ({ 
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
        d="M12.7106 6C13.2965 6 13.757 6.50156 13.7069 7.0854L13.2 13H10.8005L10.2931 7.08548C10.243 6.50161 10.7034 6 11.2894 6H12.7106ZM12 14.4C11.0058 14.4 10.2 15.2059 10.2 16.2C10.2 17.1941 11.0058 18 12 18C12.9941 18 13.8 17.1941 13.8 16.2C13.8 15.2059 12.9941 14.4 12 14.4Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Exclamation
