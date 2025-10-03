import React, { useState } from 'react'
import { SearchLine } from '../icons/system'
import { ArrowDownSLine, ArrowUpSLine, Folder, FolderMinus } from '../icons/system'
import { 
  KubernetesPod, 
  KubernetesConfigMap, 
  KubernetesSecret, 
  KubernetesMultus,
  KubernetesService,
  KubernetesDeployment 
} from '../icons/kubernetes'
import './ResourceTemplates.css'

export interface ResourceTemplate {
  id: string
  name: string
  type: 'pod' | 'configmap' | 'secret' | 'multus' | 'service' | 'deployment'
  category?: string
  description?: string
}

export interface ResourceCategory {
  id: string
  name: string
  templates: ResourceTemplate[]
  defaultOpen?: boolean
  icon?: 'folder' | 'section'
}

interface ResourceCategoryProps {
  category: ResourceCategory
  searchQuery: string
  onTemplateClick?: (template: ResourceTemplate) => void
  onTemplateHover?: (template: ResourceTemplate) => void
}

const ResourceCategoryComponent: React.FC<ResourceCategoryProps> = ({ 
  category, 
  searchQuery,
  onTemplateClick,
  onTemplateHover 
}) => {
  const [isOpen, setIsOpen] = useState(category.defaultOpen ?? false)

  const getIcon = (type: ResourceTemplate['type']) => {
    const iconProps = { width: 20, height: 20, fill: '#072B56' }
    switch (type) {
      case 'pod':
        return <KubernetesPod {...iconProps} />
      case 'configmap':
        return <KubernetesConfigMap {...iconProps} />
      case 'secret':
        return <KubernetesSecret {...iconProps} />
      case 'multus':
        return <KubernetesMultus {...iconProps} />
      case 'service':
        return <KubernetesService {...iconProps} />
      case 'deployment':
        return <KubernetesDeployment {...iconProps} />
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
      case 'service':
        return 'svc'
      case 'deployment':
        return 'deploy'
      case 'multus':
        return ''
      default:
        return ''
    }
  }

  // Filter templates based on search query
  const filteredTemplates = category.templates.filter(template => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      template.name.toLowerCase().includes(query) ||
      template.type.toLowerCase().includes(query) ||
      (template.description && template.description.toLowerCase().includes(query))
    )
  })

  // Don't render if no templates match search
  if (searchQuery.trim() && filteredTemplates.length === 0) {
    return null
  }

  const categoryIcon = category.icon === 'folder' ? (
    isOpen ? (
      <FolderMinus width={16} height={16} fill="#78797A" />
    ) : (
      <Folder width={16} height={16} fill="#78797A" />
    )
  ) : (
    isOpen ? (
      <ArrowUpSLine width={20} height={20} fill="#78797A" />
    ) : (
      <ArrowDownSLine width={20} height={20} fill="#78797A" />
    )
  )

  return (
    <div className={`resource-category ${category.icon === 'folder' ? 'resource-category--folder' : 'resource-category--section'}`}>
      <button 
        className="resource-category__header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="resource-category__header-content">
          <div className="resource-category__icon">
            {categoryIcon}
          </div>
          <span className="resource-category__title">{category.name}</span>
          {filteredTemplates.length > 0 && (
            <span className="resource-category__count">({filteredTemplates.length})</span>
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="resource-category__content">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="resource-template"
              onClick={() => onTemplateClick?.(template)}
              onMouseEnter={() => onTemplateHover?.(template)}
            >
              <div className="resource-template__info">
                <span className="resource-template__name">{template.name}</span>
                {template.description && (
                  <span className="resource-template__description">{template.description}</span>
                )}
              </div>
              <div className="resource-template__icon-container">
                <div className="resource-template__icon-bg"></div>
                <div className="resource-template__icon">
                  {getIcon(template.type)}
                </div>
                {getIconLabel(template.type) && (
                  <span className="resource-template__label">{getIconLabel(template.type)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export interface ResourceTemplatesProps {
  categories: ResourceCategory[]
  searchPlaceholder?: string
  className?: string
  onTemplateClick?: (template: ResourceTemplate) => void
  onTemplateHover?: (template: ResourceTemplate) => void
  onSearchChange?: (query: string) => void
}

const ResourceTemplates: React.FC<ResourceTemplatesProps> = ({ 
  categories,
  searchPlaceholder = "Search resource templates...",
  className = '',
  onTemplateClick,
  onTemplateHover,
  onSearchChange
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onSearchChange?.(query)
  }

  const hasResults = categories.some(category => 
    category.templates.some(template => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      return (
        template.name.toLowerCase().includes(query) ||
        template.type.toLowerCase().includes(query) ||
        (template.description && template.description.toLowerCase().includes(query))
      )
    })
  )

  return (
    <div className={`resource-templates ${className}`}>
      <div className="resource-templates__search">
        <SearchLine width={16} height={16} fill="#78797A" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="resource-templates__search-input"
        />
      </div>

      <div className="resource-templates__content">
        {searchQuery.trim() && !hasResults ? (
          <div className="resource-templates__no-results">
            No resource templates found for "{searchQuery}"
          </div>
        ) : (
          categories.map((category) => (
            <ResourceCategoryComponent
              key={category.id}
              category={category}
              searchQuery={searchQuery}
              onTemplateClick={onTemplateClick}
              onTemplateHover={onTemplateHover}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ResourceTemplates
