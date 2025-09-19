import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypeAi: React.FC<IconProps> = ({ 
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
        d="M2 6C2 4.89543 2.89543 4 4 4H17.4142L22 8.58579V18C22 19.1046 21.1046 20 20 20H11V18H20V10H16V6H4V13H2V6ZM3.09841 20H2L3.74636 15H4.97644L6.71933 20H5.62093L5.24324 18.7872H3.47609L3.09841 20ZM4.37006 15.9702H4.34927L3.71864 18.0042H5.00069L4.37006 15.9702ZM8.27859 20H7.23216V15H8.27859V20Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypeAi
