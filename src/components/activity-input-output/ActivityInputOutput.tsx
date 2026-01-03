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
  
  // Refs to hold the latest callback functions to avoid stale closures
  const callbacksRef = useRef<{
    handleDeleteNode: (nodeId: string) => void
    handleAddInput: (nodeId: string, inputType: string) => void
    handleAddOutput: (nodeId: string, outputType: string) => void
    handleToggleInputGroup: (nodeId: string) => void
    handleToggleOutputGroup: (nodeId: string) => void
    handleCollapseNode: (nodeId: string) => void
  } | null>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, className: 'custom-edge' }, eds)),
    [setEdges]
  )

  // Helper function to calculate grid position for input/output nodes
  // Positions nodes in a horizontal row above (inputs) or below (outputs) the parent
  const calculateNodePosition = useCallback((
    parentX: number,
    parentY: number,
    index: number,
    total: number,
    isInput: boolean
  ) => {
    const spacing = 80 // Horizontal spacing between nodes
    const verticalOffset = 150 // Distance above/below parent node
    
    // Calculate total width needed for all nodes
    const totalWidth = (total - 1) * spacing
    // Start position to center the row around parent
    const startX = parentX - totalWidth / 2
    
    return {
      x: startX + index * spacing,
      y: isInput ? parentY - verticalOffset : parentY + verticalOffset,
    }
  }, [])

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
      newSet.delete(`${nodeId}-inputs`)
      newSet.delete(`${nodeId}-outputs`)
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
        if ((e.source.startsWith(`${nodeId}-input-`) && e.target === nodeId) ||
            (e.source === nodeId && e.target.startsWith(`${nodeId}-output-`))) {
          return { ...e, hidden: true }
        }
        return e
      }))

      return newSet
    })
  }, [setNodes, setEdges])

  const handleAddInput = useCallback((nodeId: string, inputType: string) => {
    setNodes((currentNodes) => {
      const parentNode = currentNodes.find((n) => n.id === nodeId)
      if (!parentNode) return currentNodes

      inputIdCounter.current += 1
      const newInputId = `${nodeId}-input-${inputIdCounter.current}`

      // Count existing inputs for this node
      const existingInputs = currentNodes.filter((n) => n.id.startsWith(`${nodeId}-input-`) && !n.id.includes('background'))
      const inputCount = existingInputs.length + 1

      const newInputNode: Node = {
        id: newInputId,
        type: 'input',
        position: calculateNodePosition(
          parentNode.position.x + 26,
          parentNode.position.y,
          existingInputs.length,
          inputCount,
          true
        ),
        data: { label: inputType },
        hidden: false,
      }

      const newInputEdge: Edge = {
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

      // Add the edge
      setEdges((eds) => [...eds, newInputEdge])

      // Reposition all existing input nodes in a row
      let updatedNodes = currentNodes.map((n) => {
        if (n.id.startsWith(`${nodeId}-input-`) && !n.id.includes('background')) {
          const inputIndex = existingInputs.findIndex(input => input.id === n.id)
          if (inputIndex !== -1) {
            return {
              ...n,
              position: calculateNodePosition(
                parentNode.position.x + 26,
                parentNode.position.y,
                inputIndex,
                inputCount,
                true
              ),
            }
          }
        }
        return n
      })

      // Calculate background width and position to match node spacing
      const spacing = 80
      const nodeWidth = 52 // Approximate width of input/output nodes
      const bgWidth = (inputCount - 1) * spacing + 160 // Width to encompass nodes
      // Center the background on the nodes (which are centered on parentNode.position.x + 26)
      const parentCenterX = parentNode.position.x + 26 + nodeWidth / 2
      const bgX = parentCenterX - bgWidth / 2
      // Position so nodes sit in the upper portion of the pentagon
      const bgY = parentNode.position.y - 150 - 50 // Node is 150px above parent

      // Check if input background exists
      const inputBgId = `${nodeId}-input-background`
      const existingBg = updatedNodes.find((n) => n.id === inputBgId)

      if (existingBg) {
        // Update existing background position and count
        updatedNodes = updatedNodes.map((n) => {
          if (n.id === inputBgId) {
            return {
              ...n,
              position: { x: bgX, y: bgY },
              data: { type: 'input', count: inputCount },
              hidden: false,
            }
          }
          return n
        })
      } else {
        // Create new background
        const backgroundNode: Node = {
          id: inputBgId,
          type: 'groupBackground',
          position: { x: bgX, y: bgY },
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
  }, [setExpandedNodes, setNodes, setEdges, calculateNodePosition])

  const handleAddOutput = useCallback((nodeId: string, outputType: string) => {
    setNodes((currentNodes) => {
      const parentNode = currentNodes.find((n) => n.id === nodeId)
      if (!parentNode) return currentNodes

      outputIdCounter.current += 1
      const newOutputId = `${nodeId}-output-${outputIdCounter.current}`

      // Count existing outputs for this node
      const existingOutputs = currentNodes.filter((n) => n.id.startsWith(`${nodeId}-output-`) && !n.id.includes('background'))
      const outputCount = existingOutputs.length + 1

      const newOutputNode: Node = {
        id: newOutputId,
        type: 'output',
        position: calculateNodePosition(
          parentNode.position.x + 26,
          parentNode.position.y,
          existingOutputs.length,
          outputCount,
          false
        ),
        data: { label: outputType },
        hidden: false,
      }

      const newOutputEdge: Edge = {
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

      // Add the edge
      setEdges((eds) => [...eds, newOutputEdge])

      // Reposition all existing output nodes in a row
      let updatedNodes = currentNodes.map((n) => {
        if (n.id.startsWith(`${nodeId}-output-`) && !n.id.includes('background')) {
          const outputIndex = existingOutputs.findIndex(output => output.id === n.id)
          if (outputIndex !== -1) {
            return {
              ...n,
              position: calculateNodePosition(
                parentNode.position.x + 26,
                parentNode.position.y,
                outputIndex,
                outputCount,
                false
              ),
            }
          }
        }
        return n
      })

      // Calculate background width and position to match node spacing
      const spacing = 80
      const nodeWidth = 52 // Approximate width of input/output nodes
      const bgWidth = (outputCount - 1) * spacing + 160 // Width to encompass nodes
      // Center the background on the nodes (which are centered on parentNode.position.x + 26)
      const parentCenterX = parentNode.position.x + 26 + nodeWidth / 2
      const bgX = parentCenterX - bgWidth / 2
      // Position so nodes sit in the lower portion of the pentagon - same distance as input
      const bgY = parentNode.position.y + 50 // Start below execution node with same gap as input has above

      // Check if output background exists
      const outputBgId = `${nodeId}-output-background`
      const existingBg = updatedNodes.find((n) => n.id === outputBgId)

      if (existingBg) {
        // Update existing background position and count
        updatedNodes = updatedNodes.map((n) => {
          if (n.id === outputBgId) {
            return {
              ...n,
              position: { x: bgX, y: bgY },
              data: { type: 'output', count: outputCount },
              hidden: false,
            }
          }
          return n
        })
      } else {
        // Create new background
        const backgroundNode: Node = {
          id: outputBgId,
          type: 'groupBackground',
          position: { x: bgX, y: bgY },
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
  }, [setExpandedNodes, setNodes, setEdges, calculateNodePosition])

  // Update the callbacks ref whenever the callbacks change
  useEffect(() => {
    callbacksRef.current = {
      handleDeleteNode,
      handleAddInput,
      handleAddOutput,
      handleToggleInputGroup,
      handleToggleOutputGroup,
      handleCollapseNode,
    }
  }, [handleDeleteNode, handleAddInput, handleAddOutput, handleToggleInputGroup, handleToggleOutputGroup, handleCollapseNode])

  // Stable callback wrappers that use refs
  const stableHandleDeleteNode = useCallback((nodeId: string) => {
    callbacksRef.current?.handleDeleteNode(nodeId)
  }, [])

  const stableHandleAddInput = useCallback((nodeId: string, inputType: string) => {
    callbacksRef.current?.handleAddInput(nodeId, inputType)
  }, [])

  const stableHandleAddOutput = useCallback((nodeId: string, outputType: string) => {
    callbacksRef.current?.handleAddOutput(nodeId, outputType)
  }, [])

  const stableHandleToggleInputGroup = useCallback((nodeId: string) => {
    callbacksRef.current?.handleToggleInputGroup(nodeId)
  }, [])

  const stableHandleToggleOutputGroup = useCallback((nodeId: string) => {
    callbacksRef.current?.handleToggleOutputGroup(nodeId)
  }, [])

  const stableHandleCollapseNode = useCallback((nodeId: string) => {
    callbacksRef.current?.handleCollapseNode(nodeId)
  }, [])

  const handleAddNode = useCallback(() => {
    nodeIdCounter.current += 1
    const newNodeId = `execution-${nodeIdCounter.current}`

    setNodes((currentNodes) => {
      // Find the rightmost execution node to place the new one next to it
      const executionNodes = currentNodes.filter((n) => n.type === 'execution')
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
          onDelete: stableHandleDeleteNode,
          onAddInput: stableHandleAddInput,
          onAddOutput: stableHandleAddOutput,
          onToggleInputGroup: stableHandleToggleInputGroup,
          onToggleOutputGroup: stableHandleToggleOutputGroup,
          onCollapse: stableHandleCollapseNode,
        },
      }

      // Remove edge from last execution node to stop
      const lastExecutionNode = rightmostNode
      const stopNode = currentNodes.find((n) => n.type === 'stop')

      if (stopNode) {
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

        // Update stop node position and add new node
        const updatedNodes = currentNodes.map((n) => {
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
      }
      return currentNodes
    })
  }, [setNodes, setEdges, stableHandleDeleteNode, stableHandleAddInput, stableHandleAddOutput, stableHandleToggleInputGroup, stableHandleToggleOutputGroup, stableHandleCollapseNode])

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
          onDelete: stableHandleDeleteNode,
          onAddInput: stableHandleAddInput,
          onAddOutput: stableHandleAddOutput,
          onToggleInputGroup: stableHandleToggleInputGroup,
          onToggleOutputGroup: stableHandleToggleOutputGroup,
          onCollapse: stableHandleCollapseNode,
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
  }, [stableHandleDeleteNode, stableHandleAddInput, stableHandleAddOutput, stableHandleToggleInputGroup, stableHandleToggleOutputGroup, stableHandleCollapseNode])

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