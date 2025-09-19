import React, { useState } from 'react'
import Tabs from './Tabs'
import Tab from './Tab'

const TabsDemo: React.FC = () => {
  const [activeTab1, setActiveTab1] = useState('tab1')
  const [activeTab2, setActiveTab2] = useState('overview')

  const basicTabs = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' },
  ]

  const complexTabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'settings', label: 'Settings' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
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
