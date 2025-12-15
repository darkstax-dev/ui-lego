import React from 'react'
import { Handle, Position, NodeProps, Node } from '@xyflow/react'
import './StopNode.css'


export type StopNodeData = {
  label?: string;
};

export type StopNode = Node<StopNodeData>;

const StopNode: React.FC<NodeProps<StopNode>> = ({ data, isConnectable }) => {
  return (
    <div className="stop-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="stop-node__handle"
      />
      
      <div className="stop-node__content">
        <div className="stop-node__icon-container">
          <svg className="stop-node__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="12" height="12" fill="#D9322A"/>
          </svg>
        </div>
        <div className="stop-node__label">{data?.label || 'stop'}</div>
      </div>
    </div>
  )
}

export default StopNode
