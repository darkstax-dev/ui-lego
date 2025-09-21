import React from 'react'

interface IconProps { width?: number; height?: number; className?: string; fill?: string }

const BracketsLine: React.FC<IconProps> = ({ width = 24, height = 24, className = '', fill = 'var(--text-blue-main)' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_brackets_line)">
      <path d="M9 3V5H6V19H9V21H4V3H9ZM15 3H20V21H15V19H18V5H15V3Z" fill={fill}/>
    </g>
    <defs>
      <clipPath id="clip0_brackets_line"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
)

export default BracketsLine
