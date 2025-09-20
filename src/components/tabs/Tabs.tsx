import React, { useState, useMemo, useRef } from 'react'
import Tab from './Tab'
import './Tabs.css'

export interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeTab?: string
  onChange?: (value: string) => void
  className?: string
  allowEmpty?: boolean
}

const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  className = '',
  allowEmpty = false,
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string | undefined>(
    activeTab || (!allowEmpty && items.length > 0 ? items[0].value : undefined)
  )
  const listRef = useRef<HTMLDivElement>(null)

  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab

  const enabledItems = useMemo(() => items.filter(i => !i.disabled), [items])
  const currentIndex = useMemo(() => enabledItems.findIndex(i => i.value === currentActiveTab), [enabledItems, currentActiveTab])

  const focusTabByIndex = (index: number) => {
    const el = listRef.current
    if (!el) return
    const tabs = el.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    if (tabs[index]) tabs[index].focus()
  }

  const setActiveByIndex = (index: number) => {
    const target = enabledItems[index]
    if (!target) return
    if (onChange) onChange(target.value)
    else setInternalActiveTab(target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const count = enabledItems.length
    if (count === 0) return
    let next = currentIndex >= 0 ? currentIndex : 0
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault()
        next = (next + 1) % count
        setActiveByIndex(next)
        focusTabByIndex(next)
        break
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault()
        next = (next - 1 + count) % count
        setActiveByIndex(next)
        focusTabByIndex(next)
        break
      }
      case 'Home': {
        e.preventDefault(); setActiveByIndex(0); focusTabByIndex(0); break
      }
      case 'End': {
        e.preventDefault(); setActiveByIndex(count - 1); focusTabByIndex(count - 1); break
      }
      case 'Enter':
      case ' ': {
        // no-op since we already set active on arrow
        break
      }
    }
  }

  const tabsClass = [
    'tabs',
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={listRef}
      className={tabsClass}
      role="tablist"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          label={item.label}
          value={item.value}
          active={currentActiveTab === item.value}
          disabled={item.disabled}
          onClick={() => setActiveByIndex(enabledItems.findIndex(i => i.value === item.value))}
          tabIndex={item.disabled ? -1 : currentActiveTab === item.value ? 0 : -1}
        />
      ))}
    </div>
  )
}

export default Tabs
