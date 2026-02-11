import React, { useState, useRef, useEffect } from 'react'
import './RestAPI.css'

export interface RestAPIProps {
  /** Callback when send button is clicked */
  onSend?: (method: HttpMethod, url: string) => void
  /** Callback when response button is clicked */
  onResponse?: () => void
  /** Initial URL value */
  initialUrl?: string
  /** Initial HTTP method */
  initialMethod?: HttpMethod
  /** Response content to display */
  responseContent?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const RestAPI: React.FC<RestAPIProps> = ({ 
  onSend, 
  onResponse,
  initialUrl = 'http://localhost:3001/platform...',
  initialMethod = 'GET',
  responseContent,
  className = '' 
}) => {
  const [url, setUrl] = useState(initialUrl)
  const [method, setMethod] = useState<HttpMethod>(initialMethod)
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMethodDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSend = () => {
    onSend?.(method, url)
  }

  const handleResponse = () => {
    onResponse?.()
  }

  const handleMethodSelect = (selectedMethod: HttpMethod) => {
    setMethod(selectedMethod)
    setIsMethodDropdownOpen(false)
  }

  return (
    <div className={`rest-api ${className}`}>
      <div className="rest-api__header">
        <div className="rest-api__icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16667 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667" stroke="#D9322A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 2.5H17.5V17.5H2.5V2.5Z" stroke="#D9322A" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="rest-api__title">rest API</span>
        <div className="rest-api__actions">
          <button className="rest-api__action-btn" aria-label="Message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5.83333C2.5 4.91286 3.24619 4.16667 4.16667 4.16667H15.8333C16.7538 4.16667 17.5 4.91286 17.5 5.83333V13.3333C17.5 14.2538 16.7538 15 15.8333 15H4.16667C3.24619 15 2.5 14.2538 2.5 13.3333V5.83333Z" stroke="#78797A" strokeWidth="1.5"/>
              <path d="M2.5 5.83333L9.39645 10.1967C9.76867 10.4267 10.2313 10.4267 10.6036 10.1967L17.5 5.83333" stroke="#78797A" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="rest-api__action-btn rest-api__delete-btn" aria-label="Delete">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 3.33333V2.5C6.66667 1.57953 7.41286 0.833333 8.33333 0.833333H11.6667C12.5871 0.833333 13.3333 1.57953 13.3333 2.5V3.33333M15.8333 3.33333V16.6667C15.8333 17.5871 15.0871 18.3333 14.1667 18.3333H5.83333C4.91286 18.3333 4.16667 17.5871 4.16667 16.6667V3.33333H15.8333Z" stroke="#D9322A" strokeWidth="1.5"/>
              <path d="M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333" stroke="#D9322A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="rest-api__content">
        <div className="rest-api__url-bar">
          <div className="rest-api__method-dropdown" ref={dropdownRef}>
            <button 
              className="rest-api__method-btn"
              onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
            >
              {method}
            </button>
            {isMethodDropdownOpen && (
              <div className="rest-api__method-menu">
                {methods.map((m) => (
                  <button
                    key={m}
                    className={`rest-api__method-option ${m === method ? 'rest-api__method-option--selected' : ''}`}
                    onClick={() => handleMethodSelect(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            className="rest-api__input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="rest-api__button-group">
          <button className="rest-api__send-btn" onClick={handleSend}>
            SEND
          </button>
          <button className="rest-api__response-btn" onClick={handleResponse}>
            RESPONSE
          </button>
          <button className="rest-api__menu-btn" aria-label="More options">
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

export default RestAPI
