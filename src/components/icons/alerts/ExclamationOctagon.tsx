import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ExclamationOctagon: React.FC<IconProps> = ({ 
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
        d="M9.03895 5L5 9.03895V14.961L9.03895 19H14.961L19 14.961V9.03895L14.961 5H9.03895ZM15.7895 3H8.21053L3 8.21053V15.7895L8.21053 21H15.7895L21 15.7895V8.21053L15.7895 3ZM13.4549 7.54152C13.4792 7.25001 13.2491 7 12.9566 7H11.0434C10.7509 7 10.5209 7.25004 10.5452 7.54156L11.0004 13H13L13.4549 7.54152ZM12 14C11.1716 14 10.5 14.6716 10.5 15.5C10.5 16.3284 11.1716 17 12 17C12.8284 17 13.5 16.3284 13.5 15.5C13.5 14.6716 12.8284 14 12 14Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ExclamationOctagon
