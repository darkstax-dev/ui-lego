import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Html5Line: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_html5_line)">
        <path
          d="M12 18.178L7.38 16.922L7.052 13.378H9.322L9.48 15.222L12 15.889L14.52 15.222L14.78 12.356H6.96L6.325 5.678H17.675L17.448 7.888H8.822L9.026 10.144H17.243L16.619 16.922L12 18.178ZM3 2H21L19.377 20L12 22L4.623 20L3 2ZM5.188 4L6.49 18.434L12 19.928L17.51 18.434L18.812 4H5.188Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_html5_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default Html5Line
