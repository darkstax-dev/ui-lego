import React, { useState } from 'react'
import ScenarioTable from './ScenarioTable'
import OptionBar from './option-bar/OptionBar'
import { ScenarioTableProps } from './types'
import './ScenarioTableWithOptions.css'

export interface ScenarioTableWithOptionsProps extends Omit<ScenarioTableProps, 'onOptionsClick'> {
  onOpen?: (scenarioId: string) => void
  onVersionHistory?: (scenarioId: string) => void
  onEdit?: (scenarioId: string) => void
  onScenarioAccessibility?: (scenarioId: string) => void
  onScenarioNodes?: (scenarioId: string) => void
  onDeploy?: (scenarioId: string) => void
  onRun?: (scenarioId: string) => void
  onDeleteNamespace?: (scenarioId: string) => void
  onDelete?: (scenarioId: string) => void
}

const ScenarioTableWithOptions: React.FC<ScenarioTableWithOptionsProps> = ({
  scenarios,
  onScenarioSelect,
  onSelectAll,
  onSort,
  sortColumn,
  sortDirection,
  className = '',
  onOpen,
  onVersionHistory,
  onEdit,
  onScenarioAccessibility,
  onScenarioNodes,
  onDeploy,
  onRun,
  onDeleteNamespace,
  onDelete
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null)
  const [optionBarPosition, setOptionBarPosition] = useState<{ top: number; left: number } | null>(null)

  const handleOptionsClick = (scenarioId: string, event?: React.MouseEvent) => {
    if (selectedScenarioId === scenarioId) {
      // Close if clicking the same scenario
      setSelectedScenarioId(null)
      setOptionBarPosition(null)
    } else {
      // Open for new scenario
      setSelectedScenarioId(scenarioId)
      
      // Calculate position for the option bar
      if (event) {
        const target = event.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        
        // Position the option bar to the left of the button, ensuring it stays on screen
        const optionBarWidth = 220
        const leftPosition = Math.max(
          10, // Minimum left margin
          Math.min(
            rect.left + scrollLeft - optionBarWidth,
            window.innerWidth - optionBarWidth - 10 // Maximum right margin
          )
        )
        
        setOptionBarPosition({
          top: rect.bottom + scrollTop + 8,
          left: leftPosition
        })
      } else {
        // Fallback position if no event
        setOptionBarPosition({
          top: 100,
          left: 100
        })
      }
    }
  }

  const handleCloseOptionBar = () => {
    setSelectedScenarioId(null)
    setOptionBarPosition(null)
  }

  // Create handlers that include the selected scenario ID
  const createHandler = (handler?: (scenarioId: string) => void) => {
    return handler && selectedScenarioId ? () => {
      handler(selectedScenarioId)
      handleCloseOptionBar()
    } : undefined
  }

  return (
    <div className={`scenario-table-with-options ${className}`}>
      <ScenarioTable
        scenarios={scenarios}
        onScenarioSelect={onScenarioSelect}
        onSelectAll={onSelectAll}
        onSort={onSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onOptionsClick={(scenarioId, event) => handleOptionsClick(scenarioId, event)}
      />
      
      {selectedScenarioId && (
        <>
          <div 
            className="scenario-table-with-options__overlay"
            onClick={handleCloseOptionBar}
          />
          <div 
            className="scenario-table-with-options__option-bar"
            style={{
              position: 'fixed',
              top: optionBarPosition?.top || 100,
              left: optionBarPosition?.left || 100,
              zIndex: 1000
            }}
          >
            <OptionBar
              onOpen={createHandler(onOpen)}
              onVersionHistory={createHandler(onVersionHistory)}
              onEdit={createHandler(onEdit)}
              onScenarioAccessibility={createHandler(onScenarioAccessibility)}
              onScenarioNodes={createHandler(onScenarioNodes)}
              onDeploy={createHandler(onDeploy)}
              onRun={createHandler(onRun)}
              onDeleteNamespace={createHandler(onDeleteNamespace)}
              onDelete={createHandler(onDelete)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ScenarioTableWithOptions
