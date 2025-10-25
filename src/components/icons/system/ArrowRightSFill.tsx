import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ArrowRightSFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_arrow_right_s_fill)">
        <path
          d="M12 9L7.5 13.5V4.5L12 9Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_arrow_right_s_fill">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ArrowRightSFill
