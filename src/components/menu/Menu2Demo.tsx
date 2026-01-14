import React, { useState } from 'react'
import Menu2 from './Menu2'
import MenuItem2 from './MenuItem2'
import './Menu2Demo.css'

const Menu2Demo: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [lastClicked, setLastClicked] = useState<string>('')

  const handleItemClick = (label: string) => {
    setLastClicked(label)
  }

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item)
  }

  return (
    <div className="menu-2-demo">
      <div className="menu-2-demo__header">
        <h2 className="menu-2-demo__title">Menu 2.0 Component</h2>
        <p className="menu-2-demo__description">
          A modern menu component based on the new Figma design system with support for
          different states, sizes, and expandable items.
        </p>
      </div>

      <div className="menu-2-demo__grid">
        <div className="menu-2-demo__section">
          <h3 className="menu-2-demo__section-title">Basic Context Menu</h3>
          <div className="menu-2-demo__menu-container">
            <Menu2>
              <MenuItem2 
                label="Open" 
                onClick={() => handleItemClick('Open')}
              />
              <MenuItem2 
                label="Edit" 
                onClick={() => handleItemClick('Edit')}
              />
              <MenuItem2 
                label="Action Output" 
                hasTrailingArrow 
                onClick={() => handleItemClick('Action Output')}
              />
              <MenuItem2 
                label="Action Input" 
                hasTrailingArrow 
                onClick={() => handleItemClick('Action Input')}
              />
              <MenuItem2 
                label="Delete" 
                variant="danger" 
                onClick={() => handleItemClick('Delete')}
              />
            </Menu2>
          </div>
        </div>

        <div className="menu-2-demo__section">
          <h3 className="menu-2-demo__section-title">Expandable Menu</h3>
          <div className="menu-2-demo__menu-container">
            <Menu2>
              <MenuItem2 
                label="Open" 
                onClick={() => handleItemClick('Open')}
              />
              <MenuItem2 
                label="Edit" 
                onClick={() => handleItemClick('Edit')}
              />
              <MenuItem2 
                label="Action Output" 
                hasTrailingArrow 
                onClick={() => toggleExpand('output')}
              />
              {expandedItem === 'output' && (
                <div className="menu-2-demo__submenu">
                  <Menu2>
                    <MenuItem2 label="Action 1" onClick={() => handleItemClick('Action 1')} />
                    <MenuItem2 label="Action 2" onClick={() => handleItemClick('Action 2')} />
                    <MenuItem2 label="Action 3" onClick={() => handleItemClick('Action 3')} />
                    <MenuItem2 label="Action 4" onClick={() => handleItemClick('Action 4')} />
                  </Menu2>
                </div>
              )}
              <MenuItem2 
                label="Action Input" 
                hasTrailingArrow 
                onClick={() => toggleExpand('input')}
              />
              {expandedItem === 'input' && (
                <div className="menu-2-demo__submenu">
                  <Menu2>
                    <MenuItem2 label="Action 1" onClick={() => handleItemClick('Action 1')} />
                    <MenuItem2 label="Action 2" onClick={() => handleItemClick('Action 2')} />
                    <MenuItem2 label="Action 3" onClick={() => handleItemClick('Action 3')} />
                    <MenuItem2 label="Action 4" onClick={() => handleItemClick('Action 4')} />
                  </Menu2>
                </div>
              )}
              <MenuItem2 
                label="Delete" 
                variant="danger" 
                onClick={() => handleItemClick('Delete')}
              />
            </Menu2>
          </div>
        </div>

        <div className="menu-2-demo__section">
          <h3 className="menu-2-demo__section-title">Different Sizes</h3>
          <div className="menu-2-demo__menu-container">
            <div className="menu-2-demo__size-group">
              <p className="menu-2-demo__label">Small</p>
              <Menu2>
                <MenuItem2 label="Open" size="small" />
                <MenuItem2 label="Edit" size="small" />
                <MenuItem2 label="Delete" size="small" variant="danger" />
              </Menu2>
            </div>
            <div className="menu-2-demo__size-group">
              <p className="menu-2-demo__label">Medium</p>
              <Menu2>
                <MenuItem2 label="Open" size="medium" />
                <MenuItem2 label="Edit" size="medium" />
                <MenuItem2 label="Delete" size="medium" variant="danger" />
              </Menu2>
            </div>
            <div className="menu-2-demo__size-group">
              <p className="menu-2-demo__label">Large</p>
              <Menu2>
                <MenuItem2 label="Open" size="large" />
                <MenuItem2 label="Edit" size="large" />
                <MenuItem2 label="Delete" size="large" variant="danger" />
              </Menu2>
            </div>
          </div>
        </div>

        <div className="menu-2-demo__section">
          <h3 className="menu-2-demo__section-title">States</h3>
          <div className="menu-2-demo__menu-container">
            <div className="menu-2-demo__state-group">
              <p className="menu-2-demo__label">Default</p>
              <Menu2>
                <MenuItem2 label="Menu Item" variant="default" />
              </Menu2>
            </div>
            <div className="menu-2-demo__state-group">
              <p className="menu-2-demo__label">Hover</p>
              <Menu2>
                <MenuItem2 label="Menu Item" variant="hover" />
              </Menu2>
            </div>
            <div className="menu-2-demo__state-group">
              <p className="menu-2-demo__label">Danger</p>
              <Menu2>
                <MenuItem2 label="Menu Item" variant="danger" />
              </Menu2>
            </div>
            <div className="menu-2-demo__state-group">
              <p className="menu-2-demo__label">Disabled</p>
              <Menu2>
                <MenuItem2 label="Menu Item" disabled />
              </Menu2>
            </div>
          </div>
        </div>
      </div>

      {lastClicked && (
        <div className="menu-2-demo__feedback">
          <strong>Last clicked:</strong> {lastClicked}
        </div>
      )}
    </div>
  )
}

export default Menu2Demo
