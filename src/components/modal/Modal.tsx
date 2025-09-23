import React, { useEffect, useRef, useCallback, useId } from 'react'
import './Modal.css'

/**
 * Props for the Modal component
 */
interface ModalProps {
  /** Controls the visibility of the modal */
  isOpen: boolean
  /** Handler called when the modal should be closed */
  onClose: () => void
  /** Title displayed in the modal header */
  title?: string
  /** Content to display inside the modal */
  children?: React.ReactNode
  /** Handler called when the cancel action is triggered */
  onCancel?: () => void
  /** Handler called when the confirm action is triggered */
  onConfirm?: () => void
  /** Text for the cancel button */
  cancelText?: string
  /** Text for the confirm button */
  confirmText?: string
  /** Whether to show action buttons at the bottom */
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
  const containerRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<Element | null>(null)
  const titleId = `modal-title-${useId()}`

  const getFocusableElements = useCallback((): HTMLElement[] => {
    const container = containerRef.current
    if (!container) return []
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ]
    const nodes = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
    return nodes.filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
  }, [])

  // Focus trap + open/close focus management
  useEffect(() => {
    if (!isOpen) return
    previouslyFocusedElement.current = document.activeElement

    const focusables = getFocusableElements()
    const target = focusables[0] || containerRef.current
    target?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
      if (e.key === 'Tab') {
        const list = getFocusableElements()
        if (list.length === 0) return
        const first = list[0]
        const last = list[list.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey) {
          if (active === first || !containerRef.current?.contains(active)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (active === last || !containerRef.current?.contains(active)) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose, getFocusableElements])

  // Restore focus on unmount/close
  useEffect(() => {
    if (!isOpen) {
      const prev = previouslyFocusedElement.current as HTMLElement | null
      prev?.focus()
    }
  }, [isOpen])

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
      <div
        className="modal-container"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="modal-header">
          <div className="modal-title-container">
            <h2 className="modal-title" id={titleId}>{title}</h2>
          </div>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
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
                  <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
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
              type="button"
            >
              {cancelText}
            </button>
            <button
              className="modal-button modal-button--primary"
              onClick={handleConfirm}
              type="button"
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
