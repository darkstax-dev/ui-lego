import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const CodeView: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'var(--text-blue-main)' 
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
      <g clipPath="url(#clip0_3_3197)">
        <path 
          d="M16.95 8.46405L18.364 7.05005L23.314 12L18.364 16.95L16.95 15.536L20.485 12L16.95 8.46405ZM7.05 8.46405L3.515 12L7.05 15.536L5.636 16.95L0.686005 12L5.636 7.05005L7.05 8.46405Z" 
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_3_3197">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default CodeView
