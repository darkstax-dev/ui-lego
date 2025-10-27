import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourceListingPage from './ResourceListingPage'

const meta: Meta<typeof ResourceListingPage> = {
  title: 'Pages/ResourceListingPage',
  component: ResourceListingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive Kubernetes resource listing interface with tabbed navigation, filtering, and detailed resource information display.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ResourceListingPage>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default resource listing page showing namespace resources with search and filtering capabilities.'
      }
    }
  }
}

export const WithDifferentResourceTypes: Story = {
  render: () => <ResourceListingPage />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive resource listing page where you can switch between different Kubernetes resource types using the tab navigation.'
      }
    }
  }
}

export const Interactive: Story = {
  render: () => <ResourceListingPage />,
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive resource listing with search functionality, namespace filtering, and resource type switching.'
      }
    }
  }
}
