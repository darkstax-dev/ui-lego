import type { Meta, StoryObj } from '@storybook/react-vite'
import IntegrationPopup from './IntegrationPopup'

const meta: Meta<typeof IntegrationPopup> = {
  title: 'Components/HelpDesk/IntegrationPopup',
  component: IntegrationPopup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A popup component for configuring integration connections. Features form validation and submission handling following the Darkstax design system.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the popup is visible'
    },
    integrationName: {
      control: 'text',
      description: 'Name of the integration service'
    },
    integrationDescription: {
      control: 'text',
      description: 'Optional description text for the integration'
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when popup is closed'
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback fired when form is submitted with integration parameters'
    }
  }
}

export default meta
type Story = StoryObj<typeof IntegrationPopup>

export const Default: Story = {
  name: 'Light Variant',
  args: {
    isOpen: true,
    integrationName: 'Jira',
    integrationDescription: 'Please provide the following information to connect to Jira.'
  }
}

export const JiraIntegration: Story = {
  args: {
    isOpen: true,
    integrationName: 'Jira',
    integrationDescription: 'Connect your Jira instance to sync issues and track project management data.'
  }
}

export const ConfluenceIntegration: Story = {
  args: {
    isOpen: true,
    integrationName: 'Confluence',
    integrationDescription: 'Connect to Confluence to access your team\'s knowledge base and documentation.'
  }
}

export const GitHubIntegration: Story = {
  args: {
    isOpen: true,
    integrationName: 'GitHub',
    integrationDescription: 'Connect your GitHub repositories to sync code documentation and issues.'
  }
}

export const WithoutDescription: Story = {
  args: {
    isOpen: true,
    integrationName: 'Custom Service'
  }
}

export const Closed: Story = {
  args: {
    isOpen: false,
    integrationName: 'Jira',
    integrationDescription: 'Please provide the following information to connect to Jira.'
  }
}

export const Interactive: Story = {
  args: {
    isOpen: true,
    integrationName: 'Jira Service Management',
    integrationDescription: 'Connect to Jira Service Management to manage support tickets and service requests.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version where you can fill out the form and see the callbacks in the Actions panel.'
      }
    }
  }
}
