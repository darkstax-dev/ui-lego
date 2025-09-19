import React from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  onCancel?: () => void
  onConfirm?: () => void
  cancelText?: string
  confirmText?: string
  showActions?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = 'Create scenario',
  children,
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Create scenario',
  showActions = true
}) => {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title-container">
            <h2 className="modal-title">{title}</h2>
          </div>
          <button 
            className="modal-close-button" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 25" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_149_8647)">
                <path 
                  d="M12 11.086L16.95 6.13599L18.364 7.54999L13.414 12.5L18.364 17.45L16.95 18.864L12 13.914L7.04999 18.864L5.63599 17.45L10.586 12.5L5.63599 7.54999L7.04999 6.13599L12 11.086Z" 
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_149_8647">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          {children}
        </div>

        {showActions && (
          <div className="modal-actions">
            <button 
              className="modal-button modal-button--secondary" 
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button 
              className="modal-button modal-button--primary" 
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
