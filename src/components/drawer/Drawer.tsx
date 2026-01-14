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
  appearance?: 'dark' | 'light'
  onExpand?: () => void
  onFullscreen?: () => void
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
  appearance = 'light',
  onExpand,
  onFullscreen,
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
    <div className={`drawer-overlay${hasBackdrop ? '' : ' drawer-overlay--no-backdrop'}`} onClick={handleOverlayClick}>
      <div
        className={`drawer-panel drawer-panel--${position} ${appearance === 'light' ? 'drawer-panel--light' : ''}`}
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        style={panelStyle}
      >
        <div className="drawer-header">
          <div className="drawer-header-actions">
            {onExpand && (
              <button
                className="drawer-icon-button"
                onClick={onExpand}
                aria-label="Expand drawer"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2.00122H2V22.0012H4V13.0012H18.17L12.67 18.5012L14.08 19.9212L22 12.0012L14.08 4.08122L12.67 5.50122L18.17 11.0012H4V2.00122Z" fill="currentColor"/>
                </svg>
              </button>
            )}

            {onFullscreen && (
              <button
                className="drawer-icon-button"
                onClick={onFullscreen}
                aria-label="Toggle fullscreen"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_fullscreen)">
                    <path d="M16 3H22V9H20V5H16V3ZM2 3H8V5H4V9H2V3ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_fullscreen">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            )}
          </div>

          <button
            className="drawer-close-button"
            onClick={onClose}
            aria-label="Close drawer"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_close)">
                <path d="M12.0002 10.586L16.9502 5.63599L18.3642 7.04999L13.4142 12L18.3642 16.95L16.9502 18.364L12.0002 13.414L7.05023 18.364L5.63623 16.95L10.5862 12L5.63623 7.04999L7.05023 5.63599L12.0002 10.586Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_close">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
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
