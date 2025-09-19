import React, { useState, useRef, useEffect } from 'react'
import './SelectField.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  success?: string
  supportingText?: string
  id?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  success,
  supportingText,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

  const selectedOption = options.find(option => option.value === value)
  const hasValue = !!selectedOption
  const hasError = !!error
  const hasSuccess = !!success

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const getSelectClass = () => {
    let classes = 'select-field__select'
    if (hasError) classes += ' select-field__select--error'
    if (hasSuccess) classes += ' select-field__select--success'
    if (disabled) classes += ' select-field__select--disabled'
    return classes
  }

  return (
    <div className={`select-field ${disabled ? 'select-field--disabled' : ''}`} ref={selectRef}>
      {label && (
        <label htmlFor={selectId} className="select-field__label">
          {label}
        </label>
      )}
      
      <div className={getSelectClass()} onClick={handleToggle}>
        <span className={`select-field__value ${!hasValue ? 'select-field__value--placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <svg 
          className="select-field__arrow" 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
        >
          <path 
            d="M10.0001 10.9767L14.1251 6.85168L15.3034 8.03002L10.0001 13.3334L4.69678 8.03002L5.87511 6.85168L10.0001 10.9767Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {isOpen && !disabled && (
        <div className="select-field__dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-field__option ${value === option.value ? 'select-field__option--selected' : ''}`}
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {(error || success || supportingText) && (
        <div className={`select-field__supporting-text ${hasError ? 'select-field__supporting-text--error' : hasSuccess ? 'select-field__supporting-text--success' : ''}`}>
          {error || success || supportingText}
        </div>
      )}
    </div>
  )
}

export default SelectField
