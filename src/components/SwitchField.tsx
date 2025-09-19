import React from 'react'
import './SwitchField.css'

interface SwitchFieldProps {
  label?: string
  description?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  labelPosition?: 'left' | 'right'
  id?: string
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  description,
  checked,
  disabled = false,
  onChange,
  labelPosition = 'right',
  id
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked)
    }
  }

  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

  const SwitchElement = () => (
    <div className="switch-field__switch-container">
      <input
        type="checkbox"
        id={switchId}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="switch-field__input"
      />
      <div className={`switch-field__switch ${checked ? 'switch-field__switch--checked' : ''}`}>
        <div className="switch-field__thumb" />
      </div>
    </div>
  )

  return (
    <div className={`switch-field ${disabled ? 'switch-field--disabled' : ''}`}>
      <div className="switch-field__main">
        {labelPosition === 'left' && <SwitchElement />}
        
        {label && (
          <label htmlFor={switchId} className="switch-field__label">
            {label}
          </label>
        )}
        
        {labelPosition === 'right' && <SwitchElement />}
      </div>
      
      {description && (
        <div className={`switch-field__description ${labelPosition === 'left' ? 'switch-field__description--indented' : ''}`}>
          {description}
        </div>
      )}
    </div>
  )
}

export default SwitchField
