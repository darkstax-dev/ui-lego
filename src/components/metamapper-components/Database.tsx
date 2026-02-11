import React, { useState } from 'react'
import './Database.css'

export interface DatabaseProps {
  /** Callback when connect button is clicked */
  onConnect?: (data: DatabaseFormData) => void
  /** Initial form data */
  initialData?: Partial<DatabaseFormData>
  /** Additional CSS classes */
  className?: string
}

export interface DatabaseFormData {
  host: string
  port: string
  dbName: string
  schema: string
  username: string
  password: string
}

const Database: React.FC<DatabaseProps> = ({ 
  onConnect, 
  initialData = {},
  className = '' 
}) => {
  const [formData, setFormData] = useState<DatabaseFormData>({
    host: initialData.host || '',
    port: initialData.port || '',
    dbName: initialData.dbName || '',
    schema: initialData.schema || '',
    username: initialData.username || '',
    password: initialData.password || ''
  })

  const handleChange = (field: keyof DatabaseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConnect = () => {
    onConnect?.(formData)
  }

  return (
    <div className={`database ${className}`}>
      <div className="database__header">
        <div className="database__icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_database)">
              <path d="M3.33337 4.16667C3.33337 2.78595 6.31814 1.66667 10 1.66667C13.6819 1.66667 16.6667 2.78595 16.6667 4.16667V15.8333C16.6667 17.2141 13.6819 18.3333 10 18.3333C6.31814 18.3333 3.33337 17.2141 3.33337 15.8333V4.16667Z" stroke="#D9322A" strokeWidth="1.5"/>
              <path d="M3.33337 10C3.33337 11.3807 6.31814 12.5 10 12.5C13.6819 12.5 16.6667 11.3807 16.6667 10" stroke="#D9322A" strokeWidth="1.5"/>
              <path d="M3.33337 6.66667C3.33337 8.04738 6.31814 9.16667 10 9.16667C13.6819 9.16667 16.6667 8.04738 16.6667 6.66667" stroke="#D9322A" strokeWidth="1.5"/>
              <path d="M3.33337 13.3333C3.33337 14.7141 6.31814 15.8333 10 15.8333C13.6819 15.8333 16.6667 14.7141 16.6667 13.3333" stroke="#D9322A" strokeWidth="1.5"/>
            </g>
            <defs>
              <clipPath id="clip0_database">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <span className="database__title">Database</span>
        <div className="database__actions">
          <button className="database__action-btn" aria-label="Message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5.83333C2.5 4.91286 3.24619 4.16667 4.16667 4.16667H15.8333C16.7538 4.16667 17.5 4.91286 17.5 5.83333V13.3333C17.5 14.2538 16.7538 15 15.8333 15H4.16667C3.24619 15 2.5 14.2538 2.5 13.3333V5.83333Z" stroke="#78797A" strokeWidth="1.5"/>
              <path d="M2.5 5.83333L9.39645 10.1967C9.76867 10.4267 10.2313 10.4267 10.6036 10.1967L17.5 5.83333" stroke="#78797A" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="database__action-btn" aria-label="Delete">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 3.33333V2.5C6.66667 1.57953 7.41286 0.833333 8.33333 0.833333H11.6667C12.5871 0.833333 13.3333 1.57953 13.3333 2.5V3.33333M15.8333 3.33333V16.6667C15.8333 17.5871 15.0871 18.3333 14.1667 18.3333H5.83333C4.91286 18.3333 4.16667 17.5871 4.16667 16.6667V3.33333H15.8333Z" stroke="#78797A" strokeWidth="1.5"/>
              <path d="M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333" stroke="#78797A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="database__form">
        <div className="database__field">
          <label className="database__label">Host</label>
          <input
            type="text"
            className="database__input"
            placeholder="Select table height"
            value={formData.host}
            onChange={(e) => handleChange('host', e.target.value)}
          />
        </div>

        <div className="database__field">
          <label className="database__label">Port</label>
          <input
            type="text"
            className="database__input"
            placeholder="Select table height"
            value={formData.port}
            onChange={(e) => handleChange('port', e.target.value)}
          />
        </div>

        <div className="database__field">
          <label className="database__label">DB Name</label>
          <input
            type="text"
            className="database__input"
            placeholder="Select table height"
            value={formData.dbName}
            onChange={(e) => handleChange('dbName', e.target.value)}
          />
        </div>

        <div className="database__field">
          <label className="database__label">Schema</label>
          <input
            type="text"
            className="database__input"
            placeholder="Select table height"
            value={formData.schema}
            onChange={(e) => handleChange('schema', e.target.value)}
          />
        </div>

        <div className="database__field">
          <label className="database__label">Username</label>
          <input
            type="text"
            className="database__input"
            placeholder="Select table height"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </div>

        <div className="database__field">
          <label className="database__label">Password</label>
          <input
            type="password"
            className="database__input"
            placeholder="Select table height"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
        </div>

        <button className="database__connect-btn" onClick={handleConnect}>
          CONNECT
        </button>
      </div>
    </div>
  )
}

export default Database
