import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const Eyedropper: React.FC<IconProps> = ({ 
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
        d="M19.4639 4.53553C18.7498 3.82149 17.5921 3.82149 16.8781 4.53553L14.0852 7.32843L16.671 9.91421L19.4639 7.12132C20.1779 6.40727 20.1779 5.24958 19.4639 4.53553ZM18.0852 11.3284L20.8781 8.53553C22.3732 7.04044 22.3732 4.61641 20.8781 3.12132C19.383 1.62622 16.959 1.62623 15.4639 3.12132L12.671 5.91421L11.3781 4.62132L9.96387 6.03553L11.7568 7.82843L3.69047 15.8947C3.39571 16.1895 3.20042 16.569 3.13189 16.9801L3 20L4 21L7.01927 20.8675C7.43044 20.799 7.80993 20.6037 8.10468 20.3089L16.171 12.2426L17.9639 14.0355L19.3781 12.6213L18.0852 11.3284ZM14.7568 10.8284L13.171 9.24264L5.10468 17.3089L5 19L6.69047 18.8947L14.7568 10.8284Z" 
        fill={fill}
      />
    </svg>
  )
}

export default Eyedropper
