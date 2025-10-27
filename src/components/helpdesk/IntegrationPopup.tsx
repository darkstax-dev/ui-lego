import React, { useState } from 'react'
import './IntegrationPopup.css'
import Button from '../buttons/Button'
import InputField from '../inputs/InputField'

export interface IntegrationPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (params: IntegrationParams) => void
  integrationName: string
  integrationDescription?: string
}

export interface IntegrationParams {
  apiUrl: string
  apiKey: string
  projectKey: string
}

const IntegrationPopup: React.FC<IntegrationPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  integrationName,
  integrationDescription
}) => {
  const [params, setParams] = useState<IntegrationParams>({
    apiUrl: '',
    apiKey: '',
    projectKey: ''
  })

  const handleSubmit = () => {
    onSubmit?.(params)
    handleClose()
  }

  const handleClose = () => {
    setParams({ apiUrl: '', apiKey: '', projectKey: '' })
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) return null

  const isFormValid = params.apiUrl.trim() !== '' && params.apiKey.trim() !== '' && params.projectKey.trim() !== ''

  return (
    <div className="integration-popup-overlay" onClick={handleOverlayClick}>
      <div className="integration-popup">
        <div className="integration-popup__header">
          <h2 className="integration-popup__title">Connect to {integrationName}</h2>
          <button 
            className="integration-popup__close" 
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="integration-popup__content">
          {integrationDescription && (
            <p className="integration-popup__description">
              {integrationDescription}
            </p>
          )}
          
          <div className="integration-popup__fields">
            <InputField
              label="API URL"
              value={params.apiUrl}
              onChange={(value) => setParams({ ...params, apiUrl: value })}
              placeholder="https://your-instance.atlassian.net"
              type="url"
              leadingIcon={null}
            />
            
            <InputField
              label="API Key"
              value={params.apiKey}
              onChange={(value) => setParams({ ...params, apiKey: value })}
              placeholder="Enter your API key"
              type="password"
              leadingIcon={null}
            />
            
            <InputField
              label="Project Key"
              value={params.projectKey}
              onChange={(value) => setParams({ ...params, projectKey: value })}
              placeholder="PROJ"
              type="text"
              leadingIcon={null}
            />
          </div>
        </div>

        <div className="integration-popup__footer">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClose}
            className="integration-popup__cancel-button"
          >
            CANCEL
          </Button>
          <Button
            variant="primary-simple"
            size="sm"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="integration-popup__submit-button"
          >
            SEND REQUEST
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IntegrationPopup
