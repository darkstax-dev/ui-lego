# DarkStax K8s Topology Visualization

A hierarchical Kubernetes topology visualization application inspired by Skydive UI, built with React, TypeScript, and Vite.

## Features

- **Hierarchical Lane Layout**: Organized topology view with lanes for different K8s resource categories:
  - Load (Deployments, Pods, Jobs, StatefulSets)
  - Service (Services, Ingress)
  - Network (Multus CNI)
  - Config and Storage (Secrets, ConfigMaps, PersistentVolumes, PVCs)

- **Resource Icon Menu**: Drag-and-drop panel with Kubernetes resource templates
- **Status Indicators**: Color-coded status visualization (Ready, Deploying, Active, Error, Terminated)
- **Interactive Canvas**: Click to select nodes and view metadata
- **Status Legend**: Tooltip showing status color meanings

## Project Structure

```
darkstax-k8s-scn/
├── src/
│   ├── components/
│   │   ├── layout/          # App layout components
│   │   │   ├── AppHeader.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   └── BottomPanel.tsx
│   │   ├── panels/          # Side panels
│   │   │   └── ResourceMenuPanel.tsx
│   │   ├── topology/        # Topology visualization
│   │   │   ├── TopologyCanvas.tsx
│   │   │   └── HierarchicalLane.tsx
│   │   └── ui/              # UI components
│   │       ├── KubernetesIconWrapper.tsx
│   │       └── StatusLegendTooltip.tsx
│   ├── data/                # Data and templates
│   │   └── k8sTemplates.ts
│   ├── store/               # State management
│   │   └── uiStore.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The application will open at `http://localhost:5174`

### Build for Production

```bash
npm run build
npm run preview
```

## Design Tokens

This project reuses design tokens from `darkstax-topology/tokens.css`, including:

- Color palette (Blue, Gray, Red, Green, Yellow scales)
- Typography (Macan fonts)
- Spacing system
- Layout tokens

## Status Color Legend

- **Gray (#EBEBEB)**: Not deployed / Ready
- **Yellow (#FAA536)**: Deploying
- **Green (#2B9952)**: Active / Deployed / Running
- **Red (#AA1A00)**: Error
- **Dark Blue (#0E2846)**: Terminated

## Component Libraries

- **darkstax-topology**: Core topology visualization components
- **ui-lego**: Kubernetes icons and UI components
- **zustand**: State management
- **lucide-react**: System icons
- **@dnd-kit**: Drag and drop (planned)

## Development Roadmap

### Phase 1: ✅ Completed
- [x] Project setup and configuration
- [x] Base layout components
- [x] Hierarchical lane components
- [x] Resource menu panel
- [x] Status legend tooltip
- [x] Bottom action panel

### Phase 2: 🚧 In Progress
- [ ] Drag and drop functionality for K8s resources
- [ ] Search and filter functionality
- [ ] D3TopologyViewer integration

### Phase 3: Planned
- [ ] Node metadata panel
- [ ] Live data integration
- [ ] WebSocket support for real-time updates
- [ ] Export/Screenshot capabilities

## Key Technologies

- **React 18.3** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.3** - Build tool
- **Tailwind CSS 4.1** - Styling
- **Zustand 5.0** - State management

## Contributing

Follow the existing code structure and design patterns. All components should:
- Use TypeScript with proper types
- Follow the established naming conventions
- Reuse design tokens from tokens.css
- Be responsive and accessible

## License

MIT
