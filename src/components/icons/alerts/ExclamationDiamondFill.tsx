import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ExclamationDiamondFill: React.FC<IconProps> = ({ 
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
        d="M10.629 2.56789C11.3862 1.8107 12.6138 1.81071 13.371 2.56789L21.4321 10.629C22.1893 11.3862 22.1893 12.6138 21.4321 13.371L13.371 21.4321C12.6138 22.1893 11.3862 22.1893 10.629 21.4321L2.56789 13.371C1.8107 12.6138 1.81071 11.3862 2.56789 10.629L10.629 2.56789ZM13.4549 7.54152C13.4792 7.25001 13.2491 7 12.9566 7H11.0434C10.7509 7 10.5208 7.25004 10.5452 7.54156L11.0004 13H13L13.4549 7.54152ZM12 14C11.1716 14 10.5 14.6716 10.5 15.5C10.5 16.3284 11.1716 17 12 17C12.8284 17 13.5 16.3284 13.5 15.5C13.5 14.6716 12.8284 14 12 14Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ExclamationDiamondFill
