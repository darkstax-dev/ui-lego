import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const EditLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_edit_line)">
        <path
          d="M4.8105 12L12.417 4.3935L11.3565 3.333L3.75 10.9395V12H4.8105ZM5.43225 13.5H2.25V10.3178L10.8263 1.7415C10.9669 1.6009 11.1576 1.52191 11.3565 1.52191C11.5554 1.52191 11.7461 1.6009 11.8868 1.7415L14.0085 3.86325C14.1491 4.0039 14.2281 4.19463 14.2281 4.3935C14.2281 4.59237 14.1491 4.78311 14.0085 4.92375L5.43225 13.5ZM2.25 15H15.75V16.5H2.25V15Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_edit_line">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default EditLine
