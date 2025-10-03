import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ArrowDownSLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_arrow_down_s_line)">
        <path
          d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_arrow_down_s_line">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ArrowDownSLine
