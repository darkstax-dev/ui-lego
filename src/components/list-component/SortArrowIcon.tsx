import React from 'react'

interface SortArrowIconProps {
  className?: string
}

const SortArrowIcon: React.FC<SortArrowIconProps> = ({ className = '' }) => {
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M4 10L8 0L8.74228e-07 -6.99382e-07L4 10Z" fill="currentColor" />
    </svg>
  )
}

export default SortArrowIcon
