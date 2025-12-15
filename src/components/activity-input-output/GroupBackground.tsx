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

  // Calculate width based on number of nodes
  const nodeWidth = 120
  const nodeSpacing = 120
  const padding = 40
  const width = count * nodeWidth + (count - 1) * nodeSpacing + padding * 2

  return (
    <div 
      className={`group-background group-background--${type}`}
      style={{ width: `${width}px` }}
    >
      <div className="group-background__shape" />
    </div>
  )
}

export default GroupBackground
