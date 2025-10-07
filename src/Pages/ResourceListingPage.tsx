import React, { useState } from 'react'
import '../tokens.css'
import './ResourceListingPage.css'

import { TopBar } from '../components/bar'
import SearchField from '../components/inputs/SearchField'
import SelectField from '../components/inputs/SelectField'
import Button from '../components/buttons/Button'
import {
  KubernetesNamespace,
  KubernetesService,
  KubernetesDeployment,
  KubernetesJob,
  KubernetesIngress,
  KubernetesPod,
  KubernetesSecret,
  KubernetesConfigMap,
  KubernetesPersistentVolume,
  KubernetesPersistentVolumeClaim,
  KubernetesStatefulSet,
  KubernetesNode
} from '../components/icons/kubernetes'
import { DeleteBinLine } from '../components/icons/system'

// Type definitions
type Option = { value: string; label: string }

type ResourceType = 'namespace' | 'service' | 'deployment' | 'job' | 'ingress' | 'pod' | 'secret' | 'configmap' | 'pv' | 'pvc' | 'statefulset' | 'node'

interface ResourceItem {
  id: string
  name: string
  namespace?: string
  status: string
  createdAt: string
  uid: string
  labels: string
  type: ResourceType
  annotations?: string
  node?: string
  ip?: string
  qosClass?: string
  serviceAccount?: string
  volumeMounts?: Array<{
    name: string
    mountPath: string
    readOnly: boolean
  }>
}

const namespaceOptions: Option[] = [
  { value: 'default', label: 'Default' },
  { value: 'kube-system', label: 'kube-system' },
  { value: 'monitoring', label: 'monitoring' },
  { value: 'ingress-nginx', label: 'ingress-nginx' }
]

const resourceTypeOptions: Option[] = [
  { value: 'namespace', label: 'Namespace' },
  { value: 'service', label: 'Service' },
  { value: 'deployment', label: 'Deployment' },
  { value: 'job', label: 'Job' },
  { value: 'ingress', label: 'Ingress' },
  { value: 'pod', label: 'Pod' },
  { value: 'secret', label: 'Secret' },
  { value: 'configmap', label: 'ConfigMap' },
  { value: 'pv', label: 'Persistent Volume' },
  { value: 'pvc', label: 'Persistent Volume Claim' },
  { value: 'statefulset', label: 'StatefulSet' },
  { value: 'node', label: 'Node' }
]

