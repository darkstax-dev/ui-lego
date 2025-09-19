import React from 'react'
import './MenuHeader.css'

interface MenuHeaderProps {
  heading: string
  subheading: string
  className?: string
}

const MenuHeader: React.FC<MenuHeaderProps> = ({
  heading,
  subheading,
  className = '',
  ...props
}) => {
  const menuHeaderClass = [
    'menu-header',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={menuHeaderClass} {...props}>
      <div className="menu-header__subheading">
        {subheading}
      </div>
      <div className="menu-header__heading">
        {heading}
      </div>
    </div>
  )
}

export default MenuHeader
