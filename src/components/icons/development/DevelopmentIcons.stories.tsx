import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import './DevelopmentIcons.stories.css'
import * as DevIcons from './index'

const meta: Meta = {
  title: 'Icons/Development',
}
export default meta

type Story = StoryObj

export const All: Story = {
  render: () => (
    <div className="dev-icons-grid">
      {Object.entries(DevIcons).map(([name, Icon]) => (
        <div key={name} className="dev-icon-card">
          {React.createElement(Icon as React.FC<any>, { width: 24, height: 24, fill: 'var(--text-blue-main)' })}
          <div className="dev-icon-label">{name}</div>
        </div>
      ))}
    </div>
  ),
}
