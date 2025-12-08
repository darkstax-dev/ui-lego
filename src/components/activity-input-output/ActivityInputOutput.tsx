import React, { useCallback, useState } from 'react'
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
import ExecutionNode from './ExecutionNode'
import OutputNode from './OutputNode'

const nodeTypes: NodeTypes = {
  custom: CustomNode,
  execution: ExecutionNode,
  output: OutputNode,
}

const initialNodes: Node[] = [
  {
    id: 'input-1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: { label: 'input node' },
  },
  {
    id: 'input-2',
    type: 'custom',
    position: { x: 300, y: 100 },
    data: { label: 'input node' },
  },
  {
    id: 'execution-main',
    type: 'execution',
    position: { x: 200, y: 250 },
    data: { label: 'config loading', showPolygon: false },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e-input1-execution',
    source: 'input-1',
    target: 'execution-main',
    type: 'default',
    className: 'custom-edge',
  },
  {
    id: 'e-input2-execution',
    source: 'input-2',
    target: 'execution-main',
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
  const [isExpanded, setIsExpanded] = useState(false)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, className: 'custom-edge' }, eds)),
    [setEdges]
  )

  const handleNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.id === 'execution-main' && !isExpanded) {
        setIsExpanded(true)
        
        const outputNodes: Node[] = [
          {
            id: 'output-1',
            type: 'output',
            position: { x: 100, y: 450 },
            data: { label: 'output node' },
          },
          {
            id: 'output-2',
            type: 'output',
            position: { x: 300, y: 450 },
            data: { label: 'output node' },
          },
        ]

        const outputEdges: Edge[] = [
          {
            id: 'e-execution-output1',
            source: 'execution-main',
            target: 'output-1',
            type: 'default',
            className: 'custom-edge',
            animated: true,
          },
          {
            id: 'e-execution-output2',
            source: 'execution-main',
            target: 'output-2',
            type: 'default',
            className: 'custom-edge',
            animated: true,
          },
        ]

        setNodes((nds) => {
          return nds.map((n) => {
            if (n.id === 'execution-main') {
              return {
                ...n,
                data: {
                  ...n.data,
                  showPolygon: true,
                },
              }
            }
            return n
          }).concat(outputNodes)
        })

        setEdges((eds) => eds.concat(outputEdges))
      }
    },
    [isExpanded, setNodes, setEdges]
  )

  return (
    <div className={`activity-input-output ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={handleNodeDoubleClick}
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
