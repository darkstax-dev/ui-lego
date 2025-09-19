import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypeZip: React.FC<IconProps> = ({ 
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4C4 2.89543 4.89543 2 6 2H15.5L20 6.5V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM14.6716 4H14V8H18V7.32843L14.6716 4ZM10 4H12V6H10V7H12V10H10V11H12V14H10V15H12V17H8V15V13H10V12H8V9H10V8H8V5H10V4Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypeZip
