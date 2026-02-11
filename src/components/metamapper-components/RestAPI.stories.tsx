import type { Meta, StoryObj } from '@storybook/react-vite'
import RestAPI from './RestAPI'

const meta: Meta<typeof RestAPI> = {
  title: 'Components/MetaMapper/RestAPI',
  component: RestAPI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof RestAPI>

export const Default: Story = {
  args: {
    onSend: (method, url) => console.log('Send clicked:', method, url),
    onResponse: () => console.log('Response clicked'),
  },
}

export const PostRequest: Story = {
  args: {
    initialMethod: 'POST',
    initialUrl: 'http://localhost:3001/api/data',
    onSend: (method, url) => console.log('Send clicked:', method, url),
    onResponse: () => console.log('Response clicked'),
  },
}
