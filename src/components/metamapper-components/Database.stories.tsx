import type { Meta, StoryObj } from '@storybook/react-vite'
import Database from './Database'

const meta: Meta<typeof Database> = {
  title: 'Components/MetaMapper/Database',
  component: Database,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Database>

export const Default: Story = {
  args: {
    onConnect: (data) => console.log('Connect clicked:', data),
  },
}

export const WithInitialData: Story = {
  args: {
    initialData: {
      host: 'localhost',
      port: '5432',
      dbName: 'mydb',
      schema: 'public',
      username: 'admin',
      password: '',
    },
    onConnect: (data) => console.log('Connect clicked:', data),
  },
}
