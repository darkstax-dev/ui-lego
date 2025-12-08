import React, { useCallback } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './ActivityInputOutput.css'
import CustomNode from './CustomNode'

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: { label: 'config loading' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: { label: 'process data' },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'default',
    className: 'custom-edge',
  },
]

export interface ActivityInputOutputProps {
  className?: string
}

const ActivityInputOutput: React.FC<ActivityInputOutputProps> = ({ className = '' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, className: 'custom-edge' }, eds)),
    [setEdges]
  )

  return (
    <div className={`activity-input-output ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  )
}

export default ActivityInputOutput
