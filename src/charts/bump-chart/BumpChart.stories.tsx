import type { Meta, StoryObj } from '@storybook/react-vite';
import { BumpChart, BumpSerie } from './BumpChart';

const meta: Meta<typeof BumpChart> = {
  title: 'Charts/BumpChart',
  component: BumpChart,
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
type Story = StoryObj<typeof BumpChart>;

// Sample data: Rankings over time
const rankingData: BumpSerie[] = [
  {
    id: 'Serie 1',
    data: [
      { x: 2000, y: 10 },
      { x: 2001, y: 9 },
      { x: 2002, y: 8 },
      { x: 2003, y: 6 },
      { x: 2004, y: 4 },
    ],
  },
  {
    id: 'Serie 2',
    data: [
      { x: 2000, y: 8 },
      { x: 2001, y: 7 },
      { x: 2002, y: 5 },
      { x: 2003, y: 3 },
      { x: 2004, y: 1 },
    ],
  },
  {
    id: 'Serie 3',
    data: [
      { x: 2000, y: 6 },
      { x: 2001, y: 5 },
      { x: 2002, y: 4 },
      { x: 2003, y: 5 },
      { x: 2004, y: 6 },
    ],
  },
  {
    id: 'Serie 4',
    data: [
      { x: 2000, y: 4 },
      { x: 2001, y: 3 },
      { x: 2002, y: 2 },
      { x: 2003, y: 1 },
      { x: 2004, y: 2 },
    ],
  },
];

export const Default: Story = {
  args: {
    data: rankingData,
    height: 400,
  },
};

export const BluePalette: Story = {
  args: {
    data: rankingData,
    palette: 'blue',
    height: 400,
  },
};

export const WarmPalette: Story = {
  args: {
    data: rankingData,
    palette: 'warm',
    height: 400,
  },
};

export const Linear: Story = {
  args: {
    data: rankingData,
    interpolation: 'linear',
    palette: 'cool',
    height: 400,
  },
};

export const Interactive: Story = {
  args: {
    data: rankingData,
    height: 400,
    onSerieClick: (serie: BumpSerie) => {
      console.log('Serie clicked:', serie);
      alert(`Clicked: ${serie.id}`);
    },
  },
};
