import React, { useState, useCallback } from 'react'
import './TopologyCanvas.css'
import { TopBar } from './components/topology/TopBar'
import { LeftSidebar } from './components/topology/LeftSidebar'
import { RightSidebar } from './components/topology/RightSidebar'
import { Canvas } from './components/topology/Canvas'
import { BottomToolbar } from './components/topology/BottomToolbar'
import { StatusLegend } from './components/topology/StatusLegend'

export interface K8sNode {
  id: string
  type: string
  name: string
  status: 'ready' | 'deploying' | 'running' | 'error' | 'terminated'
  position: { x: number; y: number }
  tags?: string[]
  badge?: number
}

export interface TopologyCanvasProps {
  onNodeClick?: (node: K8sNode) => void
  onNodeDoubleClick?: (node: K8sNode) => void
  onCanvasClick?: () => void
}

export const TopologyCanvas: React.FC<TopologyCanvasProps> = ({
  onNodeClick,
  onNodeDoubleClick,
  onCanvasClick
}) => {
  const [nodes, setNodes] = useState<K8sNode[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [showLegend, setShowLegend] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDrop = useCallback((type: string, position: { x: number; y: number }) => {
    const newNode: K8sNode = {
      id: `${type}-${Date.now()}`,
      type,
      name: `${type}${nodes.filter(n => n.type === type).length + 1}`,
      status: 'ready',
      position
    }
    setNodes(prev => [...prev, newNode])
  }, [nodes])

  const handleNodeClick = useCallback((node: K8sNode) => {
    setSelectedNodeId(node.id)
    onNodeClick?.(node)
  }, [onNodeClick])

  const handleNodeDoubleClick = useCallback((node: K8sNode) => {
    onNodeDoubleClick?.(node)
  }, [onNodeDoubleClick])

  const handleNodeDrag = useCallback((nodeId: string, newPosition: { x: number; y: number }) => {
    setNodes(prev =>
      prev.map(node =>
        node.id === nodeId ? { ...node, position: newPosition } : node
      )
    )
  }, [])

  const handleCanvasClick = useCallback(() => {
    setSelectedNodeId(null)
    onCanvasClick?.()
  }, [onCanvasClick])

  return (
    <div className="topology-canvas">
      <TopBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="topology-canvas__main">
        <LeftSidebar />
        
        <Canvas
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onNodeClick={handleNodeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onNodeDrag={handleNodeDrag}
          onDrop={handleDrop}
          onCanvasClick={handleCanvasClick}
        />
        
        <RightSidebar searchQuery={searchQuery} />
      </div>
      
      <BottomToolbar 
        onInfoClick={() => setShowLegend(!showLegend)}
        showLegend={showLegend}
      />
      
      {showLegend && (
        <StatusLegend onClose={() => setShowLegend(false)} />
      )}
    </div>
  )
}

export default TopologyCanvas
