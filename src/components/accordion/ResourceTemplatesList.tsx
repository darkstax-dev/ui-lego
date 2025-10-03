import React, { useState } from 'react'
import { SearchLine } from '../icons/system'
import { ArrowDownSLine, ArrowUpSLine } from '../icons/system'
import { KubernetesPod, KubernetesConfigMap, KubernetesSecret, KubernetesMultus } from '../icons/kubernetes'
import './ResourceTemplatesList.css'

interface ResourceTemplate {
  name: string
  type: 'pod' | 'configmap' | 'secret' | 'multus'
}

interface ResourceSectionProps {
  title: string
  templates: ResourceTemplate[]
  defaultOpen?: boolean
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ title, templates, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const getIcon = (type: ResourceTemplate['type']) => {
    const iconProps = { width: 24, height: 24, fill: '#072B56' }
    switch (type) {
      case 'pod':
        return <KubernetesPod {...iconProps} />
      case 'configmap':
        return <KubernetesConfigMap {...iconProps} />
      case 'secret':
        return <KubernetesSecret {...iconProps} />
      case 'multus':
        return <KubernetesMultus {...iconProps} />
      default:
        return <KubernetesPod {...iconProps} />
    }
  }

  const getIconLabel = (type: ResourceTemplate['type']) => {
    switch (type) {
      case 'pod':
        return 'pod'
      case 'configmap':
        return 'cm'
      case 'secret':
        return 'secret'
      case 'multus':
        return ''
      default:
        return ''
    }
  }

  return (
    <>
      <button 
        className="resource-section-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="resource-section-title">{title}</span>
        {isOpen ? (
          <ArrowUpSLine width={20} height={20} fill="#78797A" />
        ) : (
          <ArrowDownSLine width={20} height={20} fill="#78797A" />
        )}
      </button>
      
      {isOpen && (
        <div className="resource-section-content">
          {templates.map((template, index) => (
            <div key={index} className="resource-template-item">
              <span className="resource-template-name">{template.name}</span>
              <div className="resource-template-icon-container">
                <div className="resource-template-icon-bg"></div>
                <div className="resource-template-icon">
                  {getIcon(template.type)}
                </div>
                {getIconLabel(template.type) && (
                  <span className="resource-template-label">{getIconLabel(template.type)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

interface ResourceTemplatesListProps {
  className?: string
}

const ResourceTemplatesList: React.FC<ResourceTemplatesListProps> = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const sourceNodeTemplates: ResourceTemplate[] = []

  const templatesData: ResourceTemplate[] = [
    { name: 'Load test template', type: 'pod' },
    { name: 'R-testpod-mm', type: 'pod' },
    { name: 'enconfig', type: 'configmap' },
    { name: 'epbase-iris', type: 'pod' },
    { name: 'kubernrtes_pod', type: 'pod' },
    { name: 'Secret', type: 'secret' },
    { name: 'Multustest', type: 'multus' },
    { name: 'base-image', type: 'pod' },
  ]

  const filterTemplates = (templates: ResourceTemplate[]) => {
    if (!searchQuery.trim()) return templates
    return templates.filter(template => 
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredTemplates = filterTemplates(templatesData)

  return (
    <div className={`resource-templates-list ${className}`}>
      <div className="resource-templates-search">
        <SearchLine width={16} height={16} fill="#78797A" />
        <input
          type="text"
          placeholder="Search actions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="resource-templates-search-input"
        />
      </div>

      <div className="resource-templates-sections">
        <ResourceSection 
          title="Source node" 
          templates={sourceNodeTemplates}
          defaultOpen={false}
        />
        
        <div className="resource-section-divider"></div>
        
        <ResourceSection 
          title="Templates" 
          templates={filteredTemplates}
          defaultOpen={true}
        />
      </div>
    </div>
  )
}

export default ResourceTemplatesList
