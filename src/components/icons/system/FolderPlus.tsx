import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FolderPlus: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  className = '',
  fill = '#00112B'
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
      <g clipPath="url(#clip0_folder_plus)">
        <path
          d="M8.27616 3.33333H14.0002C14.177 3.33333 14.3465 3.40357 14.4716 3.5286C14.5966 3.65362 14.6668 3.82319 14.6668 4V13.3333C14.6668 13.5101 14.5966 13.6797 14.4716 13.8047C14.3465 13.9298 14.177 14 14.0002 14H2.00016C1.82335 14 1.65378 13.9298 1.52876 13.8047C1.40373 13.6797 1.3335 13.5101 1.3335 13.3333V2.66667C1.3335 2.48986 1.40373 2.32029 1.52876 2.19526C1.65378 2.07024 1.82335 2 2.00016 2H6.94283L8.27616 3.33333ZM2.66683 3.33333V12.6667H13.3335V4.66667H7.72416L6.39083 3.33333H2.66683ZM7.3335 8V6H8.66683V8H10.6668V9.33333H8.66683V11.3333H7.3335V9.33333H5.3335V8H7.3335Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_folder_plus">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default FolderPlus
