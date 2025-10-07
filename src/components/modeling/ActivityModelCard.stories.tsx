import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import ActivityModelCard, { ActivityModelCardProps } from './ActivityModelCard'
import '../../tokens.css'

const meta: Meta<typeof ActivityModelCard> = {
  title: 'Components/Modeling/ActivityModelCard',
  component: ActivityModelCard,
  tags: ['autodocs'],
  args: {
    id: 'test12356',
    template: 'etbase',
    type: 'Pod',
  } satisfies ActivityModelCardProps,
}

export default meta

type Story = StoryObj<typeof ActivityModelCard>

export const Default: Story = {
  render: (args) => <ActivityModelCard {...args} />,
}

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
      <ActivityModelCard id="test12356" template="etbase" type="Pod" />
      <ActivityModelCard id="api-server" template="base" type="Deployment" />
      <ActivityModelCard id="metrics-agent" template="observability" type="DaemonSet" />
    </div>
  )
}
