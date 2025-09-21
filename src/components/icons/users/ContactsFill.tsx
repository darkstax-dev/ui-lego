import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ContactsFill: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'var(--Primary, #03053D)'
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
      <g clipPath="url(#clip0_3_8586)">
        <path 
          d="M2 22C2 19.8783 2.84285 17.8434 4.34315 16.3431C5.84344 14.8429 7.87827 14 10 14C12.1217 14 14.1566 14.8429 15.6569 16.3431C17.1571 17.8434 18 19.8783 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM20 17H24V19H20V17ZM17 12H24V14H17V12ZM19 7H24V9H19V7Z" 
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_3_8586">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ContactsFill
