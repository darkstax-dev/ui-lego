import React, { useRef, useState } from 'react'
import './Canvas.css'
import { K8sNode } from '../../TopologyCanvas'
import { KubernetesNodeComponent } from './KubernetesNode'

interface CanvasProps {
  nodes: K8sNode[]
  selectedNodeId: string | null
  onNodeClick: (node: K8sNode) => void
  onNodeDoubleClick: (node: K8sNode) => void
  onNodeDrag: (nodeId: string, position: { x: number; y: number }) => void
  onDrop: (type: string, position: { x: number; y: number }) => void
  onCanvasClick: () => void
}

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  selectedNodeId,
  onNodeClick,
  onNodeDoubleClick,
  onNodeDrag,
  onDrop,
  onCanvasClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const type = e.dataTransfer.getData('kubernetes-type')
    if (!type || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    onDrop(type, { x, y })
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('topology-canvas__grid')) {
      onCanvasClick()
    }
  }

  return (
    <div
      ref={canvasRef}
      className={`topology-canvas__canvas ${dragOver ? 'topology-canvas__canvas--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
    >
      {/* Grid Background */}
      <div className="topology-canvas__grid" />

      {/* Toolbar */}
      <div className="topology-canvas__toolbar">
        <div className="topology-canvas__breadcrumb">
          <button className="topology-canvas__back-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6.5 10H16.5M6.5 10L10.5 6M6.5 10L10.5 14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Fotder path"
            className="topology-canvas__input"
          />
          <input
            type="text"
            defaultValue="Untitled 1"
            className="topology-canvas__input topology-canvas__input--filled"
          />
          <select className="topology-canvas__select">
            <option>Select node</option>
          </select>
        </div>

        <div className="topology-canvas__controls">
          <button className="topology-canvas__icon-btn" title="Lock/Unlock">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8.33333H15V16.6667H5V8.33333ZM7.5 6.66667V5C7.5 3.61929 8.61929 2.5 10 2.5C11.3807 2.5 12.5 3.61929 12.5 5V6.66667M8.33333 12.5H11.6667V14.1667H8.33333V12.5Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="topology-canvas__icon-btn" title="Fullscreen">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.3333 2.5H17.5V6.66667M6.66667 2.5H2.5V6.66667M17.5 13.3333V17.5H13.3333M2.5 13.3333V17.5H6.66667" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="topology-canvas__icon-btn" title="Zoom out">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="topology-canvas__icon-btn" title="More options">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="5" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="15" r="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Nodes */}
      <div className="topology-canvas__nodes">
        {nodes.map(node => (
          <KubernetesNodeComponent
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            onClick={() => onNodeClick(node)}
            onDoubleClick={() => onNodeDoubleClick(node)}
            onDrag={(position) => onNodeDrag(node.id, position)}
          />
        ))}
      </div>
    </div>
  )
}
