import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const LayersFill: React.FC<IconProps> = ({ 
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
        d="M21.4856 8.14633L12 3L2.51436 8.14633C2.19689 8.31856 2 8.64534 2 9C2 9.35466 2.19689 9.68144 2.51436 9.85367L12 15L21.4856 9.85367C21.8031 9.68144 22 9.35466 22 9C22 8.64534 21.8031 8.31856 21.4856 8.14633ZM2.51436 13.9907L4.26396 13L12 17.2924L19.736 13L21.4856 13.9907C21.8031 14.1668 22 14.501 22 14.8638C22 15.2265 21.8031 15.5607 21.4856 15.7368L12 21L2.51436 15.7368C2.19689 15.5607 2 15.2265 2 14.8638C2 14.501 2.19689 14.1668 2.51436 13.9907Z" 
        fill={fill}
      />
    </svg>
  )
}

export default LayersFill
