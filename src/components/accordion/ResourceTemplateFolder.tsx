import React, { useState } from 'react'
import { Folder, FolderMinus } from '../icons/system'
import { KubernetesPod, KubernetesService, KubernetesDeployment } from '../icons/kubernetes'
import './ResourceTemplateFolder.css'

interface ResourceItem {
  name: string
  type: 'pod' | 'service' | 'deployment'
}

interface FolderProps {
  name: string
  items: ResourceItem[]
  defaultOpen?: boolean
}

const ResourceTemplateFolder: React.FC<FolderProps> = ({ name, items, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const getIcon = (type: ResourceItem['type']) => {
    switch (type) {
      case 'pod':
        return <KubernetesPod width={16} height={16} fill="var(--sds-color-icon-default-secondary)" />
      case 'service':
        return <KubernetesService width={16} height={16} fill="var(--sds-color-icon-default-secondary)" />
      case 'deployment':
        return <KubernetesDeployment width={16} height={16} fill="var(--sds-color-icon-default-secondary)" />
    }
  }

  return (
    <div className="resource-folder">
      <button 
        className="resource-folder__header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="resource-folder__icon">
          {isOpen ? (
            <FolderMinus width={16} height={16} fill="var(--sds-color-icon-default-secondary)" />
          ) : (
            <Folder width={16} height={16} fill="var(--sds-color-icon-default-secondary)" />
          )}
        </div>
        <span className="resource-folder__name">{name}</span>
      </button>
      
      {isOpen && (
        <div className="resource-folder__content">
          {items.map((item, index) => (
            <div key={index} className="resource-item">
              <div className="resource-item__icon">
                {getIcon(item.type)}
              </div>
              <span className="resource-item__name">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourceTemplateFolder
