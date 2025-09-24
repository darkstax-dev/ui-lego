import React from 'react'

interface MoreOptionsIconProps {
  className?: string
}

const MoreOptionsIcon: React.FC<MoreOptionsIconProps> = ({ className = '' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_more_options)">
        <path
          d="M12.5 3C11.4 3 10.5 3.9 10.5 5C10.5 6.1 11.4 7 12.5 7C13.6 7 14.5 6.1 14.5 5C14.5 3.9 13.6 3 12.5 3ZM12.5 17C11.4 17 10.5 17.9 10.5 19C10.5 20.1 11.4 21 12.5 21C13.6 21 14.5 20.1 14.5 19C14.5 17.9 13.6 17 12.5 17ZM12.5 10C11.4 10 10.5 10.9 10.5 12C10.5 13.1 11.4 14 12.5 14C13.6 14 14.5 13.1 14.5 12C14.5 10.9 13.6 10 12.5 10Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_more_options">
          <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default MoreOptionsIcon
