import React from 'react'
import './ConnectionTrafficTable.css'

export type ThreatLevel = 'High' | 'Medium' | 'Low'
export type RowStatus = 'default' | 'warning' | 'danger' | 'hover'

export interface TrafficRow {
  id: string
  event: string
  eventIP?: string
  threatLevel: ThreatLevel
  supervisor: string
  email: string
  status?: RowStatus
  hasAlert?: boolean
}

export interface ConnectionTrafficTableProps {
  title?: string
  rows: TrafficRow[]
  onRowClick?: (row: TrafficRow) => void
  onCollapse?: () => void
  onMore?: () => void
  onClose?: () => void
  onFullscreen?: () => void
  className?: string
}

export const ConnectionTrafficTable: React.FC<ConnectionTrafficTableProps> = ({
  title = 'Connection trafic table',
  rows,
  onRowClick,
  onCollapse,
  onMore,
  onClose,
  onFullscreen,
  className = ''
}) => {
  return (
    <div className={`connection-traffic-table ${className}`}>
      <div className="connection-traffic-table__header">
        <div className="connection-traffic-table__title">{title}</div>
        <div className="connection-traffic-table__actions">
          <button 
            className="connection-traffic-table__action-btn" 
            onClick={onFullscreen}
            aria-label="Fullscreen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3H22V9H20V5H16V3ZM2 3H8V5H4V9H2V3ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z" fill="#78797A"/>
            </svg>
          </button>
          <button 
            className="connection-traffic-table__action-btn" 
            onClick={onCollapse}
            aria-label="Collapse"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0002 10.828L7.05023 15.778L5.63623 14.364L12.0002 8L18.3642 14.364L16.9502 15.778L12.0002 10.828Z" fill="#78797A"/>
            </svg>
          </button>
          <button 
            className="connection-traffic-table__action-btn" 
            onClick={onMore}
            aria-label="More options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#78797A"/>
            </svg>
          </button>
          <button 
            className="connection-traffic-table__action-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0002 10.5867L16.9502 5.63672L18.3642 7.05072L13.4142 12.0007L18.3642 16.9507L16.9502 18.3647L12.0002 13.4147L7.05023 18.3647L5.63623 16.9507L10.5862 12.0007L5.63623 7.05072L7.05023 5.63672L12.0002 10.5867Z" fill="#78797A"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="connection-traffic-table__content">
        <div className="connection-traffic-table__thead">
          <div className="connection-traffic-table__th connection-traffic-table__th--icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 5.0298L4.01832 18.9781L4.01025 18.9922L4.00547 19H19.9947L19.9899 18.9922L19.9818 18.9781L12.0001 5.0298ZM10.3189 3.94188C11.0928 2.68604 12.9074 2.68604 13.6812 3.94188L13.6897 3.95571L13.6978 3.96981L21.7109 17.973C22.4984 19.277 21.5896 21 20.02 21H3.98018C2.41049 21 1.5018 19.277 2.28921 17.973L10.3023 3.96981L10.3104 3.95571L10.3189 3.94188ZM13.4495 9.5461C13.4767 9.25301 13.246 9 12.9516 9H11.0486C10.7542 9 10.5235 9.25303 10.5507 9.54614L11.0005 14.4H13.0001L13.4495 9.5461ZM12.0001 15.3C11.2545 15.3 10.6501 15.9044 10.6501 16.65C10.6501 17.3956 11.2545 18 12.0001 18C12.7456 18 13.3501 17.3956 13.3501 16.65C13.3501 15.9044 12.7456 15.3 12.0001 15.3Z" fill="#D9322A"/>
            </svg>
          </div>
          <div className="connection-traffic-table__th connection-traffic-table__th--event">Event</div>
          <div className="connection-traffic-table__th connection-traffic-table__th--level">High</div>
          <div className="connection-traffic-table__th connection-traffic-table__th--supervisor">Chief Metrics Supervisot</div>
          <div className="connection-traffic-table__th connection-traffic-table__th--email">email@email.com</div>
        </div>

        {rows.map((row, index) => (
          <div 
            key={row.id}
            className={`connection-traffic-table__row connection-traffic-table__row--${row.status || 'default'} ${index < rows.length - 1 ? 'connection-traffic-table__row--bordered' : ''}`}
            onClick={() => onRowClick?.(row)}
          >
            <div className="connection-traffic-table__cell connection-traffic-table__cell--icon">
              {row.hasAlert && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 5.0298L4.01832 18.9781L4.01025 18.9922L4.00547 19H19.9947L19.9899 18.9922L19.9818 18.9781L12.0001 5.0298ZM10.3189 3.94188C11.0928 2.68604 12.9074 2.68604 13.6812 3.94188L13.6897 3.95571L13.6978 3.96981L21.7109 17.973C22.4984 19.277 21.5896 21 20.02 21H3.98018C2.41049 21 1.5018 19.277 2.28921 17.973L10.3023 3.96981L10.3104 3.95571L10.3189 3.94188ZM13.4495 9.5461C13.4767 9.25301 13.246 9 12.9516 9H11.0486C10.7542 9 10.5235 9.25303 10.5507 9.54614L11.0005 14.4H13.0001L13.4495 9.5461ZM12.0001 15.3C11.2545 15.3 10.6501 15.9044 10.6501 16.65C10.6501 17.3956 11.2545 18 12.0001 18C12.7456 18 13.3501 17.3956 13.3501 16.65C13.3501 15.9044 12.7456 15.3 12.0001 15.3Z" fill="#D9322A"/>
                </svg>
              )}
            </div>
            <div className="connection-traffic-table__cell connection-traffic-table__cell--event">
              {row.eventIP || row.event}
            </div>
            <div className="connection-traffic-table__cell connection-traffic-table__cell--level">
              {row.threatLevel}
            </div>
            <div className="connection-traffic-table__cell connection-traffic-table__cell--supervisor">
              {row.supervisor}
            </div>
            <div className="connection-traffic-table__cell connection-traffic-table__cell--email">
              {row.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
