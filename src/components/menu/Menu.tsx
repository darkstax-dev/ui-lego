import React from 'react'
import './Menu.css'

interface MenuProps {
  children: React.ReactNode
  className?: string
}

const Menu: React.FC<MenuProps> = ({
  children,
  className = '',
  ...props
}) => {
  const menuClass = [
    'menu',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={menuClass} {...props}>
      {children}
    </div>
  )
}

export default Menu
