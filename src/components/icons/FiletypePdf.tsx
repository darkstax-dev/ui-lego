import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypePdf: React.FC<IconProps> = ({ 
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
        d="M2 6C2 4.89543 2.89543 4 4 4H17.4142L22 8.58579V18C22 19.1046 21.1046 20 20 20H16V18H20V10H16V6H4V13H2V6ZM2 20H3.04643V18.4234H4.0097C5.06306 18.4234 5.76646 17.7443 5.76646 16.7152V16.7082C5.76646 15.6791 5.06306 15 4.0097 15H2V20ZM3.75329 15.8281C4.35274 15.8281 4.70617 16.1435 4.70617 16.7117V16.7186C4.70617 17.2869 4.35274 17.6057 3.75329 17.6057H3.04643V15.8281H3.75329ZM6.38669 20H8.29591C9.79626 20 10.6798 19.0679 10.6798 17.4809V17.474C10.6798 15.8905 9.79279 15 8.29591 15H6.38669V20ZM7.43313 19.1337V15.8628H8.17117C9.0894 15.8628 9.61261 16.4345 9.61261 17.4775V17.4844C9.61261 18.5655 9.10672 19.1337 8.17117 19.1337H7.43313ZM12.4019 20H11.3555V15H14.6299V15.8628H12.4019V17.2037H14.4359V18.0319H12.4019V20Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypePdf
