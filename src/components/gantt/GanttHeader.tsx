import React, { useState, useRef, useEffect } from 'react'
import SearchField from '../inputs/SearchField'
import './GanttHeader.css'

interface GanttHeaderProps {
  title?: string
  projectName?: string
  agentNames?: string[]
  selectedAgent?: string
  onAgentChange?: (agent: string) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  sliderNode?: React.ReactNode
}

const GanttHeader: React.FC<GanttHeaderProps> = ({
  title = '[GANTT CHART]',
  projectName = 'Project name',
  agentNames = [],
  selectedAgent = '',
  onAgentChange,
  searchValue = '',
  onSearchChange,
  sliderNode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleAgentSelect = (agent: string) => {
    if (onAgentChange) {
      onAgentChange(agent)
    }
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="gantt-page-header">
      <div className="gantt-page-header-top">
        <div className="gantt-page-header-content">
          <div className="gantt-page-header-left">
            <h1 className="gantt-page-header-title">{title}</h1>
          </div>

          <div className="gantt-page-header-right">
            <SearchField
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <div className="gantt-page-header-divider">
        <div className="gantt-page-header-controls">
          <div className="gantt-page-header-controls-left">
            <div className="gantt-project-name">
              <span className="gantt-project-name-text">{projectName}</span>
            </div>

            {agentNames.length > 0 && (
              <div className="gantt-agent-dropdown" ref={dropdownRef}>
                <button
                  className={`gantt-agent-dropdown-trigger ${selectedAgent ? 'has-selection' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedAgent || 'Agent name'}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="gantt-agent-dropdown-menu">
                    {agentNames.map((agent, index) => (
                      <button
                        key={index}
                        className={`gantt-agent-dropdown-item ${agent === selectedAgent ? 'selected' : ''}`}
                        onClick={() => handleAgentSelect(agent)}
                      >
                        {agent}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {sliderNode && (
            <div className="gantt-page-header-controls-right">
              {sliderNode}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GanttHeader
