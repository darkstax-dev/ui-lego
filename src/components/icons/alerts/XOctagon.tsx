import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const XOctagon: React.FC<IconProps> = ({ 
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
        d="M5 9.03895L9.03895 5H14.961L19 9.03895V14.961L14.961 19H9.03895L5 14.961V9.03895ZM8.21053 3H15.7895L21 8.21053V15.7895L15.7895 21H8.21053L3 15.7895V8.21053L8.21053 3ZM8 14.5901L10.5887 12L8 9.40988L9.41354 8L12 10.5879L14.5865 8L16 9.40988L13.4113 12L16 14.5901L14.5865 16L12 13.4121L9.41354 16L8 14.5901Z" 
        fill={fill}
      />
    </svg>
  )
}

export default XOctagon
