import React, { useState } from 'react'
import OptionBar from './OptionBar'
import './OptionBar.css'

const OptionBarDemo: React.FC = () => {
  const [lastAction, setLastAction] = useState<string>('')

  const handleAction = (action: string) => {
    setLastAction(action)
    console.log(`Action triggered: ${action}`)
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--sds-size-space-600)', 
      padding: 'var(--sds-size-space-800)',
      background: 'var(--color-gray-100)',
      minHeight: '100vh'
    }}>
      <div>
        <h2 className="heading-subheading-macan" style={{ marginBottom: 'var(--sds-size-space-400)' }}>
          Option Bar Component
        </h2>
        <p className="body-base-macan-book" style={{ marginBottom: 'var(--sds-size-space-600)' }}>
          Dropdown menu for scenario actions
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: 'var(--sds-size-space-800)',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}>
        <div>
          <h3 className="body-base-macan-semibold" style={{ marginBottom: 'var(--sds-size-space-300)' }}>
            Default Option Bar
          </h3>
          <OptionBar
            onOpen={() => handleAction('Open')}
            onVersionHistory={() => handleAction('Version History')}
            onEdit={() => handleAction('Edit')}
            onScenarioAccessibility={() => handleAction('Scenario Accessibility')}
            onScenarioNodes={() => handleAction('Scenario Nodes')}
            onDeploy={() => handleAction('Deploy')}
            onRun={() => handleAction('Run')}
            onDeleteNamespace={() => handleAction('Delete Namespace')}
            onDelete={() => handleAction('Delete')}
          />
        </div>
      </div>

      {lastAction && (
        <div style={{
          padding: 'var(--sds-size-space-400)',
          background: 'var(--color-blue-dark-950)',
          color: 'var(--text-white-main)',
          borderRadius: '0',
          fontFamily: 'var(--font-family-macan-mono)',
          fontSize: 'var(--font-size-sm)'
        }}>
          Last action: <strong>{lastAction}</strong>
        </div>
      )}
    </div>
  )
}

export default OptionBarDemo
