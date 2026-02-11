import React, { useState } from 'react'
import './SearchPanel.css'

export interface SearchPanelProps {
  /** Callback when search value changes */
  onSearch?: (value: string) => void
  /** Input nodes data */
  inputNodes?: string[]
  /** Output nodes data */
  outputNodes?: string[]
  /** Execution nodes data */
  executionNodes?: string[]
  /** Additional CSS classes */
  className?: string
}

const SearchPanel: React.FC<SearchPanelProps> = ({ 
  onSearch,
  inputNodes = [],
  outputNodes = [],
  executionNodes = [],
  className = '' 
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [expandedSections, setExpandedSections] = useState<{
    inputNodes: boolean
    outputNodes: boolean
    executionNodes: boolean
  }>({
    inputNodes: false,
    outputNodes: false,
    executionNodes: false
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch?.(value)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className={`search-panel ${className}`}>
      <div className="search-panel__search">
        <svg className="search-panel__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_search)">
            <path d="M12.0208 11.0777L14.8762 13.9323L13.9328 14.8757L11.0782 12.0203C10.016 12.8718 8.69483 13.3349 7.3335 13.333C4.0215 13.333 1.3335 10.645 1.3335 7.33301C1.3335 4.02101 4.0215 1.33301 7.3335 1.33301C10.6455 1.33301 13.3335 4.02101 13.3335 7.33301C13.3354 8.69434 12.8723 10.0155 12.0208 11.0777ZM10.6835 10.583C11.5296 9.71293 12.0021 8.54663 12.0002 7.33301C12.0002 4.75434 9.9115 2.66634 7.3335 2.66634C4.75483 2.66634 2.66683 4.75434 2.66683 7.33301C2.66683 9.91101 4.75483 11.9997 7.3335 11.9997C8.54712 12.0016 9.71342 11.5291 10.5835 10.683L10.6835 10.583Z" fill="#78797A"/>
          </g>
          <defs>
            <clipPath id="clip0_search">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <input
          type="text"
          className="search-panel__input"
          placeholder="Search actions..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="search-panel__sections">
        <div className="search-panel__section">
          <button 
            className="search-panel__section-header"
            onClick={() => toggleSection('inputNodes')}
            aria-expanded={expandedSections.inputNodes}
          >
            <span className="search-panel__section-title">Input Nodes</span>
            <svg 
              className={`search-panel__arrow ${expandedSections.inputNodes ? 'search-panel__arrow--expanded' : ''}`}
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_arrow)">
                <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#78797A"/>
              </g>
              <defs>
                <clipPath id="clip0_arrow">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          {expandedSections.inputNodes && (
            <div className="search-panel__section-content">
              {inputNodes.length > 0 ? (
                inputNodes.map((node, index) => (
                  <div key={index} className="search-panel__item">{node}</div>
                ))
              ) : (
                <div className="search-panel__empty">No input nodes</div>
              )}
            </div>
          )}
        </div>

        <div className="search-panel__divider" />

        <div className="search-panel__section">
          <button 
            className="search-panel__section-header"
            onClick={() => toggleSection('outputNodes')}
            aria-expanded={expandedSections.outputNodes}
          >
            <span className="search-panel__section-title">Output Nodes</span>
            <svg 
              className={`search-panel__arrow ${expandedSections.outputNodes ? 'search-panel__arrow--expanded' : ''}`}
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_arrow2)">
                <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#78797A"/>
              </g>
              <defs>
                <clipPath id="clip0_arrow2">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          {expandedSections.outputNodes && (
            <div className="search-panel__section-content">
              {outputNodes.length > 0 ? (
                outputNodes.map((node, index) => (
                  <div key={index} className="search-panel__item">{node}</div>
                ))
              ) : (
                <div className="search-panel__empty">No output nodes</div>
              )}
            </div>
          )}
        </div>

        <div className="search-panel__divider" />

        <div className="search-panel__section">
          <button 
            className="search-panel__section-header"
            onClick={() => toggleSection('executionNodes')}
            aria-expanded={expandedSections.executionNodes}
          >
            <span className="search-panel__section-title">Execution Nodes</span>
            <svg 
              className={`search-panel__arrow ${expandedSections.executionNodes ? 'search-panel__arrow--expanded' : ''}`}
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_arrow3)">
                <path d="M10.0001 10.9766L14.1251 6.85156L15.3034 8.0299L10.0001 13.3332L4.69678 8.0299L5.87511 6.85156L10.0001 10.9766Z" fill="#78797A"/>
              </g>
              <defs>
                <clipPath id="clip0_arrow3">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          {expandedSections.executionNodes && (
            <div className="search-panel__section-content">
              {executionNodes.length > 0 ? (
                executionNodes.map((node, index) => (
                  <div key={index} className="search-panel__item">{node}</div>
                ))
              ) : (
                <div className="search-panel__empty">No execution nodes</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPanel
