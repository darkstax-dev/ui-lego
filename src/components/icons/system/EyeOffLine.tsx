import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const EyeOffLine: React.FC<IconProps> = ({ 
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
      <g clipPath="url(#clip0_eye_off_line)">
        <path
          d="M17.882 19.2971C16.1232 20.4126 14.0827 21.0034 12 21.0001C6.608 21.0001 2.122 17.1201 1.181 12.0001C1.61103 9.67078 2.78263 7.54296 4.521 5.93407L1.392 2.80807L2.807 1.39307L22.606 21.1931L21.191 22.6071L17.881 19.2971H17.882ZM5.935 7.35007C4.576 8.58566 3.62932 10.2088 3.223 12.0001C3.53529 13.3665 4.16226 14.6412 5.054 15.7227C5.94574 16.8041 7.07763 17.6625 8.35955 18.2294C9.64148 18.7963 11.038 19.0561 12.4381 18.9882C13.8381 18.9203 15.203 18.5264 16.424 17.8381L14.396 15.8101C13.5327 16.3539 12.5102 16.5882 11.4962 16.4745C10.4823 16.3608 9.53704 15.906 8.81557 15.1845C8.0941 14.463 7.63923 13.5178 7.52556 12.5038C7.4119 11.4899 7.64618 10.4674 8.19 9.60407L5.935 7.35007Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_eye_off_line">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default EyeOffLine
