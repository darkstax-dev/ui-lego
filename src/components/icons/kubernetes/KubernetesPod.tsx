import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesPod: React.FC<IconProps> = ({ 
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
        d="M3.21843 5.95171L12 2L20.7816 5.95171L12 9.90341L3.21843 5.95171ZM2 7.59659V17.9539L11 22.0039V11.6466L2 7.59659ZM13 22.0039L22 17.9539V7.59659L13 11.6466V22.0039Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesPod
