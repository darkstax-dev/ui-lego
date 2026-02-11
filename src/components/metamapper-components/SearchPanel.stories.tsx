import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchPanel from './SearchPanel'

const meta: Meta<typeof SearchPanel> = {
  title: 'Components/MetaMapper/SearchPanel',
  component: SearchPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof SearchPanel>

export const Default: Story = {
  args: {
    onSearch: (value) => console.log('Search:', value),
  },
}

export const WithData: Story = {
  args: {
    inputNodes: ['Input Node 1', 'Input Node 2', 'Input Node 3'],
    outputNodes: ['Output Node 1', 'Output Node 2'],
    executionNodes: ['Execution Node 1', 'Execution Node 2', 'Execution Node 3'],
    onSearch: (value) => console.log('Search:', value),
  },
}
