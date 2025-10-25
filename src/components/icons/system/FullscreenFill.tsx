import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FullscreenFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_fullscreen_fill)">
        <path
          d="M12 2.25H16.5V6.75H15V3.75H12V2.25ZM1.5 2.25H6V3.75H3V6.75H1.5V2.25ZM15 14.25V11.25H16.5V15.75H12V14.25H15ZM3 14.25H6V15.75H1.5V11.25H3V14.25Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_fullscreen_fill">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default FullscreenFill
