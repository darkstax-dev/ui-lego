import React from 'react'
import { ViewMode, TimelineUnit } from './types'
import { getColumnWidth } from './utils'

export interface TimelineProps {
  units: TimelineUnit[]
  viewMode: ViewMode
  showWeekends?: boolean
}

const Timeline: React.FC<TimelineProps> = ({ units, viewMode, showWeekends = true }) => {
  const columnWidth = getColumnWidth(viewMode)

  return (
    <div className="gantt-timeline">
      <div className="gantt-timeline-header">
        {units.map((unit, index) => {
          const isWeekend = unit.isWeekend && viewMode === 'day'
          const hideWeekend = isWeekend && !showWeekends
          
          if (hideWeekend) return null

          return (
            <div
              key={`${unit.label}-${index}`}
              className={`gantt-timeline-unit ${isWeekend ? 'weekend' : ''}`}
              style={{ 
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
              }}
            >
              <span className="gantt-timeline-label">{unit.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Timeline
