import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const CodeSLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_code_s_line)">
        <path
          d="M24 12L18.343 17.657L16.929 16.243L21.172 12L16.929 7.75702L18.343 6.34302L24 12ZM2.828 12L7.071 16.243L5.657 17.657L0 12L5.657 6.34302L7.07 7.75702L2.828 12Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_code_s_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default CodeSLine
