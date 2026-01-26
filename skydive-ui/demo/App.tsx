import { useMemo, useState } from 'react'
import { TopologyCanvas } from '../src/TopologyCanvas'
import type { K8sNode } from '../src/TopologyCanvas'
import { sampleNodes } from './sampleNodes'
import '../tokens.css'
import './styles.css'

function App() {
  const [selectedNode, setSelectedNode] = useState<K8sNode | null>(null)
  const [canvasKey, setCanvasKey] = useState(1)
  const [useSample, setUseSample] = useState(true)

  const initialNodes = useMemo(() => (useSample ? sampleNodes : []), [useSample])

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
      {/* Demo controls */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1100,
          display: 'flex',
          gap: 8,
          padding: 8,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(6px)'
        }}
      >
        <button
          onClick={() => {
            setUseSample(true)
            setCanvasKey((k) => k + 1)
            setSelectedNode(null)
          }}
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.12)',
            background: useSample ? 'var(--color-blue-700)' : 'white',
            color: useSample ? 'white' : 'var(--color-blue-dark-950)',
            fontFamily: 'var(--font-family-macan)',
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          Load sample data
        </button>

        <button
          onClick={() => {
            setUseSample(false)
            setCanvasKey((k) => k + 1)
            setSelectedNode(null)
          }}
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.12)',
            background: !useSample ? 'var(--color-blue-700)' : 'white',
            color: !useSample ? 'white' : 'var(--color-blue-dark-950)',
            fontFamily: 'var(--font-family-macan)',
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>

      <TopologyCanvas
        key={canvasKey}
        initialNodes={initialNodes}
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
