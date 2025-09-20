import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons/Button',
  component: Button,
  args: { children: 'Button', variant: 'primary', size: 'big' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'white'] },
    size: { control: 'inline-radio', options: ['small', 'big'] },
    state: { control: 'inline-radio', options: ['default', 'hover', 'disabled'] },
  },
  parameters: { docs: { description: { component: 'Primary action button with semantic tokens and a11y focus states.' } } }
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const White: Story = { args: { variant: 'white' } }
export const Disabled: Story = { args: { state: 'disabled', disabled: true } }
