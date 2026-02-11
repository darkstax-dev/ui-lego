import type { Meta, StoryObj } from '@storybook/react-vite'
import Database from './Database'
import Graph1 from './Graph1'
import RestAPI from './RestAPI'
import SearchPanel from './SearchPanel'

const meta: Meta = {
  title: 'Components/MetaMapper/All',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj

export const Showcase: Story = {
  render: () => (
    <div style={{ padding: 24, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <Database onConnect={(data) => console.log('Connect:', data)} />
      <Graph1 onSend={(url) => console.log('Send:', url)} onResponse={() => console.log('Response')} />
      <RestAPI onSend={(method, url) => console.log('Send:', method, url)} onResponse={() => console.log('Response')} />
      <SearchPanel
        inputNodes={['Input 1', 'Input 2']}
        outputNodes={['Output 1', 'Output 2']}
        executionNodes={['Execution 1', 'Execution 2']}
        onSearch={(value) => console.log('Search:', value)}
      />
    </div>
  ),
}
