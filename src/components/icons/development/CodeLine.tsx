import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const CodeLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_code_line)">
        <path
          d="M23 12L15.929 19.071L14.515 17.657L20.172 12L14.515 6.34296L15.929 4.92896L23 12ZM3.828 12L9.485 17.657L8.071 19.071L1 12L8.071 4.92896L9.485 6.34296L3.828 12Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_code_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default CodeLine
