import type { Meta, StoryObj } from '@storybook/react'
import DeleteNamespacePopup from './DeleteNamespacePopup'

const meta: Meta<typeof DeleteNamespacePopup> = {
  title: 'Components/Scenario Listing/DeleteNamespacePopup',
  component: DeleteNamespacePopup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A popup component for deleting namespaces. Features checkbox selection and confirmation actions.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the popup is visible'
    },
    namespaces: {
      control: 'object',
      description: 'Array of namespace names to display for selection'
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when popup is closed'
    },
    onDelete: {
      action: 'deleted',
      description: 'Callback fired when delete is confirmed with selected namespaces'
    }
  }
}

export default meta
type Story = StoryObj<typeof DeleteNamespacePopup>

export const Default: Story = {
  args: {
    isOpen: true,
    namespaces: ['namespace1']
  }
}

export const MultipleNamespaces: Story = {
  args: {
    isOpen: true,
    namespaces: ['namespace1', 'namespace2', 'namespace3', 'production-ns', 'staging-ns']
  }
}

export const LongNamespaceNames: Story = {
  args: {
    isOpen: true,
    namespaces: [
      'very-long-namespace-name-that-might-wrap',
      'another-extremely-long-namespace-name-for-testing',
      'short-ns',
      'production-environment-namespace-v2'
    ]
  }
}

export const SingleNamespace: Story = {
  args: {
    isOpen: true,
    namespaces: ['production']
  }
}

export const EmptyNamespaces: Story = {
  args: {
    isOpen: true,
    namespaces: []
  }
}

export const Closed: Story = {
  args: {
    isOpen: false,
    namespaces: ['namespace1', 'namespace2']
  }
}

export const Interactive: Story = {
  args: {
    isOpen: true,
    namespaces: ['development', 'staging', 'production', 'testing']
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version where you can select namespaces and see the callbacks in the Actions panel.'
      }
    }
  }
}
