import React, { useState } from 'react'
import './LoginInput.css'

interface LoginInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'tel'
  disabled?: boolean
  error?: string
  helperText?: string
  id?: string
}

const LoginInput: React.FC<LoginInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  helperText,
  id
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = id || `login-input-${Math.random().toString(36).substr(2, 9)}`
  
  const hasValue = !!value
  const hasError = !!error
  const isActive = isFocused && !disabled

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.value)
    }
  }

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const getInputClass = () => {
    let classes = 'login-input__field'
    if (hasError) classes += ' login-input__field--error'
    if (disabled) classes += ' login-input__field--disabled'
    if (isActive) classes += ' login-input__field--active'
    return classes
  }

  const getLabelClass = () => {
    let classes = 'login-input__label'
    if (hasError) classes += ' login-input__label--error'
    if (disabled) classes += ' login-input__label--disabled'
    if (hasValue || isActive) classes += ' login-input__label--filled'
    return classes
  }

  return (
    <div className="login-input">
      <label htmlFor={inputId} className={getLabelClass()}>
        {label}
      </label>
      
      <div className="login-input__container">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={getInputClass()}
        />
      </div>
      
      {(error || helperText) && (
        <div className={`login-input__helper ${hasError ? 'login-input__helper--error' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  )
}

export default LoginInput
