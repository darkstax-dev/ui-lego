import React from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import './CustomNode.css'

const CustomNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="custom-node__handle"
      />
      
      <div className="custom-node__content">
        <div className="custom-node__icon-container">
          <div className="custom-node__icon-background" />
          <svg className="custom-node__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_custom_node)">
              <path d="M3.9001 3.90039H27.3001C27.6449 3.90039 27.9755 4.03735 28.2193 4.28115C28.4631 4.52495 28.6001 4.85561 28.6001 5.20039V26.0004C28.6001 26.3452 28.4631 26.6758 28.2193 26.9196C27.9755 27.1634 27.6449 27.3004 27.3001 27.3004H3.9001C3.55532 27.3004 3.22466 27.1634 2.98086 26.9196C2.73706 26.6758 2.6001 26.3452 2.6001 26.0004V5.20039C2.6001 4.85561 2.73706 4.52495 2.98086 4.28115C3.22466 4.03735 3.55532 3.90039 3.9001 3.90039V3.90039ZM21.4033 20.1972L26.0001 15.6004L21.4033 11.0036L19.5651 12.8444L22.3237 15.6004L19.5651 18.3577L21.4033 20.1972V20.1972ZM8.8765 15.6004L11.6351 12.8431L9.7969 11.0036L5.2001 15.6004L9.7969 20.1972L11.6351 18.3564L8.8765 15.6004ZM14.6173 22.1004L19.3493 9.10039H16.5829L11.8509 22.1004H14.6173Z" fill="#D9322A"/>
            </g>
            <defs>
              <clipPath id="clip0_custom_node">
                <rect width="31.2" height="31.2" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="custom-node__label">{data?.label || 'config loading'}</div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node__handle"
      />
    </div>
  )
}

export default CustomNode
