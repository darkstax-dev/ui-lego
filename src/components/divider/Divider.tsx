import React from 'react'
import './Divider.css'

interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = ({
  className = '',
  orientation = 'horizontal'
}) => {
  return (
    <div
      className={`divider divider--${orientation} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  )
}

export default Divider
