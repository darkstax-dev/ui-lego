import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypeXml: React.FC<IconProps> = ({ 
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
        d="M2 6C2 4.89543 2.89543 4 4 4H17.4142L22 8.58579V18C22 19.1046 21.1046 20 20 20H19V18H20V10H16V6H4V13H2V6ZM2 20H3.12959L4.22107 18.2467H4.25572L5.35412 20H6.54608L4.92793 17.5017V17.4878L6.56687 15H5.39917L4.34234 16.8018H4.30423L3.24047 15H2.0104L3.59044 17.4705V17.4809L2 20ZM7.13167 20H8.06376V16.6182H8.09148L9.44283 20H10.1012L11.4491 16.6182H11.4802V20H12.4123V15H11.203L9.7824 18.5932H9.76161L8.34096 15H7.13167V20ZM16.4768 20H13.2439V15H14.2904V19.1372H16.4768V20Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypeXml
