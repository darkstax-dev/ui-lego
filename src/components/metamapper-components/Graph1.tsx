import React, { useState } from 'react'
import './Graph1.css'

export interface Graph1Props {
  /** Callback when send button is clicked */
  onSend?: (url: string) => void
  /** Callback when response button is clicked */
  onResponse?: () => void
  /** Initial URL value */
  initialUrl?: string
  /** Response content to display */
  responseContent?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

const Graph1: React.FC<Graph1Props> = ({ 
  onSend, 
  onResponse,
  initialUrl = 'http://localhost:3001/platform.json',
  responseContent,
  className = '' 
}) => {
  const [url, setUrl] = useState(initialUrl)

  const handleSend = () => {
    onSend?.(url)
  }

  const handleResponse = () => {
    onResponse?.()
  }

  return (
    <div className={`graph1 ${className}`}>
      <div className="graph1__header">
        <div className="graph1__icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 10L13.75 6.25M17.5 10L13.75 13.75M17.5 10H7.5M7.5 10C7.5 12.7614 5.26142 15 2.5 15M7.5 10C7.5 7.23858 5.26142 5 2.5 5" stroke="#D9322A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="graph1__title">Graph1</span>
        <div className="graph1__actions">
          <button className="graph1__action-btn" aria-label="Message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5.83333C2.5 4.91286 3.24619 4.16667 4.16667 4.16667H15.8333C16.7538 4.16667 17.5 4.91286 17.5 5.83333V13.3333C17.5 14.2538 16.7538 15 15.8333 15H4.16667C3.24619 15 2.5 14.2538 2.5 13.3333V5.83333Z" stroke="#78797A" strokeWidth="1.5"/>
              <path d="M2.5 5.83333L9.39645 10.1967C9.76867 10.4267 10.2313 10.4267 10.6036 10.1967L17.5 5.83333" stroke="#78797A" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="graph1__action-btn" aria-label="Delete">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 3.33333V2.5C6.66667 1.57953 7.41286 0.833333 8.33333 0.833333H11.6667C12.5871 0.833333 13.3333 1.57953 13.3333 2.5V3.33333M15.8333 3.33333V16.6667C15.8333 17.5871 15.0871 18.3333 14.1667 18.3333H5.83333C4.91286 18.3333 4.16667 17.5871 4.16667 16.6667V3.33333H15.8333Z" stroke="#78797A" strokeWidth="1.5"/>
              <path d="M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333" stroke="#78797A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="graph1__content">
        <input
          type="text"
          className="graph1__input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="graph1__display">
          {responseContent}
        </div>

        <div className="graph1__button-group">
          <button className="graph1__send-btn" onClick={handleSend}>
            SEND
          </button>
          <button className="graph1__response-btn" onClick={handleResponse}>
            RESPONSE
          </button>
          <button className="graph1__menu-btn" aria-label="More options">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="4.16667" r="1.25" fill="#78797A"/>
              <circle cx="10" cy="10" r="1.25" fill="#78797A"/>
              <circle cx="10" cy="15.8333" r="1.25" fill="#78797A"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Graph1
