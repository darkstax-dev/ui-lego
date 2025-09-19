import React, { useState } from 'react'
import './SelectField.css'

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  disabled?: boolean
  error?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select option',
  options = [],
  disabled = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }
  
  const selectedOption = options.find(option => option.value === value)
  const displayValue = selectedOption ? selectedOption.label : placeholder

  return (
    <div className={`select-field ${disabled ? 'select-field--disabled' : ''}`}>
      <label className="select-field__label">
        {label}
      </label>
      
      <div className="select-field__container">
        <button
          className={`select-field__trigger ${error ? 'select-field__trigger--error' : ''}`}
          onClick={handleToggle}
          disabled={disabled}
          type="button"
        >
          <span className={`select-field__value ${!selectedOption ? 'select-field__value--placeholder' : ''}`}>
            {displayValue}
          </span>
          <svg 
            className={`select-field__arrow ${isOpen ? 'select-field__arrow--open' : ''}`}
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_392_3796)">
              <path 
                d="M9.99999 10.9767L14.125 6.85165L15.3033 8.02999L9.99999 13.3333L4.69666 8.02999L5.87499 6.85165L9.99999 10.9767Z" 
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_392_3796">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
        
        {isOpen && options.length > 0 && (
          <div className="select-field__dropdown">
            {options.map((option) => (
              <button
                key={option.value}
                className={`select-field__option ${value === option.value ? 'select-field__option--selected' : ''}`}
                onClick={() => handleSelect(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <span className="select-field__error">
          {error}
        </span>
      )}
    </div>
  )
}

export default SelectField
