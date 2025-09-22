import React from 'react'
import './LogoCatalog.css'

export type LogoTileProps = {
  name: string
  backgroundClass: string
  description?: string
  height?: number
}

const LogoTile: React.FC<LogoTileProps> = ({ name, backgroundClass, description, height = 120 }) => {
  return (
    <div className="logo-card">
      <div className={`logo-art ${backgroundClass}`} style={{ height }} aria-label={name} role="img" />
      <div className="logo-meta">
        <span className="logo-name">{name}</span>
        {description ? <span className="logo-desc">{description}</span> : null}
      </div>
    </div>
  )
}

export default LogoTile
