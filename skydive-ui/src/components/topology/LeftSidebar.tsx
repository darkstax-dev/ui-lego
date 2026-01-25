import React from 'react'
import './LeftSidebar.css'

export const LeftSidebar: React.FC = () => {
  const sections = [
    { label: 'Load', rotation: -90 },
    { label: 'Service', rotation: -90 },
    { label: 'Network', rotation: -90 },
    { label: 'Config and Storage', rotation: -90 }
  ]

  return (
    <div className="topology-left-sidebar">
      {sections.map(section => (
        <div key={section.label} className="topology-left-sidebar__section">
          <div className="topology-left-sidebar__label-container">
            <span 
              className="topology-left-sidebar__label"
              style={{ transform: `rotate(${section.rotation}deg)` }}
            >
              {section.label}
            </span>
          </div>
          <div className="topology-left-sidebar__content">
            {/* Section content placeholder */}
          </div>
        </div>
      ))}
    </div>
  )
}
