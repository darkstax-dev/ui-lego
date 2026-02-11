import type { Meta, StoryObj } from '@storybook/react-vite'
import Graph1 from './Graph1'

const meta: Meta<typeof Graph1> = {
  title: 'Components/MetaMapper/Graph1',
  component: Graph1,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Graph1>

export const Default: Story = {
  args: {
    onSend: (url) => console.log('Send clicked:', url),
    onResponse: () => console.log('Response clicked'),
  },
}

export const WithResponseContent: Story = {
  args: {
    onSend: (url) => console.log('Send clicked:', url),
    onResponse: () => console.log('Response clicked'),
    responseContent: (
      <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.4 }}>
        {JSON.stringify({ status: 'success', data: [] }, null, 2)}
      </pre>
    ),
  },
}
