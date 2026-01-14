import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Menu2 from './Menu2'
import MenuItem2 from './MenuItem2'

const meta: Meta<typeof Menu2> = {
  title: 'Components/Menu2',
  component: Menu2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Menu2>

export const Basic: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Menu2>
        <MenuItem2 label="Open" />
        <MenuItem2 label="Edit" />
        <MenuItem2 label="Action Output" hasTrailingArrow />
        <MenuItem2 label="Action Input" hasTrailingArrow />
        <MenuItem2 label="Delete" variant="danger" />
      </Menu2>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Default State</h3>
        <Menu2>
          <MenuItem2 label="Open" variant="default" />
          <MenuItem2 label="Edit" variant="default" />
          <MenuItem2 label="Copy" variant="default" />
        </Menu2>
      </div>

      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>With Trailing Arrows</h3>
        <Menu2>
          <MenuItem2 label="Action Output" variant="default" hasTrailingArrow />
          <MenuItem2 label="Action Input" variant="default" hasTrailingArrow />
          <MenuItem2 label="More Options" variant="default" hasTrailingArrow />
        </Menu2>
      </div>

      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Hover State</h3>
        <Menu2>
          <MenuItem2 label="Hovered Item" variant="hover" />
          <MenuItem2 label="Action Output" variant="hover" hasTrailingArrow />
        </Menu2>
      </div>

      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Danger State</h3>
        <Menu2>
          <MenuItem2 label="Delete" variant="danger" />
          <MenuItem2 label="Remove" variant="danger" />
        </Menu2>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <Menu2>
          <MenuItem2 label="Open" size="small" />
          <MenuItem2 label="Edit" size="small" />
          <MenuItem2 label="Action Output" size="small" hasTrailingArrow />
          <MenuItem2 label="Delete" size="small" variant="danger" />
        </Menu2>
      </div>

      <div style={{ width: '320px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Medium</h3>
        <Menu2>
          <MenuItem2 label="Open" size="medium" />
          <MenuItem2 label="Edit" size="medium" />
          <MenuItem2 label="Action Output" size="medium" hasTrailingArrow />
          <MenuItem2 label="Delete" size="medium" variant="danger" />
        </Menu2>
      </div>

      <div style={{ width: '350px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <Menu2>
          <MenuItem2 label="Open" size="large" />
          <MenuItem2 label="Edit" size="large" />
          <MenuItem2 label="Action Output" size="large" hasTrailingArrow />
          <MenuItem2 label="Delete" size="large" variant="danger" />
        </Menu2>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [clickedItem, setClickedItem] = useState<string>('')
    
    return (
      <div style={{ width: '300px' }}>
        <Menu2>
          <MenuItem2 
            label="Open" 
            onClick={() => setClickedItem('Open')}
          />
          <MenuItem2 
            label="Edit" 
            onClick={() => setClickedItem('Edit')}
          />
          <MenuItem2 
            label="Action Output" 
            hasTrailingArrow 
            onClick={() => setClickedItem('Action Output')}
          />
          <MenuItem2 
            label="Action Input" 
            hasTrailingArrow 
            onClick={() => setClickedItem('Action Input')}
          />
          <MenuItem2 
            label="Delete" 
            variant="danger" 
            onClick={() => setClickedItem('Delete')}
          />
        </Menu2>
        {clickedItem && (
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Last clicked: <strong>{clickedItem}</strong>
          </div>
        )}
      </div>
    )
  },
}

export const ContextMenu: Story = {
  render: () => (
    <div style={{ width: '280px' }}>
      <Menu2 aria-label="Context menu">
        <MenuItem2 label="Open" />
        <MenuItem2 label="Open in new tab" />
        <MenuItem2 label="Edit" />
        <MenuItem2 label="Copy" />
        <MenuItem2 label="Paste" />
        <MenuItem2 label="Share" hasTrailingArrow />
        <MenuItem2 label="Export" hasTrailingArrow />
        <MenuItem2 label="Delete" variant="danger" />
      </Menu2>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Menu2>
        <MenuItem2 label="Open" />
        <MenuItem2 label="Edit" disabled />
        <MenuItem2 label="Action Output" hasTrailingArrow disabled />
        <MenuItem2 label="Copy" />
        <MenuItem2 label="Delete" variant="danger" disabled />
      </Menu2>
    </div>
  ),
}

export const NestedMenuExample: Story = {
  render: () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null)
    const [itemPosition, setItemPosition] = useState<{ top: number } | null>(null)

    const handleMenuItemClick = (item: string, event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setItemPosition({ top: rect.top })
      setExpandedItem(expandedItem === item ? null : item)
    }

    const handleMenuItemEnter = (item: string, event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setItemPosition({ top: rect.top })
      setExpandedItem(item)
    }

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ width: '300px', position: 'relative' }}>
          <Menu2>
            <MenuItem2 label="Open" />
            <MenuItem2 label="Edit" />
            <MenuItem2
              label="Action Output"
              hasTrailingArrow
              onClick={(e) => handleMenuItemClick('output', e as any)}
              onMouseEnter={(e) => handleMenuItemEnter('output', e as any)}
            />
            <MenuItem2
              label="Action Input"
              hasTrailingArrow
              onClick={(e) => handleMenuItemClick('input', e as any)}
              onMouseEnter={(e) => handleMenuItemEnter('input', e as any)}
            />
            <MenuItem2 label="Delete" variant="danger" />
          </Menu2>
        </div>

        {expandedItem && (
          <div
            style={{
              width: '300px',
              position: 'relative'
            }}
          >
            <Menu2>
              <MenuItem2 label="Action" />
              <MenuItem2 label="Action" />
              <MenuItem2 label="Action" />
              <MenuItem2 label="Action" />
            </Menu2>
          </div>
        )}
      </div>
    )
  },
}
