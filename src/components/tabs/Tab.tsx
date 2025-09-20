import React, { forwardRef } from 'react'
import './Tab.css'

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  value?: string
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({
  label,
  active = false,
  disabled = false,
  onClick,
  className = '',
  value,
  ...props
}, ref) {
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
      ref={ref}
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
})

export default Tab
