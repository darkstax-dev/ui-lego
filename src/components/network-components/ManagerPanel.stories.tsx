import type { Meta, StoryObj } from '@storybook/react'
import { ManagerPanel } from './ManagerPanel'

const meta: Meta<typeof ManagerPanel> = {
  title: 'Network Components/ManagerPanel',
  component: ManagerPanel,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#DFDFDF' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ManagerPanel>

export const Default: Story = {
  args: {
    title: 'Manager',
    activeTab: 'layers',
    layers: [
      { id: '1', name: 'Core visual layers', visible: true, expanded: true },
      { id: '2', name: 'Custom group', visible: true, expanded: true }
    ],
  },
}

export const LayoutTab: Story = {
  args: {
    ...Default.args,
    activeTab: 'layout',
  },
}

export const ViewTab: Story = {
  args: {
    ...Default.args,
    activeTab: 'view',
  },
}

export const ToolsTab: Story = {
  args: {
    ...Default.args,
    activeTab: 'tools',
  },
}

export const WithMultipleLayers: Story = {
  args: {
    ...Default.args,
    layers: [
      { id: '1', name: 'Core visual layers', visible: true, expanded: true },
      { id: '2', name: 'Custom group', visible: true, expanded: true },
      { id: '3', name: 'Background elements', visible: false, expanded: false },
      { id: '4', name: 'Navigation components', visible: true, expanded: false },
    ],
  },
}
