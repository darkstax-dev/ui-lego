import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const CheckAllLg: React.FC<IconProps> = ({ 
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
        d="M16.2139 6.32832L5.60137 17.987L2.00366 14.3973L3.41884 12.9864L5.532 15.0949L14.7351 4.98877L16.2139 6.32832ZM9.51881 15.9066L10.8658 14.4274L11.5306 15.0933L20.5222 5.21501L22.0037 6.55642L11.5975 17.9888L9.51881 15.9066Z" 
        fill={fill}
      />
    </svg>
  )
}

export default CheckAllLg
