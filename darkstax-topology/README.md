# Darkstax Topology

A React component library for visualizing network topology using **pure D3.js** with physics-based force simulation, extracted from Skydive.

## Features

- 🎨 Pure D3.js/SVG rendering (no React Flow dependency)
- 📊 Advanced force-directed physics simulation
- 🔄 Real-time WebSocket updates
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 🌓 Dark mode support
- 🖱️ Interactive drag, zoom, and pan
- 📱 Responsive and accessible

## Installation

```bash
npm install darkstax-topology
```

## Quick Start

```tsx
import { TopologyViewer } from 'darkstax-topology';
import 'darkstax-topology/dist/style.css';

function App() {
  return (
    <TopologyViewer 
      websocketUrl="ws://localhost:8082/ws/agent/topology"
      layoutAlgorithm="force"
      autoLayout={true}
      theme="light"
    />
  );
}
```

## API

### TopologyViewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `websocketUrl` | `string` | - | WebSocket URL for live topology updates |
| `layoutAlgorithm` | `'force' \| 'hierarchical' \| 'manual'` | `'force'` | Layout algorithm to use |
| `autoLayout` | `boolean` | `true` | Enable automatic layout |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme |
| `className` | `string` | - | Additional CSS classes |

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

Apache 2.0
