import React from 'react'
import './MenuShortcut.css'

interface MenuShortcutProps {
  shortcut: string
  className?: string
}

const MenuShortcut: React.FC<MenuShortcutProps> = ({
  shortcut,
  className = '',
  ...props
}) => {
  const menuShortcutClass = [
    'menu-shortcut',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={menuShortcutClass} {...props}>
      <div className="menu-shortcut__text">
        {shortcut}
      </div>
    </div>
  )
}

export default MenuShortcut
