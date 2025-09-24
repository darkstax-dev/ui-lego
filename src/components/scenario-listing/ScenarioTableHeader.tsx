import React from 'react'
import { ScenarioTableHeaderProps, SortableColumn } from './types'
import SortArrowIcon from './SortArrowIcon'
import './ScenarioTable.css'

const ScenarioTableHeader: React.FC<ScenarioTableHeaderProps> = ({
  onSelectAll,
  allSelected = false,
  someSelected = false,
  onSort,
  sortColumn,
  sortDirection
}) => {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll?.(event.target.checked)
  }

  const handleSort = (column: SortableColumn) => {
    onSort?.(column)
  }

  const renderSortableHeader = (column: SortableColumn, label: string, width?: string) => {
    const isActive = sortColumn === column
    const showArrow = isActive && sortDirection

    return (
      <div
        className={`scenario-table__header-cell ${width || ''}`}
        onClick={() => handleSort(column)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleSort(column)
          }
        }}
      >
        <div className="scenario-table__header-content">
          <span className="scenario-table__header-text">{label}</span>
          {showArrow && (
            <SortArrowIcon className={`scenario-table__sort-arrow ${sortDirection === 'desc' ? 'scenario-table__sort-arrow--desc' : ''}`} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="scenario-table__header">
      <div className="scenario-table__header-cell scenario-table__header-cell--checkbox">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(input) => {
            if (input) input.indeterminate = someSelected && !allSelected
          }}
          onChange={handleSelectAll}
          className="scenario-table__checkbox"
          aria-label="Select all scenarios"
        />
      </div>

      <div className="scenario-table__header-cell scenario-table__header-cell--name">
        <span className="scenario-table__header-text">Name</span>
      </div>

      <div className="scenario-table__header-cell scenario-table__header-cell--lock">
        {/* Empty for lock icon column */}
      </div>

      <div className="scenario-table__header-cell scenario-table__header-cell--cluster">
        <span className="scenario-table__header-text">Cluster</span>
      </div>

      <div className="scenario-table__header-cell scenario-table__header-cell--version">
        <span className="scenario-table__header-text">Version</span>
      </div>

      {renderSortableHeader('lastModified', 'Last modified', 'scenario-table__header-cell--last-modified')}

      {renderSortableHeader('createdBy', 'Created by', 'scenario-table__header-cell--created-by')}

      <div className="scenario-table__header-cell scenario-table__header-cell--options">
        <span className="scenario-table__header-text">Options</span>
      </div>
    </div>
  )
}

export default ScenarioTableHeader
