import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeatmapChart, HeatmapSerie } from './HeatmapChart';

const meta: Meta<typeof HeatmapChart> = {
  title: 'Charts/HeatmapChart',
  component: HeatmapChart,
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
type Story = StoryObj<typeof HeatmapChart>;

// Sample data: Activity heatmap
const activityData: HeatmapSerie[] = [
  {
    id: 'Japan',
    data: [
      { x: 'Train', y: 48 },
      { x: 'Subway', y: 101 },
      { x: 'Bus', y: 42 },
      { x: 'Car', y: 23 },
      { x: 'Boat', y: 12 },
      { x: 'Moto', y: 89 },
    ],
  },
  {
    id: 'France',
    data: [
      { x: 'Train', y: 83 },
      { x: 'Subway', y: 56 },
      { x: 'Bus', y: 75 },
      { x: 'Car', y: 102 },
      { x: 'Boat', y: 34 },
      { x: 'Moto', y: 45 },
    ],
  },
  {
    id: 'US',
    data: [
      { x: 'Train', y: 34 },
      { x: 'Subway', y: 67 },
      { x: 'Bus', y: 89 },
      { x: 'Car', y: 156 },
      { x: 'Boat', y: 23 },
      { x: 'Moto', y: 78 },
    ],
  },
  {
    id: 'Germany',
    data: [
      { x: 'Train', y: 91 },
      { x: 'Subway', y: 78 },
      { x: 'Bus', y: 65 },
      { x: 'Car', y: 87 },
      { x: 'Boat', y: 19 },
      { x: 'Moto', y: 56 },
    ],
  },
];

export const Default: Story = {
  args: {
    data: activityData,
    height: 400,
    width: 600,
  },
};

export const BluePalette: Story = {
  args: {
    data: activityData,
    palette: 'blue',
    height: 400,
    width: 600,
  },
};

export const WarmPalette: Story = {
  args: {
    data: activityData,
    palette: 'warm',
    height: 400,
    width: 600,
  },
};

export const ForceSquare: Story = {
  args: {
    data: activityData,
    forceSquare: true,
    height: 400,
    width: 600,
    palette: 'cool',
  },
};

export const Interactive: Story = {
  args: {
    data: activityData,
    height: 400,
    width: 600,
    onCellClick: (cell: any) => {
      console.log('Cell clicked:', cell);
      alert(`Clicked: ${JSON.stringify(cell, null, 2)}`);
    },
  },
};
