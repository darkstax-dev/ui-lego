import React, { useState, useCallback } from 'react'
import Tab, { TabProps } from './Tab'
import './Tabs.css'

export interface TabItem {
  /** Unique identifier for the tab */
  value: string
  /** Display label for the tab */
  label: string
  /** Whether this tab is disabled */
  disabled?: boolean
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[]
  /** Currently active tab value */
  activeTab?: string
  /** Callback when tab changes */
  onChange?: (value: string) => void
  /** Additional CSS class names */
  className?: string
  /** Whether to allow no active tab */
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

  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab

  const handleTabClick = useCallback((value: string) => {
    if (onChange) {
      onChange(value)
    } else {
      setInternalActiveTab(value)
    }
  }, [onChange])

  const tabsClass = [
    'tabs',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={tabsClass} role="tablist" {...props}>
      {items.map((item) => (
        <Tab
          key={item.value}
          label={item.label}
          value={item.value}
          active={currentActiveTab === item.value}
          disabled={item.disabled}
          onClick={() => handleTabClick(item.value)}
        />
      ))}
    </div>
  )
}

export default Tabs
