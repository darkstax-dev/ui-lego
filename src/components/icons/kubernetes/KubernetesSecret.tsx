import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesSecret: React.FC<IconProps> = ({ 
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
        d="M3 12.9988V10.9988H15V12.9988H3ZM3 5.99878H21V7.99878H3V5.99878ZM3 17.9988V15.9988H9V17.9988H3ZM22 21.9988H14V17.9988H15V16.9988C15 16.2031 15.3161 15.4401 15.8787 14.8775C16.4413 14.3148 17.2044 13.9988 18 13.9988C18.7956 13.9988 19.5587 14.3148 20.1213 14.8775C20.6839 15.4401 21 16.2031 21 16.9988V17.9988H22V21.9988ZM18 15.9988C17.7348 15.9988 17.4804 16.1041 17.2929 16.2917C17.1054 16.4792 17 16.7336 17 16.9988V17.9988H19V16.9988C19 16.7336 18.8946 16.4792 18.7071 16.2917C18.5196 16.1041 18.2652 15.9988 18 15.9988Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesSecret
