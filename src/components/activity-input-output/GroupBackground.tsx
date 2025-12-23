import React from 'react'
import { NodeProps } from '@xyflow/react'
import './GroupBackground.css'

interface GroupBackgroundData {
  type?: 'input' | 'output'
  count?: number
}

const GroupBackground: React.FC<NodeProps> = ({ data }) => {
  const backgroundData = (data || {}) as GroupBackgroundData
  const { type = 'input', count = 2 } = backgroundData

  // Calculate dimensions based on arc pattern
  const radius = 150
  const arcAngle = Math.min(120, count * 30)
  
  // Create SVG path for the geometric shape
  const createArcPath = () => {
    const centerX = 160
    const centerY = type === 'input' ? 200 : 50
    const padding = 60
    const innerRadius = radius - padding / 2
    const outerRadius = radius + padding / 2
    
    const startAngle = type === 'input' 
      ? (90 - arcAngle / 2) * (Math.PI / 180)
      : (270 - arcAngle / 2) * (Math.PI / 180)
    
    const endAngle = type === 'input'
      ? (90 + arcAngle / 2) * (Math.PI / 180)
      : (270 + arcAngle / 2) * (Math.PI / 180)
    
    // Outer arc
    const x1 = centerX + Math.cos(startAngle) * outerRadius
    const y1 = centerY - Math.sin(startAngle) * outerRadius
    const x2 = centerX + Math.cos(endAngle) * outerRadius
    const y2 = centerY - Math.sin(endAngle) * outerRadius
    
    // Inner arc
    const x3 = centerX + Math.cos(endAngle) * innerRadius
    const y3 = centerY - Math.sin(endAngle) * innerRadius
    const x4 = centerX + Math.cos(startAngle) * innerRadius
    const y4 = centerY - Math.sin(startAngle) * innerRadius
    
    const largeArcFlag = arcAngle > 180 ? 1 : 0
    
    return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `
  }

  // Calculate width and height for the container
  const width = 320
  const height = 250

  return (
    <div 
      className={`group-background group-background--${type}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg 
        className="group-background__shape-svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <filter id={`blur-${type}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient 
            id={`gradient-${type}`} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="100%"
          >
            {type === 'input' ? (
              <>
                <stop offset="0%" stopColor="rgba(0, 114, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(0, 114, 255, 0.05)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="rgba(217, 50, 42, 0.15)" />
                <stop offset="100%" stopColor="rgba(217, 50, 42, 0.05)" />
              </>
            )}
          </linearGradient>
        </defs>
        
        {/* Background glow */}
        <path
          d={createArcPath()}
          fill={`url(#gradient-${type})`}
          filter={`url(#blur-${type})`}
          opacity="0.6"
        />
        
        {/* Main shape */}
        <path
          d={createArcPath()}
          fill="rgba(255, 255, 255, 0.4)"
          stroke={type === 'input' ? 'rgba(0, 114, 255, 0.3)' : 'rgba(217, 50, 42, 0.3)'}
          strokeWidth="2"
          strokeDasharray={count > 3 ? "5,5" : "none"}
        />
      </svg>
    </div>
  )
}

export default GroupBackground
