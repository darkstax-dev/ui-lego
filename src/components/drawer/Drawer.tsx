import React, { useCallback, useEffect, useId, useRef } from 'react'
import ReactDOM from 'react-dom'
import './Drawer.css'

export const DrawerSize = {
  SMALL: '360px',
  STANDARD: '50%',
  LARGE: '90%',
} as const

type DrawerPosition = 'right' | 'left' | 'top' | 'bottom'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  size?: string
  position?: DrawerPosition
  autoFocus?: boolean
  enforceFocus?: boolean
  hasBackdrop?: boolean
  usePortal?: boolean
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = DrawerSize.STANDARD,
  position = 'right',
  autoFocus = true,
  enforceFocus = true,
  hasBackdrop = true,
  usePortal = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<Element | null>(null)
  const titleId = `drawer-title-${useId()}`

  const getFocusableElements = useCallback((): HTMLElement[] => {
    const container = containerRef.current
    if (!container) return []
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')
    const nodes = Array.from(container.querySelectorAll<HTMLElement>(selectors))
    return nodes.filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
  }, [])

  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement

    if (autoFocus) {
      const focusables = getFocusableElements()
      const target = focusables[0] || containerRef.current
      ;(target as HTMLElement | null)?.focus()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }

      if (!enforceFocus) return

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
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose, getFocusableElements, autoFocus, enforceFocus])

  useEffect(() => {
    if (!isOpen) {
      const prev = previouslyFocused.current as HTMLElement | null
      prev?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const panelStyle: React.CSSProperties = {}
  const isVertical = position === 'top' || position === 'bottom'
  if (isVertical) {
    panelStyle.height = size
  } else {
    panelStyle.width = size
  }

  const panel = (
    <div className="drawer-overlay" onClick={handleOverlayClick}>
      <div
        className={`drawer-panel drawer-panel--${position}`}
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={panelStyle}
      >
        <div className="drawer-header">
          <div className="drawer-title-container">
            {title && (
              <h2 className="drawer-title" id={titleId}>
                {title}
              </h2>
            )}
          </div>

          <button
            className="drawer-close-button"
            onClick={onClose}
            aria-label="Close drawer"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="drawer-content">{children}</div>
      </div>
    </div>
  )

  if (usePortal && typeof document !== 'undefined') {
    return ReactDOM.createPortal(panel, document.body)
  }

  return panel
}

export default Drawer
