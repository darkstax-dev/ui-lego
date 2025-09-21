import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const EditFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_edit_fill)">
        <path
          d="M7.243 18H3V13.757L14.435 2.32202C14.6225 2.13455 14.8768 2.02924 15.142 2.02924C15.4072 2.02924 15.6615 2.13455 15.849 2.32202L18.678 5.15102C18.8655 5.33855 18.9708 5.59286 18.9708 5.85802C18.9708 6.12319 18.8655 6.37749 18.678 6.56502L7.243 18ZM3 20H21V22H3V20Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_edit_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default EditFill
