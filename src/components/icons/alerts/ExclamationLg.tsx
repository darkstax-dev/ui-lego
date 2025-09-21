import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ExclamationLg: React.FC<IconProps> = ({ 
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
        d="M14.4636 5.16309C14.5578 3.9981 13.6489 3 12.4937 3H11.447C10.2918 3 9.38278 3.99819 9.47706 5.16323L10.1922 14H13.7491L14.4636 5.16309ZM11.9703 16C10.6058 16 9.49965 17.1193 9.49965 18.5C9.49965 19.8807 10.6058 21 11.9703 21C13.3347 21 14.4409 19.8807 14.4409 18.5C14.4409 17.1193 13.3347 16 11.9703 16Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ExclamationLg
