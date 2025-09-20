import React, { useRef, useEffect } from 'react'
import './Dropdown.css'

export type DropdownPosition = 'absolute' | 'relative'
export type DropdownSize = 'compact' | 'standard' | 'wide'

interface DropdownProps {
  children: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  scrollable?: boolean
  maxHeight?: number
  position?: DropdownPosition
  size?: DropdownSize
  animated?: boolean
  className?: string
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpen = true,
  onClose,
  scrollable = false,
  maxHeight = 258,
  position = 'relative',
  size = 'standard',
  animated = false,
  className = '',
  role = 'menu',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || !dropdownRef.current) return

      const items = dropdownRef.current.querySelectorAll('[role="menuitem"]:not([disabled])')
      const currentIndex = Array.from(items).findIndex(item => item === document.activeElement)

      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          if (onClose) {
            onClose()
          }
          break
        case 'ArrowDown':
          event.preventDefault()
          if (items.length > 0) {
            const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
            (items[nextIndex] as HTMLElement).focus()
          }
          break
        case 'ArrowUp':
          event.preventDefault()
          if (items.length > 0) {
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
            (items[prevIndex] as HTMLElement).focus()
          }
          break
        case 'Home':
          event.preventDefault()
          if (items.length > 0) {
            (items[0] as HTMLElement).focus()
          }
          break
        case 'End':
          event.preventDefault()
          if (items.length > 0) {
            (items[items.length - 1] as HTMLElement).focus()
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        onClose &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen && position === 'absolute') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, position])

  const classNames = [
    'dropdown',
    scrollable && 'dropdown--scrollable',
    `dropdown--${position}`,
    `dropdown--${size}`,
    animated && 'dropdown--animated',
    !isOpen && 'dropdown--hidden',
    className
  ].filter(Boolean).join(' ')

  const style: React.CSSProperties = scrollable ? { maxHeight: `${maxHeight}px` } : {}

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={dropdownRef}
      className={classNames}
      style={style}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={-1}
    >
      <div className="dropdown__items">
        {children}
      </div>
    </div>
  )
}

export default Dropdown
