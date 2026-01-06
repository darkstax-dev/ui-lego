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
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`checkbox ${disabled ? 'checkbox--disabled' : ''} ${className}`}>
      <div className="checkbox__input-container" onClick={handleChange}>
        <svg
          className="checkbox__svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="checkbox"
          aria-checked={checked}
          aria-label={ariaLabel || label}
        >
          <rect
            x="0.75"
            y="0.75"
            width="16"
            height="16"
            stroke="var(--Checkbox-Stroke-selected, #00112B)"
            strokeWidth="1.5"
            strokeLinejoin="bevel"
            fill="transparent"
          />
          {checked && (
            <path
              d="M4.75 8.75002L7.57843 11.5784L13.235 5.92157"
              stroke="var(--Checkbox-Stroke-selected, #00112B)"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          )}
        </svg>
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          onChange={() => {}}
          className="checkbox__input-hidden"
          aria-hidden="true"
          tabIndex={-1}
          ref={(input) => {
            if (input) input.indeterminate = indeterminate
          }}
        />
      </div>
      {label && (
        <label htmlFor={checkboxId} className="checkbox__label" onClick={handleChange}>
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
