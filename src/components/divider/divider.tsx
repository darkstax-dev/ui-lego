import React from 'react'
import './Divider.css'

interface DividerProps {
  className?: string
  color?: string
  thickness?: number
  orientation?: 'horizontal' | 'vertical'
  style?: 'solid' | 'dashed' | 'dotted'
}

const Divider: React.FC<DividerProps> = ({
  className = '',
  color = 'var(--color-gray-400)',
  thickness = 1,
  orientation = 'horizontal',
  style = 'dotted'
}) => {
  const inlineStyle = orientation === 'horizontal'
    ? {
        width: '100%',
        borderBottom: `${thickness}px ${style} ${color}`,
        height: 0
      }
    : {
        height: '100%',
        borderRight: `${thickness}px ${style} ${color}`,
        width: 0
      }

  return (
    <div
      className={`divider divider--${orientation} ${className}`}
      style={inlineStyle}
      role="separator"
      aria-orientation={orientation}
    />
  )
}

export default Divider
