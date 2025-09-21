import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const GitCommitFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_git_commit_fill)">
        <path
          d="M15.874 12.9999C15.6516 13.8581 15.1504 14.6182 14.4493 15.1608C13.7481 15.7034 12.8866 15.9978 12 15.9978C11.1134 15.9978 10.2519 15.7034 9.55074 15.1608C8.84957 14.6182 8.34844 13.8581 8.126 12.9999H3V10.9999H8.126C8.34844 10.1417 8.84957 9.38158 9.55074 8.83897C10.2519 8.29636 11.1134 8.00195 12 8.00195C12.8866 8.00195 13.7481 8.29636 14.4493 8.83897C15.1504 9.38158 15.6516 10.1417 15.874 10.9999H21V12.9999H15.874Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_git_commit_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default GitCommitFill
