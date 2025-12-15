import type { Meta, StoryObj } from '@storybook/react'
import { ConnectionTrafficTable } from './ConnectionTrafficTable'

const meta: Meta<typeof ConnectionTrafficTable> = {
  title: 'Network Components/ConnectionTrafficTable',
  component: ConnectionTrafficTable,
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
type Story = StoryObj<typeof ConnectionTrafficTable>

export const Default: Story = {
  args: {
    title: 'Connection trafic table',
    rows: [
      {
        id: '1',
        event: 'Event',
        eventIP: '228.184.184.100',
        threatLevel: 'Low',
        supervisor: 'Chief Metrics Supervisot',
        email: 'email@email.com',
        status: 'default',
        hasAlert: false
      },
      {
        id: '2',
        event: 'Event',
        eventIP: '228.184.184.100',
        threatLevel: 'Low',
        supervisor: 'Chief Metrics Supervisot',
        email: 'email@email.com',
        status: 'default',
        hasAlert: false
      },
      {
        id: '3',
        event: 'Event',
        eventIP: '228.184.184.100',
        threatLevel: 'Low',
        supervisor: 'Chief Metrics Supervisot',
        email: 'email@email.com',
        status: 'hover',
        hasAlert: false
      },
      {
        id: '4',
        event: 'Event',
        eventIP: '228.184.184.100',
        threatLevel: 'Low',
        supervisor: 'Chief Metrics Supervisot',
        email: 'email@email.com',
        status: 'default',
        hasAlert: false
      }
    ],
  },
}

export const WithWarning: Story = {
  args: {
    ...Default.args,
    rows: [
      {
        id: '1',
        event: 'Event',
        eventIP: '228.184.184.100',
        threatLevel: 'High',
        supervisor: 'Chief Metrics Supervisot',
        email: 'email@email.com',
        status: 'danger',
        hasAlert: true
      },
      ...(Default.args?.rows || []).slice(1)
    ],
  },
}

export const WithMultipleWarnings: Story = {
  args: {
    ...Default.args,
    rows: [
      {
        id: '1',
        event: 'Event',
        eventIP: '192.168.1.50',
        threatLevel: 'High',
        supervisor: 'Security Manager',
        email: 'security@email.com',
        status: 'danger',
        hasAlert: true
      },
      {
        id: '2',
        event: 'Event',
        eventIP: '10.0.0.25',
        threatLevel: 'Medium',
        supervisor: 'Network Admin',
        email: 'admin@email.com',
        status: 'warning',
        hasAlert: false
      },
      {
        id: '3',
        event: 'Event',
        eventIP: '172.16.0.100',
        threatLevel: 'Low',
        supervisor: 'System Monitor',
        email: 'monitor@email.com',
        status: 'default',
        hasAlert: false
      }
    ],
  },
}
