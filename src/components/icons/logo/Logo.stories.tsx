import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import LogoTile from './LogoTile'
import NexoraWordmarkWhite from './NexoraWordmarkWhite'
import './LogoCatalog.css'

const meta: Meta = {
  title: 'Icons/Logo',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Logo catalog showing attached SVG brand assets on dark backgrounds using design tokens. Text uses light colors for contrast.'
      }
    }
  }
}

export default meta

type Story = StoryObj

export const Catalog: Story = {
  render: () => (
    <div className="logo-catalog">
      <h2 className="logo-heading">Logo Catalog</h2>
      <div className="logo-grid">
        <LogoTile name="SG Mark" backgroundClass="bg-sg-mark" description="Stratagem symbol" />
        <LogoTile name="Stratagem AI" backgroundClass="bg-stratagem-wordmark" description="Wordmark" size="tall" />
        <LogoTile name="Darkstax" backgroundClass="bg-darkstax-wordmark" description="Wordmark" size="tall" />
        <LogoTile name="Darkstax Mark" backgroundClass="bg-darkstax-mark" description="Glyph" />
        <LogoTile name="Nexora" description="Wordmark" size="tall" art={<NexoraWordmarkWhite width={320} />} />
        <LogoTile name="Nexora Mark" backgroundClass="bg-nexora-mark" description="Glyph" />
      </div>
    </div>
  )
}
