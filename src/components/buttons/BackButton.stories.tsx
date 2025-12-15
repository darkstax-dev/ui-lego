import type { Meta, StoryObj } from '@storybook/react-vite'
import BackButton from './BackButton'

const meta: Meta<typeof BackButton> = {
  title: 'Components/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A back button component with clear visual indication and intuitive design. Features a left-pointing arrow and customizable label text.'
      }
    }
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked'
    },
    label: {
      control: 'text',
      description: 'Text label for the back button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
}

export default meta
type Story = StoryObj<typeof BackButton>

export const Default: Story = {
  args: {
    label: 'Back'
  }
}

export const WithCustomLabel: Story = {
  args: {
    label: 'Back to Scenarios'
  }
}

export const BackToList: Story = {
  args: {
    label: 'Back to List'
  }
}

export const BackToDashboard: Story = {
  args: {
    label: 'Back to Dashboard'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Back',
    disabled: true
  }
}

export const LongLabel: Story = {
  args: {
    label: 'Back to Previous Configuration Settings'
  }
}

export const Interactive: Story = {
  args: {
    label: 'Back to Scenarios'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive back button that logs clicks to the Actions panel.'
      }
    }
  }
}

export const InContext: Story = {
  render: () => (
    <div style={{ 
      padding: '20px', 
      background: 'var(--surface-default, #f5f5f5)',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <BackButton label="Back to Scenarios" onClick={() => console.log('Back clicked')} />
      <div style={{ 
        padding: '20px', 
        background: 'white', 
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-family-macan)' }}>
          Create New Scenario
        </h2>
        <p style={{ margin: 0, color: '#666' }}>
          This shows how the back button looks in a typical page context.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Back button shown in a realistic page context with proper spacing and background.'
      }
    }
  }
}
