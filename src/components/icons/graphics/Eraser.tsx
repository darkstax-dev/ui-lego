import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Eraser: React.FC<IconProps> = ({ 
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
        d="M7.37983 18L4.15649 14.4836C3.93942 14.2468 3.94737 13.8811 4.17452 13.6539L8.70713 9.12132L13.8787 14.2929L10.1716 18H7.37983ZM6.50002 20L2.68218 15.8351C1.74156 14.809 1.776 13.224 2.7603 12.2397L13 2L21 10L13 18H21V20H6.50002ZM15.2929 12.8787L18.1716 10L13 4.82843L10.1213 7.70711L15.2929 12.8787Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Eraser
