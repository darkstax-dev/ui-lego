import React from 'react'
import './MenuSection.css'

interface MenuSectionProps {
  children: React.ReactNode
  className?: string
}

const MenuSection: React.FC<MenuSectionProps> = ({
  children,
  className = '',
  ...props
}) => {
  const menuSectionClass = [
    'menu-section',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={menuSectionClass} {...props}>
      {children}
    </div>
  )
}

export default MenuSection
