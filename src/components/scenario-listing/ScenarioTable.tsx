import React, { useState } from 'react'
import ScenarioTableHeader from './ScenarioTableHeader'
import ScenarioTableRow from './ScenarioTableRow'
import OptionBar from './option-bar/OptionBar'
import DeleteNamespacePopup from './option-bar/DeleteNamespacePopup'
import { ScenarioTableWithOptionsProps } from './types'
import './ScenarioTable.css'


const ScenarioTable: React.FC<ScenarioTableWithOptionsProps> = ({
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
  const [showDeleteNamespacePopup, setShowDeleteNamespacePopup] = useState(false)

  const selectedScenarios = scenarios.filter(scenario => scenario.isSelected)
  const allSelected = scenarios.length > 0 && selectedScenarios.length === scenarios.length
  const someSelected = selectedScenarios.length > 0 && selectedScenarios.length < scenarios.length

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

  const handleDeleteNamespace = () => {
    setShowDeleteNamespacePopup(true)
    handleCloseOptionBar()
  }

  const handleDeleteNamespaceConfirm = (namespaces: string[]) => {
    if (selectedScenarioId) {
      onDeleteNamespace?.(selectedScenarioId, namespaces)
    }
    setShowDeleteNamespacePopup(false)
  }

  // Create handlers that include the selected scenario ID
  const createHandler = (handler?: (scenarioId: string) => void) => {
    return handler && selectedScenarioId ? () => {
      handler(selectedScenarioId)
      handleCloseOptionBar()
    } : undefined
  }

  return (
    <div className={`scenario-table ${className}`}>
      <ScenarioTableHeader
        onSelectAll={onSelectAll}
        allSelected={allSelected}
        someSelected={someSelected}
        onSort={onSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />

      <div className="scenario-table__body">
        {scenarios.map((scenario) => (
          <ScenarioTableRow
            key={scenario.id}
            scenario={scenario}
            onSelect={onScenarioSelect}
            onOptionsClick={(scenarioId, event) => handleOptionsClick(scenarioId, event)}
          />
        ))}
      </div>

      {/* Option Bar */}
      {selectedScenarioId && (
        <>
          <div 
            className="scenario-table__overlay"
            onClick={handleCloseOptionBar}
          />
          <div 
            className="scenario-table__option-bar"
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
              onDeleteNamespace={handleDeleteNamespace}
              onDelete={createHandler(onDelete)}
            />
          </div>
        </>
      )}

      {/* Delete Namespace Popup */}
      <DeleteNamespacePopup
        isOpen={showDeleteNamespacePopup}
        onClose={() => setShowDeleteNamespacePopup(false)}
        onDelete={handleDeleteNamespaceConfirm}
      />
    </div>
  )
}

export default ScenarioTable
