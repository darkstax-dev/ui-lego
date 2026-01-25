import { useState } from 'react'
import { TopologyCanvas } from '../src/TopologyCanvas'
import type { K8sNode } from '../src/TopologyCanvas'
import '../tokens.css'
import './styles.css'

function App() {
  const [selectedNode, setSelectedNode] = useState<K8sNode | null>(null)

  const handleNodeClick = (node: K8sNode) => {
    console.log('Node clicked:', node)
    setSelectedNode(node)
  }

  const handleNodeDoubleClick = (node: K8sNode) => {
    console.log('Node double-clicked:', node)
  }

  const handleCanvasClick = () => {
    console.log('Canvas clicked')
    setSelectedNode(null)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <TopologyCanvas
        onNodeClick={handleNodeClick}
        onNodeDoubleClick={handleNodeDoubleClick}
        onCanvasClick={handleCanvasClick}
      />
      
      {selectedNode && (
        <div 
          style={{
            position: 'fixed',
            top: 20,
            right: 320,
            padding: '16px',
            background: 'var(--color-gray-200)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            zIndex: 1000
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-family-macan)' }}>
            Selected Node
          </h4>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            <strong>Name:</strong> {selectedNode.name}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            <strong>Type:</strong> {selectedNode.type}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            <strong>Status:</strong> {selectedNode.status}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
