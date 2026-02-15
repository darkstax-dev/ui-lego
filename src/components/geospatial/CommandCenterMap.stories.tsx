import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandCenterMap, EventMarker } from './CommandCenterMap';
import { EventDetectionData } from './EventDetectionCard';

// IMPORTANT: Replace with your actual Mapbox access token
const MAPBOX_TOKEN = process.env.STORYBOOK_MAPBOX_TOKEN || 
  'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

const meta: Meta<typeof CommandCenterMap> = {
  title: 'Components/Geospatial/CommandCenterMap',
  component: CommandCenterMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Command center map component combining 3D Mapbox visualization with event detection cards. 
        
Features:
- 3D building visualization
- Event detection card overlay
- Timeline header
- View controls
- Dark/Light theme support

**Note:** Requires a valid Mapbox access token.`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandCenterMap>;

const weaponDetectionEvent: EventDetectionData = {
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

const fireDetectionEvent: EventDetectionData = {
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
};

const sampleEvents: EventMarker[] = [
  {
    id: 'event-1',
    location: { longitude: -74.006, latitude: 40.7128 },
    eventData: weaponDetectionEvent,
  },
  {
    id: 'event-2',
    location: { longitude: -74.008, latitude: 40.7138 },
    eventData: fireDetectionEvent,
  },
];

export const Default: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 16,
    mapStyle: 'dark',
    enable3DBuildings: true,
    events: sampleEvents,
    activeEventId: 'event-1',
    showTimeline: true,
    onEventSelect: (eventId) => console.log('Event selected:', eventId),
    onEventDismiss: (eventId) => console.log('Event dismissed:', eventId),
    onGenerateCOA: (eventId, items) => console.log('Generate COA:', eventId, items),
    onEventClose: (eventId) => console.log('Event closed:', eventId),
  },
};

export const WithoutTimeline: Story = {
  args: {
    ...Default.args,
    showTimeline: false,
  },
};

export const LightTheme: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 16,
    mapStyle: 'light',
    enable3DBuildings: true,
    events: sampleEvents,
    activeEventId: 'event-1',
    showTimeline: true,
  },
};

export const SanFrancisco: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -122.4194, latitude: 37.7749 },
    initialZoom: 17,
    mapStyle: 'dark',
    enable3DBuildings: true,
    events: [
      {
        id: 'sf-event-1',
        location: { longitude: -122.4194, latitude: 37.7749 },
        eventData: weaponDetectionEvent,
      },
    ],
    activeEventId: 'sf-event-1',
    showTimeline: true,
  },
};

export const FireEvent: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 16,
    mapStyle: 'dark',
    enable3DBuildings: true,
    events: [
      {
        id: 'fire-1',
        location: { longitude: -74.006, latitude: 40.7128 },
        eventData: fireDetectionEvent,
      },
    ],
    activeEventId: 'fire-1',
    showTimeline: true,
  },
};

export const NoActiveEvent: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 16,
    mapStyle: 'dark',
    enable3DBuildings: true,
    events: sampleEvents,
    showTimeline: true,
  },
};

export const London: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -0.1276, latitude: 51.5074 },
    initialZoom: 16,
    mapStyle: 'dark',
    enable3DBuildings: true,
    events: [
      {
        id: 'london-1',
        location: { longitude: -0.1276, latitude: 51.5074 },
        eventData: {
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
      },
    ],
    activeEventId: 'london-1',
    showTimeline: true,
  },
};

// Interactive example with state management
export const Interactive: Story = {
  render: (args) => {
    const [activeEventId, setActiveEventId] = React.useState<string | undefined>('event-1');

    return (
      <CommandCenterMap
        {...args}
        activeEventId={activeEventId}
        onEventSelect={(id) => {
          console.log('Event selected:', id);
          setActiveEventId(id);
        }}
        onEventDismiss={(id) => {
          console.log('Event dismissed:', id);
          setActiveEventId(undefined);
        }}
        onEventClose={(id) => {
          console.log('Event closed:', id);
          setActiveEventId(undefined);
        }}
        onGenerateCOA={(id, items) => {
          console.log('Generate COA:', id, items);
        }}
      />
    );
  },
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 16,
    mapStyle: 'dark',
    enable3DBuildings: true,
    events: sampleEvents,
    showTimeline: true,
  },
};

// Dark theme example
export const DarkTheme: Story = {
  args: Default.args,
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
