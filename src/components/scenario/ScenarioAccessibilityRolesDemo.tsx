import React, { useState } from 'react'
import ScenarioAccessibilityRoles, { AccessibilityRole } from './ScenarioAccessibilityRoles'
import Button from '../buttons/Button'
import './ScenarioAccessibilityRolesDemo.css'

const ScenarioAccessibilityRolesDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<AccessibilityRole[]>([])
  const [roles, setRoles] = useState<AccessibilityRole[]>([
    { id: 'blue', name: 'Blue', checked: false },
    { id: 'meet-role-test', name: 'MEET-ROLE-TEST', checked: false },
    { id: 'red', name: 'Red', checked: false },
    { id: 'test', name: 'TEST', checked: false },
    { id: 'test-role-1', name: 'TEST-ROLE-1', checked: false },
    { id: 'test-role-1-20250818-110459', name: 'TEST-ROLE-1_20250818_110459', checked: false },
    { id: 'test-role-1-20250818-110810', name: 'TEST-ROLE-1_20250818_110810', checked: false }
  ])

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleSave = (savedRoles: AccessibilityRole[]) => {
    setSelectedRoles(savedRoles)
    setIsOpen(false)
    console.log('Saved roles:', savedRoles)
  }

  const handleRolesChange = (updatedRoles: AccessibilityRole[]) => {
    setRoles(updatedRoles)
  }

  const addCustomRole = () => {
    const roleName = prompt('Enter role name:')
    if (roleName && roleName.trim()) {
      const newRole: AccessibilityRole = {
        id: `custom-${Date.now()}`,
        name: roleName.trim(),
        checked: false
      }
      setRoles(prev => [...prev, newRole])
    }
  }

  const resetRoles = () => {
    setRoles(prev => prev.map(role => ({ ...role, checked: false })))
    setSelectedRoles([])
  }

  return (
    <div className="scenario-accessibility-roles-demo">
      <div className="scenario-accessibility-roles-demo__container">
        <h2 className="scenario-accessibility-roles-demo__title">
          Scenario Accessibility Roles Demo
        </h2>
        
        <div className="scenario-accessibility-roles-demo__controls">
          <Button variant="primary" onClick={handleOpenModal}>
            Open Roles Modal
          </Button>
          <Button variant="secondary" onClick={addCustomRole}>
            Add Custom Role
          </Button>
          <Button variant="secondary" onClick={resetRoles}>
            Reset All
          </Button>
        </div>

        <div className="scenario-accessibility-roles-demo__info">
          <h3>Selected Roles ({selectedRoles.length})</h3>
          {selectedRoles.length > 0 ? (
            <ul className="scenario-accessibility-roles-demo__selected-list">
              {selectedRoles.map(role => (
                <li key={role.id} className="scenario-accessibility-roles-demo__selected-item">
                  {role.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="scenario-accessibility-roles-demo__empty">
              No roles selected. Click "Open Roles Modal" to select roles.
            </p>
          )}
        </div>

        <div className="scenario-accessibility-roles-demo__all-roles">
          <h3>All Available Roles ({roles.length})</h3>
          <div className="scenario-accessibility-roles-demo__roles-grid">
            {roles.map(role => (
              <div 
                key={role.id} 
                className={`scenario-accessibility-roles-demo__role-badge ${
                  role.checked ? 'scenario-accessibility-roles-demo__role-badge--selected' : ''
                }`}
              >
                {role.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScenarioAccessibilityRoles
        isOpen={isOpen}
        roles={roles}
        onClose={handleCloseModal}
        onSave={handleSave}
        onRolesChange={handleRolesChange}
      />
    </div>
  )
}

export default ScenarioAccessibilityRolesDemo
