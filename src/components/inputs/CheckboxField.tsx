import React from 'react'
import './CheckboxField.css'

interface CheckboxFieldProps {
  label: string
  description?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  id?: string
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  description,
  checked,
  disabled = false,
  onChange,
  id
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked)
    }
  }

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`checkbox-field ${disabled ? 'checkbox-field--disabled' : ''}`}>
      <div className="checkbox-field__main">
        <div className="checkbox-field__checkbox-container">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            className="checkbox-field__input"
          />
          <div className={`checkbox-field__checkbox ${checked ? 'checkbox-field__checkbox--checked' : ''}`}>
            {checked && (
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="checkbox-field__checkmark"
              >
                <path
                  d="M5 9.49996L7.82843 12.3284L13.485 6.67151"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <label htmlFor={checkboxId} className="checkbox-field__label">
          {label}
        </label>
      </div>
      
      {description && (
        <div className="checkbox-field__description-row">
          <div className="checkbox-field__spacer" />
          <div className="checkbox-field__description">
            {description}
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckboxField
