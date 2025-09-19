import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypeHtml: React.FC<IconProps> = ({ 
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
        d="M17.4142 4L22 8.58579V13H20V10H16V6H4V13H2V6C2 4.89557 2.89542 4 3.99998 4L17.4142 4ZM2 20H3.04643V17.8933H5.29868V20H6.34511V15H5.29868V17.0305H3.04643V15H2V20ZM8.37214 20H9.41857V15.8628H10.8669V15H6.92724V15.8628H8.37214V20ZM12.3777 20H11.4456V15H12.6549L14.0755 18.5932H14.0963L15.517 15H16.7263V20H15.7942V16.6182H15.763L14.4151 20H13.7568L12.4054 16.6182H12.3777V20ZM17.5579 20H20.7907V19.1372H18.6043V15H17.5579V20Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypeHtml
