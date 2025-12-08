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
import StartNode from './StartNode'
import ConfigNode from './ConfigNode'
import ExecutionNode from './ExecutionNode'
import InputNode from './InputNode'
import OutputNode from './OutputNode'
import OsCommandNode from './OsCommandNode'
import StopNode from './StopNode'

const nodeTypes: NodeTypes = {
  start: StartNode,
  config: ConfigNode,
  execution: ExecutionNode,
  input: InputNode,
  output: OutputNode,
  oscommand: OsCommandNode,
  stop: StopNode,
}

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    position: { x: 50, y: 250 },
    data: { label: 'Start' },
  },
  {
    id: 'config',
    type: 'config',
    position: { x: 250, y: 250 },
    data: { label: 'config' },
  },
  {
    id: 'config-loading',
    type: 'execution',
    position: { x: 450, y: 250 },
    data: { label: 'config loading', showPolygon: false },
  },
  {
    id: 'oscommand',
    type: 'oscommand',
    position: { x: 750, y: 100 },
    data: { label: 'oscommand' },
  },
  {
    id: 'stop',
    type: 'stop',
    position: { x: 950, y: 250 },
    data: { label: 'stop' },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e-start-config',
    source: 'start',
    target: 'config',
    type: 'default',
    className: 'custom-edge',
  },
  {
    id: 'e-config-configloading',
    source: 'config',
    target: 'config-loading',
    type: 'default',
    className: 'custom-edge',
  },
  {
    id: 'e-configloading-oscommand',
    source: 'config-loading',
    target: 'oscommand',
    type: 'default',
    className: 'custom-edge curved-edge',
    animated: false,
  },
  {
    id: 'e-oscommand-stop',
    source: 'oscommand',
    target: 'stop',
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
      if (node.id === 'config-loading') {
        if (!isExpanded) {
          setIsExpanded(true)

          const inputNodes: Node[] = [
            {
              id: 'polygon-input-1',
              type: 'input',
              position: { x: 350, y: 80 },
              data: { label: 'input node' },
            },
            {
              id: 'polygon-input-2',
              type: 'input',
              position: { x: 550, y: 80 },
              data: { label: 'input node' },
            },
          ]

          const outputNodes: Node[] = [
            {
              id: 'polygon-output-1',
              type: 'output',
              position: { x: 350, y: 420 },
              data: { label: 'output node' },
            },
            {
              id: 'polygon-output-2',
              type: 'output',
              position: { x: 550, y: 420 },
              data: { label: 'output node' },
            },
          ]

          const polygonEdges: Edge[] = [
            {
              id: 'e-polygon-input1-configloading',
              source: 'polygon-input-1',
              target: 'config-loading',
              type: 'default',
              className: 'custom-edge polygon-edge',
              animated: false,
            },
            {
              id: 'e-polygon-input2-configloading',
              source: 'polygon-input-2',
              target: 'config-loading',
              type: 'default',
              className: 'custom-edge polygon-edge',
              animated: false,
            },
            {
              id: 'e-configloading-output1',
              source: 'config-loading',
              target: 'polygon-output-1',
              type: 'default',
              className: 'custom-edge polygon-edge',
              animated: false,
            },
            {
              id: 'e-configloading-output2',
              source: 'config-loading',
              target: 'polygon-output-2',
              type: 'default',
              className: 'custom-edge polygon-edge',
              animated: false,
            },
          ]

          setNodes((nds) => {
            return nds
              .map((n) => {
                if (n.id === 'config-loading') {
                  return {
                    ...n,
                    data: {
                      ...n.data,
                      showPolygon: true,
                    },
                  }
                }
                return n
              })
              .concat(inputNodes)
              .concat(outputNodes)
          })

          setEdges((eds) => eds.concat(polygonEdges))
        } else {
          setIsExpanded(false)

          setNodes((nds) => {
            return nds
              .filter(
                (n) =>
                  !n.id.startsWith('polygon-input-') &&
                  !n.id.startsWith('polygon-output-')
              )
              .map((n) => {
                if (n.id === 'config-loading') {
                  return {
                    ...n,
                    data: {
                      ...n.data,
                      showPolygon: false,
                    },
                  }
                }
                return n
              })
          })

          setEdges((eds) =>
            eds.filter(
              (e) =>
                !e.id.startsWith('e-polygon-') &&
                !e.id.startsWith('e-configloading-output')
            )
          )
        }
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
