import React from 'react'
import RadioField from './RadioField'
import './RadioGroup.css'

interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  selectedValue: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`radio-group ${className}`}>
      {options.map((option) => (
        <RadioField
          key={option.value}
          name={name}
          label={option.label}
          description={option.description}
          value={option.value}
          selectedValue={selectedValue}
          disabled={disabled || option.disabled}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

export default RadioGroup
