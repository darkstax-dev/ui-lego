import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const InboxUnarchiveFill: React.FC<IconProps> = ({ 
  width = 18, 
  height = 18, 
  className = '', 
  fill = 'currentColor' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_inbox_unarchive_fill)">
        <path
          d="M15 2.25L16.5 5.25V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V5.253L3 2.25H15ZM9 7.5L6 10.5H8.25V13.5H9.75V10.5H12L9 7.5ZM14.073 3.75H3.927L3.17775 5.25H14.823L14.073 3.75Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_inbox_unarchive_fill">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default InboxUnarchiveFill
