import React, { useState } from 'react'
import InputField from '../inputs/InputField'
import SwitchField from '../inputs/SwitchField'
import DrawerFileUpload from './DrawerFileUpload'
import './Drawer.css'

const DrawerExampleContent: React.FC = () => {
  const [formData, setFormData] = useState({
    activityName: 'Command',
    nodeTypeName: 'Command',
    groupName: 'Command',
    nodeInternalName: 'Command',
    displayOrder: '0',
  })

  const [toggles, setToggles] = useState({
    isActive: false,
    isSystemActivity: false,
    supportMultiRule: false,
  })

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleToggleChange = (field: keyof typeof toggles) => (checked: boolean) => {
    setToggles(prev => ({ ...prev, [field]: checked }))
  }

  const handleFileSelect = (sectionName: string) => (files: FileList | null) => {
    if (files) {
      console.log(`${sectionName} files selected:`, Array.from(files))
    }
  }

  return (
    <div className="drawer-form-section">
      <div className="drawer-form-fields">
        <InputField
          label="Activity name"
          value={formData.activityName}
          onChange={handleInputChange('activityName')}
          placeholder="Command"
          leadingIcon={null}
        />

        <InputField
          label="Node type name"
          value={formData.nodeTypeName}
          onChange={handleInputChange('nodeTypeName')}
          placeholder="Command"
          leadingIcon={null}
        />

        <InputField
          label="Group name"
          value={formData.groupName}
          onChange={handleInputChange('groupName')}
          placeholder="Command"
          leadingIcon={null}
        />

        <InputField
          label="Node internal name"
          value={formData.nodeInternalName}
          onChange={handleInputChange('nodeInternalName')}
          placeholder="Command"
          leadingIcon={null}
        />

        <InputField
          label="Display order"
          value={formData.displayOrder}
          onChange={handleInputChange('displayOrder')}
          placeholder="0"
          type="number"
          leadingIcon={null}
        />
      </div>

      <div className="drawer-toggles-section">
        <div className="drawer-toggles-container">
          <div className="drawer-toggles-row">
            <SwitchField
              label="Is Active?"
              checked={toggles.isActive}
              onChange={handleToggleChange('isActive')}
              labelPosition="right"
            />

            <SwitchField
              label="Is System Activity"
              checked={toggles.isSystemActivity}
              onChange={handleToggleChange('isSystemActivity')}
              labelPosition="right"
            />

            <SwitchField
              label="Support multi rule"
              checked={toggles.supportMultiRule}
              onChange={handleToggleChange('supportMultiRule')}
              labelPosition="right"
            />
          </div>
        </div>

        <div className="drawer-upload-section">
          <DrawerFileUpload
            title="Activity Icon"
            onFileSelect={handleFileSelect('Activity Icon')}
            accept="image/*"
          />
        </div>

        <div className="drawer-upload-section">
          <DrawerFileUpload
            title="Form Schema"
            onFileSelect={handleFileSelect('Form Schema')}
            accept=".json,.yaml,.yml"
          />
        </div>

        <div className="drawer-upload-section">
          <DrawerFileUpload
            title="Plugin File"
            onFileSelect={handleFileSelect('Plugin File')}
            accept=".js,.ts,.jsx,.tsx"
          />
        </div>
      </div>
    </div>
  )
}

export default DrawerExampleContent
