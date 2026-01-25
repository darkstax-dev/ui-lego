import React, { useState } from 'react'
import './RightSidebar.css'
import {
  KubernetesNamespace,
  KubernetesService,
  KubernetesDeployment,
  KubernetesNode,
  KubernetesJob,
  KubernetesIngress,
  KubernetesPod,
  KubernetesSecret,
  KubernetesConfigMap,
  KubernetesPersistentVolume,
  KubernetesPersistentVolumeClaim,
  KubernetesStatefulSet
} from '../../../../src/components/icons/kubernetes'
import KubernetesMultus from '../../../../src/components/icons/kubernetes/KubernetesMultus'

interface RightSidebarProps {
  searchQuery?: string
}

interface K8sIconItem {
  type: string
  label: string
  icon: React.ComponentType<any>
  category: 'workloads' | 'networking' | 'storage' | 'configuration' | 'cluster'
}

const kubernetesIcons: K8sIconItem[] = [
  // Workloads
  { type: 'namespace', label: 'ns', icon: KubernetesNamespace, category: 'workloads' },
  { type: 'deployment', label: 'deploy', icon: KubernetesDeployment, category: 'workloads' },
  { type: 'pod', label: 'pod', icon: KubernetesPod, category: 'workloads' },
  { type: 'job', label: 'job', icon: KubernetesJob, category: 'workloads' },
  { type: 'statefulset', label: 'sts', icon: KubernetesStatefulSet, category: 'workloads' },
  { type: 'node', label: 'node', icon: KubernetesNode, category: 'cluster' },
  
  // Networking
  { type: 'service', label: 'svc', icon: KubernetesService, category: 'networking' },
  { type: 'ingress', label: 'ing', icon: KubernetesIngress, category: 'networking' },
  { type: 'multus', label: 'multus', icon: KubernetesMultus, category: 'networking' },
  
  // Configuration & Storage
  { type: 'secret', label: 'secret', icon: KubernetesSecret, category: 'configuration' },
  { type: 'configmap', label: 'cm', icon: KubernetesConfigMap, category: 'configuration' },
  { type: 'persistentvolume', label: 'pv', icon: KubernetesPersistentVolume, category: 'storage' },
  { type: 'persistentvolumeclaim', label: 'pvc', icon: KubernetesPersistentVolumeClaim, category: 'storage' }
]

export const RightSidebar: React.FC<RightSidebarProps> = ({ searchQuery = '' }) => {
  const [aggregateExpanded, setAggregateExpanded] = useState(false)
  const [k8sExpanded, setK8sExpanded] = useState(true)
  const [templatesExpanded, setTemplatesExpanded] = useState(false)

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('kubernetes-type', type)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const filteredIcons = kubernetesIcons.filter(icon =>
    icon.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    icon.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="topology-right-sidebar">
      {/* Search */}
      <div className="topology-right-sidebar__search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M14 14L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search actions..."
          className="topology-right-sidebar__search-input"
          value={searchQuery}
          readOnly
        />
      </div>

      {/* Aggregate Section */}
      <div className="topology-right-sidebar__section">
        <button
          className="topology-right-sidebar__section-header"
          onClick={() => setAggregateExpanded(!aggregateExpanded)}
        >
          <span>Aggregate</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            className={`topology-right-sidebar__chevron ${aggregateExpanded ? 'topology-right-sidebar__chevron--expanded' : ''}`}
          >
            <path d="M10 11L14 7L15 8L10 13L5 8L6 7L10 11Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="topology-right-sidebar__divider" />

      {/* Kubernetes Section */}
      <div className="topology-right-sidebar__section">
        <button
          className="topology-right-sidebar__section-header"
          onClick={() => setK8sExpanded(!k8sExpanded)}
        >
          <span>Kubernetes</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            className={`topology-right-sidebar__chevron ${k8sExpanded ? 'topology-right-sidebar__chevron--expanded' : ''}`}
          >
            <path d="M10 11L14 7L15 8L10 13L5 8L6 7L10 11Z" fill="currentColor"/>
          </svg>
        </button>

        {k8sExpanded && (
          <div className="topology-right-sidebar__icons-grid">
            {filteredIcons.map(({ type, label, icon: Icon }) => (
              <div
                key={type}
                className="topology-right-sidebar__icon-item"
                draggable
                onDragStart={(e) => handleDragStart(e, type)}
              >
                <div className="topology-right-sidebar__icon-hexagon">
                  <svg width="50" height="56" viewBox="0 0 50 56" fill="none">
                    <path 
                      d="M24.4449 0.145144C24.7884 -0.0483814 25.2116 -0.0483813 25.5551 0.145144L49.4449 13.6035C49.7884 13.797 50 14.1546 50 14.5417V41.4583C50 41.8454 49.7884 42.203 49.4449 42.3965L25.5551 55.8549C25.2116 56.0484 24.7884 56.0484 24.4449 55.8549L0.555144 42.3965C0.21162 42.203 0 41.8454 0 41.4583V14.5417C0 14.1546 0.21162 13.797 0.555144 13.6035L24.4449 0.145144Z" 
                      fill="white" 
                      fillOpacity="0.4"
                    />
                  </svg>
                  <div className="topology-right-sidebar__icon">
                    <Icon width={24} height={24} fill="#072B56" />
                  </div>
                </div>
                <span className="topology-right-sidebar__icon-label">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="topology-right-sidebar__divider" />

      {/* Templates Section */}
      <div className="topology-right-sidebar__section">
        <button
          className="topology-right-sidebar__section-header"
          onClick={() => setTemplatesExpanded(!templatesExpanded)}
        >
          <span>Templates</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            className={`topology-right-sidebar__chevron ${templatesExpanded ? 'topology-right-sidebar__chevron--expanded' : ''}`}
          >
            <path d="M10 11L14 7L15 8L10 13L5 8L6 7L10 11Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
