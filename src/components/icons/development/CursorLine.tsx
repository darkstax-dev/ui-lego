import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const CursorLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_cursor_line)">
        <path
          d="M15.388 13.4981L17.94 20.5121L13.242 22.2221L10.689 15.2081L6.79 17.6531L8.41 1.63306L19.947 12.8651L15.389 13.4981H15.388ZM15.377 19.3161L12.662 11.8561L15.622 11.4461L9.982 5.95606L9.192 13.7861L11.722 12.1991L14.437 19.6591L15.377 19.3161Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_cursor_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default CursorLine
