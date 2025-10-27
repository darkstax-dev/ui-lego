import React from 'react'
import './Divider.css'

interface DividerProps {
  className?: string
  color?: string
  thickness?: number
  orientation?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = ({
  className = '',
  color = 'var(--color-gray-400)',
  thickness = 1,
  orientation = 'horizontal'
}) => {
  const style = orientation === 'horizontal' 
    ? { width: '100%', height: `${thickness}px`, backgroundColor: color }
    : { height: '100%', width: `${thickness}px`, backgroundColor: color }

  return (
    <div 
      className={`divider divider--${orientation} ${className}`}
      style={style}
      role="separator"
      aria-orientation={orientation}
    />
  )
}

export default Divider
