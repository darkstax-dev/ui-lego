import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const LockUnlockFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_lock_unlock_fill)">
        <path
          d="M7 10H20C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H5V9C4.99942 7.42269 5.52358 5.89144 6.51019 4.65443C7.49681 3.41741 8.88451 2.54717 10.3916 2.18476C11.8987 1.82234 13.4392 1.98899 15.7677 2.65770C16.3962 2.92641 17.9571 4.45799 18.262 5.86900L16.473 6.76300C15.9695 5.75501 15.1403 4.94664 14.1198 4.46894C13.0993 3.99125 11.9475 3.87222 10.8509 4.13117C9.75426 4.39012 8.77732 5.01186 8.07835 5.89560C7.37938 6.77934 6.99939 7.87325 7 9V10ZM10 15V17H14V15H10Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_lock_unlock_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default LockUnlockFill
