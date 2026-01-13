import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScatterplotChart, ScatterplotSerie } from './ScatterplotChart';

const meta: Meta<typeof ScatterplotChart> = {
  title: 'Charts/ScatterplotChart',
  component: ScatterplotChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '900px', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScatterplotChart>;

// Sample data: Performance metrics
const performanceData: ScatterplotSerie[] = [
  {
    id: 'group A',
    data: [
      { x: 12, y: 32 },
      { x: 31, y: 11 },
      { x: 5, y: 25 },
      { x: 18, y: 6 },
      { x: 29, y: 4 },
      { x: 11, y: 21 },
      { x: 27, y: 14 },
    ],
  },
  {
    id: 'group B',
    data: [
      { x: 6, y: 12 },
      { x: 32, y: 29 },
      { x: 15, y: 18 },
      { x: 22, y: 7 },
      { x: 3, y: 22 },
      { x: 25, y: 15 },
      { x: 9, y: 31 },
    ],
  },
  {
    id: 'group C',
    data: [
      { x: 14, y: 17 },
      { x: 8, y: 28 },
      { x: 21, y: 9 },
      { x: 28, y: 20 },
      { x: 17, y: 13 },
      { x: 4, y: 30 },
      { x: 24, y: 5 },
    ],
  },
];

export const Default: Story = {
  args: {
    data: performanceData,
    height: 400,
  },
};

export const BluePalette: Story = {
  args: {
    data: performanceData,
    palette: 'blue',
    height: 400,
  },
};

export const WarmPalette: Story = {
  args: {
    data: performanceData,
    palette: 'warm',
    height: 400,
  },
};

export const LargerNodes: Story = {
  args: {
    data: performanceData,
    nodeSize: 16,
    palette: 'cool',
    height: 400,
  },
};

export const Interactive: Story = {
  args: {
    data: performanceData,
    height: 400,
    onNodeClick: (node: any) => {
      console.log('Node clicked:', node);
      alert(`Clicked: ${JSON.stringify(node, null, 2)}`);
    },
  },
};
