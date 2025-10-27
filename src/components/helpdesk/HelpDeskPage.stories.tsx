import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import HelpDeskPage from './HelpDeskPage'

const meta: Meta<typeof HelpDeskPage> = {
  title: 'Components/HelpDesk/HelpDesk Page',
  component: HelpDeskPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A clean and streamlined HelpDesk page with simplified layout, featuring quick actions, knowledge base with inline popular topics, integrations overview, and contact information. Built with the Darkstax design system for optimal user experience.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof HelpDeskPage>

export const Default: Story = {
  name: 'Default HelpDesk',
  parameters: {
    docs: {
      description: {
        story: 'The streamlined HelpDesk page with simplified layout: hero search, quick actions, knowledge base with inline popular topics, integrations overview, and contact information.'
      }
    }
  }
}

export const Mobile: Story = {
  name: 'Mobile View',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'HelpDesk page optimized for mobile devices with responsive layout and touch-friendly interactions.'
      }
    }
  }
}

export const Tablet: Story = {
  name: 'Tablet View',
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'HelpDesk page layout for tablet devices with adjusted grid layouts and spacing.'
      }
    }
  }
}
