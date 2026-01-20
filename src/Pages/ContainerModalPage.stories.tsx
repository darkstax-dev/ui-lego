import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { ContainerModalPage } from './ContainerModalPage'

const meta: Meta<typeof ContainerModalPage> = {
  title: 'Pages/Container Modal',
  component: ContainerModalPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof ContainerModalPage>

export const Default: Story = {}
