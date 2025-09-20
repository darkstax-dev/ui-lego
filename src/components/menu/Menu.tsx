import React, { useEffect, useRef } from 'react'
import './Menu.css'

interface MenuProps {
  children: React.ReactNode
  className?: string
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

const Menu: React.FC<MenuProps> = ({
  children,
  className = '',
  role = 'menu',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = containerRef.current
      if (!el) return
      const items = el.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
      if (items.length === 0) return
      const index = Array.from(items).findIndex(i => i === document.activeElement)
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const next = index < items.length - 1 ? index + 1 : 0
          items[next].focus()
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prev = index > 0 ? index - 1 : items.length - 1
          items[prev].focus()
          break
        }
        case 'Home': {
          e.preventDefault(); items[0].focus(); break
        }
        case 'End': {
          e.preventDefault(); items[items.length - 1].focus(); break
        }
        case 'Escape': {
          el.dispatchEvent(new CustomEvent('menu:escape', { bubbles: true }))
          break
        }
      }
    }
    const el = containerRef.current
    el?.addEventListener('keydown', onKeyDown)
    return () => el?.removeEventListener('keydown', onKeyDown)
  }, [])

  const menuClass = [
    'menu',
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={containerRef}
      className={menuClass}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  )
}

export default Menu
