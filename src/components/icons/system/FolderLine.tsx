import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FolderLine: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'var(--text-blue-main)' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_folderline)">
        <path
          d="M2.66634 3.33333V12.6667H13.333V4.66667H7.72367L6.39034 3.33333H2.66634ZM8.27567 3.33333H13.9997C14.1765 3.33333 14.3461 3.40357 14.4711 3.5286C14.5961 3.65362 14.6663 3.82319 14.6663 4V13.3333C14.6663 13.5101 14.5961 13.6797 14.4711 13.8047C14.3461 13.9298 14.1765 14 13.9997 14H1.99967C1.82286 14 1.65329 13.9298 1.52827 13.8047C1.40325 13.6797 1.33301 13.5101 1.33301 13.3333V2.66667C1.33301 2.48986 1.40325 2.32029 1.52827 2.19526C1.65329 2.07024 1.82286 2 1.99967 2H6.94234L8.27567 3.33333Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_folderline">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default FolderLine
