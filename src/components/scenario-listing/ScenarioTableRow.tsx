import React from 'react'
import { ScenarioTableRowProps } from './types'
import { LockIcon, UnlockIcon } from './LockIcons'
import MoreOptionsIcon from './MoreOptionsIcon'
import './ScenarioTable.css'

const ScenarioTableRow: React.FC<ScenarioTableRowProps> = ({
  scenario,
  onSelect,
  onOptionsClick
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(scenario.id, event.target.checked)
  }

  const handleOptionsClick = () => {
    onOptionsClick?.(scenario.id)
  }

  return (
    <div className="scenario-table__row">
      <div className="scenario-table__cell scenario-table__cell--checkbox">
        <input
          type="checkbox"
          checked={scenario.isSelected || false}
          onChange={handleSelect}
          className="scenario-table__checkbox"
          aria-label={`Select ${scenario.name}`}
        />
      </div>

      <div className="scenario-table__cell scenario-table__cell--name">
        <span className="scenario-table__text scenario-table__text--ellipsis">{scenario.name}</span>
      </div>

      <div className="scenario-table__cell scenario-table__cell--lock">
        {scenario.isLocked ? (
          <LockIcon className="scenario-table__lock-icon scenario-table__lock-icon--locked" />
        ) : (
          <UnlockIcon className="scenario-table__lock-icon scenario-table__lock-icon--unlocked" />
        )}
      </div>

      <div className="scenario-table__cell scenario-table__cell--cluster">
        <span className="scenario-table__text">{scenario.cluster}</span>
      </div>

      <div className="scenario-table__cell scenario-table__cell--version">
        <span className="scenario-table__text">{scenario.version}</span>
      </div>

      <div className="scenario-table__cell scenario-table__cell--last-modified">
        <span className="scenario-table__text">{scenario.lastModified}</span>
      </div>

      <div className="scenario-table__cell scenario-table__cell--created-by">
        <span className="scenario-table__text">{scenario.createdBy}</span>
      </div>

      <div className="scenario-table__cell scenario-table__cell--options">
        <button
          className="scenario-table__options-button"
          onClick={handleOptionsClick}
          aria-label={`More options for ${scenario.name}`}
        >
          <MoreOptionsIcon className="scenario-table__options-icon" />
        </button>
      </div>
    </div>
  )
}

export default ScenarioTableRow
