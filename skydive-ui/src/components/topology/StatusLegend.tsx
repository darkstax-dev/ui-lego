import React from 'react'
import './StatusLegend.css'

interface StatusLegendProps {
  onClose: () => void
}

const statusItems = [
  { label: 'Not deployed / Ready', color: '#EBEBEB', opacity: 1, stroke: 'rgba(0, 0, 0, 0.1)' },
  { label: 'Deploying', color: '#FAA536', opacity: 1 },
  { label: 'Active / Deployed / Running', color: '#2B9952', opacity: 1 },
  { label: 'Error', color: '#AA1A00', opacity: 1 },
  { label: 'Terminated', color: '#0E2846', opacity: 1 }
]

export const StatusLegend: React.FC<StatusLegendProps> = ({ onClose }) => {
  return (
    <div className="status-legend">
      <svg className="status-legend__beak" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M5.65685 11.3137L11.3137 5.65685L5.65685 0L0 5.65685L5.65685 11.3137Z" fill="var(--color-gray-200, #DFDFDF)"/>
      </svg>
      
      <div className="status-legend__content">
        <h3 className="status-legend__title">Status Legend</h3>
        
        <div className="status-legend__items">
          {statusItems.map((item, index) => (
            <div key={index} className="status-legend__item">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path 
                  d="M8.80015 0.0518371C8.92382 -0.0172791 9.07618 -0.017279 9.19985 0.0518371L17.8001 4.85838C17.9238 4.92749 18 5.05523 18 5.19346V14.8065C18 14.9448 17.9238 15.0725 17.8001 15.1416L9.19985 19.9482C9.07618 20.0173 8.92382 20.0173 8.80015 19.9482L0.199852 15.1416C0.0761831 15.0725 0 14.9448 0 14.8065V5.19346C0 5.05523 0.0761832 4.92749 0.199852 4.85838L8.80015 0.0518371Z" 
                  fill={item.color}
                  fillOpacity={item.opacity}
                  stroke={item.stroke}
                />
              </svg>
              <span className="status-legend__label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="status-legend__summary">
          <p className="status-legend__summary-text">
            Total: {statusItems.length} status indicators
          </p>
        </div>
      </div>
    </div>
  )
}
