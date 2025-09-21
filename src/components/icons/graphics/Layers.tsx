import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Layers: React.FC<IconProps> = ({ 
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
        d="M12 3L2.51436 8.12582C2.19689 8.30219 2 8.63681 2 8.99998C2 9.36314 2.19689 9.69776 2.51436 9.87413L6.34087 12L2.51436 14.1258C2.19689 14.3022 2 14.6368 2 15C2 15.3631 2.19689 15.6978 2.51436 15.8741L12 21L21.4856 15.8741C21.8031 15.6978 22 15.3631 22 15C22 14.6368 21.8031 14.3022 21.4856 14.1258L17.6591 12L21.4856 9.87413C21.8031 9.69776 22 9.36314 22 8.99998C22 8.63681 21.8031 8.30219 21.4856 8.12582L12 3ZM15.6 13.1439L12 15L8.4 13.1439L5.05913 15L12 18.7121L18.9409 15L15.6 13.1439ZM18.9409 8.99998L12 5.28792L5.05913 8.99998L12 12.7121L18.9409 8.99998Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Layers
