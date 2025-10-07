import React from 'react'
import './Checkbox.css'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  className?: string
  id?: string
  'aria-label'?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className = '',
  id,
  'aria-label': ariaLabel
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked)
    }
  }

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`checkbox ${disabled ? 'checkbox--disabled' : ''} ${className}`}>
      <div className="checkbox__input-container">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="checkbox__input"
          aria-label={ariaLabel || label}
          ref={(input) => {
            if (input) input.indeterminate = indeterminate
          }}
        />
      </div>
      {label && (
        <label htmlFor={checkboxId} className="checkbox__label">
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
