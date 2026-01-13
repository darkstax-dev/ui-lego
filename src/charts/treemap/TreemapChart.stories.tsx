import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreemapChart, TreemapDataNode } from './TreemapChart';

const meta: Meta<typeof TreemapChart> = {
  title: 'Charts/TreemapChart',
  component: TreemapChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '700px', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TreemapChart>;

// Sample data: Company departments
const companyData: TreemapDataNode = {
  id: 'root',
  name: 'Company',
  children: [
    {
      id: 'engineering',
      name: 'Engineering',
      children: [
        { id: 'frontend', name: 'Frontend', value: 23 },
        { id: 'backend', name: 'Backend', value: 31 },
        { id: 'devops', name: 'DevOps', value: 12 },
        { id: 'qa', name: 'QA', value: 15 },
      ],
    },
    {
      id: 'sales',
      name: 'Sales',
      children: [
        { id: 'enterprise', name: 'Enterprise', value: 18 },
        { id: 'smb', name: 'SMB', value: 22 },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      children: [
        { id: 'digital', name: 'Digital', value: 14 },
        { id: 'content', name: 'Content', value: 9 },
        { id: 'events', name: 'Events', value: 7 },
      ],
    },
    {
      id: 'hr',
      name: 'HR',
      value: 11,
    },
  ],
};

export const Default: Story = {
  args: {
    data: companyData,
    height: 400,
    width: 600,
  },
};

export const BluePalette: Story = {
  args: {
    data: companyData,
    palette: 'blue',
    height: 400,
    width: 600,
  },
};

export const WarmPalette: Story = {
  args: {
    data: companyData,
    palette: 'warm',
    height: 400,
    width: 600,
  },
};

export const LeavesOnly: Story = {
  args: {
    data: companyData,
    leavesOnly: true,
    palette: 'cool',
    height: 400,
    width: 600,
  },
};

export const Interactive: Story = {
  args: {
    data: companyData,
    height: 400,
    width: 600,
    onNodeClick: (node: TreemapDataNode) => {
      console.log('Node clicked:', node);
      alert(`Clicked: ${node.name} (${node.value || 'parent'})`);
    },
  },
};
