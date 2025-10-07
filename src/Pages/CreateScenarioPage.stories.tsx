import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { CreateScenarioPage } from '.'

const meta: Meta = {
  title: 'Pages/Create Scenario',
}

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => <CreateScenarioPage />,
}
