import React from 'react'

interface IconProps { width?: number; height?: number; className?: string; fill?: string }

const TerminalLine: React.FC<IconProps> = ({ width = 24, height = 24, className = '', fill = 'var(--text-blue-main)' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_terminal_line)">
      <path d="M11 11.9999L3.92901 19.0709L2.51501 17.6569L8.17201 11.9999L2.51501 6.34293L3.92901 4.92993L11 11.9999ZM11 18.9999H21V20.9999H11V18.9999Z" fill={fill}/>
    </g>
    <defs>
      <clipPath id="clip0_terminal_line"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
)

export default TerminalLine
