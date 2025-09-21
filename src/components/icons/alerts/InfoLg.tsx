import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const InfoLg: React.FC<IconProps> = ({ 
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
        d="M12.5 3C11.1193 3 10 4.11929 10 5.5C10 6.88071 11.1193 8 12.5 8C13.8807 8 15 6.88071 15 5.5C15 4.11929 13.8807 3 12.5 3ZM9 10L8 13H11.5L9.975 17.0667C9.26131 18.9698 10.6682 21 12.7008 21C13.8035 21 14.8115 20.377 15.3046 19.3908L16 18H13L16 10H9Z" 
        fill={fill}
      />
    </svg>
  )
}

export default InfoLg
