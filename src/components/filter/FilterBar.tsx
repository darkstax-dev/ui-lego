import React from 'react'
import '../../tokens.css'
import './FilterBar.css'
import SearchField from '../inputs/SearchField'
import SelectField from '../inputs/SelectField'
import MultiSelect, { MultiSelectOption } from '../multiselect/MultiSelect'
import { Sliders } from '../icons/graphics'

export type FilterControlBase = {
  id: string
  label?: string
  minWidth?: number | string
}

export type SelectOption = { value: string; label: string }

export type FilterControl =
  | (FilterControlBase & { type: 'search'; placeholder?: string })
  | (FilterControlBase & { type: 'select'; options: SelectOption[]; placeholder?: string })
  | (FilterControlBase & { type: 'multiselect'; options: MultiSelectOption[]; placeholder?: string; allowCreate?: boolean })

export type FilterValues = Record<string, string | MultiSelectOption[]>

export interface FilterBarProps {
  controls: FilterControl[]
  values: FilterValues
  onChange: (values: FilterValues) => void
  className?: string
  showIcon?: boolean
}

const FilterBar: React.FC<FilterBarProps> = ({ controls, values, onChange, className = '', showIcon = true }) => {
  const handleValueChange = (id: string, value: string | MultiSelectOption[]) => {
    onChange({ ...values, [id]: value })
  }

  return (
    <div className={`filter-bar ${className}`}>
      {showIcon && (
        <div className="filter-bar__icon" aria-hidden>
          <Sliders width={18} height={18} />
        </div>
      )}

      <div className="filter-bar__controls">
        {controls.map((control) => {
          const style: React.CSSProperties = control.minWidth ? { minWidth: control.minWidth } : {}
          const key = control.id

          if (control.type === 'search') {
            return (
              <div key={key} className="filter-bar__control" style={style}>
                <SearchField
                  value={(values[key] as string) || ''}
                  onChange={(val) => handleValueChange(key, val)}
                  placeholder={control.placeholder || control.label || 'Search'}
                />
              </div>
            )
          }

          if (control.type === 'select') {
            return (
              <div key={key} className="filter-bar__control" style={style}>
                <SelectField
                  label={control.label}
                  value={(values[key] as string) || ''}
                  onChange={(val) => handleValueChange(key, val)}
                  options={control.options}
                  placeholder={control.placeholder || control.label || 'Select'}
                />
              </div>
            )
          }

          if (control.type === 'multiselect') {
            return (
              <div key={key} className="filter-bar__control" style={style}>
                <div className="filter-bar__label" aria-hidden={control.label ? 'false' : 'true'}>
                  {control.label}
                </div>
                <MultiSelect
                  options={control.options}
                  value={((values[key] as MultiSelectOption[]) || [])}
                  onChange={(val) => handleValueChange(key, val)}
                  placeholder={control.placeholder}
                  allowCreate={control.allowCreate ?? true}
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

export default FilterBar
