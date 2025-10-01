import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ShieldLine: React.FC<IconProps> = ({ 
  width = 18, 
  height = 18, 
  className = '', 
  fill = 'currentColor' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_shield_line)">
        <path
          d="M2.83725 2.1195L9 0.75L15.1627 2.1195C15.3293 2.15652 15.4782 2.24922 15.585 2.3823C15.6918 2.51538 15.75 2.68089 15.75 2.8515V10.3417C15.7499 11.0826 15.567 11.8119 15.2174 12.465C14.8678 13.1181 14.3624 13.6749 13.746 14.0858L9 17.25L4.254 14.0858C3.63771 13.6749 3.13235 13.1183 2.78276 12.4653C2.43318 11.8124 2.25018 11.0832 2.25 10.3425V2.8515C2.25003 2.68089 2.30823 2.51538 2.41499 2.3823C2.52176 2.24922 2.6707 2.15652 2.83725 2.1195ZM3.75 3.453V10.3417C3.75001 10.8356 3.87193 11.3218 4.10495 11.7572C4.33796 12.1926 4.67486 12.5638 5.08575 12.8378L9 15.4478L12.9142 12.8378C13.325 12.5639 13.6619 12.1928 13.8949 11.7575C14.1279 11.3223 14.2499 10.8362 14.25 10.3425V3.453L9 2.2875L3.75 3.453Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_shield_line">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ShieldLine
