import React, { useCallback, useRef, useEffect, useState } from 'react'
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
import ExecutionNode from './ExecutionNode'
import InputNode from './InputNode'
import OutputNode from './OutputNode'
import StopNode from './StopNode'
import GroupBackground from './GroupBackground'

const nodeTypes: NodeTypes = {
  start: StartNode,
  execution: ExecutionNode,
  input: InputNode,
  output: OutputNode,
  stop: StopNode,
  groupBackground: GroupBackground,
}

export interface ActivityInputOutputProps {
  className?: string
}

const ActivityInputOutput: React.FC<ActivityInputOutputProps> = ({ className = '' }) => {
  const nodeIdCounter = useRef(1)
  const inputIdCounter = useRef(0)
  const outputIdCounter = useRef(0)

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, className: 'custom-edge' }, eds)),
    [setEdges]
  )

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => 
      n.id !== nodeId && 
      !n.id.startsWith(`${nodeId}-input-`) && 
      !n.id.startsWith(`${nodeId}-output-`)
    ))
    setEdges((eds) => eds.filter((e) => 
      e.source !== nodeId && 
      e.target !== nodeId && 
      !e.source.startsWith(`${nodeId}-`) && 
      !e.target.startsWith(`${nodeId}-`)
    ))
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      newSet.delete(nodeId)
      return newSet
    })
  }, [setNodes, setEdges, setExpandedNodes])

  const handleToggleInputGroup = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      const key = `${nodeId}-inputs`

      if (newSet.has(key)) {
        newSet.delete(key)
        // Hide inputs
        setNodes((nds) => nds.map((n) => {
          if (n.id.startsWith(`${nodeId}-input-`) || n.id === `${nodeId}-input-background`) {
            return { ...n, hidden: true }
          }
          return n
        }))
        setEdges((eds) => eds.map((e) => {
          if (e.source.startsWith(`${nodeId}-input-`) && e.target === nodeId) {
            return { ...e, hidden: true }
          }
          return e
        }))
      } else {
        newSet.add(key)
        // Show inputs
        setNodes((nds) => nds.map((n) => {
          if (n.id.startsWith(`${nodeId}-input-`) || n.id === `${nodeId}-input-background`) {
            return { ...n, hidden: false }
          }
          return n
        }))
        setEdges((eds) => eds.map((e) => {
          if (e.source.startsWith(`${nodeId}-input-`) && e.target === nodeId) {
            return { ...e, hidden: false }
          }
          return e
        }))
      }
      return newSet
    })
  }, [setNodes, setEdges])

  const handleToggleOutputGroup = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      const key = `${nodeId}-outputs`

      if (newSet.has(key)) {
        newSet.delete(key)
        // Hide outputs
        setNodes((nds) => nds.map((n) => {
          if (n.id.startsWith(`${nodeId}-output-`) || n.id === `${nodeId}-output-background`) {
            return { ...n, hidden: true }
          }
          return n
        }))
        setEdges((eds) => eds.map((e) => {
          if (e.target.startsWith(`${nodeId}-output-`) && e.source === nodeId) {
            return { ...e, hidden: true }
          }
          return e
        }))
      } else {
        newSet.add(key)
        // Show outputs
        setNodes((nds) => nds.map((n) => {
          if (n.id.startsWith(`${nodeId}-output-`) || n.id === `${nodeId}-output-background`) {
            return { ...n, hidden: false }
          }
          return n
        }))
        setEdges((eds) => eds.map((e) => {
          if (e.target.startsWith(`${nodeId}-output-`) && e.source === nodeId) {
            return { ...e, hidden: false }
          }
          return e
        }))
      }
      return newSet
    })
  }, [setNodes, setEdges])

  const handleCollapseNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      newSet.delete(`${nodeId}-inputs`)
      newSet.delete(`${nodeId}-outputs`)

      // Hide all inputs and outputs
      setNodes((nds) => nds.map((n) => {
        if (n.id.startsWith(`${nodeId}-input-`) ||
            n.id.startsWith(`${nodeId}-output-`) ||
            n.id === `${nodeId}-input-background` ||
            n.id === `${nodeId}-output-background`) {
          return { ...n, hidden: true }
        }
        return n
      }))
      setEdges((eds) => eds.map((e) => {
        if (e.source.startsWith(`${nodeId}-`) || e.target.startsWith(`${nodeId}-`)) {
          return { ...e, hidden: true }
        }
        return e
      }))

      return newSet
    })
  }, [setNodes, setEdges])

  const handleAddInput = useCallback((nodeId: string, inputType: string) => {
    const parentNode = nodes.find((n) => n.id === nodeId)
    if (!parentNode) return

    inputIdCounter.current += 1
    const newInputId = `${nodeId}-input-${inputIdCounter.current}`

    // Count existing inputs for this node
    const existingInputs = nodes.filter((n) => n.id.startsWith(`${nodeId}-input-`) && !n.id.includes('background'))
    const inputCount = existingInputs.length + 1

    // Helper function to calculate position in arc
    const calculateArcPosition = (index: number, total: number, isInput: boolean) => {
      const radius = 150
      const arcAngle = Math.min(120, total * 30)
      const startAngle = isInput ? 90 - arcAngle / 2 : 270 - arcAngle / 2
      const angleStep = total > 1 ? arcAngle / (total - 1) : 0
      const currentAngle = startAngle + angleStep * index
      const angleRad = (currentAngle * Math.PI) / 180

      return {
        x: parentNode.position.x + Math.cos(angleRad) * radius - 26,
        y: parentNode.position.y - Math.sin(angleRad) * radius - 26,
      }
    }

    const newInputNode: Node = {
      id: newInputId,
      type: 'input',
      position: calculateArcPosition(existingInputs.length, inputCount, true),
      data: { label: inputType },
      hidden: false,
    }

    const newEdge: Edge = {
      id: `e-${newInputId}-${nodeId}`,
      source: newInputId,
      target: nodeId,
      targetHandle: 'top',
      type: 'default',
      className: 'custom-edge',
      hidden: false,
    }

    // Mark the node as expanded
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      newSet.add(`${nodeId}-inputs`)
      return newSet
    })

    setNodes((nds) => {
      // Update parent node data to include the callbacks
      let updatedNodes = nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              onDelete: handleDeleteNode,
              onAddInput: handleAddInput,
              onAddOutput: handleAddOutput,
              onToggleInputGroup: handleToggleInputGroup,
              onToggleOutputGroup: handleToggleOutputGroup,
              onCollapse: handleCollapseNode,
            },
          }
        }
        return n
      })

      // Check if input background exists
      const inputBgId = `${nodeId}-input-background`
      const existingBg = updatedNodes.find((n) => n.id === inputBgId)

      if (existingBg) {
        // Update existing background
        updatedNodes = updatedNodes.map((n) => {
          if (n.id === inputBgId) {
            return {
              ...n,
              data: { type: 'input', count: inputCount },
            }
          }
          return n
        })
      } else {
        // Create new background
        const backgroundNode: Node = {
          id: inputBgId,
          type: 'groupBackground',
          position: {
            x: parentNode.position.x - 160,
            y: parentNode.position.y - 200,
          },
          data: { type: 'input', count: inputCount },
          draggable: false,
          selectable: false,
          zIndex: -1,
          hidden: false,
        }
        updatedNodes = [...updatedNodes, backgroundNode]
      }

      return [...updatedNodes, newInputNode]
    })
    setEdges((eds) => [...eds, newEdge])
  }, [nodes, setExpandedNodes, setNodes, setEdges]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddOutput = useCallback((nodeId: string, outputType: string) => {
    const parentNode = nodes.find((n) => n.id === nodeId)
    if (!parentNode) return

    outputIdCounter.current += 1
    const newOutputId = `${nodeId}-output-${outputIdCounter.current}`

    // Count existing outputs for this node to calculate position
    const existingOutputs = nodes.filter((n) => n.id.startsWith(`${nodeId}-output-`) && !n.id.includes('background'))
    const outputCount = existingOutputs.length + 1

    // Calculate geometric positioning (arc pattern below the node)
    const radius = 150 // Distance from parent node
    const arcAngle = Math.min(120, outputCount * 30) // Max 120 degrees arc
    const startAngle = 270 - arcAngle / 2 // Center the arc below the node
    const angleStep = outputCount > 1 ? arcAngle / (outputCount - 1) : 0
    const currentAngle = startAngle + angleStep * existingOutputs.length
    const angleRad = (currentAngle * Math.PI) / 180

    const newOutputNode: Node = {
      id: newOutputId,
      type: 'output',
      position: {
        x: parentNode.position.x + Math.cos(angleRad) * radius - 26,
        y: parentNode.position.y - Math.sin(angleRad) * radius - 26,
      },
      data: { label: outputType },
      hidden: false,
    }

    const newEdge: Edge = {
      id: `e-${nodeId}-${newOutputId}`,
      source: nodeId,
      sourceHandle: 'bottom',
      target: newOutputId,
      type: 'default',
      className: 'custom-edge',
      hidden: false,
    }

    // Mark the node as expanded
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      newSet.add(`${nodeId}-outputs`)
      return newSet
    })

    setNodes((nds) => {
      // Update parent node data to include the callbacks
      let updatedNodes = nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              onDelete: handleDeleteNode,
              onAddInput: handleAddInput,
              onAddOutput: handleAddOutput,
              onToggleInputGroup: handleToggleInputGroup,
              onToggleOutputGroup: handleToggleOutputGroup,
              onCollapse: handleCollapseNode,
            },
          }
        }
        return n
      })

      // Check if output background exists
      const outputBgId = `${nodeId}-output-background`
      const existingBg = updatedNodes.find((n) => n.id === outputBgId)

      if (existingBg) {
        // Update existing background
        updatedNodes = updatedNodes.map((n) => {
          if (n.id === outputBgId) {
            return {
              ...n,
              data: { type: 'output', count: outputCount },
            }
          }
          return n
        })
      } else {
        // Create new background
        const backgroundNode: Node = {
          id: outputBgId,
          type: 'groupBackground',
          position: {
            x: parentNode.position.x - 160,
            y: parentNode.position.y + 100,
          },
          data: { type: 'output', count: outputCount },
          draggable: false,
          selectable: false,
          zIndex: -1,
          hidden: false,
        }
        updatedNodes = [...updatedNodes, backgroundNode]
      }

      return [...updatedNodes, newOutputNode]
    })
    setEdges((eds) => [...eds, newEdge])
  }, [nodes, setExpandedNodes, setNodes, setEdges]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddNode = useCallback(() => {
    nodeIdCounter.current += 1
    const newNodeId = `execution-${nodeIdCounter.current}`

    // Find the rightmost execution node to place the new one next to it
    const executionNodes = nodes.filter((n) => n.type === 'execution')
    const rightmostNode = executionNodes.reduce((max, node) => 
      node.position.x > max.position.x ? node : max
    , executionNodes[0])

    const newNode: Node = {
      id: newNodeId,
      type: 'execution',
      position: {
        x: rightmostNode.position.x + 250,
        y: 250,
      },
      data: {
        label: `execution-${nodeIdCounter.current}`,
        id: newNodeId,
        onDelete: handleDeleteNode,
        onAddInput: handleAddInput,
        onAddOutput: handleAddOutput,
        onToggleInputGroup: handleToggleInputGroup,
        onToggleOutputGroup: handleToggleOutputGroup,
        onCollapse: handleCollapseNode,
      },
    }

    // Remove edge from last execution node to stop
    const lastExecutionNode = rightmostNode
    const stopNode = nodes.find((n) => n.type === 'stop')

    if (stopNode) {
      // Update stop node position
      setNodes((nds) => {
        const updatedNodes = nds.map((n) => {
          if (n.id === stopNode.id) {
            return {
              ...n,
              position: {
                x: newNode.position.x + 250,
                y: n.position.y,
              },
            }
          }
          return n
        })
        return [...updatedNodes, newNode]
      })

      // Update edges
      setEdges((eds) => {
        const filteredEdges = eds.filter((e) => !(e.source === lastExecutionNode.id && e.target === stopNode.id))
        return [
          ...filteredEdges,
          {
            id: `e-${lastExecutionNode.id}-${newNodeId}`,
            source: lastExecutionNode.id,
            target: newNodeId,
            type: 'default',
            className: 'custom-edge',
          },
          {
            id: `e-${newNodeId}-${stopNode.id}`,
            source: newNodeId,
            target: stopNode.id,
            type: 'default',
            className: 'custom-edge',
          },
        ]
      })
    }
  }, [nodes, setNodes, setEdges]) // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize nodes on mount
  useEffect(() => {
    setNodes([
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 250 },
        data: { label: 'Start' },
      },
      {
        id: 'execution-1',
        type: 'execution',
        position: { x: 300, y: 250 },
        data: {
          label: 'trigger-ci/cd',
          id: 'execution-1',
          onDelete: handleDeleteNode,
          onAddInput: handleAddInput,
          onAddOutput: handleAddOutput,
          onToggleInputGroup: handleToggleInputGroup,
          onToggleOutputGroup: handleToggleOutputGroup,
          onCollapse: handleCollapseNode,
        },
      },
      {
        id: 'stop',
        type: 'stop',
        position: { x: 550, y: 250 },
        data: { label: 'Stop' },
      },
    ])

    setEdges([
      {
        id: 'e-start-execution-1',
        source: 'start',
        target: 'execution-1',
        type: 'default',
        className: 'custom-edge',
      },
      {
        id: 'e-execution-1-stop',
        source: 'execution-1',
        target: 'stop',
        type: 'default',
        className: 'custom-edge',
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`activity-input-output ${className}`}>
      <button className="add-node-button" onClick={handleAddNode}>
        + Add Node
      </button>
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
