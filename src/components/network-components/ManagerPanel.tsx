import React, { useState } from 'react'
import './ManagerPanel.css'

export type TabType = 'layout' | 'layers' | 'view' | 'tools'

export interface LayerItem {
  id: string
  name: string
  visible: boolean
  expanded?: boolean
}

export interface ManagerPanelProps {
  title?: string
  activeTab?: TabType
  layers?: LayerItem[]
  onTabChange?: (tab: TabType) => void
  onLayerToggle?: (id: string) => void
  onLayerExpand?: (id: string) => void
  onCollapse?: () => void
  onMore?: () => void
  onClose?: () => void
  className?: string
}

export const ManagerPanel: React.FC<ManagerPanelProps> = ({
  title = 'Manager',
  activeTab = 'layers',
  layers = [
    { id: '1', name: 'Core visual layers', visible: true, expanded: true },
    { id: '2', name: 'Custom group', visible: true, expanded: true }
  ],
  onTabChange,
  onLayerToggle,
  onLayerExpand,
  onCollapse,
  onMore,
  onClose,
  className = ''
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab)

  const handleTabClick = (tab: TabType) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className={`manager-panel ${className}`}>
      <div className="manager-panel__header">
        <div className="manager-panel__title">{title}</div>
        <div className="manager-panel__actions">
          <button 
            className="manager-panel__action-btn" 
            onClick={onCollapse}
            aria-label="Collapse"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9997 10.828L7.04974 15.778L5.63574 14.364L11.9997 8L18.3637 14.364L16.9497 15.778L11.9997 10.828Z" fill="#78797A"/>
            </svg>
          </button>
          <button 
            className="manager-panel__action-btn" 
            onClick={onMore}
            aria-label="More options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#78797A"/>
            </svg>
          </button>
          <button 
            className="manager-panel__action-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9997 10.5867L16.9497 5.63672L18.3637 7.05072L13.4137 12.0007L18.3637 16.9507L16.9497 18.3647L11.9997 13.4147L7.04974 18.3647L5.63574 16.9507L10.5857 12.0007L5.63574 7.05072L7.04974 5.63672L11.9997 10.5867Z" fill="#78797A"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="manager-panel__tabs">
        <button 
          className={`manager-panel__tab ${currentTab === 'layout' ? 'manager-panel__tab--active' : ''}`}
          onClick={() => handleTabClick('layout')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 10H10V14H14V10ZM16 10V14H19V10H16ZM14 19V16H10V19H14ZM16 19H19V16H16V19ZM14 5H10V8H14V5ZM16 5V8H19V5H16ZM8 10H5V14H8V10ZM8 19V16H5V19H8ZM8 5H5V8H8V5ZM4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3Z" fill="currentColor"/>
          </svg>
          <span>Layout</span>
        </button>
        <button 
          className={`manager-panel__tab ${currentTab === 'layers' ? 'manager-panel__tab--active' : ''}`}
          onClick={() => handleTabClick('layers')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3L2.51436 8.12582C2.19689 8.30219 2 8.63681 2 8.99998C2 9.36314 2.19689 9.69776 2.51436 9.87413L6.34087 12L2.51436 14.1258C2.19689 14.3022 2 14.6368 2 15C2 15.3631 2.19689 15.6978 2.51436 15.8741L12 21L21.4856 15.8741C21.8031 15.6978 22 15.3631 22 15C22 14.6368 21.8031 14.3022 21.4856 14.1258L17.6591 12L21.4856 9.87413C21.8031 9.69776 22 9.36314 22 8.99998C22 8.63681 21.8031 8.30219 21.4856 8.12582L12 3ZM15.6 13.1439L12 15L8.4 13.1439L5.05913 15L12 18.7121L18.9409 15L15.6 13.1439ZM18.9409 8.99998L12 5.28792L5.05913 8.99998L12 12.7121L18.9409 8.99998Z" fill="currentColor"/>
          </svg>
          <span>Layers</span>
        </button>
        <button 
          className={`manager-panel__tab ${currentTab === 'view' ? 'manager-panel__tab--active' : ''}`}
          onClick={() => handleTabClick('view')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM9.71 19.667C8.72341 17.5743 8.15187 15.3102 8.027 13H4.062C4.25659 14.5389 4.89392 15.9882 5.89657 17.1717C6.89922 18.3552 8.22401 19.2221 9.71 19.667ZM10.03 13C10.181 15.439 10.878 17.73 12 19.752C13.1523 17.6766 13.8254 15.3695 13.97 13H10.03ZM19.938 13H15.973C15.8481 15.3102 15.2766 17.5743 14.29 19.667C15.776 19.2221 17.1008 18.3552 18.1034 17.1717C19.1061 15.9882 19.7434 14.5389 19.938 13ZM4.062 11H8.027C8.15187 8.68979 8.72341 6.42569 9.71 4.333C8.22401 4.77788 6.89922 5.64475 5.89657 6.8283C4.89392 8.01184 4.25659 9.4611 4.062 11ZM10.031 11H13.969C13.8248 8.6306 13.152 6.32353 12 4.248C10.8477 6.32345 10.1746 8.63052 10.03 11H10.031ZM14.29 4.333C15.2766 6.42569 15.8481 8.68979 15.973 11H19.938C19.7434 9.4611 19.1061 8.01184 18.1034 6.8283C17.1008 5.64475 15.776 4.77788 14.29 4.333Z" fill="currentColor"/>
          </svg>
          <span>View</span>
        </button>
        <button 
          className={`manager-panel__tab ${currentTab === 'tools' ? 'manager-panel__tab--active' : ''}`}
          onClick={() => handleTabClick('tools')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33003 3.27193C5.99706 3.03392 6.72061 3.00386 7.40509 3.18574C8.08957 3.36761 8.70277 3.75286 9.16368 4.29059C9.62459 4.82832 9.91152 5.49322 9.98657 6.19746C10.0616 6.9017 9.92126 7.61215 9.58403 8.23493L20.293 18.9449L18.879 20.3589L8.16903 9.64893C7.5461 9.98484 6.83602 10.1241 6.13236 10.0484C5.4287 9.97275 4.76448 9.68564 4.22724 9.22494C3.69 8.76425 3.30494 8.15159 3.12282 7.4677C2.9407 6.78382 2.97006 6.0608 3.20703 5.39393L5.44403 7.63093C5.5824 7.7742 5.74791 7.88847 5.93092 7.96708C6.11393 8.0457 6.31076 8.08708 6.50993 8.08881C6.70909 8.09054 6.90661 8.05259 7.09096 7.97717C7.2753 7.90174 7.44278 7.79036 7.58362 7.64953C7.72446 7.50869 7.83584 7.34121 7.91126 7.15686C7.98668 6.97252 8.02463 6.775 8.0229 6.57583C8.02117 6.37666 7.97979 6.17983 7.90118 5.99683C7.82257 5.81382 7.70829 5.6483 7.56503 5.50993L5.32903 3.27093L5.33003 3.27193ZM15.697 5.15593L18.879 3.38793L20.293 4.80193L18.525 7.98393L16.757 8.33793L14.637 10.4589L13.222 9.04493L15.343 6.92393L15.697 5.15593ZM8.97903 13.2879L10.393 14.7019L5.09003 20.0049C4.90973 20.1857 4.66709 20.2907 4.41186 20.2984C4.15663 20.306 3.90814 20.2157 3.71734 20.046C3.52655 19.8763 3.40789 19.6401 3.38571 19.3857C3.36352 19.1313 3.43949 18.8781 3.59803 18.6779L3.67603 18.5909L8.97903 13.2879Z" fill="currentColor"/>
          </svg>
          <span>Tools</span>
        </button>
      </div>

      {currentTab === 'layers' && (
        <div className="manager-panel__layers">
          {layers.map((layer) => (
            <div key={layer.id} className="manager-panel__layer">
              <button 
                className="manager-panel__layer-visibility"
                onClick={() => onLayerToggle?.(layer.id)}
                aria-label={layer.visible ? 'Hide layer' : 'Show layer'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35865 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44107 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44107 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82127 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82127 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#00112B"/>
                </svg>
              </button>
              <div className="manager-panel__layer-name">{layer.name}</div>
              <button 
                className="manager-panel__layer-expand"
                onClick={() => onLayerExpand?.(layer.id)}
                aria-label={layer.expanded ? 'Collapse layer' : 'Expand layer'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00048 8.78047L11.3005 5.48047L12.2431 6.42314L8.00048 10.6658L3.75781 6.42314L4.70048 5.48047L8.00048 8.78047Z" fill="#00112B"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
