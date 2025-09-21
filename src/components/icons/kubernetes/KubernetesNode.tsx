import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesNode: React.FC<IconProps> = ({ 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12ZM8 11V9H2V15H8V13H10.083C10.559 15.8377 13.027 18 16 18C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6C13.027 6 10.559 8.16229 10.083 11H8ZM4 13V11H6V13H4Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesNode
