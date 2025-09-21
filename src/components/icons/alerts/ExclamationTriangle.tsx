import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const ExclamationTriangle: React.FC<IconProps> = ({ 
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
        d="M12 5.0298L4.0182 18.9781L4.01013 18.9922L4.00534 19H19.9946L19.9898 18.9922L19.9817 18.9781L12 5.0298ZM10.3188 3.94188C11.0927 2.68604 12.9073 2.68604 13.6811 3.94188L13.6896 3.95571L13.6977 3.96981L21.7108 17.973C22.4982 19.277 21.5895 21 20.0198 21H3.98006C2.41037 21 1.50167 19.277 2.28909 17.973L10.3022 3.96981L10.3103 3.95571L10.3188 3.94188ZM13.4494 9.5461C13.4765 9.25301 13.2459 9 12.9515 9H11.0484C10.7541 9 10.5234 9.25303 10.5506 9.54614L11.0004 14.4H13L13.4494 9.5461ZM11.9999 15.3C11.2544 15.3 10.6499 15.9044 10.6499 16.65C10.6499 17.3956 11.2544 18 11.9999 18C12.7455 18 13.3499 17.3956 13.3499 16.65C13.3499 15.9044 12.7455 15.3 11.9999 15.3Z" 
        fill={fill}
      />
    </svg>
  )
}

export default ExclamationTriangle
