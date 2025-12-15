import React, { useState } from 'react'
import Menu from '../menu/Menu'
import MenuItem from '../menu/MenuItem'
import './ContextMenu.css'

export interface ContextMenuProps {
  onClose: () => void
  onDelete: () => void
  onAddInput: (inputType: string) => void
  onAddOutput: (outputType: string) => void
  onOpen?: () => void
}

const inputOptions = [
  'Env Variable Input',
  'Graphql Input',
  'GRPC Input',
  'Postman Input',
  'Kafka Input',
]

const outputOptions = [
  'Postman Output',
  'Grpc Output',
  'Kafka Output',
  'Nats Output',
  'Env Variable Output',
  'S3 Destination Output',
]

const ContextMenu: React.FC<ContextMenuProps> = ({
  onClose,
  onDelete,
  onAddInput,
  onAddOutput,
  onOpen,
}) => {
  const [showInputSubmenu, setShowInputSubmenu] = useState(false)
  const [showOutputSubmenu, setShowOutputSubmenu] = useState(false)

  const handleInputClick = () => {
    setShowInputSubmenu(!showInputSubmenu)
    setShowOutputSubmenu(false)
  }

  const handleOutputClick = () => {
    setShowOutputSubmenu(!showOutputSubmenu)
    setShowInputSubmenu(false)
  }

  const ChevronIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <div className="context-menu-wrapper">
      <Menu className="context-menu" aria-label="Node actions">
        {onOpen && (
          <MenuItem
            label="Open"
            hasIcon={false}
            hasShortcut={false}
            hasDescription={false}
            onClick={() => {
              onOpen()
              onClose()
            }}
          />
        )}
        
        <div className="context-menu__submenu-container">
          <MenuItem
            label="Action Input"
            hasIcon={false}
            hasDescription={false}
            hasShortcut={false}
            icon={<ChevronIcon />}
            onClick={handleInputClick}
          />
          
          {showInputSubmenu && (
            <Menu className="context-menu__submenu" aria-label="Input options">
              {inputOptions.map((option) => (
                <MenuItem
                  key={option}
                  label={option}
                  hasIcon={false}
                  hasShortcut={false}
                  hasDescription={false}
                  onClick={() => {
                    onAddInput(option)
                    onClose()
                  }}
                />
              ))}
            </Menu>
          )}
        </div>
        
        <div className="context-menu__submenu-container">
          <MenuItem
            label="Action Output"
            hasIcon={false}
            hasDescription={false}
            hasShortcut={false}
            icon={<ChevronIcon />}
            onClick={handleOutputClick}
          />
          
          {showOutputSubmenu && (
            <Menu className="context-menu__submenu" aria-label="Output options">
              {outputOptions.map((option) => (
                <MenuItem
                  key={option}
                  label={option}
                  hasIcon={false}
                  hasShortcut={false}
                  hasDescription={false}
                  onClick={() => {
                    onAddOutput(option)
                    onClose()
                  }}
                />
              ))}
            </Menu>
          )}
        </div>
        
        <MenuItem
          label="Delete"
          hasIcon={false}
          hasShortcut={false}
          hasDescription={false}
          className="context-menu__item--danger"
          onClick={() => {
            onDelete()
            onClose()
          }}
        />
      </Menu>
    </div>
  )
}

export default ContextMenu
