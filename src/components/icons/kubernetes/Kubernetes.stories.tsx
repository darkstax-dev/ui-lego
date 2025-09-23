import type { Meta, StoryObj } from '@storybook/react-vite'
import * as KubernetesIcons from './index'
import '../Icons.stories.css'
import '../../../tokens.css'

const meta: Meta = {
  title: 'Icons/Kubernetes',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive collection of Kubernetes-related icons for container orchestration, workloads, networking, configuration, and cluster management. These icons use CSS tokens for consistent theming and are organized by functional categories.'
      }
    }
  }
}

export default meta

type Story = StoryObj

// Icon categories organized by Kubernetes functional areas
const kubernetesIconCategories = {
  'Workloads': [
    { name: 'Namespace', component: KubernetesIcons.KubernetesNamespace, description: 'Logical cluster subdivision' },
    { name: 'Deployment', component: KubernetesIcons.KubernetesDeployment, description: 'Manages replica sets and pods' },
    { name: 'Pod', component: KubernetesIcons.KubernetesPod, description: 'Smallest deployable unit' },
    { name: 'Job', component: KubernetesIcons.KubernetesJob, description: 'Run-to-completion workload' },
    { name: 'StatefulSet', component: KubernetesIcons.KubernetesStatefulSet, description: 'Stateful application management' }
  ],
  'Networking': [
    { name: 'Service', component: KubernetesIcons.KubernetesService, description: 'Network access to pods' },
    { name: 'Ingress', component: KubernetesIcons.KubernetesIngress, description: 'External HTTP/HTTPS access' }
  ],
  'Storage': [
    { name: 'Persistent Volume', component: KubernetesIcons.KubernetesPersistentVolume, description: 'Cluster storage resource' },
    { name: 'Persistent Volume Claim', component: KubernetesIcons.KubernetesPersistentVolumeClaim, description: 'Storage request by user' }
  ],
  'Configuration': [
    { name: 'ConfigMap', component: KubernetesIcons.KubernetesConfigMap, description: 'Non-confidential configuration data' },
    { name: 'Secret', component: KubernetesIcons.KubernetesSecret, description: 'Confidential configuration data' }
  ],
  'Cluster': [
    { name: 'Node', component: KubernetesIcons.KubernetesNode, description: 'Worker machine in cluster' }
  ]
}

// Flatten all icons for easy iteration
const allKubernetesIcons = Object.entries(kubernetesIconCategories).flatMap(([category, icons]) =>
  icons.map(icon => ({ ...icon, category }))
)

export const Catalog: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">Kubernetes Icons</h1>
        <p className="body-base-macan-book" style={{ color: 'var(--inputs-placeholder-text)', marginTop: 'var(--sds-size-space-200)' }}>
          Complete collection of Kubernetes resource icons organized by functional categories
        </p>
      </div>

      {/* Category sections */}
      {Object.entries(kubernetesIconCategories).map(([categoryName, categoryIcons]) => (
        <div key={categoryName} style={{ marginBottom: 'var(--sds-size-space-800)' }}>
          <h2 className="heading-section" style={{ 
            marginBottom: 'var(--sds-size-space-400)',
            color: 'var(--text-blue-main)',
            borderBottom: '1px solid var(--gray-100)',
            paddingBottom: 'var(--sds-size-space-200)'
          }}>
            {categoryName}
          </h2>
          <div className="icons-grid">
            {categoryIcons.map(({ name, component: IconComponent, description }) => (
              <div className="icon-item" key={name}>
                <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
                  <IconComponent width={32} height={32} fill={'currentColor'} />
                </div>
                <div className="icon-info">
                  <h3 className="icon-name body-base-macan-semibold">Kubernetes{name}</h3>
                  <span className="icon-category body-small-mono-book">{description}</span>
                </div>
                <button
                  className="icon-copy"
                  onClick={() => navigator.clipboard.writeText(`Kubernetes${name}`)}
                  title={`Copy Kubernetes${name} component name`}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary */}
      <div style={{ 
        marginTop: 'var(--sds-size-space-800)', 
        padding: 'var(--sds-size-space-400)',
        backgroundColor: 'var(--background-card)',
        borderRadius: 'var(--sds-size-space-200)'
      }}>
        <p className="body-small-mono-book" style={{ color: 'var(--inputs-placeholder-text)' }}>
          Total: {allKubernetesIcons.length} Kubernetes icons across {Object.keys(kubernetesIconCategories).length} categories
        </p>
      </div>
    </div>
  )
}

// Individual category stories for easier navigation
export const Workloads: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">Kubernetes Workloads</h1>
      </div>
      <div className="icons-grid">
        {kubernetesIconCategories.Workloads.map(({ name, component: IconComponent, description }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <IconComponent width={32} height={32} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">Kubernetes{name}</h3>
              <span className="icon-category body-small-mono-book">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Networking: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">Kubernetes Networking</h1>
      </div>
      <div className="icons-grid">
        {kubernetesIconCategories.Networking.map(({ name, component: IconComponent, description }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <IconComponent width={32} height={32} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">Kubernetes{name}</h3>
              <span className="icon-category body-small-mono-book">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Storage: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">Kubernetes Storage</h1>
      </div>
      <div className="icons-grid">
        {kubernetesIconCategories.Storage.map(({ name, component: IconComponent, description }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <IconComponent width={32} height={32} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">Kubernetes{name}</h3>
              <span className="icon-category body-small-mono-book">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
