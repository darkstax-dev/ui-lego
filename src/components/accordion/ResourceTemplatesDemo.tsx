import React from 'react'
import Accordion from './Accordion'
import AccordionItem from './AccordionItem'
import ResourceTemplateFolder from './ResourceTemplateFolder'
import './ResourceTemplatesDemo.css'

const ResourceTemplatesDemo: React.FC = () => {
  const [query, setQuery] = React.useState('')

  const podTemplates = [
    { name: 'nginx-pod.yaml', type: 'pod' as const },
    { name: 'redis-pod.yaml', type: 'pod' as const },
    { name: 'postgres-pod.yaml', type: 'pod' as const },
  ]

  const serviceTemplates = [
    { name: 'loadbalancer-service.yaml', type: 'service' as const },
    { name: 'nodeport-service.yaml', type: 'service' as const },
    { name: 'clusterip-service.yaml', type: 'service' as const },
  ]

  const deploymentTemplates = [
    { name: 'web-deployment.yaml', type: 'deployment' as const },
    { name: 'api-deployment.yaml', type: 'deployment' as const },
    { name: 'worker-deployment.yaml', type: 'deployment' as const },
  ]

  const q = query.trim().toLowerCase()
  const filterItems = (items: { name: string }[]) => (q ? items.filter(i => i.name.toLowerCase().includes(q)) : items)

  const filteredPods = filterItems(podTemplates)
  const filteredServices = filterItems(serviceTemplates)
  const filteredDeployments = filterItems(deploymentTemplates)

  const totalMatches = filteredPods.length + filteredServices.length + filteredDeployments.length
  const hasQuery = q.length > 0

  const resourceTemplatesContent = (
    <div className="rt-folders">
      {hasQuery && totalMatches === 0 ? (
        <div className="rt-no-results">No resource templates found</div>
      ) : (
        <>
          {filteredPods.length > 0 && (
            <ResourceTemplateFolder
              name="Pods"
              items={filteredPods}
              defaultOpen={hasQuery ? true : true}
            />
          )}

          {filteredServices.length > 0 && (
            <ResourceTemplateFolder
              name="Services"
              items={filteredServices}
              defaultOpen={hasQuery ? true : false}
            />
          )}

          {filteredDeployments.length > 0 && (
            <ResourceTemplateFolder
              name="Deployments"
              items={filteredDeployments}
              defaultOpen={hasQuery ? true : false}
            />
          )}
        </>
      )}
    </div>
  )

  return (
    <div className="rt-container">
      <h2 className="rt-title">Resource Template Mockup</h2>

      <div className="rt-search-wrapper">
        <input
          className="rt-search"
          aria-label="Search resource templates"
          placeholder="Search resource templates..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <Accordion>
        <AccordionItem
          title="Resource Templates"
          content={resourceTemplatesContent as any}
          defaultOpen={true}
        />
      </Accordion>
    </div>
  )
}

export default ResourceTemplatesDemo
