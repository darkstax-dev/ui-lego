import React from 'react'
import './ActivityModelCard.css'
import { KubernetesPod } from '../icons/kubernetes'

export type ActivityModel = {
  id: string
  template: string
  type: string
}

export interface ActivityModelCardProps extends ActivityModel {
  onRemove?: (id: string) => void
  icon?: React.ReactNode
}

const ActivityModelCard: React.FC<ActivityModelCardProps> = ({ id, template, type, onRemove, icon }) => {
  return (
    <div className="activity-model-card">
      <div className="activity-model-card__left">
        <div className="activity-model-card__icon" aria-hidden="true">
          {icon ?? <KubernetesPod width={36} height={36} />}
        </div>
      </div>
      <div className="activity-model-card__body">
        <div className="activity-model-card__title">{id}</div>
        <div className="activity-model-card__meta">
          <div>
            Template: <strong>{template}</strong>
          </div>
          <div>
            Type: <strong>{type}</strong>
          </div>
        </div>
      </div>
      {onRemove && (
        <button className="activity-model-card__close" aria-label="Remove" onClick={() => onRemove(id)}>
          ×
        </button>
      )}
    </div>
  )
}

export default ActivityModelCard
