import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const VectorPen: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = 'currentColor'
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
        d="M17 2L13.8405 5.2453C11.4997 4.60971 8.8907 5.20986 7.05028 7.05028C6.28742 7.81315 5.73606 8.71064 5.39863 9.66743L5.38619 9.7027L2 22L14.2974 18.6139L14.3326 18.6014C15.2894 18.264 16.1869 17.7126 16.9498 16.9498C18.7902 15.1094 19.3904 12.5004 18.7548 10.1595L22 7L17 2ZM17 4.82843L19.1716 7L16.4532 9.63267L16.6801 10.236C17.3506 12.0188 16.9671 14.104 15.5356 15.5356C14.9975 16.0737 14.3695 16.4621 13.701 16.7033L6.85938 18.5549L11.482 13.9323C11.6472 13.9765 11.8209 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8955 13.1046 10 12 10C10.8955 10 10 10.8955 10 12C10 12.1792 10.0236 12.3528 10.0678 12.5181L5.44516 17.1407L7.29676 10.299C7.53791 9.63056 7.92639 9.0026 8.4645 8.4645C9.89607 7.03292 11.9813 6.64947 13.764 7.31997L14.3674 7.54689L17 4.82843Z" 
        fill={fill}
      />
    </svg>
  )
}

export default VectorPen
