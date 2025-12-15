import React from 'react'
import { Handle, Position, NodeProps, Node } from '@xyflow/react'
import './StartNode.css'


export type StartNodeData = {
  label?: string;
};

export type StartNode = Node<StartNodeData>;

const StartNode: React.FC<NodeProps<StartNode>> = ({ data, isConnectable }) => {
  return (
    <div className="start-node">
      <div className="start-node__content">
        <div className="start-node__icon-container">
          <svg className="start-node__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_start_node)">
              <path d="M21.6929 12.5498L7.07185 21.8893C6.96799 21.9555 6.84732 21.9935 6.7227 21.9992C6.59808 22.005 6.47417 21.9782 6.36418 21.9218C6.25419 21.8653 6.16223 21.7814 6.0981 21.6788C6.03397 21.5763 6.00006 21.459 6 21.3395V2.66053C6.00006 2.54099 6.03397 2.4237 6.0981 2.32117C6.16223 2.21863 6.25419 2.13467 6.36418 2.07825C6.47417 2.02183 6.59808 1.99504 6.7227 2.00076C6.84732 2.00647 6.96799 2.04446 7.07185 2.11069L21.6929 11.4502C21.7874 11.5105 21.8648 11.5923 21.9184 11.6882C21.972 11.7841 22 11.8912 22 12C22 12.1088 21.972 12.2159 21.9184 12.3118C21.8648 12.4077 21.7874 12.4895 21.6929 12.5498Z" fill="#D9322A"/>
            </g>
            <defs>
              <clipPath id="clip0_start_node">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="start-node__label">{data?.label || 'Start'}</div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="start-node__handle"
      />
    </div>
  )
}

export default StartNode
