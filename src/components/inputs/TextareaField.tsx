import React from 'react'
import './TextareaField.css'

interface TextareaFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  success?: string
  supportingText?: string
  rows?: number
  minRows?: number
  maxRows?: number
  resize?: boolean
  id?: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter your text here...',
  disabled = false,
  error,
  success,
  supportingText,
  rows = 4,
  resize = true,
  id
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
  const hasError = !!error
  const hasSuccess = !!success

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled) {
      onChange(event.target.value)
    }
  }

  const getTextareaClass = () => {
    let classes = 'textarea-field__textarea'
    if (hasError) classes += ' textarea-field__textarea--error'
    if (hasSuccess) classes += ' textarea-field__textarea--success'
    if (disabled) classes += ' textarea-field__textarea--disabled'
    return classes
  }

  const ResizeIcon = () => (
    <svg 
      className="textarea-field__resize-icon" 
      width="8" 
      height="8" 
      viewBox="0 0 8 8" 
      fill="none"
    >
      <path 
        d="M6.523 0.353516L0.353516 6.523M6.98064 3.89589L3.8959 6.98063" 
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )

  return (
    <div className={`textarea-field ${disabled ? 'textarea-field--disabled' : ''}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea-field__label">
          {label}
        </label>
      )}
      
      <div className={getTextareaClass()}>
        <textarea
          id={textareaId}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className="textarea-field__control"
          style={{ resize: resize ? 'both' : 'none' }}
        />
        
        {resize && (
          <div className="textarea-field__resize-handle">
            <ResizeIcon />
          </div>
        )}
      </div>

      {(error || success || supportingText) && (
        <div className={`textarea-field__supporting-text ${hasError ? 'textarea-field__supporting-text--error' : hasSuccess ? 'textarea-field__supporting-text--success' : ''}`}>
          {error || success || supportingText}
        </div>
      )}
    </div>
  )
}

export default TextareaField
