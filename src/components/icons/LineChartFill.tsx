import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const LineChartFill: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = '#03053D' 
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
      <g clipPath="url(#clip0_line_chart_fill)">
        <path
          d="M5 3V19H21V21H3V3H5ZM19.94 5.94L22.06 8.06L16 14.122L13 11.122L9.06 15.062L6.94 12.94L13 6.88L16 9.88L19.94 5.94Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_line_chart_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default LineChartFill
