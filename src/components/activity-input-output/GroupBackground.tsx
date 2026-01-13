import React from 'react'
import { NodeProps } from '@xyflow/react'
import { useSpring, animated } from '@react-spring/web'
import './GroupBackground.css'

interface GroupBackgroundData {
  type?: 'input' | 'output'
  count?: number
  isCollapsed?: boolean
}

const GroupBackground: React.FC<NodeProps> = ({ data }) => {
  const backgroundData = (data || {}) as GroupBackgroundData
  const { type = 'input', count = 1, isCollapsed = false } = backgroundData

  // Dynamic dimensions based on node count
  // Each node is 52px wide, spacing between nodes is 120px
  const nodeWidth = 52
  const spacing = 120
  const horizontalPadding = 60
  const verticalPadding = 40
  
  // Calculate width: (count-1) * spacing + nodeWidth + padding on both sides
  const totalNodesWidth = (count - 1) * spacing + nodeWidth
  const targetWidth = totalNodesWidth + horizontalPadding * 2
  const targetHeight = nodeWidth + 30 + verticalPadding * 2 // 30px for label height
  
  // Spring animation for smooth size transitions with collapse support
  const springProps = useSpring({
    width: isCollapsed ? 0 : targetWidth,
    height: isCollapsed ? 0 : targetHeight,
    opacity: isCollapsed ? 0 : 1,
    scale: isCollapsed ? 0.3 : 1,
    // Slide direction based on type - inputs slide up, outputs slide down
    translateY: isCollapsed ? (type === 'input' ? 60 : -60) : 0,
    config: { 
      tension: 220, 
      friction: 22,
      mass: 1
    }
  })

  // Create pentagon/arrow path pointing toward the execution node
  // Matches the reference design with softer corners
  const createPentagonPath = (w: number, h: number) => {
    const padding = 12
    const cornerRadius = 8
    
    if (type === 'input') {
      // Pentagon pointing DOWN (toward execution node below)
      const topY = padding
      const shoulderY = h * 0.6
      const bottomY = h - padding
      const leftX = padding
      const rightX = w - padding
      const centerX = w / 2
      
      return `
        M ${leftX + cornerRadius} ${topY}
        L ${rightX - cornerRadius} ${topY}
        Q ${rightX} ${topY} ${rightX} ${topY + cornerRadius}
        L ${rightX} ${shoulderY - cornerRadius}
        Q ${rightX} ${shoulderY} ${rightX - cornerRadius} ${shoulderY + cornerRadius}
        L ${centerX + cornerRadius} ${bottomY - cornerRadius}
        Q ${centerX} ${bottomY} ${centerX - cornerRadius} ${bottomY - cornerRadius}
        L ${leftX + cornerRadius} ${shoulderY + cornerRadius}
        Q ${leftX} ${shoulderY} ${leftX} ${shoulderY - cornerRadius}
        L ${leftX} ${topY + cornerRadius}
        Q ${leftX} ${topY} ${leftX + cornerRadius} ${topY}
        Z
      `
    } else {
      // Pentagon pointing UP (toward execution node above)
      const topY = padding
      const shoulderY = h * 0.4
      const bottomY = h - padding
      const leftX = padding
      const rightX = w - padding
      const centerX = w / 2
      
      return `
        M ${centerX} ${topY}
        L ${rightX - cornerRadius} ${shoulderY - cornerRadius}
        Q ${rightX} ${shoulderY} ${rightX} ${shoulderY + cornerRadius}
        L ${rightX} ${bottomY - cornerRadius}
        Q ${rightX} ${bottomY} ${rightX - cornerRadius} ${bottomY}
        L ${leftX + cornerRadius} ${bottomY}
        Q ${leftX} ${bottomY} ${leftX} ${bottomY - cornerRadius}
        L ${leftX} ${shoulderY + cornerRadius}
        Q ${leftX} ${shoulderY} ${leftX + cornerRadius} ${shoulderY - cornerRadius}
        Z
      `
    }
  }

  return (
    <animated.div 
      className={`group-background group-background--${type}`}
      style={{ 
        width: springProps.width.to(w => `${w}px`),
        height: springProps.height.to(h => `${h}px`),
        opacity: springProps.opacity,
        transform: springProps.scale.to((s) => 
          `scale(${s}) translateY(${springProps.translateY.get()}px)`
        )
      }}
    >
      <animated.svg 
        className="group-background__shape-svg"
        style={{
          width: springProps.width,
          height: springProps.height
        }}
      >
        <animated.path
          d={springProps.width.to(w => createPentagonPath(w, springProps.height.get()))}
          fill="rgba(255, 255, 255, 0.20)"
          stroke="rgba(200, 205, 215, 0.3)"
          strokeWidth="1"
          className="group-background__pentagon"
        />
      </animated.svg>
    </animated.div>
  )
}

export default GroupBackground