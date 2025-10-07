import React, { useState } from 'react'
import './ScenarioAccessibilityRoles.css'
import Checkbox from '../checkbox/Checkbox'
import Button from '../buttons/Button'

export interface AccessibilityRole {
  id: string
  name: string
  checked: boolean
}

export interface ScenarioAccessibilityRolesProps {
  roles?: AccessibilityRole[]
  onRolesChange?: (roles: AccessibilityRole[]) => void
  onSave?: (selectedRoles: AccessibilityRole[]) => void
  onClose?: () => void
  isOpen?: boolean
  title?: string
}

const defaultRoles: AccessibilityRole[] = [
  { id: 'blue', name: 'Blue', checked: false },
  { id: 'meet-role-test', name: 'MEET-ROLE-TEST', checked: false },
  { id: 'red', name: 'Red', checked: false },
  { id: 'test', name: 'TEST', checked: false },
  { id: 'test-role-1', name: 'TEST-ROLE-1', checked: false },
  { id: 'test-role-1-20250818-110459', name: 'TEST-ROLE-1_20250818_110459', checked: false },
  { id: 'test-role-1-20250818-110810', name: 'TEST-ROLE-1_20250818_110810', checked: false }
]

const ScenarioAccessibilityRoles: React.FC<ScenarioAccessibilityRolesProps> = ({
  roles = defaultRoles,
  onRolesChange,
  onSave,
  onClose,
  isOpen = true,
  title = 'Scenario Accessibility Roles'
}) => {
  const [localRoles, setLocalRoles] = useState<AccessibilityRole[]>(roles)

  const handleRoleChange = (roleId: string, checked: boolean) => {
    const updatedRoles = localRoles.map(role =>
      role.id === roleId ? { ...role, checked } : role
    )
    setLocalRoles(updatedRoles)
    onRolesChange?.(updatedRoles)
  }

  const handleSave = () => {
    const selectedRoles = localRoles.filter(role => role.checked)
    onSave?.(selectedRoles)
  }

  const handleClose = () => {
    onClose?.()
  }

  if (!isOpen) return null

  return (
    <div className="scenario-accessibility-roles">
      <div className="scenario-accessibility-roles__container">
        <div className="scenario-accessibility-roles__header">
          <h2 className="scenario-accessibility-roles__title">{title}</h2>
        </div>

        <div className="scenario-accessibility-roles__content">
          <div className="scenario-accessibility-roles__roles-list">
            {localRoles.map((role) => (
              <div key={role.id} className="scenario-accessibility-roles__role-item">
                <Checkbox
                  label={role.name}
                  checked={role.checked}
                  onChange={(checked: boolean) => handleRoleChange(role.id, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="scenario-accessibility-roles__footer">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClose}
            className="scenario-accessibility-roles__close-button"
          >
            CLOSE
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="scenario-accessibility-roles__save-button"
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ScenarioAccessibilityRoles
