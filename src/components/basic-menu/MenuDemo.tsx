import React, { useState } from 'react'
import Menu from './Menu'
import MenuItem from './MenuItem'
import './MenuDemo.css'

const MenuDemo: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [lastClicked, setLastClicked] = useState<string>('')

  const handleItemClick = (label: string) => {
    setLastClicked(label)
  }

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item)
  }

  return (
    <div className="menu-demo">
      <div className="menu-demo__header">
        <h2 className="menu-demo__title">Menu Component</h2>
        <p className="menu-demo__description">
          A modern menu component based on the new Figma design system with support for
          different states, sizes, and expandable items.
        </p>
      </div>

      <div className="menu-demo__grid">
        <div className="menu-demo__section">
          <h3 className="menu-demo__section-title">Basic Context Menu</h3>
          <div className="menu-demo__menu-container">
            <Menu>
              <MenuItem 
                label="Open" 
                onClick={() => handleItemClick('Open')}
              />
              <MenuItem 
                label="Edit" 
                onClick={() => handleItemClick('Edit')}
              />
              <MenuItem 
                label="Action Output" 
                hasTrailingArrow 
                onClick={() => handleItemClick('Action Output')}
              />
              <MenuItem 
                label="Action Input" 
                hasTrailingArrow 
                onClick={() => handleItemClick('Action Input')}
              />
              <MenuItem 
                label="Delete" 
                variant="danger" 
                onClick={() => handleItemClick('Delete')}
              />
            </Menu>
          </div>
        </div>

        <div className="menu-demo__section">
          <h3 className="menu-demo__section-title">Expandable Menu</h3>
          <div className="menu-demo__expandable-container">
            <div className="menu-demo__menu-main">
              <Menu>
                <MenuItem
                  label="Open"
                  onClick={() => handleItemClick('Open')}
                />
                <MenuItem
                  label="Edit"
                  onClick={() => handleItemClick('Edit')}
                />
                <MenuItem
                  label="Action Output"
                  hasTrailingArrow
                  onClick={() => toggleExpand('output')}
                  onMouseEnter={() => setExpandedItem('output')}
                />
                <MenuItem
                  label="Action Input"
                  hasTrailingArrow
                  onClick={() => toggleExpand('input')}
                  onMouseEnter={() => setExpandedItem('input')}
                />
                <MenuItem
                  label="Delete"
                  variant="danger"
                  onClick={() => handleItemClick('Delete')}
                />
              </Menu>
            </div>

            {expandedItem && (
              <div className="menu-demo__menu-submenu">
                <Menu>
                  <MenuItem label="Action" onClick={() => handleItemClick('Action 1')} />
                  <MenuItem label="Action" onClick={() => handleItemClick('Action 2')} />
                  <MenuItem label="Action" onClick={() => handleItemClick('Action 3')} />
                  <MenuItem label="Action" onClick={() => handleItemClick('Action 4')} />
                </Menu>
              </div>
            )}
          </div>
        </div>

        <div className="menu-demo__section">
          <h3 className="menu-demo__section-title">Different Sizes</h3>
          <div className="menu-demo__menu-container">
            <div className="menu-demo__size-group">
              <p className="menu-demo__label">Small</p>
              <Menu>
                <MenuItem label="Open" size="small" />
                <MenuItem label="Edit" size="small" />
                <MenuItem label="Delete" size="small" variant="danger" />
              </Menu>
            </div>
            <div className="menu-demo__size-group">
              <p className="menu-demo__label">Medium</p>
              <Menu>
                <MenuItem label="Open" size="medium" />
                <MenuItem label="Edit" size="medium" />
                <MenuItem label="Delete" size="medium" variant="danger" />
              </Menu>
            </div>
            <div className="menu-demo__size-group">
              <p className="menu-demo__label">Large</p>
              <Menu>
                <MenuItem label="Open" size="large" />
                <MenuItem label="Edit" size="large" />
                <MenuItem label="Delete" size="large" variant="danger" />
              </Menu>
            </div>
          </div>
        </div>

        <div className="menu-demo__section">
          <h3 className="menu-demo__section-title">States</h3>
          <div className="menu-demo__menu-container">
            <div className="menu-demo__state-group">
              <p className="menu-demo__label">Default</p>
              <Menu>
                <MenuItem label="Menu Item" variant="default" />
              </Menu>
            </div>
            <div className="menu-demo__state-group">
              <p className="menu-demo__label">Hover</p>
              <Menu>
                <MenuItem label="Menu Item" variant="hover" />
              </Menu>
            </div>
            <div className="menu-demo__state-group">
              <p className="menu-demo__label">Danger</p>
              <Menu>
                <MenuItem label="Menu Item" variant="danger" />
              </Menu>
            </div>
            <div className="menu-demo__state-group">
              <p className="menu-demo__label">Disabled</p>
              <Menu>
                <MenuItem label="Menu Item" disabled />
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {lastClicked && (
        <div className="menu-demo__feedback">
          <strong>Last clicked:</strong> {lastClicked}
        </div>
      )}
    </div>
  )
}

export default MenuDemo
