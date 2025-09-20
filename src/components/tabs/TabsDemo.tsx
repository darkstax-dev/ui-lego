import React, { useState } from 'react'
import Tabs from './Tabs'
import Tab from './Tab'

const TabsDemo: React.FC = () => {
  const [activeTab1, setActiveTab1] = useState('label1')
  const [activeTab2, setActiveTab2] = useState('overview')

  const basicTabs = [
    { value: 'label1', label: 'Label' },
    { value: 'label2', label: 'Label' },
    { value: 'label3', label: 'Label' },
  ]

  const complexTabs = [
    { value: 'overview', label: 'Label' },
    { value: 'analytics', label: 'Label' },
    { value: 'reports', label: 'Label' },
    { value: 'settings', label: 'Label' },
    { value: 'disabled', label: 'Label', disabled: true },
    { value: 'extra', label: 'Label' },
  ]

  return (
    <div style={{ padding: 'var(--sds-size-space-600)', display: 'flex', flexDirection: 'column', gap: 'var(--sds-size-space-1600)' }}>
      <div>
        <h3>Basic Tabs</h3>
        <Tabs
          items={basicTabs}
          activeTab={activeTab1}
          onChange={setActiveTab1}
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          Content for: <strong>{activeTab1}</strong>
        </div>
      </div>

      <div>
        <h3>Complex Tabs with Disabled State</h3>
        <Tabs
          items={complexTabs}
          activeTab={activeTab2}
          onChange={setActiveTab2}
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          Content for: <strong>{activeTab2}</strong>
        </div>
      </div>

      <div>
        <h3>Individual Tab States</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Tab label="Default" active={false} />
          <Tab label="Active" active={true} />
          <Tab label="Disabled" disabled={true} />
          <Tab label="Hover State" active={false} />
        </div>
      </div>

      <div>
        <h3>Long Tab Labels (Mobile Test)</h3>
        <Tabs
          items={[
            { value: 'very-long', label: 'Very Long Tab Name' },
            { value: 'another-long', label: 'Another Long Label' },
            { value: 'short', label: 'Short' },
            { value: 'medium-length', label: 'Medium Length' },
          ]}
        />
      </div>
    </div>
  )
}

export default TabsDemo
