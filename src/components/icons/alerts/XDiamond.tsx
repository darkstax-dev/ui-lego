import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const XDiamond: React.FC<IconProps> = ({ 
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
        d="M7.30558 8.71973L4.02531 12L7.30553 15.2802L10.5858 12L7.30558 8.71973ZM8.71979 7.30552L12 10.5857L15.2802 7.30553L12 4.02531L8.71979 7.30552ZM12 13.4142L8.71975 16.6944L12 19.9747L15.2803 16.6944L12 13.4142ZM16.6945 15.2802L13.4142 12L16.6944 8.71975L19.9747 12L16.6945 15.2802ZM10.629 2.56789C11.3862 1.8107 12.6138 1.81071 13.371 2.56789L21.4321 10.629C22.1893 11.3862 22.1893 12.6138 21.4321 13.371L13.371 21.4321C12.6138 22.1893 11.3862 22.1893 10.629 21.4321L2.56789 13.371C1.8107 12.6138 1.81071 11.3862 2.56789 10.629L10.629 2.56789Z" 
        fill={fill}
      />
    </svg>
  )
}

export default XDiamond
