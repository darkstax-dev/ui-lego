import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoxplotChart, BoxplotDataPoint } from './BoxplotChart';

const meta: Meta<typeof BoxplotChart> = {
  title: 'Charts/BoxplotChart',
  component: BoxplotChart,
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
type Story = StoryObj<typeof BoxplotChart>;

// Sample data: Statistical distribution
const statisticalData: BoxplotDataPoint[] = [
  { group: 'Alpha', mu: 5, sd: 1, n: 20, value: 5.2 },
  { group: 'Alpha', mu: 5, sd: 1, n: 20, value: 4.8 },
  { group: 'Alpha', mu: 5, sd: 1, n: 20, value: 5.5 },
  { group: 'Beta', mu: 6, sd: 1.5, n: 20, value: 6.3 },
  { group: 'Beta', mu: 6, sd: 1.5, n: 20, value: 5.7 },
  { group: 'Beta', mu: 6, sd: 1.5, n: 20, value: 6.8 },
  { group: 'Gamma', mu: 7, sd: 1.2, n: 20, value: 7.1 },
  { group: 'Gamma', mu: 7, sd: 1.2, n: 20, value: 6.9 },
  { group: 'Gamma', mu: 7, sd: 1.2, n: 20, value: 7.4 },
  { group: 'Delta', mu: 4, sd: 0.8, n: 20, value: 4.2 },
  { group: 'Delta', mu: 4, sd: 0.8, n: 20, value: 3.9 },
  { group: 'Delta', mu: 4, sd: 0.8, n: 20, value: 4.1 },
];

export const Default: Story = {
  args: {
    data: statisticalData,
    height: 400,
    width: 600,
  },
};

export const BluePalette: Story = {
  args: {
    data: statisticalData,
    palette: 'blue',
    height: 400,
    width: 600,
  },
};

export const HorizontalLayout: Story = {
  args: {
    data: statisticalData,
    layout: 'horizontal',
    height: 400,
    width: 600,
    palette: 'cool',
  },
};

export const WarmPalette: Story = {
  args: {
    data: statisticalData,
    palette: 'warm',
    height: 400,
    width: 600,
  },
};

export const Interactive: Story = {
  args: {
    data: statisticalData,
    height: 400,
    width: 600,
    onBoxClick: (box: any) => {
      console.log('Box clicked:', box);
      alert(`Clicked: ${JSON.stringify(box, null, 2)}`);
    },
  },
};
