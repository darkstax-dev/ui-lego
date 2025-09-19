import React from 'react'
import CheckboxField from './CheckboxField'
import './CheckboxGroup.css'

interface CheckboxOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
  selectedValues: string[]
  onChange: (selectedValues: string[]) => void
  disabled?: boolean
  className?: string
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  disabled = false,
  className = ''
}) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      // Add value to selected values
      onChange([...selectedValues, value])
    } else {
      // Remove value from selected values
      onChange(selectedValues.filter(v => v !== value))
    }
  }

  return (
    <div className={`checkbox-group ${className}`}>
      {options.map((option) => (
        <CheckboxField
          key={option.value}
          label={option.label}
          description={option.description}
          checked={selectedValues.includes(option.value)}
          disabled={disabled || option.disabled}
          onChange={(checked) => handleCheckboxChange(option.value, checked)}
        />
      ))}
    </div>
  )
}

export default CheckboxGroup