// Sample data
const sampleResources: ResourceItem[] = [
  {
    id: '1',
    name: 'sample-pod-webserver-pod',
    namespace: 'default',
    status: 'running',
    createdAt: '04/07/2025 04:17 PM',
    uid: 'k7f4a5dc-9e1c-41c0-a85a-999b501fea5',
    labels: 'kubernetes.io/metadata.name=namespace1',
    type: 'pod',
    annotations: 'cni.projectcalico.org/containerID: 05af7be1ecce5f5e41b0e6f8b0f7f8e6f1a5f2c3e4b5a6c7d8e9f0a1b2c3d4e5\nkubernetes.io/psp: eks.privileged',
    node: 'worker-node-1',
    ip: '10.244.0.4/32',
    qosClass: 'BestEffort',
    serviceAccount: 'default',
    volumeMounts: [
      {
        name: 'kube-api-access-htmqm',
        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
        readOnly: true
      }
    ]
  },
  {
    id: '2',
    name: 'web-service',
    namespace: 'default',
    status: 'active',
    createdAt: '04/07/2025 03:45 PM',
    uid: 'a8b9c2d3-4e5f-6789-abcd-ef1234567890',
    labels: 'app=web,tier=frontend',
    type: 'service'
  },
  {
    id: '3',
    name: 'api-deployment',
    namespace: 'default',
    status: 'running',
    createdAt: '04/07/2025 02:30 PM',
    uid: 'b1c2d3e4-5f67-8901-2345-6789abcdef01',
    labels: 'app=api,tier=backend',
    type: 'deployment'
  },
  {
    id: '4',
    name: 'sample-configmap',
    namespace: 'default',
    status: 'active',
    createdAt: '04/07/2025 02:30 PM',
    uid: 'c1d2e3f4-5f67-8901-2345-6789abcdef02',
    labels: 'app=api,tier=backend',
    type: 'configmap'
  },
  {
    id: '5',
    name: 'sample-secret',
    namespace: 'default',
    status: 'active',
    createdAt: '04/07/2025 02:30 PM',
    uid: 'd1e2f3g4-5f67-8901-2345-6789abcdef03',
    labels: 'app=api,tier=backend',
    type: 'secret'
  },
  {
    id: '6',
    name: 'nginx-pod',
    namespace: 'default',
    status: 'running',
    createdAt: '04/07/2025 01:15 PM',
    uid: 'e2f3g4h5-6789-0123-4567-89abcdef0456',
    labels: 'app=nginx,tier=frontend',
    type: 'pod',
    annotations: 'cni.projectcalico.org/containerID: 15bf8ce2dcdf6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2\nkubernetes.io/psp: eks.privileged',
    node: 'worker-node-2',
    ip: '10.244.0.5/32',
    qosClass: 'BestEffort',
    serviceAccount: 'default'
  }
]
const ResourceListingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNamespace, setSelectedNamespace] = useState('default')
  const [selectedResourceType, setSelectedResourceType] = useState<ResourceType>('pod')
  const [resources, setResources] = useState<ResourceItem[]>(sampleResources)
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(sampleResources[0])


  const handleDelete = () => {
    console.log('Delete selected resources')
  }

  const handleDeleteResource = (resourceId: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent card selection when clicking delete
    console.log('Delete resource:', resourceId)
    // Remove resource from list
    setResources(prev => prev.filter(r => r.id !== resourceId))
    // Clear selection if deleted resource was selected
    if (selectedResource?.id === resourceId) {
      setSelectedResource(null)
    }
  }

  const getResourceIcon = (type: ResourceType, size: number = 24) => {
    const iconProps = { width: size, height: size }
    
    switch (type) {
      case 'namespace': return <KubernetesNamespace {...iconProps} />
      case 'service': return <KubernetesService {...iconProps} />
      case 'deployment': return <KubernetesDeployment {...iconProps} />
      case 'job': return <KubernetesJob {...iconProps} />
      case 'ingress': return <KubernetesIngress {...iconProps} />
      case 'pod': return <KubernetesPod {...iconProps} />
      case 'secret': return <KubernetesSecret {...iconProps} />
      case 'configmap': return <KubernetesConfigMap {...iconProps} />
      case 'pv': return <KubernetesPersistentVolume {...iconProps} />
      case 'pvc': return <KubernetesPersistentVolumeClaim {...iconProps} />
      case 'statefulset': return <KubernetesStatefulSet {...iconProps} />
      case 'node': return <KubernetesNode {...iconProps} />
      default: return <KubernetesNamespace {...iconProps} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'var(--color-green-500)'
      case 'pending': return 'var(--color-yellow-500)'
      case 'error': return 'var(--color-red-500)'
      case 'success': return 'var(--color-blue-500)'
      default: return 'var(--color-gray-500)'
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || resource.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = resource.type === selectedResourceType
    const matchesNamespace = selectedResourceType === 'namespace' || 
                            !resource.namespace || 
                            resource.namespace === selectedNamespace
    
    return matchesSearch && matchesType && matchesNamespace
  })

  return (
    <div className="resource-listing-page">
      <TopBar activeSection="dashboard" />

      <main className="resource-listing-content">
        <section className="resource-listing-header-section">
          <div className="resource-listing-filters">
            <div className="resource-listing-search">
              <SearchField
                id="resource-search"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
              />
            </div>
            
            <div className="resource-listing-namespace-select">
              <SelectField
                id="namespace-select"
                value={selectedNamespace}
                onChange={(value) => setSelectedNamespace(value)}
                options={namespaceOptions}
              />
            </div>
          </div>
        </section>

        <section className="resource-listing-tabs">
          <div className="resource-listing-tab-list">
            {resourceTypeOptions.map((option) => (
              <button
                key={option.value}
                className={`resource-listing-tab ${selectedResourceType === option.value ? 'active' : ''}`}
                onClick={() => setSelectedResourceType(option.value as ResourceType)}
              >
                <div className="resource-listing-tab-icon">
                  {getResourceIcon(option.value as ResourceType, 20)}
                </div>
                <span className="resource-listing-tab-label">{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="resource-listing-main-content">
          {/* Left Sidebar - Resource List */}
          <section className="resource-listing-sidebar">
            <div className="resource-listing-sidebar-header">
              <h3 className="resource-listing-sidebar-title">NAME</h3>
            </div>
            
            <div className="resource-listing-sidebar-content">
              {filteredResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className={`resource-listing-sidebar-item ${selectedResource?.id === resource.id ? 'selected' : ''}`}
                  onClick={() => setSelectedResource(resource)}
                >
                  <div className="resource-listing-sidebar-item-status">
                    <div 
                      className="resource-listing-status-indicator"
                      style={{ backgroundColor: getStatusColor(resource.status) }}
                    />
                  </div>
                  <div className="resource-listing-sidebar-item-content">
                    <span className="resource-listing-sidebar-item-name">{resource.name}</span>
                  </div>
                  <div className="resource-listing-sidebar-item-actions">
                    <button
                      className="resource-listing-sidebar-delete-btn"
                      onClick={(e) => handleDeleteResource(resource.id, e)}
                      aria-label={`Delete ${resource.name}`}
                    >
                      <DeleteBinLine width={16} height={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredResources.length === 0 && (
                <div className="resource-listing-sidebar-empty">
                  <div className="resource-listing-empty-icon">
                    {getResourceIcon(selectedResourceType, 32)}
                  </div>
                  <div className="resource-listing-empty-content">
                    <p className="resource-listing-empty-text">
                      No {resourceTypeOptions.find(opt => opt.value === selectedResourceType)?.label.toLowerCase()} resources found
                    </p>
                    {searchTerm && (
                      <p className="resource-listing-empty-subtext">
                        Try adjusting your search term "{searchTerm}"
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right Panel - Resource Details */}
          <section className="resource-listing-details-panel">
            {selectedResource ? (
              <div className="resource-listing-details-content">
                <div className="resource-listing-details-row">
                  <span className="resource-listing-details-label">NAME</span>
                  <span className="resource-listing-details-value">{selectedResource.name}</span>
                </div>
                
                {selectedResource.namespace && (
                  <div className="resource-listing-details-row">
                    <span className="resource-listing-details-label">NAMESPACE</span>
                    <span className="resource-listing-details-value">{selectedResource.namespace}</span>
                  </div>
                )}
                
                <div className="resource-listing-details-row">
                  <span className="resource-listing-details-label">CREATED AT</span>
                  <span className="resource-listing-details-value">{selectedResource.createdAt}</span>
                </div>
                
                <div className="resource-listing-details-row">
                  <span className="resource-listing-details-label">UID</span>
                  <span className="resource-listing-details-value resource-listing-details-uid">{selectedResource.uid}</span>
                </div>
                
                <div className="resource-listing-details-row">
                  <span className="resource-listing-details-label">LABELS</span>
                  <span className="resource-listing-details-value resource-listing-details-labels">{selectedResource.labels}</span>
                </div>
                
                {selectedResource.annotations && (
                  <div className="resource-listing-details-row">
                    <span className="resource-listing-details-label">ANNOTATIONS</span>
                    <span className="resource-listing-details-value resource-listing-details-annotations">{selectedResource.annotations}</span>
                  </div>
                )}
                
                {selectedResource.node && (
                  <div className="resource-listing-details-row">
                    <span className="resource-listing-details-label">NODE</span>
                    <span className="resource-listing-details-value">{selectedResource.node}</span>
                  </div>
                )}
                
                {selectedResource.ip && (
                  <div className="resource-listing-details-row">
                    <span className="resource-listing-details-label">IP</span>
                    <span className="resource-listing-details-value resource-listing-details-uid">{selectedResource.ip}</span>
                  </div>
                )}
                
                {selectedResource.qosClass && (
                  <div className="resource-listing-details-row">
                    <span className="resource-listing-details-label">QOS CLASS</span>
                    <span className="resource-listing-details-value">{selectedResource.qosClass}</span>
                  </div>
                )}
                
                {selectedResource.serviceAccount && (
                  <div className="resource-listing-details-row">
                    <span className="resource-listing-details-label">SERVICE ACCOUNT</span>
                    <span className="resource-listing-details-value">{selectedResource.serviceAccount}</span>
                  </div>
                )}
                
                {selectedResource.volumeMounts && selectedResource.volumeMounts.length > 0 && (
                  <div className="resource-listing-details-section">
                    <h4 className="resource-listing-details-section-title">VOLUME MOUNTS</h4>
                    <div className="resource-listing-details-table">
                      <div className="resource-listing-details-table-header">
                        <span className="resource-listing-details-table-cell">NAME</span>
                        <span className="resource-listing-details-table-cell">MOUNT PATH</span>
                        <span className="resource-listing-details-table-cell">READ ONLY</span>
                      </div>
                      {selectedResource.volumeMounts.map((mount, index) => (
                        <div key={index} className="resource-listing-details-table-row">
                          <span className="resource-listing-details-table-cell resource-listing-details-uid">{mount.name}</span>
                          <span className="resource-listing-details-table-cell resource-listing-details-uid">{mount.mountPath}</span>
                          <span className="resource-listing-details-table-cell">{mount.readOnly ? 'true' : 'false'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="resource-listing-details-empty">
                <div className="resource-listing-empty-icon">
                  {getResourceIcon(selectedResourceType, 48)}
                </div>
                <p className="resource-listing-empty-text">
                  Select a resource to view details
                </p>
              </div>
            )}
          </section>
        </div>
        </main>
      </div>
    )
}

export default ResourceListingPage
export { ResourceListingPage }
