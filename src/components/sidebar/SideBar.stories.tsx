import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideBar, SideBarItem } from './SideBar';
import './SideBar.stories.css';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A hierarchical sidebar component with folder icons. Shows regular folder icons for items without children, and folder plus/minus icons for expandable items.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SideBar>;

const basicItems: SideBarItem[] = [
  {
    id: '1',
    label: 'Documents',
  },
  {
    id: '2',
    label: 'Images',
  },
  {
    id: '3',
    label: 'Projects',
    isExpanded: true,
    children: [
      {
        id: '3-1',
        label: 'Web App',
      },
      {
        id: '3-2',
        label: 'Mobile App',
      },
    ],
  },
];

const complexItems: SideBarItem[] = [
  {
    id: '1',
    label: 'Default',
  },
  {
    id: '2',
    label: 'Traffic light',
    children: [
      { id: '2-1', label: 'Signals' },
      { id: '2-2', label: 'Controllers' },
    ],
  },
  {
    id: '3',
    label: 'Example',
    children: [
      { id: '3-1', label: 'Scenarios' },
      { id: '3-2', label: 'Templates' },
    ],
  },
  {
    id: '4',
    label: 'Default',
  },
  {
    id: '5',
    label: 'Darkstax demo',
    isExpanded: true,
    children: [
      {
        id: '5-1',
        label: 'API',
        children: [
          { id: '5-1-1', label: 'Endpoints' },
          { id: '5-1-2', label: 'Schemas' },
        ],
      },
      {
        id: '5-2',
        label: 'Darkstax demo',
        isExpanded: true,
        children: [
          {
            id: '5-2-1',
            label: 'Resources',
          },
          {
            id: '5-2-2',
            label: 'Main resources',
          },
        ],
      },
    ],
  },
  {
    id: '6',
    label: 'Galactic Drift',
    children: [
      { id: '6-1', label: 'Navigation' },
      { id: '6-2', label: 'Star Maps' },
    ],
  },
  {
    id: '7',
    label: 'Echoes of Eternity',
    children: [
      { id: '7-1', label: 'Lore' },
      { id: '7-2', label: 'Artifacts' },
      { id: '7-3', label: 'Characters' },
    ],
  },
  {
    id: '8',
    label: 'Crimson Horizon',
    children: [
      { id: '8-1', label: 'Campaigns' },
      { id: '8-2', label: 'Missions' },
    ],
  },
  {
    id: '9',
    label: 'Example',
    children: [
      { id: '9-1', label: 'Sample A' },
      { id: '9-2', label: 'Sample B' },
    ],
  },
  {
    id: '10',
    label: 'Default',
  },
  {
    id: '11',
    label: 'Default',
  },
  {
    id: '12',
    label: 'Default',
  },
  {
    id: '13',
    label: 'Crimson Horizon',
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic sidebar with folder icons. Items without children show regular folder icons, items with children show plus/minus icons for expand/collapse.'
      }
    }
  }
};

export const Complex: Story = {
  args: {
    items: complexItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex sidebar structure with many collapsible folders and multiple levels, matching the reference design.'
      }
    }
  }
};
