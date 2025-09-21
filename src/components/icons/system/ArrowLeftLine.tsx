import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ArrowLeftLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_arrow_left_line)">
        <path
          d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_arrow_left_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ArrowLeftLine
