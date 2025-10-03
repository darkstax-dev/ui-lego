import React from 'react'
import Accordion from './Accordion'
import AccordionItem from './AccordionItem'
import ResourceTemplateFolder from './ResourceTemplateFolder'

const ResourceTemplatesDemo: React.FC = () => {
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

  const resourceTemplatesContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <ResourceTemplateFolder 
        name="Pods" 
        items={podTemplates}
        defaultOpen={true}
      />
      <ResourceTemplateFolder 
        name="Services" 
        items={serviceTemplates}
      />
      <ResourceTemplateFolder 
        name="Deployments" 
        items={deploymentTemplates}
      />
    </div>
  )

  return (
    <div style={{ padding: '24px', maxWidth: '400px' }}>
      <h2 style={{ 
        marginBottom: '24px', 
        fontFamily: 'var(--font-family-macan-mono)', 
        textTransform: 'uppercase',
        fontSize: '18px',
        fontWeight: '600',
      }}>
        Resource Template Mockup
      </h2>
      
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
