import React from 'react'
import './Plus.css'

interface PlusProps {
  variant?: 'default' | 'minus'
  onClick?: () => void
}

const Plus: React.FC<PlusProps> = ({
  variant = 'default',
  onClick
}) => {
  const PlusIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none"
      className="plus__icon"
    >
      <g clipPath="url(#clip0_plus)">
        <path 
          d="M9.16669 9.16663V4.16663H10.8334V9.16663H15.8334V10.8333H10.8334V15.8333H9.16669V10.8333H4.16669V9.16663H9.16669Z" 
          fill="var(--Dark-blue)"
        />
      </g>
      <defs>
        <clipPath id="clip0_plus">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const MinusIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none"
      className="plus__icon"
    >
      <path 
        d="M15.8329 10.8343H4.16626V9.1676H15.8329V10.8343Z" 
        fill="#00112B"
      />
    </svg>
  )

  return (
    <div 
      className={`plus plus--${variant}`}
      onClick={onClick}
    >
      {variant === 'minus' ? <MinusIcon /> : <PlusIcon />}
    </div>
  )
}

export default Plus
