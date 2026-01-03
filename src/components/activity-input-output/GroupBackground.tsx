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

  // Calculate dimensions based on node count
  // Base width expands with more nodes
  const baseWidth = 160
  const widthPerNode = 80
  const width = Math.max(baseWidth, baseWidth + (count - 1) * widthPerNode)
  const height = 200
  
  // Create pentagon/arrow path pointing toward the execution node
  // The node should sit INSIDE the pentagon, near the flat edge
  const createPentagonPath = () => {
    const centerX = width / 2
    const padding = 10
    
    if (type === 'input') {
      // Pentagon pointing DOWN (toward execution node below)
      // Node sits in upper portion, pentagon extends down with point toward execution node
      const topY = padding
      const shoulderY = height * 0.55  // Where the angled sides start
      const bottomY = height - padding  // Point of the pentagon
      const leftX = padding
      const rightX = width - padding
      
      return `
        M ${leftX} ${topY}
        L ${rightX} ${topY}
        L ${rightX} ${shoulderY}
        L ${centerX} ${bottomY}
        L ${leftX} ${shoulderY}
        Z
      `
    } else {
      // Pentagon pointing UP (toward execution node above)
      // Node sits in lower portion, pentagon extends up with point toward execution node
      const topY = padding  // Point of the pentagon
      const shoulderY = height * 0.45  // Where the angled sides end
      const bottomY = height - padding
      const leftX = padding
      const rightX = width - padding
      
      return `
        M ${centerX} ${topY}
        L ${rightX} ${shoulderY}
        L ${rightX} ${bottomY}
        L ${leftX} ${bottomY}
        L ${leftX} ${shoulderY}
        Z
      `
    }
  }

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
        {/* Main pentagon shape - solid gray fill like reference */}
        <path
          d={createPentagonPath()}
          fill="rgba(200, 205, 215, 0.5)"
          className="group-background__pentagon"
        />
      </svg>
    </div>
  )
}

export default GroupBackground
