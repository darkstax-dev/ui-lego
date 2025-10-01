import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Shape2Line: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_shape_2_line)">
        <path
          d="M15 12H16.5V16.5H12V15H6V16.5H1.5V12H3V6H1.5V1.5H6V3H12V1.5H16.5V6H15V12ZM13.5 12V6H12V4.5H6V6H4.5V12H6V13.5H12V12H13.5ZM3 3V4.5H4.5V3H3ZM3 13.5V15H4.5V13.5H3ZM13.5 3V4.5H15V3H13.5ZM13.5 13.5V15H15V13.5H13.5Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_shape_2_line">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default Shape2Line
