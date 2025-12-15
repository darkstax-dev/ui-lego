import type { Meta, StoryObj } from '@storybook/react-vite'
import OptionBar from './OptionBar'
import OptionBarDemo from './OptionBarDemo'
import './OptionBar.css'
import './OptionBar.stories.css'
import '../../../tokens.css'

const meta: Meta<typeof OptionBar> = {
  title: 'Components/Scenario Listing/Option Bar',
  component: OptionBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof OptionBar>

export const Default: Story = {
  args: {
    onOpen: () => console.log('Open clicked'),
    onVersionHistory: () => console.log('Version History clicked'),
    onEdit: () => console.log('Edit clicked'),
    onScenarioAccessibility: () => console.log('Scenario Accessibility clicked'),
    onScenarioNodes: () => console.log('Scenario Nodes clicked'),
    onDeploy: () => console.log('Deploy clicked'),
    onRun: () => console.log('Run clicked'),
    onDeleteNamespace: () => console.log('Delete Namespace clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
}

export const Interactive: Story = {
  render: () => <OptionBarDemo />,
}
