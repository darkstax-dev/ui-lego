import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ExclamationTriangleFill: React.FC<IconProps> = ({ 
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
        d="M10.3184 3.94188C11.0923 2.68604 12.9069 2.68604 13.6807 3.94188L13.6893 3.95571L21.7105 17.973C22.4979 19.277 21.5892 21 20.0195 21H3.97969C2.41 21 1.50131 19.277 2.28872 17.973L10.3099 3.95571L10.3184 3.94188ZM13.4495 9.5461C13.4766 9.253 13.2459 9 12.9516 9H11.0485C10.7541 9 10.5235 9.25303 10.5506 9.54614L11.0005 14.4H13L13.4495 9.5461ZM12 15.3C11.2544 15.3 10.65 15.9044 10.65 16.65C10.65 17.3956 11.2544 18 12 18C12.7456 18 13.35 17.3956 13.35 16.65C13.35 15.9044 12.7456 15.3 12 15.3Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ExclamationTriangleFill
