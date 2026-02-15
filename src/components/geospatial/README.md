# Geospatial Components Library

A collection of geospatial visualization components built with Mapbox GL and Nivo Charts, designed for command center and security monitoring applications.

## Components

### EventDetectionCard

A card component for displaying security event detection results with confidence scores, images, and actionable items.

**Features:**
- Event image display
- Confidence circle indicator
- Detection details (location, model, confidence)
- List of detected items with status labels
- Item selection with checkboxes
- Dismiss and Generate COA actions
- Collapsible sections
- Dark/Light theme support

**Usage:**
```tsx
import { EventDetectionCard, EventDetectionData } from './components/geospatial';

const eventData: EventDetectionData = {
  eventType: 'Object Detection',
  imageUrl: 'https://example.com/image.jpg',
  primaryDetection: {
    name: 'Weapon',
    confidence: 97,
    location: 'Eastside Camera',
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
  ],
};

<EventDetectionCard
  data={eventData}
  onDismiss={() => console.log('Dismissed')}
  onGenerateCOA={(items) => console.log('COA:', items)}
  onClose={() => console.log('Closed')}
/>
```

### MapView

An interactive 3D map component powered by Mapbox GL.

**Features:**
- 3D building visualization
- Multiple map styles (dark, light, satellite, streets)
- Configurable pitch, bearing, and zoom
- Responsive design
- Theme support

**Usage:**
```tsx
import { MapView } from './components/geospatial';

<MapView
  mapboxAccessToken="YOUR_MAPBOX_TOKEN"
  initialCenter={{ longitude: -74.006, latitude: 40.7128 }}
  initialZoom={16}
  mapStyle="dark"
  enable3DBuildings={true}
  height="100vh"
/>
```

**Required Setup:**
1. Get a Mapbox access token from [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
2. Set it as an environment variable: `STORYBOOK_MAPBOX_TOKEN=your_token_here`
3. Or pass it directly to the component via the `mapboxAccessToken` prop

### CommandCenterMap

A complete command center map view combining MapView with EventDetectionCard overlays.

**Features:**
- Full-screen 3D map
- Event detection card overlay
- Timeline header
- View control buttons (2D view, Reset view)
- Multiple event markers support
- Event selection and management
- Responsive design
- Dark/Light theme support

**Usage:**
```tsx
import { CommandCenterMap, EventMarker } from './components/geospatial';

const events: EventMarker[] = [
  {
    id: 'event-1',
    location: { longitude: -74.006, latitude: 40.7128 },
    eventData: {
      eventType: 'Object Detection',
      imageUrl: 'https://example.com/image.jpg',
      primaryDetection: {
        name: 'Weapon',
        confidence: 97,
        location: 'Eastside',
        model: '765',
      },
      detectedItems: [...],
    },
  },
];

<CommandCenterMap
  mapboxAccessToken="YOUR_MAPBOX_TOKEN"
  initialCenter={{ longitude: -74.006, latitude: 40.7128 }}
  events={events}
  activeEventId="event-1"
  showTimeline={true}
  onEventSelect={(id) => console.log('Selected:', id)}
  onEventDismiss={(id) => console.log('Dismissed:', id)}
  onGenerateCOA={(id, items) => console.log('COA:', id, items)}
  onEventClose={(id) => console.log('Closed:', id)}
/>
```

## Theme Support

All components support both light and dark themes using the existing design tokens from `tokens.css`.

**Theme Switching:**

1. **Automatic (system preference):**
   ```css
   @media (prefers-color-scheme: dark) {
     /* Dark theme automatically applied */
   }
   ```

2. **Manual (data attribute):**
   ```tsx
   <div data-theme="dark">
     <CommandCenterMap {...props} />
   </div>
   ```

## Design Tokens

Components use the following token categories:
- **Colors:** `--color-blue-dark-950`, `--color-gray-*`, `--color-red-*`, etc.
- **Typography:** `--font-family-macan-mono`, `--font-size-*`, etc.
- **Spacing:** `--sds-size-space-*`
- **Semantic:** `--Text-Blue-text-Main-text`, `--Background-Card`, etc.

## Dependencies

- `react` ^18.3.1
- `react-dom` ^18.3.1
- `mapbox-gl` (installed)
- `react-map-gl` (installed)
- `@nivo/core` ^0.99.0
- `@nivo/geo` ^0.99.0

## File Structure

```
src/components/geospatial/
├── EventDetectionCard.tsx       # Event card component
├── EventDetectionCard.css       # Event card styles
├── EventDetectionCard.stories.tsx
├── MapView.tsx                  # Mapbox map component
├── MapView.css                  # Map styles
├── MapView.stories.tsx
├── CommandCenterMap.tsx         # Combined command center
├── CommandCenterMap.css         # Command center styles
├── CommandCenterMap.stories.tsx
├── index.ts                     # Exports
└── README.md                    # This file
```

## Storybook

View all components in Storybook:

```bash
npm run storybook
```

Navigate to:
- Components → Geospatial → EventDetectionCard
- Components → Geospatial → MapView
- Components → Geospatial → CommandCenterMap

## Examples

Check the Storybook stories for complete examples including:
- Different event types (weapon, fire, intrusion)
- Multiple map locations (NYC, SF, London, Tokyo)
- Theme variations
- Interactive state management
- Custom configurations

## Notes

- **Mapbox Token Required:** MapView and CommandCenterMap require a valid Mapbox access token
- **3D Buildings:** Only visible at zoom levels 14+ in supported map styles
- **Performance:** For production, consider implementing marker clustering for many events
- **Accessibility:** Components include ARIA labels and keyboard navigation support
