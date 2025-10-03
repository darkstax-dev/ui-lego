import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ArrowUpSLine: React.FC<IconProps> = ({ 
  width = 20, 
  height = 20, 
  className = '', 
  fill = '#78797A' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_arrow_up_s_line)">
        <path
          d="M10.0001 9.02366L5.87511 13.1487L4.69678 11.9703L10.0001 6.66699L15.3034 11.9703L14.1251 13.1487L10.0001 9.02366Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_arrow_up_s_line">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ArrowUpSLine
