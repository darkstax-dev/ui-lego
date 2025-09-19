import React from 'react'
import './MenuHeading.css'

interface MenuHeadingProps {
  children: React.ReactNode
  className?: string
}

const MenuHeading: React.FC<MenuHeadingProps> = ({
  children,
  className = '',
  ...props
}) => {
  const menuHeadingClass = [
    'menu-heading',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={menuHeadingClass} {...props}>
      <div className="menu-heading__text">
        {children}
      </div>
    </div>
  )
}

export default MenuHeading
