# TopologyCanvas Component

A modern, responsive Kubernetes topology visualization component based on the Figma design specification.

## Features

- **Drag & Drop**: Drag Kubernetes resource icons from the right sidebar onto the canvas to create new nodes
- **Interactive Canvas**: 
  - Click to select nodes
  - Double-click to expand/edit nodes
  - Drag nodes to reposition them
  - Dotted grid background pattern matching the Figma design
- **Kubernetes Icons**: Reuses existing Kubernetes icons from the storybook components library
- **Status Visualization**: 
  - Color-coded hexagonal nodes based on status (ready, deploying, running, error, terminated)
  - Status legend tooltip
- **Responsive Layout**:
  - Top navigation bar with DARKSTAX branding
  - Left sidebar with Load, Service, Network, and Config sections
  - Right sidebar with searchable Kubernetes resource palette
  - Bottom toolbar with action buttons
- **Theme Support**: Uses design tokens from `tokens.css` and custom Macan fonts from the public folder

## Components Structure

```
src/
├── TopologyCanvas.tsx          # Main component
├── TopologyCanvas.css          # Main styles
└── components/topology/
    ├── TopBar.tsx              # Header with navigation
    ├── LeftSidebar.tsx         # Section labels sidebar
    ├── RightSidebar.tsx        # Kubernetes icons palette (draggable)
    ├── Canvas.tsx              # Main canvas with grid pattern
    ├── BottomToolbar.tsx       # Actions and info button
    ├── StatusLegend.tsx        # Status legend tooltip
    ├── KubernetesNode.tsx      # Hexagonal node component
    └── index.ts                # Barrel exports
```

## Usage

### Basic Example

```tsx
import { TopologyCanvas } from '@skydive-project/skydive-ui'

function MyApp() {
  const handleNodeClick = (node) => {
    console.log('Node clicked:', node)
  }

  return (
    <TopologyCanvas
      onNodeClick={handleNodeClick}
      onNodeDoubleClick={(node) => console.log('Double-clicked:', node)}
      onCanvasClick={() => console.log('Canvas clicked')}
    />
  )
}
```

### Props

#### TopologyCanvasProps

| Prop | Type | Description |
|------|------|-------------|
| `onNodeClick` | `(node: K8sNode) => void` | Callback when a node is clicked |
| `onNodeDoubleClick` | `(node: K8sNode) => void` | Callback when a node is double-clicked |
| `onCanvasClick` | `() => void` | Callback when the canvas background is clicked |

#### K8sNode Interface

```typescript
interface K8sNode {
  id: string
  type: string        // 'pod', 'service', 'deployment', etc.
  name: string
  status: 'ready' | 'deploying' | 'running' | 'error' | 'terminated'
  position: { x: number; y: number }
  tags?: string[]
  badge?: number      // Optional badge count
}
```

## Drag & Drop

The component supports drag and drop from the icon palette:

1. **From Palette to Canvas**: Drag any Kubernetes icon from the right sidebar onto the canvas to create a new node
2. **Node Repositioning**: Click and drag existing nodes to reposition them on the canvas

### How it Works

- Icons in the right sidebar have `draggable` attribute
- On `dragStart`, the icon type is stored in `dataTransfer`
- Canvas listens for `drop` events
- New nodes are created at the drop position with a unique ID

## Styling

The component uses CSS custom properties (design tokens) from `tokens.css`:

- Colors: `--color-*` (blue-dark-950, gray-200, etc.)
- Spacing: `--sds-size-space-*` (200, 400, etc.)
- Typography: `--font-family-*`, `--font-size-*`, `--font-weight-*`
- Status colors are defined in `statusColors` map in KubernetesNode component

## Keyboard & Mouse Interactions

- **Left Click**: Select a node
- **Double Click**: Expand/edit a node (triggers callback)
- **Click & Drag**: Reposition a node on the canvas
- **Canvas Click**: Deselect all nodes

## Status Colors

| Status | Hexagon Fill | Stroke |
|--------|-------------|--------|
| Ready | #EBEBEB | rgba(0,0,0,0.1) |
| Deploying | #FAA536 | #ED8B30 |
| Running | #2B9952 | #108541 |
| Error | #AA1A00 | #B6261F |
| Terminated | #0E2846 | #072B56 |

## Accessibility

- Semantic HTML structure
- Keyboard-accessible buttons
- ARIA labels on interactive elements
- High contrast color scheme

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Grid and Flexbox support
- Uses SVG for icons and shapes

## Development

To run the demo:

```bash
cd skydive-ui
npm run demo
```

The demo showcases:
- Full topology canvas layout
- Drag and drop functionality
- Node selection and interaction
- Status legend tooltip

## Integration with Existing Topology

The new `TopologyCanvas` component coexists with the original `Topology` component:

- `Topology`: Original D3-based tree visualization
- `TopologyCanvas`: New Figma-based Kubernetes topology visualization

Both are exported from the main package and can be used independently.

## Future Enhancements

Potential improvements (not yet implemented):
- Connection lines between nodes
- Zoom and pan controls
- Node grouping and layers
- Real-time status updates
- Undo/redo functionality
- Export to image/JSON
