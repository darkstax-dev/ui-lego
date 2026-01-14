import React, { useState } from 'react'
import './Drawer.css'

const DrawerExampleContent: React.FC = () => {
  const [activeToggles, setActiveToggles] = useState({
    isActive: false,
    isSystemActivity: false,
    supportMultiRule: false,
  })

  const handleToggle = (key: keyof typeof activeToggles) => {
    setActiveToggles(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="drawer-form-section">
      <div className="drawer-form-fields">
        <div className="drawer-select-field">
          <label className="drawer-select-label">Activity name</label>
          <input
            type="text"
            className="drawer-select-input"
            placeholder="Command"
          />
        </div>

        <div className="drawer-select-field">
          <label className="drawer-select-label">Node type name</label>
          <input
            type="text"
            className="drawer-select-input"
            placeholder="Command"
          />
        </div>

        <div className="drawer-select-field">
          <label className="drawer-select-label">Group name</label>
          <input
            type="text"
            className="drawer-select-input"
            placeholder="Command"
          />
        </div>

        <div className="drawer-select-field">
          <label className="drawer-select-label">Node internal name</label>
          <input
            type="text"
            className="drawer-select-input"
            placeholder="Command"
          />
        </div>

        <div className="drawer-select-field">
          <label className="drawer-select-label">Display order</label>
          <input
            type="text"
            className="drawer-select-input"
            placeholder="0"
          />
        </div>
      </div>

      <div className="drawer-toggles-section">
        <div className="drawer-toggles-container">
          <div className="drawer-toggles-row">
            <div className="drawer-toggle-item">
              <button
                type="button"
                className={`drawer-toggle-switch ${activeToggles.isActive ? 'active' : ''}`}
                onClick={() => handleToggle('isActive')}
                aria-label="Toggle is active"
              >
                <div className="drawer-toggle-knob" />
              </button>
              <span className="drawer-toggle-label">Is Active?</span>
            </div>

            <div className="drawer-toggle-item">
              <button
                type="button"
                className={`drawer-toggle-switch ${activeToggles.isSystemActivity ? 'active' : ''}`}
                onClick={() => handleToggle('isSystemActivity')}
                aria-label="Toggle is system activity"
              >
                <div className="drawer-toggle-knob" />
              </button>
              <span className="drawer-toggle-label">Is System Activity</span>
            </div>

            <div className="drawer-toggle-item">
              <button
                type="button"
                className={`drawer-toggle-switch ${activeToggles.supportMultiRule ? 'active' : ''}`}
                onClick={() => handleToggle('supportMultiRule')}
                aria-label="Toggle support multi rule"
              >
                <div className="drawer-toggle-knob" />
              </button>
              <span className="drawer-toggle-label">Support multi rule</span>
            </div>
          </div>
        </div>

        <div className="drawer-upload-section">
          <div className="drawer-file-upload">
            <div className="drawer-upload-content">
              <div className="drawer-upload-text-section">
                <div className="drawer-upload-title">Activity Icon</div>
                <div className="drawer-upload-action">
                  <button type="button" className="drawer-upload-link-button">
                    <div className="drawer-upload-link-text">Click to upload</div>
                    <div className="drawer-upload-link-underline" />
                  </button>
                  <span className="drawer-upload-drag-text">or drag and drop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-upload-section">
          <div className="drawer-file-upload">
            <div className="drawer-upload-content">
              <div className="drawer-upload-text-section">
                <div className="drawer-upload-title">Form Schema</div>
                <div className="drawer-upload-action">
                  <button type="button" className="drawer-upload-link-button">
                    <div className="drawer-upload-link-text">Click to upload</div>
                    <div className="drawer-upload-link-underline" />
                  </button>
                  <span className="drawer-upload-drag-text">or drag and drop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-upload-section">
          <div className="drawer-file-upload">
            <div className="drawer-upload-content">
              <div className="drawer-upload-text-section">
                <div className="drawer-upload-title">Plugin File</div>
                <div className="drawer-upload-action">
                  <button type="button" className="drawer-upload-link-button">
                    <div className="drawer-upload-link-text">Click to upload</div>
                    <div className="drawer-upload-link-underline" />
                  </button>
                  <span className="drawer-upload-drag-text">or drag and drop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerExampleContent
