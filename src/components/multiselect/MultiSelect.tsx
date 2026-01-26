import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
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
  placeholder = 'Press enter to add',
  disabled = false,
  allowCreate = true,
  className = '',
  maxHeight = 200,
  createNewItemFromQuery,
}) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const listboxBaseId = useId()
  const listboxId = `${listboxBaseId}-listbox`

  const selectedIds = useMemo(() => new Set(value.map((item) => item.id)), [value])

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase()

    return options.filter((option) => {
      if (selectedIds.has(option.id)) return false
      if (!q) return true
      return option.label.toLowerCase().includes(q)
    })
  }, [options, query, selectedIds])

  const queryTrimmed = query.trim()
  const queryLower = queryTrimmed.toLowerCase()

  const exactMatch = useMemo(() => {
    if (!queryTrimmed) return false
    return options.some((opt) => opt.label.toLowerCase() === queryLower)
  }, [options, queryLower, queryTrimmed])

  const showCreate = allowCreate && queryTrimmed.length > 0 && !exactMatch
  const optionsCount = filteredOptions.length + (showCreate ? 1 : 0)

  // Click-away handling (more reliable than relying on blur + timeouts)
  useEffect(() => {
    if (!isOpen) return

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (!rootRef.current?.contains(target)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [isOpen])

  // Keep activeIndex in bounds when results change
  useEffect(() => {
    if (activeIndex >= optionsCount) setActiveIndex(-1)
  }, [activeIndex, optionsCount])

  const addItem = (item: MultiSelectOption) => {
    const newValue = [...value, item]
    onChange?.(newValue)

    // Allow quick multi-add by keeping the dropdown open.
    setQuery('')
    setActiveIndex(-1)
    setIsOpen(true)

    inputRef.current?.focus()
  }

  const removeItem = (item: MultiSelectOption, index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange?.(newValue)
    onItemRemove?.(item, index)
    inputRef.current?.focus()
  }

  const createNewItem = (q: string): MultiSelectOption => {
    if (createNewItemFromQuery) return createNewItemFromQuery(q)

    return {
      id: `new-${Date.now()}`,
      label: q,
      value: q,
    }
  }

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
      setActiveIndex((prev) => {
        if (optionsCount <= 0) return -1
        const next = prev + 1
        return Math.min(next, optionsCount - 1)
      })
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, -1))
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()

      if (optionsCount <= 0) return

      // If nothing is actively highlighted, Enter should select the first match.
      const resolvedIndex = activeIndex >= 0 ? activeIndex : 0

      if (resolvedIndex < filteredOptions.length) {
        const selectedOption = filteredOptions[resolvedIndex]
        addItem(selectedOption)
        return
      }

      if (showCreate && resolvedIndex === filteredOptions.length) {
        const newItem = createNewItem(queryTrimmed)
        addItem(newItem)
        onItemAdd?.(newItem)
      }

      return
    }

    if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
      return
    }

    if (e.key === 'Backspace' && !query && value.length > 0) {
      const lastItem = value[value.length - 1]
      removeItem(lastItem, value.length - 1)
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const toggleDropdown = () => {
    if (disabled) return

    setIsOpen((open) => {
      const next = !open
      if (next) inputRef.current?.focus()
      if (!next) setActiveIndex(-1)
      return next
    })
  }

  const multiSelectClass = [
    'multiselect',
    disabled && 'multiselect--disabled',
    value.length > 0 && 'multiselect--has-tags',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const activeDescendantId =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined

  return (
    <div className={multiSelectClass} ref={rootRef}>
      {value.length > 0 && (
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
      )}

      <div
        className="multiselect__input-container"
        onMouseDown={(e) => {
          if (disabled) return
          const target = e.target as HTMLElement
          if (target === inputRef.current) return
          if (target.closest('button')) return

          // Prevent focusing something else (and blurring the input), then focus the input ourselves.
          e.preventDefault()
          inputRef.current?.focus()
          setIsOpen(true)
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="multiselect__input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
        />
        <div className="multiselect__controls">
          <span className="multiselect__count">{value.length}</span>
          <button
            type="button"
            className="multiselect__toggle"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleDropdown}
            disabled={disabled}
            aria-label="Toggle dropdown"
            aria-expanded={isOpen}
            aria-controls={listboxId}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={
                isOpen
                  ? 'multiselect__toggle-icon--up'
                  : 'multiselect__toggle-icon--down'
              }
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

      {isOpen && (
        <div
          className="multiselect__dropdown"
          style={{ maxHeight }}
          role="listbox"
          id={listboxId}
          aria-label="Options"
          onMouseDown={(e) => {
            // Keep input focused while clicking options.
            e.preventDefault()
          }}
        >
          <ul className="multiselect__options">
            {filteredOptions.map((option, index) => (
              <li
                key={option.id}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={false}
                className={`multiselect__option ${
                  index === activeIndex ? 'multiselect__option--active' : ''
                }`}
                onClick={() => addItem(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}

            {showCreate && (
              <li
                id={`${listboxId}-option-${filteredOptions.length}`}
                role="option"
                aria-selected={false}
                className={`multiselect__option multiselect__option--create ${
                  activeIndex === filteredOptions.length
                    ? 'multiselect__option--active'
                    : ''
                }`}
                onClick={() => {
                  const newItem = createNewItem(queryTrimmed)
                  addItem(newItem)
                  onItemAdd?.(newItem)
                }}
                onMouseEnter={() => setActiveIndex(filteredOptions.length)}
              >
                Create "{queryTrimmed}"
              </li>
            )}

            {!showCreate && filteredOptions.length === 0 && queryTrimmed.length > 0 && (
              <li className="multiselect__empty" aria-disabled="true">
                No matches
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MultiSelect
