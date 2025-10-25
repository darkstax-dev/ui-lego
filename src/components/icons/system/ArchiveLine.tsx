import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ArchiveLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_archive_line)">
        <path
          d="M2.25 7.5H1.5V3.00225C1.5 2.58675 1.84125 2.25 2.244 2.25H15.756C15.8545 2.24979 15.952 2.26917 16.0429 2.307C16.1338 2.34484 16.2162 2.40037 16.2855 2.47038C16.3547 2.54038 16.4093 2.62345 16.4462 2.71477C16.483 2.80608 16.5013 2.9038 16.5 3.00225V7.5H15.75V15.0008C15.7503 15.0988 15.7313 15.196 15.694 15.2868C15.6567 15.3775 15.602 15.46 15.5328 15.5296C15.4636 15.5992 15.3815 15.6545 15.2909 15.6923C15.2004 15.7301 15.1033 15.7497 15.0052 15.75H2.99475C2.89665 15.7497 2.79957 15.7301 2.70906 15.6923C2.61854 15.6545 2.53636 15.5992 2.4672 15.5296C2.39804 15.46 2.34327 15.3775 2.306 15.2868C2.26873 15.196 2.2497 15.0988 2.25 15.0008V7.5ZM14.25 7.5H3.75V14.25H14.25V7.5ZM3 3.75V6H15V3.75H3ZM6.75 9H11.25V10.5H6.75V9Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_archive_line">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ArchiveLine
