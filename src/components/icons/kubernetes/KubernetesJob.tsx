import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesJob: React.FC<IconProps> = ({ 
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
        d="M9.5 2.49976V7.49993H14.5V2.49976H9.5ZM16.5 2.49976V7.49993H21.5V2.49976H16.5ZM21.5 9.49993H16.5V14.4996L21.5 14.4995L21.5 15.4995V9.49993ZM21.5 16.4995L16.5 16.4996V21.4995H14.5V16.4997L9.5 16.4998V21.4995H7.5V16.4998L2.50002 16.4999L2.5 15.4999V21.4998H21.5V16.4995ZM2.5 14.4999L7.5 14.4998V9.49993H2.5V14.4999ZM9.5 14.4998V9.49993H14.5V14.4997L9.5 14.4998Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesJob
