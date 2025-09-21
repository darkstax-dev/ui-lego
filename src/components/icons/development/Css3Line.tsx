import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Css3Line: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_css3_line)">
        <path
          d="M2.8 14H4.84L4.295 16.725L10.039 18.879L17.266 16.469L18.36 11H3.4L3.8 9H18.76L19.56 5H4.6L5 3H22L19 18L10 21L2 18L2.8 14Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_css3_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default Css3Line
