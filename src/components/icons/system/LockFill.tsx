import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const LockFill: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_lock_fill)">
        <path
          d="M19 10H20C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H5V9C5 8.08075 5.18906 7.17049 5.55211 6.32122C5.91516 5.47194 6.44825 4.70026 7.11612 4.05025C7.784 3.40024 8.57194 2.88386 9.43122 2.53211C10.2905 2.18036 11.2108 2 12 2C12.7892 2 13.7095 2.18036 14.5688 2.53211C15.4281 2.88386 16.216 3.40024 16.8839 4.05025C17.5518 4.70026 18.0848 5.47194 18.4479 6.32122C18.8109 7.17049 19 8.08075 19 9V10ZM17 10V9C17 7.67392 16.4732 6.40215 15.5355 5.46447C14.5979 4.52678 13.3261 4 12 4C10.6739 4 9.40215 4.52678 8.46447 5.46447C7.52678 6.40215 7 7.67392 7 9V10H17ZM11 14V18H13V14H11Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_lock_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default LockFill
