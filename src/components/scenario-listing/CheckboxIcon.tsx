import React from 'react'

interface CheckboxIconProps {
  className?: string
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="16"
        height="16"
        stroke="var(--Checkbox-Stroke-default, #00112B)"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
    </svg>
  )
}

export default CheckboxIcon
