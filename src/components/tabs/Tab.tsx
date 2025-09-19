import React from 'react'
import './Tab.css'

export interface TabProps {
  /** The label text for the tab */
  label: string
  /** Whether the tab is currently active */
  active?: boolean
  /** Whether the tab is disabled */
  disabled?: boolean
  /** Click handler for the tab */
  onClick?: () => void
  /** Additional CSS class names */
  className?: string
  /** Value to identify this tab */
  value?: string
}

const Tab: React.FC<TabProps> = ({
  label,
  active = false,
  disabled = false,
  onClick,
  className = '',
  value,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const tabClass = [
    'tab',
    active ? 'tab--active' : 'tab--inactive',
    disabled ? 'tab--disabled' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={tabClass}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      role="tab"
      aria-selected={active}
      data-value={value}
      {...props}
    >
      <span className="tab__label">{label}</span>
    </button>
  )
}

export default Tab
