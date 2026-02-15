import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandCenterMap, EventMarker } from './CommandCenterMap';
import { EventDetectionData } from './EventDetectionCard';

// IMPORTANT: To use these stories, you must provide a valid Mapbox access token
// Steps:
// 1. Get a free token at: https://account.mapbox.com/access-tokens/
// 2. Create .storybook/.env.local with: VITE_MAPBOX_TOKEN=pk.your_token_here
// 3. Restart Storybook
// For now, using placeholder - maps won't render without a valid token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ||
  'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

const meta: Meta<typeof CommandCenterMap> = {
  title: 'Components/Geospatial/CommandCenterMap',
  component: CommandCenterMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Command center map component combining 3D Mapbox visualization with event detection cards.

**Setup Instructions:**

1. Get a Mapbox access token at https://account.mapbox.com/access-tokens/
2. For Storybook, create \`.storybook/.env.local\`:
   \`\`\`bash
   VITE_MAPBOX_TOKEN=pk.your_token_here
   \`\`\`

**Features:**
- 3D building visualization
- Event detection card overlay with image, confidence, and actions
- Timeline header with hour markers
- View control buttons (2D view, Reset view)
- Event selection and management
- Dark/Light theme support
- Fully responsive design

**Theme Support:**
- Light theme: Gray backgrounds with blue text
- Dark theme: Dark blue backgrounds with light text`,
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

// Setup Instructions Story
export const SetupInstructions: Story = {
  render: () => (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Command Center Setup Required</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        The Command Center Map combines event detection with 3D mapping.
        To view interactive maps, follow these steps:
      </p>
      <ol style={{ textAlign: 'left', display: 'inline-block', fontSize: '14px' }}>
        <li style={{ marginBottom: '12px' }}>
          Visit <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noreferrer">
            account.mapbox.com/access-tokens/
          </a>
        </li>
        <li style={{ marginBottom: '12px' }}>
          Create a free account and generate a token (starts with <code>pk.</code>)
        </li>
        <li style={{ marginBottom: '12px' }}>
          Create <code>.storybook/.env.local</code> file with:
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            margin: '8px 0',
            textAlign: 'left',
          }}>
            VITE_MAPBOX_TOKEN=pk.your_token_here
          </pre>
        </li>
        <li style={{ marginBottom: '12px' }}>
          Restart Storybook: <code>npm run storybook</code>
        </li>
      </ol>
      <p style={{ marginTop: '20px', opacity: 0.7 }}>
        After setup, all command center stories below will display interactive 3D maps with event overlays.
      </p>
    </div>
  ),
};

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
