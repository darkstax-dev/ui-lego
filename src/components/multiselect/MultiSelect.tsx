import React, { useState, useRef, useKeyboardEvent } from 'react'
import Tag from '../tag-badges/Tag'
import './MultiSelect.css'

export interface MultiSelectOption {
  id: string | number
  label: string
  value: string
}

export interface MultiSelectProps {
  options?: MultiSelectOption[]
  value?: MultiSelectOption[]
  onChange?: (selectedItems: MultiSelectOption[]) => void
  onItemAdd?: (newItem: MultiSelectOption) => void
  onItemRemove?: (removedItem: MultiSelectOption, index: number) => void
  placeholder?: string
  disabled?: boolean
  allowCreate?: boolean
  className?: string
  maxHeight?: number
  createNewItemFromQuery?: (query: string) => MultiSelectOption
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  value = [],
  onChange,
  onItemAdd,
  onItemRemove,
  placeholder = "Press enter to add",
  disabled = false,
  allowCreate = true,
  className = '',
  maxHeight = 200,
  createNewItemFromQuery,
}) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedIds = new Set(value.map(item => item.id))
  const filteredOptions = options.filter(option => 
    !selectedIds.has(option.id) &&
    option.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setIsOpen(true)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIsOpen(true)
      setActiveIndex(prev => Math.min(prev + 1, filteredOptions.length - (allowCreate && query ? 0 : 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        // Select existing option
        const selectedOption = filteredOptions[activeIndex]
        addItem(selectedOption)
      } else if (allowCreate && query.trim()) {
        // Create new item
        let newItem: MultiSelectOption
        if (createNewItemFromQuery) {
          newItem = createNewItemFromQuery(query.trim())
        } else {
          newItem = {
            id: `new-${Date.now()}`,
            label: query.trim(),
            value: query.trim()
          }
        }
        addItem(newItem)
        onItemAdd?.(newItem)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    } else if (e.key === 'Backspace' && !query && value.length > 0) {
      // Remove last item when backspace is pressed on empty input
      const lastItem = value[value.length - 1]
      removeItem(lastItem, value.length - 1)
    }
  }

  const addItem = (item: MultiSelectOption) => {
    const newValue = [...value, item]
    onChange?.(newValue)
    setQuery('')
    setIsOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const removeItem = (item: MultiSelectOption, index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange?.(newValue)
    onItemRemove?.(item, index)
    inputRef.current?.focus()
  }

  const handleOptionClick = (option: MultiSelectOption) => {
    addItem(option)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputBlur = () => {
    // Delay closing to allow option clicks
    setTimeout(() => setIsOpen(false), 150)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      inputRef.current?.focus()
    }
  }

  const multiSelectClass = [
    'multiselect',
    disabled && 'multiselect--disabled',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={multiSelectClass}>
      <div className="multiselect__field-body">
        {value.map((item, index) => (
          <Tag
            key={`${item.id}-${index}`}
            scheme="neutral"
            removable={!disabled}
            onRemove={() => removeItem(item, index)}
          >
            {item.label}
          </Tag>
        ))}
      </div>

      <div className="multiselect__input-container">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="multiselect__input"
        />
        <div className="multiselect__controls">
          <span className="multiselect__count">{value.length}</span>
          <button
            type="button"
            className="multiselect__toggle"
            onClick={toggleDropdown}
            disabled={disabled}
            aria-label="Toggle dropdown"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={isOpen ? 'multiselect__toggle-icon--up' : 'multiselect__toggle-icon--down'}
            >
              <g clipPath="url(#clip0_2036_43391)">
                <path
                  d="M9.99999 9.02366L5.87499 13.1487L4.69666 11.9703L9.99999 6.66699L15.3033 11.9703L14.125 13.1487L9.99999 9.02366Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_2036_43391">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (filteredOptions.length > 0 || (allowCreate && query)) && (
        <div className="multiselect__dropdown" style={{ maxHeight }}>
          <ul className="multiselect__options">
            {filteredOptions.map((option, index) => (
              <li
                key={option.id}
                className={`multiselect__option ${index === activeIndex ? 'multiselect__option--active' : ''}`}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}
            {allowCreate && query && !filteredOptions.some(opt => opt.label.toLowerCase() === query.toLowerCase()) && (
              <li
                className={`multiselect__option multiselect__option--create ${activeIndex === filteredOptions.length ? 'multiselect__option--active' : ''}`}
                onClick={() => {
                  if (createNewItemFromQuery) {
                    const newItem = createNewItemFromQuery(query.trim())
                    addItem(newItem)
                    onItemAdd?.(newItem)
                  } else {
                    const newItem: MultiSelectOption = {
                      id: `new-${Date.now()}`,
                      label: query.trim(),
                      value: query.trim()
                    }
                    addItem(newItem)
                    onItemAdd?.(newItem)
                  }
                }}
                onMouseEnter={() => setActiveIndex(filteredOptions.length)}
              >
                Create "{query}"
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MultiSelect
