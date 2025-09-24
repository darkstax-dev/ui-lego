import React from 'react'
import { ScenarioTableProps } from './types'
import ScenarioTableHeader from './ScenarioTableHeader'
import ScenarioTableRow from './ScenarioTableRow'
import './ScenarioTable.css'

const ScenarioTable: React.FC<ScenarioTableProps> = ({
  scenarios,
  onScenarioSelect,
  onSelectAll,
  onSort,
  sortColumn,
  sortDirection,
  onOptionsClick,
  className = ''
}) => {
  const selectedScenarios = scenarios.filter(scenario => scenario.isSelected)
  const allSelected = scenarios.length > 0 && selectedScenarios.length === scenarios.length
  const someSelected = selectedScenarios.length > 0 && selectedScenarios.length < scenarios.length

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
            onOptionsClick={onOptionsClick}
          />
        ))}
      </div>
    </div>
  )
}

export default ScenarioTable
