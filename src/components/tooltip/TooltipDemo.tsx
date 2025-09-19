import React, { useState } from 'react'
import Tooltip from './Tooltip'

const TooltipDemo: React.FC = () => {
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top')
  const [hasBody, setHasBody] = useState(true)
  const [title, setTitle] = useState('Title')
  const [body, setBody] = useState('Body text')

  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ marginBottom: '24px', color: '#333' }}>Tooltip Demo</h2>
      
      <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            Placement:
          </label>
          <select 
            value={placement} 
            onChange={(e) => setPlacement(e.target.value as any)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            Title:
          </label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            Body:
          </label>
          <input 
            type="text" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={!hasBody}
            style={{ 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ccc', 
              width: '120px',
              opacity: hasBody ? 1 : 0.5
            }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
            <input 
              type="checkbox" 
              checked={hasBody}
              onChange={(e) => setHasBody(e.target.checked)}
            />
            Show body text
          </label>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        border: '2px dashed #e0e0e0',
        borderRadius: '8px',
        position: 'relative'
      }}>
        <Tooltip
          title={title}
          body={body}
          hasBody={hasBody}
          placement={placement}
          visible={true}
        />
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#333' }}>All Variants:</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '32px',
          padding: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '16px', fontWeight: 500 }}>Top</p>
            <Tooltip title="Title" body="Body text" placement="top" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '16px', fontWeight: 500 }}>Bottom</p>
            <Tooltip title="Title" body="Body text" placement="bottom" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '16px', fontWeight: 500 }}>Left</p>
            <Tooltip title="Title" body="Body text" placement="left" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '16px', fontWeight: 500 }}>Right</p>
            <Tooltip title="Title" body="Body text" placement="right" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#333' }}>Without Body Text:</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '32px',
          padding: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Tooltip title="Just Title" hasBody={false} placement="top" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Tooltip title="Just Title" hasBody={false} placement="bottom" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Tooltip title="Just Title" hasBody={false} placement="left" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Tooltip title="Just Title" hasBody={false} placement="right" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TooltipDemo
