import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Timer2Line: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_timer_2_line)">
        <path
          d="M9 1.5C13.14 1.5 16.5 4.86 16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9C1.5 4.86 4.86 1.5 9 1.5ZM9 15C12.315 15 15 12.315 15 9C15 5.685 12.315 3 9 3C5.685 3 3 5.685 3 9C3 12.315 5.685 15 9 15ZM11.652 5.2875L12.7125 6.348L9 10.0605L7.9395 9L11.652 5.2875Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_timer_2_line">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default Timer2Line
