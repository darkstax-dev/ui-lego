import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypePpt: React.FC<IconProps> = ({ 
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
        d="M2 6C2 4.89543 2.89543 4 4 4H17.4142L22 8.58579V18C22 19.1046 21.1046 20 20 20H15V18H20V10H16V6H4V13H2V6ZM2 20H3.04643V18.4234H4.0097C5.06306 18.4234 5.76646 17.7443 5.76646 16.7152V16.7082C5.76646 15.6791 5.06306 15 4.0097 15H2V20ZM3.75329 15.8281C4.35274 15.8281 4.70617 16.1435 4.70617 16.7117V16.7186C4.70617 17.2869 4.35274 17.6057 3.75329 17.6057H3.04643V15.8281H3.75329ZM6.38669 20H7.43313V18.4234H8.3964C9.44976 18.4234 10.1532 17.7443 10.1532 16.7152V16.7082C10.1532 15.6791 9.44976 15 8.3964 15H6.38669V20ZM8.13999 15.8281C8.73943 15.8281 9.09286 16.1435 9.09286 16.7117V16.7186C9.09286 17.2869 8.73943 17.6057 8.13999 17.6057H7.43313V15.8281H8.13999ZM13.0152 20H11.9688V15.8628H10.5239V15H14.4636V15.8628H13.0152V20Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypePpt
