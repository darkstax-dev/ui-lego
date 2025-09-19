import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const GlobalFill: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = '#03053D' 
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
      <g clipPath="url(#clip0_global_fill)">
        <path
          d="M2.05 13.0001H7.527C7.69812 16.167 8.70755 19.2315 10.452 21.8801C8.26693 21.5369 6.2572 20.4793 4.73702 18.8726C3.21684 17.2659 2.27192 15.2008 2.05 13.0001ZM2.05 11.0001C2.27192 8.79942 3.21684 6.73429 4.73702 5.12763C6.2572 3.52097 8.26693 2.46334 10.452 2.12012C8.70755 4.76873 7.69812 7.83326 7.527 11.0001H2.05ZM21.95 11.0001H16.473C16.3019 7.83326 15.2924 4.76873 13.548 2.12012C15.7331 2.46334 17.7428 3.52097 19.263 5.12763C20.7832 6.73429 21.7281 8.79942 21.95 11.0001ZM21.95 13.0001C21.7281 15.2008 20.7832 17.2659 19.263 18.8726C17.7428 20.4793 15.7331 21.5369 13.548 21.8801C15.2924 19.2315 16.3019 16.167 16.473 13.0001H21.951H21.95ZM9.53 13.0001H14.47C14.3054 15.6996 13.4553 18.3126 12 20.5921C10.5447 18.3126 9.69459 15.6996 9.53 13.0001ZM9.53 11.0001C9.69459 8.30063 10.5447 5.68768 12 3.40812C13.4553 5.68768 14.3054 8.30063 14.47 11.0001H9.53Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_global_fill">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default GlobalFill
