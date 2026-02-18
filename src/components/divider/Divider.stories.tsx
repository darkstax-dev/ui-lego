import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Divider from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical']
    }
  }
}

export default meta

type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>Content above divider</div>
      <Divider />
      <div style={{ marginTop: '16px' }}>Content below divider</div>
    </div>
  )
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '200px', padding: '24px' }}>
      <div style={{ marginRight: '16px' }}>Left content</div>
      <Divider orientation="vertical" />
      <div style={{ marginLeft: '16px' }}>Right content</div>
    </div>
  )
}
