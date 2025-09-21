import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesNamespace: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = '#072B56' 
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
        d="M21 4H3V20H21V4Z" 
        stroke={fill} 
        strokeWidth="1.51181" 
        strokeMiterlimit="10" 
        strokeLinejoin="round" 
        strokeDasharray="3.02 1.51"
      />
    </svg>
  )
}

export default KubernetesNamespace
