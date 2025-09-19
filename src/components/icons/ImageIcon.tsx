import React from 'react'

interface ImageIconProps {
  width?: number
  height?: number
  fill?: string
  className?: string
}

const ImageIcon: React.FC<ImageIconProps> = ({ 
  width = 16, 
  height = 16, 
  fill = 'currentColor',
  className 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 16 17" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_image_icon)">
        <path 
          d="M3.21865 14.5L3.20531 14.5133L3.19131 14.5H1.99465C1.81919 14.4998 1.65098 14.43 1.52697 14.3059C1.40297 14.1817 1.33331 14.0135 1.33331 13.838V3.162C1.33453 2.98692 1.40458 2.81934 1.52832 2.69548C1.65206 2.57161 1.81957 2.5014 1.99465 2.5H14.0053C14.3706 2.5 14.6666 2.79667 14.6666 3.162V13.838C14.6654 14.0131 14.5954 14.1807 14.4716 14.3045C14.3479 14.4284 14.1804 14.4986 14.0053 14.5H3.21865ZM13.3333 10.5V3.83333H2.66665V13.1667L9.33331 6.5L13.3333 10.5ZM13.3333 12.3853L9.33331 8.38533L4.55198 13.1667H13.3333V12.3853ZM5.33331 7.83333C4.97969 7.83333 4.64055 7.69286 4.3905 7.44281C4.14046 7.19276 3.99998 6.85362 3.99998 6.5C3.99998 6.14638 4.14046 5.80724 4.3905 5.55719C4.64055 5.30714 4.97969 5.16667 5.33331 5.16667C5.68693 5.16667 6.02607 5.30714 6.27612 5.55719C6.52617 5.80724 6.66665 6.14638 6.66665 6.5C6.66665 6.85362 6.52617 7.19276 6.27612 7.44281C6.02607 7.69286 5.68693 7.83333 5.33331 7.83333Z" 
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_image_icon">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ImageIcon
