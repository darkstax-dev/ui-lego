import React from 'react'
import './MenuSeparator.css'

interface MenuSeparatorProps {
  className?: string
}

const MenuSeparator: React.FC<MenuSeparatorProps> = ({
  className = '',
  ...props
}) => {
  const menuSeparatorClass = [
    'menu-separator',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={menuSeparatorClass} {...props}>
      <div className="menu-separator__line" />
    </div>
  )
}

export default MenuSeparator
