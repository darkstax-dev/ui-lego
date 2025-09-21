import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const QuestionLg: React.FC<IconProps> = ({ 
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
        d="M12.2282 10.2725C11.0786 11.1916 10.2542 12.4732 10.25 13.9877H13.7501C13.759 13.4404 14.3588 13.0233 15.1051 12.5044C16.349 11.6393 18 10.4913 18 7.98539C18 5.17552 15.1037 3.0354 12 3.0354C8.89631 3.0354 6 5.17552 6 7.98539V9H9.5V7.98539C9.5 6.96633 11.2566 6.5354 12 6.5354C12.7434 6.5354 14.5 6.96633 14.5 7.98539C14.5 8.43832 14.4007 8.66786 13.7407 9.17562C13.5143 9.34986 13.2798 9.51306 13.0454 9.67627C12.7686 9.86895 12.4918 10.0616 12.2282 10.2725ZM12 16C10.6193 16 9.5 17.1193 9.5 18.5C9.5 19.8807 10.6193 21 12 21C13.3807 21 14.5 19.8807 14.5 18.5C14.5 17.1193 13.3807 16 12 16Z" 
        fill={fill}
      />
    </svg>
  )
}

export default QuestionLg
