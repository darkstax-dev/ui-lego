import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Crop: React.FC<IconProps> = ({ 
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
        d="M7 17V2H5V5H2V7H5V17C5 18.1046 5.89543 19 7 19H17V22H19V19H22V17H7ZM17 5H9V7H17V15H19V7C19 5.89543 18.1046 5 17 5Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Crop
