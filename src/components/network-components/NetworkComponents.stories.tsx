import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import FeedManager from './FeedManager'
import { ManagerPanel } from './ManagerPanel'
import { Toast } from './Toast'

const NetworkComponentsDemo = () => {
  const [showToast, setShowToast] = React.useState(false)

  React.useEffect(() => {
    // Show toast after 2 seconds
    const timer = setTimeout(() => {
      setShowToast(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <FeedManager
            activeTab="feeds"
            distance={400}
            contributingFeeds={[
              { id: 'nwas', label: 'NWAS', checked: true },
              { id: 'highway', label: 'Highway Patrol', checked: false },
              { id: 'emergency', label: 'Emergency', checked: true },
              { id: 'social', label: 'Social feed', checked: false }
            ]}
            feedInfo={[
              { name: 'Danaging Winds', value: '38-49 mhp', valueColor: 'default' },
              { name: 'Hall possible', value: 'Large', valueColor: 'default' },
              { name: 'Herricane', value: 'Very Likely', valueColor: 'warning' },
              { name: 'Flooding', value: 'Confirmed', valueColor: 'danger' },
              { name: 'Location affected', value: '4', valueColor: 'default' },
              { name: 'Trail last update', value: '00:00:00 UTC', valueColor: 'default' },
              { name: 'Est Persons', value: '3,672', valueColor: 'default' },
              { name: 'State of emergency', value: 'No', valueColor: 'default' }
            ]}
            informationSources={[
              { id: 'nwas', label: 'NWAS' },
              { id: 'neh', label: 'NEH' },
              { id: 'faa', label: 'FAA' }
            ]}
            onTabChange={(tab) => console.log('Tab changed:', tab)}
            onDistanceChange={(distance) => console.log('Distance:', distance)}
            onSeeDetails={() => console.log('See details clicked')}
          />
        </div>

        <div style={{ flex: '1 1 400px' }}>
          <ManagerPanel
            title="Manager"
            activeTab="layers"
            layers={[
              { id: '1', name: 'Core visual leyers', visible: true, expanded: false },
              { id: '2', name: 'Custom group', visible: true, expanded: false }
            ]}
            onTabChange={(tab) => console.log('Tab changed:', tab)}
            onLayerToggle={(id) => console.log('Layer toggle:', id)}
            onLayerExpand={(id) => console.log('Layer expand:', id)}
          />
        </div>
      </div>

      {showToast && (
        <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 1000 }}>
          <Toast
            location="Denver"
            potentialImpact="PIP, Financial records"
            threatLevel="High"
            badActorSource="128.39.202.55"
          />
        </div>
      )}
    </div>
  )
}

const meta: Meta = {
  title: 'Network Components/All Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Combined demo of all network components: FeedManager, ManagerPanel, and Toast notifications.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta

export const AllComponentsDemo: StoryObj = {
  render: () => <NetworkComponentsDemo />,
}

export const SideBySide: StoryObj = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Feed Manager</h3>
        <FeedManager
          activeTab="emergency"
          distance={350}
          feedInfo={[
            { name: 'Danaging Winds', value: '38-49 mhp', valueColor: 'default' },
            { name: 'Hall possible', value: 'Large', valueColor: 'default' },
            { name: 'Herricane', value: 'Very Likely', valueColor: 'warning' },
            { name: 'Flooding', value: 'Confirmed', valueColor: 'danger' },
          ]}
          informationSources={[
            { id: 'nwas', label: 'NWAS' },
            { id: 'neh', label: 'NEH' }
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Manager Panel</h3>
        <ManagerPanel
          activeTab="layers"
          layers={[
            { id: '1', name: 'Core visual leyers', visible: true },
            { id: '2', name: 'Custom group', visible: true }
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Alert Toast</h3>
        <Toast
          location="San Francisco"
          potentialImpact="Infrastructure, User data"
          threatLevel="Critical"
          badActorSource="192.168.100.45"
        />
      </div>
    </div>
  ),
}
