import React, { useId } from 'react'
import './InputField.css'

interface InputFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  success?: string
  supportingText?: string
  leadingIcon?: React.ReactNode
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  id?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter value',
  disabled = false,
  error,
  success,
  supportingText,
  leadingIcon,
  type = 'text',
  id
}) => {
  const reactId = useId()
  const inputId = id || `input-${reactId}`
  const helpId = `${inputId}-help`
  const hasError = !!error
  const hasSuccess = !!success

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.value)
    }
  }

  const getInputClass = () => {
    let classes = 'input-field__input'
    if (hasError) classes += ' input-field__input--error'
    if (hasSuccess) classes += ' input-field__input--success'
    if (disabled) classes += ' input-field__input--disabled'
    return classes
  }

  // Default star icon from Figma
  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path 
        d="M9.99995 14.1667L5.10162 17.1583L6.43328 11.575L2.07495 7.84166L7.79578 7.38333L9.99995 2.08333L12.2041 7.38333L17.9258 7.84166L13.5666 11.575L14.8983 17.1583L9.99995 14.1667ZM9.99995 12.2133L12.3475 13.6467L11.7091 10.9717L13.7983 9.18249L11.0566 8.96249L9.99995 6.42333L8.94328 8.96249L6.20162 9.18249L8.29078 10.9717L7.65245 13.6467L9.99995 12.2142V12.2133Z" 
        fill="currentColor"
      />
    </svg>
  )

  const describedBy = (hasError || hasSuccess || supportingText) ? helpId : undefined

  return (
    <div className={`input-field ${disabled ? 'input-field--disabled' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="input-field__label">
          {label}
        </label>
      )}
      
      <div className={getInputClass()}>
        {(leadingIcon || leadingIcon === undefined) && (
          <div className="input-field__icon" aria-hidden="true">
            {leadingIcon || defaultIcon}
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="input-field__control"
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
        />
      </div>

      {(error || success || supportingText) && (
        <div id={helpId} className={`input-field__supporting-text ${hasError ? 'input-field__supporting-text--error' : hasSuccess ? 'input-field__supporting-text--success' : ''}`}>
          {error || success || supportingText}
        </div>
      )}
    </div>
  )
}

export default InputField
