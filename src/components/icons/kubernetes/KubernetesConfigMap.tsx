import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesConfigMap: React.FC<IconProps> = ({ 
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
        d="M3 12.9988H15V10.9988H3V12.9988ZM3 5.99878V7.99878H21V5.99878H3ZM3 17.9988H9V15.9988H3V17.9988Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesConfigMap
