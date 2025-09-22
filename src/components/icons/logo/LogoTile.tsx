import React from 'react'
import './LogoCatalog.css'

export type LogoTileProps = {
  name: string
  backgroundClass: string
  description?: string
  size?: 'default' | 'tall'
}

const LogoTile: React.FC<LogoTileProps> = ({ name, backgroundClass, description, size = 'default' }) => {
  const heightClass = size === 'tall' ? 'logo-art--tall' : ''
  return (
    <div className="logo-card">
      <div className={`logo-art ${heightClass} ${backgroundClass}`} aria-label={name} role="img" />
      <div className="logo-meta">
        <span className="logo-name">{name}</span>
        {description ? <span className="logo-desc">{description}</span> : null}
      </div>
    </div>
  )
}

export default LogoTile
