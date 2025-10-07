import React, { useState } from 'react'
import Checkbox from './Checkbox'
import './CheckboxDemo.css'

const CheckboxDemo: React.FC = () => {
  const [basicChecked, setBasicChecked] = useState(false)
  const [withLabelChecked, setWithLabelChecked] = useState(true)
  const [disabledChecked, setDisabledChecked] = useState(false)
  const [disabledCheckedState, setDisabledCheckedState] = useState(true)
  const [indeterminateChecked, setIndeterminateChecked] = useState(false)
  
  const [logLevels, setLogLevels] = useState({
    info: true,
    trace: false,
    warning: true,
    error: true,
    fatal: false
  })

  const handleLogLevelChange = (level: keyof typeof logLevels, checked: boolean) => {
    setLogLevels(prev => ({ ...prev, [level]: checked }))
  }

  return (
    <div className="checkbox-demo">
      <div className="checkbox-demo__container">
        <h2 className="checkbox-demo__title">Checkbox Component Demo</h2>
        
        <div className="checkbox-demo__section">
          <h3>Basic Checkbox</h3>
          <Checkbox
            checked={basicChecked}
            onChange={setBasicChecked}
          />
        </div>

        <div className="checkbox-demo__section">
          <h3>Checkbox with Label</h3>
          <Checkbox
            checked={withLabelChecked}
            onChange={setWithLabelChecked}
            label="Enable notifications"
          />
        </div>

        <div className="checkbox-demo__section">
          <h3>Disabled States</h3>
          <div className="checkbox-demo__group">
            <Checkbox
              checked={disabledChecked}
              onChange={setDisabledChecked}
              disabled={true}
              label="Disabled unchecked"
            />
            <Checkbox
              checked={disabledCheckedState}
              onChange={setDisabledCheckedState}
              disabled={true}
              label="Disabled checked"
            />
          </div>
        </div>

        <div className="checkbox-demo__section">
          <h3>Indeterminate State</h3>
          <Checkbox
            checked={indeterminateChecked}
            onChange={setIndeterminateChecked}
            indeterminate={true}
            label="Indeterminate checkbox"
          />
        </div>

        <div className="checkbox-demo__section">
          <h3>Log Levels Example (like RunPopUp)</h3>
          <div className="checkbox-demo__log-levels">
            <Checkbox
              label="Info"
              checked={logLevels.info}
              onChange={(checked) => handleLogLevelChange('info', checked)}
            />
            <Checkbox
              label="Trace"
              checked={logLevels.trace}
              onChange={(checked) => handleLogLevelChange('trace', checked)}
            />
            <Checkbox
              label="Warning"
              checked={logLevels.warning}
              onChange={(checked) => handleLogLevelChange('warning', checked)}
            />
            <Checkbox
              label="Error"
              checked={logLevels.error}
              onChange={(checked) => handleLogLevelChange('error', checked)}
            />
            <Checkbox
              label="Fatal"
              checked={logLevels.fatal}
              onChange={(checked) => handleLogLevelChange('fatal', checked)}
            />
          </div>
        </div>

        <div className="checkbox-demo__section">
          <h3>Current State</h3>
          <div className="checkbox-demo__state">
            <p><strong>Basic:</strong> {basicChecked ? 'Checked' : 'Unchecked'}</p>
            <p><strong>With Label:</strong> {withLabelChecked ? 'Checked' : 'Unchecked'}</p>
            <p><strong>Log Levels:</strong> {Object.entries(logLevels).filter(([_, checked]) => checked).map(([level]) => level).join(', ') || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckboxDemo
