import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const TerminalFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_terminal_fill)">
        <path
          d="M11 11.9999L3.929 19.0709L2.515 17.6569L8.172 11.9999L2.515 6.34293L3.929 4.92993L11 11.9999ZM11 18.9999H21V20.9999H11V18.9999Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_terminal_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default TerminalFill
