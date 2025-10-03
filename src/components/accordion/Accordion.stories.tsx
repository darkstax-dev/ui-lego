import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import ResourceTemplateFolder from './ResourceTemplateFolder';
import ResourceTemplatesList from './ResourceTemplatesList';
import './Accordion.stories.css';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A collapsible accordion component for organizing content in expandable sections. Supports multiple items, custom headers, and smooth animations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic single item
export const SingleItem: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="What is UI Lego?"
          content="UI Lego is a reusable component library for building consistent, accessible apps."
        />
      </Accordion>
    </div>
  ),
};

// Multiple items (uncontrolled, can open more than one)
export const MultipleItems: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="Getting Started"
          content="Install the package, import components, and start composing your UI."
        />
        <AccordionItem 
          title="Theming"
          content="Use tokens.css to align with brand colors, spacing, and typography."
        />
        <AccordionItem 
          title="Accessibility"
          content="Components are designed with keyboard navigation and screen readers in mind."
        />
      </Accordion>
    </div>
  ),
};

// Default open item
export const DefaultOpen: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="Open by Default"
          content="This section starts expanded using the defaultOpen prop."
          defaultOpen
        />
        <AccordionItem 
          title="Closed by Default"
          content="Click the header to expand this section."
        />
      </Accordion>
    </div>
  ),
};

// Long content example
export const LongContent: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem
          title="Release Notes"
          content={
            'Version 1.2.0\n\n' +
            '- Added new components and improved performance.\n' +
            '- Fixed various accessibility issues and refined focus styles.\n' +
            '- Updated documentation and usage examples.\n\n' +
            'Version 1.1.0\n\n' +
            '- Introduced modeling components and enhanced theming support.'
          }
        />
      </Accordion>
    </div>
  ),
};

// Resource Templates with folder structure
export const ResourceTemplates: Story = {
  render: () => {
    const podTemplates = [
      { name: 'nginx-pod.yaml', type: 'pod' as const },
      { name: 'redis-pod.yaml', type: 'pod' as const },
      { name: 'postgres-pod.yaml', type: 'pod' as const },
    ];

    const serviceTemplates = [
      { name: 'loadbalancer-service.yaml', type: 'service' as const },
      { name: 'nodeport-service.yaml', type: 'service' as const },
      { name: 'clusterip-service.yaml', type: 'service' as const },
    ];

    const deploymentTemplates = [
      { name: 'web-deployment.yaml', type: 'deployment' as const },
      { name: 'api-deployment.yaml', type: 'deployment' as const },
      { name: 'worker-deployment.yaml', type: 'deployment' as const },
    ];

    return (
      <div className="accordion-story">
        <Accordion>
          <AccordionItem
            title="Resource Templates"
            content={
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
            }
            defaultOpen={true}
          />
        </Accordion>
      </div>
    );
  },
};

// Resource Templates with Icons and Search
export const ResourceTemplatesWithSearch: Story = {
  render: () => {
    return (
      <div className="accordion-story">
        <ResourceTemplatesList />
      </div>
    );
  },
};
