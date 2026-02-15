import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventDetectionCard, EventDetectionData } from './EventDetectionCard';

const meta: Meta<typeof EventDetectionCard> = {
  title: 'Components/Geospatial/EventDetectionCard',
  component: EventDetectionCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Event detection card component for displaying security alerts and object detection results with confidence scores.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px', minHeight: '500px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventDetectionCard>;

const sampleData: EventDetectionData = {
  eventType: 'Object Detection',
  imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/89ccd78188d1c3714ae5711e8155d29d5090133d?width=712',
  primaryDetection: {
    name: 'Pipe',
    confidence: 97,
    location: 'Eastside',
    model: '765',
  },
  detectedItems: [
    {
      id: '1',
      confidence: 97,
      name: 'Baseball Bat',
      status: 'unauthorized',
      selected: true,
    },
    {
      id: '2',
      confidence: 64,
      name: 'Lead Pipe',
      status: 'unauthorized',
    },
    {
      id: '3',
      confidence: 64,
      name: 'Club',
      status: 'illegal',
    },
    {
      id: '4',
      confidence: 4,
      name: 'Flame',
      status: 'illegal',
    },
  ],
};

export const Default: Story = {
  args: {
    data: sampleData,
    onDismiss: () => console.log('Dismissed'),
    onGenerateCOA: (items) => console.log('Generate COA for:', items),
  },
};

export const WithoutClose: Story = {
  args: {
    data: sampleData,
    onDismiss: () => console.log('Dismissed'),
    onGenerateCOA: (items) => console.log('Generate COA for:', items),
  },
};

export const MultipleDetections: Story = {
  args: {
    data: {
      ...sampleData,
      detectedItems: [
        ...sampleData.detectedItems,
        {
          id: '5',
          confidence: 82,
          name: 'Knife',
          status: 'illegal',
        },
        {
          id: '6',
          confidence: 55,
          name: 'Metal Bat',
          status: 'unauthorized',
        },
      ],
    },
    onDismiss: () => console.log('Dismissed'),
    onGenerateCOA: (items) => console.log('Generate COA for:', items),
    onClose: () => console.log('Closed'),
  },
};

export const FireDetection: Story = {
  args: {
    data: {
      eventType: 'Fire Detection',
      imageUrl: 'https://images.unsplash.com/photo-1525118134460-f8f7c2f6d10c?w=712&h=400&fit=crop',
      primaryDetection: {
        name: 'Fire',
        confidence: 94,
        location: 'Building A - Floor 3',
        model: '892',
      },
      detectedItems: [
        {
          id: '1',
          confidence: 94,
          name: 'Open Flame',
          status: 'illegal',
          selected: true,
        },
        {
          id: '2',
          confidence: 87,
          name: 'Smoke',
          status: 'illegal',
          selected: true,
        },
        {
          id: '3',
          confidence: 45,
          name: 'Heat Source',
          status: 'unauthorized',
        },
      ],
    },
    onDismiss: () => console.log('Dismissed'),
    onGenerateCOA: (items) => console.log('Generate COA for:', items),
    onClose: () => console.log('Closed'),
  },
};

export const IntrusionDetection: Story = {
  args: {
    data: {
      eventType: 'Intrusion Detection',
      imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=712&h=400&fit=crop',
      primaryDetection: {
        name: 'Person',
        confidence: 99,
        location: 'North Perimeter',
        model: '654',
      },
      detectedItems: [
        {
          id: '1',
          confidence: 99,
          name: 'Unauthorized Person',
          status: 'unauthorized',
          selected: true,
        },
        {
          id: '2',
          confidence: 78,
          name: 'Vehicle',
          status: 'unauthorized',
        },
      ],
    },
    onDismiss: () => console.log('Dismissed'),
    onGenerateCOA: (items) => console.log('Generate COA for:', items),
    onClose: () => console.log('Closed'),
  },
};

// Dark theme example
export const DarkTheme: Story = {
  args: {
    data: sampleData,
    onDismiss: () => console.log('Dismissed'),
    onGenerateCOA: (items) => console.log('Generate COA for:', items),
    onClose: () => console.log('Closed'),
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ width: '400px', minHeight: '500px', padding: '20px', background: '#00112B' }}>
        <Story />
      </div>
    ),
  ],
};
