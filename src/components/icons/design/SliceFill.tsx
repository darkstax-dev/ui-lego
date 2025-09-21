import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const SliceFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_slice_fill)">
        <path
          d="M13.768 12.232L15.889 14.354C11.293 18.95 5.636 20.364 2.101 19.657L17.657 4.10001L19.778 6.22001L13.768 12.231V12.232Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_slice_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default SliceFill
