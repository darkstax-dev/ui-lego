import React from 'react'
import './TopBar.css'

interface TopBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const TopBar: React.FC<TopBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="topology-topbar">
      <div className="topology-topbar__container">
        {/* Logo and Brand */}
        <div className="topology-topbar__brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor"/>
          </svg>
          <span className="topology-topbar__brand-text">DARKSTAX</span>
        </div>

        {/* Navigation */}
        <nav className="topology-topbar__nav">
          <button className="topology-topbar__nav-item topology-topbar__nav-item--active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99984 1.6665L3.33317 5.83317V14.1665L9.99984 18.3332L16.6665 14.1665V5.83317L9.99984 1.6665Z" fill="currentColor"/>
            </svg>
            <span>DASHBOARD</span>
            <svg className="topology-topbar__dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8L3 5H9L6 8Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="topology-topbar__nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33333 8.33333H16.6667M10 3.33333V16.6667M5 13.3333L15 6.66667" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>TOPOLOGY</span>
            <svg className="topology-topbar__dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8L3 5H9L6 8Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="topology-topbar__nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5H15M5 12.5H11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>MODELING</span>
            <svg className="topology-topbar__dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8L3 5H9L6 8Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="topology-topbar__nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 15V10M10 5H10.01" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>TEMPLATE</span>
            <svg className="topology-topbar__dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8L3 5H9L6 8Z" fill="currentColor"/>
            </svg>
          </button>
        </nav>

        {/* Right actions */}
        <div className="topology-topbar__actions">
          <button className="topology-topbar__icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 10C15.8333 13.2217 13.2217 15.8333 10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10C4.16667 6.77834 6.77834 4.16667 10 4.16667" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="topology-topbar__icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="topology-topbar__icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="12" height="12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="topology-topbar__icon-btn topology-topbar__icon-btn--avatar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
