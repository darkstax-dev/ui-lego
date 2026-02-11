import React from 'react'
import './Header.css'

export interface HeaderProps {
  title: string
  onCreateClick?: () => void
  onSearchChange?: (value: string) => void
  showOnlyLocked?: boolean
  onToggleLocked?: (checked: boolean) => void
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onCreateClick,
  onSearchChange,
  showOnlyLocked = false,
  onToggleLocked,
  className = ''
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value)
  }

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleLocked?.(e.target.checked)
  }

  return (
    <div className={`header ${className}`}>
      <div className="header__left">
        <h1 className="header__title">[{title}]</h1>
      </div>

      <div className="header__right">
        <div className="header__toggle">
          <label className="header__toggle-label">
            <input
              type="checkbox"
              checked={showOnlyLocked}
              onChange={handleToggleChange}
              className="header__toggle-input"
            />
            <span className="header__toggle-text">Only locked records</span>
          </label>
        </div>

        <div className="header__filter-buttons">
          <button className="header__filter-button">All</button>
        </div>

        <div className="header__search">
          <svg className="header__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            className="header__search-input"
          />
        </div>

        <button className="header__download-button" aria-label="Download">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.66667 6.66667L8 10L11.3333 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button className="header__upload-button" aria-label="Upload">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.3333 5.33333L8 2L4.66667 5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button className="header__create-button" onClick={onCreateClick}>
          CREATE_SCENARIO
          <span className="header__create-icon">+</span>
        </button>
      </div>
    </div>
  )
}

export default Header
