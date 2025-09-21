import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Sliders: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'currentColor'
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
        d="M9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6ZM2 9H5.12602C5.57006 10.7252 7.13616 12 9 12C10.8638 12 12.4299 10.7252 12.874 9H22V7H12.874C12.4299 5.27477 10.8638 4 9 4C7.13616 4 5.57006 5.27477 5.12602 7H2V9ZM2 17V15H11.126C11.5701 13.2748 13.1362 12 15 12C16.8638 12 18.4299 13.2748 18.874 15H22V17H18.874C18.4299 18.7252 16.8638 20 15 20C13.1362 20 11.5701 18.7252 11.126 17H2ZM13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Sliders
