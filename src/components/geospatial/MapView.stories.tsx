import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapView } from './MapView';

// IMPORTANT: Replace with your actual Mapbox access token
// Get one at: https://account.mapbox.com/access-tokens/
// Note: This is a placeholder token. For actual map rendering, you need a valid token.
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

const meta: Meta<typeof MapView> = {
  title: 'Components/Geospatial/MapView',
  component: MapView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Interactive 3D map component using Mapbox GL.

**Setup Instructions:**

1. Get a Mapbox access token at https://account.mapbox.com/access-tokens/
2. For Storybook, create \`.storybook/.env.local\`:
   \`\`\`bash
   VITE_MAPBOX_TOKEN=pk.your_token_here
   \`\`\`
3. Pass token to component:
   \`\`\`tsx
   <MapView mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} />
   \`\`\`

**Features:**
- 3D building visualization at zoom 14+
- Multiple map styles (dark, light, satellite, streets)
- Configurable pitch, bearing, zoom, and center
- Responsive design
- Theme support`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MapView>;

// New York City
export const Default: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 15,
    mapStyle: 'dark',
    enable3DBuildings: true,
  },
};

// San Francisco with 3D buildings
export const SanFrancisco3D: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -122.4194, latitude: 37.7749 },
    initialZoom: 16,
    initialPitch: 60,
    initialBearing: 20,
    mapStyle: 'dark',
    enable3DBuildings: true,
  },
};

// London - Light theme
export const LondonLight: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -0.1276, latitude: 51.5074 },
    initialZoom: 15,
    initialPitch: 45,
    mapStyle: 'light',
    enable3DBuildings: true,
  },
};

// Tokyo - Satellite view
export const TokyoSatellite: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: 139.6917, latitude: 35.6895 },
    initialZoom: 16,
    initialPitch: 60,
    mapStyle: 'satellite',
    enable3DBuildings: true,
  },
};

// Dubai - Top-down view
export const DubaiTopDown: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: 55.2708, latitude: 25.2048 },
    initialZoom: 15,
    initialPitch: 0,
    mapStyle: 'streets',
    enable3DBuildings: false,
  },
};

// Singapore - High pitch 3D view
export const Singapore3D: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: 103.8198, latitude: 1.3521 },
    initialZoom: 17,
    initialPitch: 70,
    initialBearing: 45,
    mapStyle: 'dark',
    enable3DBuildings: true,
  },
};

// Chicago - Streets style
export const ChicagoStreets: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -87.6298, latitude: 41.8781 },
    initialZoom: 15,
    initialPitch: 55,
    mapStyle: 'streets',
    enable3DBuildings: true,
  },
};

// Custom size
export const CustomSize: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 14,
    initialPitch: 45,
    mapStyle: 'dark',
    enable3DBuildings: true,
    height: 600,
    width: 800,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};
