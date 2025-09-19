import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypeTxt: React.FC<IconProps> = ({ 
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
        d="M2 6C2 4.89543 2.89543 4 4 4H17.4142L22 8.58579V18C22 19.1046 21.1046 20 20 20H16V18H20V10H16V6H4V13H2V6ZM3.44491 20H4.49134V15.8628H5.93971V15H2V15.8628H3.44491V20ZM6.25156 20H7.38115L8.47263 18.2467H8.50728L9.60568 20H10.7976L9.17949 17.5017V17.4879L10.8184 15H9.65073L8.5939 16.8018H8.55579L7.49203 15H6.26195L7.842 17.4705V17.4809L6.25156 20ZM13.6251 20H12.5787V15.8628H11.1337V15H15.0735V15.8628H13.6251V20Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypeTxt
