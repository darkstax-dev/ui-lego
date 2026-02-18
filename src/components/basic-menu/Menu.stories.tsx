import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Menu from './Menu'
import MenuItem from './MenuItem'

const meta: Meta<typeof Menu> = {
  title: 'Main Components/Basic Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Menu>

export const Basic: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Menu>
        <MenuItem label="Open" />
        <MenuItem label="Edit" />
        <MenuItem label="Action Output" hasTrailingArrow />
        <MenuItem label="Action Input" hasTrailingArrow />
        <MenuItem label="Delete" variant="danger" />
      </Menu>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Default State</h3>
        <Menu>
          <MenuItem label="Open" variant="default" />
          <MenuItem label="Edit" variant="default" />
          <MenuItem label="Copy" variant="default" />
        </Menu>
      </div>

      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>With Trailing Arrows</h3>
        <Menu>
          <MenuItem label="Action Output" variant="default" hasTrailingArrow />
          <MenuItem label="Action Input" variant="default" hasTrailingArrow />
          <MenuItem label="More Options" variant="default" hasTrailingArrow />
        </Menu>
      </div>

      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Hover State</h3>
        <Menu>
          <MenuItem label="Hovered Item" variant="hover" />
          <MenuItem label="Action Output" variant="hover" hasTrailingArrow />
        </Menu>
      </div>

      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Danger State</h3>
        <Menu>
          <MenuItem label="Delete" variant="danger" />
          <MenuItem label="Remove" variant="danger" />
        </Menu>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <Menu>
          <MenuItem label="Open" size="small" />
          <MenuItem label="Edit" size="small" />
          <MenuItem label="Action Output" size="small" hasTrailingArrow />
          <MenuItem label="Delete" size="small" variant="danger" />
        </Menu>
      </div>

      <div style={{ width: '320px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Medium</h3>
        <Menu>
          <MenuItem label="Open" size="medium" />
          <MenuItem label="Edit" size="medium" />
          <MenuItem label="Action Output" size="medium" hasTrailingArrow />
          <MenuItem label="Delete" size="medium" variant="danger" />
        </Menu>
      </div>

      <div style={{ width: '350px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <Menu>
          <MenuItem label="Open" size="large" />
          <MenuItem label="Edit" size="large" />
          <MenuItem label="Action Output" size="large" hasTrailingArrow />
          <MenuItem label="Delete" size="large" variant="danger" />
        </Menu>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [clickedItem, setClickedItem] = useState<string>('')
    
    return (
      <div style={{ width: '300px' }}>
        <Menu>
          <MenuItem 
            label="Open" 
            onClick={() => setClickedItem('Open')}
          />
          <MenuItem 
            label="Edit" 
            onClick={() => setClickedItem('Edit')}
          />
          <MenuItem 
            label="Action Output" 
            hasTrailingArrow 
            onClick={() => setClickedItem('Action Output')}
          />
          <MenuItem 
            label="Action Input" 
            hasTrailingArrow 
            onClick={() => setClickedItem('Action Input')}
          />
          <MenuItem 
            label="Delete" 
            variant="danger" 
            onClick={() => setClickedItem('Delete')}
          />
        </Menu>
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
      <Menu aria-label="Context menu">
        <MenuItem label="Open" />
        <MenuItem label="Open in new tab" />
        <MenuItem label="Edit" />
        <MenuItem label="Copy" />
        <MenuItem label="Paste" />
        <MenuItem label="Share" hasTrailingArrow />
        <MenuItem label="Export" hasTrailingArrow />
        <MenuItem label="Delete" variant="danger" />
      </Menu>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Menu>
        <MenuItem label="Open" />
        <MenuItem label="Edit" disabled />
        <MenuItem label="Action Output" hasTrailingArrow disabled />
        <MenuItem label="Copy" />
        <MenuItem label="Delete" variant="danger" disabled />
      </Menu>
    </div>
  ),
}

export const NestedMenuExample: Story = {
  render: () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null)
    const [isHoveringSubmenu, setIsHoveringSubmenu] = useState(false)

    const handleMenuItemClick = (item: string) => {
      setExpandedItem(expandedItem === item ? null : item)
    }

    const handleMenuItemEnter = (item: string) => {
      setExpandedItem(item)
    }

    const handleMainMenuLeave = () => {
      // Small delay to allow moving to submenu
      setTimeout(() => {
        if (!isHoveringSubmenu) {
          setExpandedItem(null)
        }
      }, 100)
    }

    const handleSubmenuEnter = () => {
      setIsHoveringSubmenu(true)
    }

    const handleSubmenuLeave = () => {
      setIsHoveringSubmenu(false)
      setExpandedItem(null)
    }

    return (
      <div
        style={{
          display: 'flex',
          gap: '0',
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        <div
          style={{ width: '300px' }}
          onMouseLeave={handleMainMenuLeave}
        >
          <Menu>
            <MenuItem label="Open" onClick={() => console.log('Open')} />
            <MenuItem label="Edit" onClick={() => console.log('Edit')} />
            <MenuItem
              label="Action Output"
              hasTrailingArrow
              onClick={() => handleMenuItemClick('output')}
              onMouseEnter={() => handleMenuItemEnter('output')}
            />
            <MenuItem
              label="Action Input"
              hasTrailingArrow
              onClick={() => handleMenuItemClick('input')}
              onMouseEnter={() => handleMenuItemEnter('input')}
            />
            <MenuItem
              label="Delete"
              variant="danger"
              onClick={() => console.log('Delete')}
            />
          </Menu>
        </div>

        {expandedItem && (
          <div
            style={{
              width: '300px',
              marginLeft: '8px'
            }}
            onMouseEnter={handleSubmenuEnter}
            onMouseLeave={handleSubmenuLeave}
          >
            <Menu>
              <MenuItem
                label="Action"
                onClick={() => console.log('Submenu Action 1')}
              />
              <MenuItem
                label="Action"
                onClick={() => console.log('Submenu Action 2')}
              />
              <MenuItem
                label="Action"
                onClick={() => console.log('Submenu Action 3')}
              />
              <MenuItem
                label="Action"
                onClick={() => console.log('Submenu Action 4')}
              />
            </Menu>
          </div>
        )}
      </div>
    )
  },
}
