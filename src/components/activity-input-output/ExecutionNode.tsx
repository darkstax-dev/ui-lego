import React, { useState, useEffect, useRef } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import './ExecutionNode.css'
import ContextMenu from './ContextMenu'

interface ExecutionNodeData {
  label?: string
  id?: string
  onDelete?: (nodeId: string) => void
  onAddInput?: (nodeId: string, inputType: string) => void
  onAddOutput?: (nodeId: string, outputType: string) => void
  onOpen?: (nodeId: string) => void
  onToggleInputGroup?: (nodeId: string) => void
  onToggleOutputGroup?: (nodeId: string) => void
  onCollapse?: (nodeId: string) => void
}

const ExecutionNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [showMenu, setShowMenu] = useState(false)
  const nodeData = data as ExecutionNodeData
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const handleNodeClick = () => {
    if (nodeData?.id && nodeData?.onCollapse) {
      nodeData.onCollapse(nodeData.id)
    }
  }

  const handleInputGroupClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (nodeData?.id && nodeData?.onToggleInputGroup) {
      nodeData.onToggleInputGroup(nodeData.id)
    }
  }

  const handleOutputGroupClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (nodeData?.id && nodeData?.onToggleOutputGroup) {
      nodeData.onToggleOutputGroup(nodeData.id)
    }
  }

  return (
    <div className="execution-node" ref={menuRef}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="execution-node__handle"
        id="left"
      />
      
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="execution-node__handle"
        id="top"
      />

      {/* Input Group Trigger */}
      <div
        className="execution-node__group-trigger execution-node__group-trigger--input"
        onClick={handleInputGroupClick}
        title="Toggle Inputs"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="4" fill="#0072ff"/>
        </svg>
      </div>

      <div className="execution-node__content" onClick={handleNodeClick}>
        <div className="execution-node__icon-container">
          <div className="execution-node__icon-background" />
          <svg className="execution-node__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_execution_node)">
              <path d="M3.9001 3.90039H27.3001C27.6449 3.90039 27.9755 4.03735 28.2193 4.28115C28.4631 4.52495 28.6001 4.85561 28.6001 5.20039V26.0004C28.6001 26.3452 28.4631 26.6758 28.2193 26.9196C27.9755 27.1634 27.6449 27.3004 27.3001 27.3004H3.9001C3.55532 27.3004 3.22466 27.1634 2.98086 26.9196C2.73706 26.6758 2.6001 26.3452 2.6001 26.0004V5.20039C2.6001 4.85561 2.73706 4.52495 2.98086 4.28115C3.22466 4.03735 3.55532 3.90039 3.9001 3.90039V3.90039ZM21.4033 20.1972L26.0001 15.6004L21.4033 11.0036L19.5651 12.8444L22.3237 15.6004L19.5651 18.3577L21.4033 20.1972V20.1972ZM8.8765 15.6004L11.6351 12.8431L9.7969 11.0036L5.2001 15.6004L9.7969 20.1972L11.6351 18.3564L8.8765 15.6004ZM14.6173 22.1004L19.3493 9.10039H16.5829L11.8509 22.1004H14.6173Z" fill="#D9322A"/>
            </g>
            <defs>
              <clipPath id="clip0_execution_node">
                <rect width="31.2" height="31.2" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="execution-node__label">{nodeData?.label || 'config loading'}</div>
      </div>
      
      {/* Three dots menu button */}
      <div 
        className="execution-node__menu-trigger"
        onClick={handleMenuClick}
      >
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="currentColor"/>
          <circle cx="2" cy="8" r="2" fill="currentColor"/>
          <circle cx="2" cy="14" r="2" fill="currentColor"/>
        </svg>
      </div>
      
      {showMenu && nodeData?.id && (
        <ContextMenu
          onClose={() => setShowMenu(false)}
          onDelete={() => nodeData?.onDelete?.(nodeData.id!)}
          onAddInput={(inputType) => nodeData?.onAddInput?.(nodeData.id!, inputType)}
          onAddOutput={(outputType) => nodeData?.onAddOutput?.(nodeData.id!, outputType)}
          onOpen={() => nodeData?.onOpen?.(nodeData.id!)}
        />
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="execution-node__handle"
        id="right"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="execution-node__handle"
        id="bottom"
      />

      {/* Output Group Trigger */}
      <div
        className="execution-node__group-trigger execution-node__group-trigger--output"
        onClick={handleOutputGroupClick}
        title="Toggle Outputs"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="4" fill="#0072ff"/>
        </svg>
      </div>
    </div>
  )
}

export default ExecutionNode
