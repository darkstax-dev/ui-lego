import React from 'react'
import './SearchField.css'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  onClear?: () => void
  id?: string
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  onClear,
  id
}) => {
  const searchId = id || `search-${Math.random().toString(36).substr(2, 9)}`
  const hasValue = !!value

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.value)
    }
  }

  const handleClear = () => {
    if (!disabled && onClear) {
      onClear()
    } else if (!disabled) {
      onChange('')
    }
  }

  const SearchIcon = () => (
    <svg 
      className="search-field__search-icon" 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none"
    >
      <path 
        d="M12.0206 11.078L14.8759 13.9327L13.9326 14.876L11.0779 12.0207C10.0157 12.8721 8.69459 13.3353 7.33325 13.3333C4.02125 13.3333 1.33325 10.6453 1.33325 7.33333C1.33325 4.02133 4.02125 1.33333 7.33325 1.33333C10.6453 1.33333 13.3333 4.02133 13.3333 7.33333C13.3352 8.69466 12.8721 10.0158 12.0206 11.078ZM10.6833 10.5833C11.5293 9.71325 12.0018 8.54695 11.9999 7.33333C11.9999 4.75466 9.91125 2.66666 7.33325 2.66666C4.75459 2.66666 2.66659 4.75466 2.66659 7.33333C2.66659 9.91133 4.75459 12 7.33325 12C8.54687 12.0019 9.71318 11.5294 10.5833 10.6833L10.6833 10.5833Z" 
        fill="currentColor"
      />
    </svg>
  )

  const ClearIcon = () => (
    <svg 
      className="search-field__clear-icon" 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none"
    >
      <path 
        d="M7.99999 7.05734L11.3 3.75734L12.2427 4.70001L8.94266 8.00001L12.2427 11.3L11.3 12.2427L7.99999 8.94267L4.69999 12.2427L3.75732 11.3L7.05732 8.00001L3.75732 4.70001L4.69999 3.75734L7.99999 7.05734Z" 
        fill="currentColor"
      />
    </svg>
  )

  return (
    <div className={`search-field ${disabled ? 'search-field--disabled' : ''} ${hasValue ? 'search-field--filled' : ''}`}>
      <div className="search-field__input-container">
        <SearchIcon />
        
        <input
          id={searchId}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="search-field__input"
        />
        
        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="search-field__clear-button"
            aria-label="Clear search"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchField
