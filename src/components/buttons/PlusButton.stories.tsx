import type { Meta, StoryObj } from '@storybook/react-vite'
import PlusButton from './PlusButton'

const meta: Meta<typeof PlusButton> = {
  title: 'Components/Buttons/PlusButton',
  component: PlusButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'The visual state of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
}

export default meta
type Story = StoryObj<typeof PlusButton>

export const Default: Story = {
  args: {
    state: 'default',
  },
}

export const Hover: Story = {
  args: {
    state: 'hover',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithCustomAriaLabel: Story = {
  args: {
    'aria-label': 'Add new item',
  },
}

export const Interactive: Story = {
  args: {
    state: 'default',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <PlusButton {...args} />
      <span>Click to add an item</span>
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    asChild: true,
  },
  render: (args) => (
    <PlusButton {...args}>
      <a href="#add" onClick={(e) => { e.preventDefault(); alert('Add clicked!') }}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_plus_button_link)">
            <path 
              d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" 
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_plus_button_link">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </a>
    </PlusButton>
  ),
}
