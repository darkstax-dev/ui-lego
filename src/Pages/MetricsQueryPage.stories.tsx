import type { Meta, StoryObj } from '@storybook/react-vite'
import MetricsQueryPage from './MetricsQueryPage'

const meta: Meta<typeof MetricsQueryPage> = {
  title: 'Pages/MetricsQueryPage',
  component: MetricsQueryPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive metrics query interface for creating and editing Prometheus queries with form controls and Monaco Editor integration.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof MetricsQueryPage>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default metrics query page with pre-filled CPU usage query and form fields.'
      }
    }
  }
}

export const EmptyForm: Story = {
  render: () => <MetricsQueryPage />,
  parameters: {
    docs: {
      description: {
        story: 'Metrics query page showing the clean form layout and Monaco Editor for query input.'
      }
    }
  }
}

export const Interactive: Story = {
  render: () => <MetricsQueryPage />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive metrics query page where you can edit all form fields and the Prometheus query.'
      }
    }
  }
}
