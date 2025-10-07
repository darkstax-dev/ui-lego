import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import RunPopUp from './RunPopUp'
import Button from '../components/buttons/Button'

const meta: Meta<typeof RunPopUp> = {
  title: 'Pages/RunPopUp',
  component: RunPopUp,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof RunPopUp>

const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleRun = () => {
    console.log('Run clicked')
    setIsOpen(false)
  }

  return (
    <div>
      <Button variant="primary-simple" onClick={handleOpen}>Open Run Popup</Button>
      <RunPopUp 
        {...args} 
        isOpen={isOpen}
        onClose={handleClose}
        onRun={handleRun}
      />
    </div>
  )
}

export const DarkVariant: Story = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    variant: 'dark',
  },
}

export const LightVariant: Story = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    variant: 'light',
  },
}

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    variant: 'dark',
    onClose: () => console.log('Close clicked'),
    onRun: () => console.log('Run clicked'),
  },
}
