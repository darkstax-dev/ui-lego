import type { Meta, StoryObj } from '@storybook/react-vite'
import Checkbox from './Checkbox'
import CheckboxDemo from './CheckboxDemo'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable checkbox component matching the ScenarioTable checkbox design. Features proper TypeScript types, accessibility, and interactive states.'
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when checkbox state changes'
    },
    label: {
      control: 'text',
      description: 'Optional label text for the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {}
  }
}

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {}
  }
}

export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Enable notifications',
    onChange: () => {}
  }
}

export const WithLabelChecked: Story = {
  args: {
    checked: true,
    label: 'Enable notifications',
    onChange: () => {}
  }
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled checkbox',
    onChange: () => {}
  }
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checked',
    onChange: () => {}
  }
}

export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
    label: 'Indeterminate state',
    onChange: () => {}
  }
}

export const LogLevels: Story = {
  render: () => {
    const logLevels = ['Info', 'Trace', 'Warning', 'Error', 'Fatal']
    const checkedStates = [true, false, true, true, false]
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '20px' }}>
        {logLevels.map((level, index) => (
          <Checkbox
            key={level}
            checked={checkedStates[index]}
            label={level}
            onChange={() => {}}
          />
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple checkboxes as used in the RunPopUp log levels.'
      }
    }
  }
}

export const Interactive: Story = {
  render: () => <CheckboxDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Interactive demo showing all checkbox features and states.'
      }
    }
  }
}
