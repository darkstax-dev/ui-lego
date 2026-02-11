import React from 'react'
import { Database, Graph1, RestAPI, SearchPanel } from 'ui-lego/src/components/metamapper-components'
import { Button } from 'ui-lego/src/components/buttons'

export function MetaMapperComponentsDemo() {
  return (
    <div style={{ 
      padding: '40px', 
      background: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 700, 
        marginBottom: '12px',
        color: '#00112B'
      }}>
        MetaMapper Components
      </h1>
      <p style={{ 
        fontSize: '16px', 
        color: '#78797A', 
        marginBottom: '40px' 
      }}>
        A collection of components for the MetaMapper interface
      </p>

      {/* Response Button Demo */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          marginBottom: '20px',
          color: '#00112B'
        }}>
          Response Button (New Button Variant)
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="response" onClick={() => alert('Response button clicked!')}>
            RESPONSE
          </Button>
          <Button variant="response" state="disabled" disabled>
            RESPONSE (DISABLED)
          </Button>
          <Button variant="primary" onClick={() => alert('Primary button clicked!')}>
            PRIMARY
          </Button>
          <Button variant="secondary" onClick={() => alert('Secondary button clicked!')}>
            SECONDARY
          </Button>
        </div>
      </section>

      {/* Components Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Database Component */}
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            marginBottom: '12px',
            color: '#00112B'
          }}>
            Database Component
          </h2>
          <Database 
            onConnect={(data) => {
              console.log('Database connection data:', data)
              alert(`Connecting to database:\nHost: ${data.host}\nPort: ${data.port}\nDB: ${data.dbName}`)
            }}
            initialData={{
              host: 'localhost',
              port: '5432',
            }}
          />
        </div>

        {/* Graph1 Component */}
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            marginBottom: '12px',
            color: '#00112B'
          }}>
            Graph1 Component
          </h2>
          <Graph1 
            onSend={(url) => {
              console.log('Sending request to:', url)
              alert(`Sending request to: ${url}`)
            }}
            onResponse={() => {
              console.log('Response button clicked')
              alert('Opening response viewer...')
            }}
          />
        </div>

        {/* RestAPI Component */}
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            marginBottom: '12px',
            color: '#00112B'
          }}>
            RestAPI Component
          </h2>
          <RestAPI 
            onSend={(method, url) => {
              console.log('API request:', method, url)
              alert(`${method} request to: ${url}`)
            }}
            onResponse={() => {
              console.log('Response button clicked')
              alert('Opening response viewer...')
            }}
          />
        </div>

        {/* SearchPanel Component */}
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            marginBottom: '12px',
            color: '#00112B'
          }}>
            SearchPanel Component
          </h2>
          <SearchPanel 
            inputNodes={[
              'String Input',
              'Number Input',
              'Boolean Input',
              'File Input'
            ]}
            outputNodes={[
              'JSON Output',
              'CSV Output',
              'Text Output'
            ]}
            executionNodes={[
              'Execute Function',
              'Run Query',
              'Process Data',
              'Transform',
              'Filter'
            ]}
            onSearch={(value) => {
              console.log('Search value:', value)
            }}
          />
        </div>
      </div>

      {/* Usage Information */}
      <section style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          marginBottom: '16px',
          color: '#00112B'
        }}>
          Usage
        </h2>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
{`import {
  Database,
  Graph1,
  RestAPI,
  SearchPanel
} from 'ui-lego/src/components/metamapper-components'

// Database Component
<Database 
  onConnect={(data) => console.log(data)}
  initialData={{ host: 'localhost', port: '5432' }}
/>

// Graph1 Component
<Graph1 
  onSend={(url) => console.log(url)}
  onResponse={() => console.log('response')}
/>

// RestAPI Component
<RestAPI 
  onSend={(method, url) => console.log(method, url)}
  onResponse={() => console.log('response')}
/>

// SearchPanel Component
<SearchPanel 
  inputNodes={['Input 1', 'Input 2']}
  outputNodes={['Output 1']}
  executionNodes={['Exec 1', 'Exec 2']}
  onSearch={(value) => console.log(value)}
/>

// Response Button
<Button variant="response">RESPONSE</Button>`}
        </pre>
      </section>
    </div>
  )
}
