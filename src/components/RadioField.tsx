import React from 'react'
import './RadioField.css'

interface RadioFieldProps {
  label: string
  description?: string
  value: string
  selectedValue: string
  disabled?: boolean
  onChange: (value: string) => void
  name: string
  id?: string
}

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  description,
  value,
  selectedValue,
  disabled = false,
  onChange,
  name,
  id
}) => {
  const isChecked = selectedValue === value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.value)
    }
  }

  const radioId = id || `radio-${name}-${value}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`radio-field ${disabled ? 'radio-field--disabled' : ''}`}>
      <div className="radio-field__main">
        <div className="radio-field__radio-container">
          <input
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="radio-field__input"
          />
          <div className={`radio-field__radio ${isChecked ? 'radio-field__radio--checked' : ''}`}>
            {isChecked && (
              <div className="radio-field__inner-circle" />
            )}
          </div>
        </div>
        <label htmlFor={radioId} className="radio-field__label">
          {label}
        </label>
      </div>
      
      {description && (
        <div className="radio-field__description-row">
          <div className="radio-field__spacer" />
          <div className="radio-field__description">
            {description}
          </div>
        </div>
      )}
    </div>
  )
}

export default RadioField
