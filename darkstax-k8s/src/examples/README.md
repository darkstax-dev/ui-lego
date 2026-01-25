# Kubernetes Topology Lane Examples

This directory contains examples and validation utilities for the lane-based Kubernetes topology visualization, designed to match the Figma design specifications.

## Overview

The lane-based topology layout organizes Kubernetes resources into horizontal lanes based on their category. Each lane has:

- **Vertical rotated label** on the left side (following Figma design)
- **Hexagonal node backgrounds** with backdrop blur effect
- **Status-based coloring** (green for active, yellow for deploying, red for error)
- **Hierarchy-based grouping** (namespaces contain resources, deployments contain pods)

## Files

### `kubernetes-topology-lane-example.ts`

Contains example topology data and validation utilities:

- `k8sLaneExampleTopology` - Sample Kubernetes resources (namespaces, pods, deployments)
- `getK8sLaneExampleGroups()` - Builds hierarchy groups from topology data
- `getK8sLaneCategories()` - Returns lane categories from hierarchy config
- `validateTopologyData()` - Validates topology data structure
- `getStatusColor()` - Maps status to Figma design colors
- `runExample()` - Runs validation and prints results to console

### `K8sLaneExampleViewer.tsx`

React component that renders the example topology in lane layout:

- Demonstrates the lane-based visualization
- Shows status legend and debug information
- Validates data on mount
- Can be used for testing and development

## Usage

### 1. Using the Example Viewer Component

```tsx
import { K8sLaneExampleViewer } from './examples/K8sLaneExampleViewer';

function App() {
  return <K8sLaneExampleViewer />;
}
```

### 2. Using the Example Data in Your Component

```tsx
import { 
  k8sLaneExampleTopology, 
  getK8sLaneExampleGroups,
  validateTopologyData 
} from './examples/kubernetes-topology-lane-example';

// Validate your data
const validation = validateTopologyData(k8sLaneExampleTopology);
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}

// Use the data
const nodes = k8sLaneExampleTopology;
const groups = getK8sLaneExampleGroups();
```

### 3. Creating Your Own Topology Data

```tsx
import { K8sNodeData } from '../types';
import { validateTopologyData } from './examples/kubernetes-topology-lane-example';

const myTopology: K8sNodeData[] = [
  {
    id: 'my-namespace',
    type: 'namespace',
    label: 'production',
    category: 'aggregate',
    metadata: {
      Type: 'namespace',
      Name: 'production'
    },
    status: 'active'
  },
  {
    id: 'my-pod',
    type: 'pod',
    label: 'web-pod-1',
    category: 'load',
    metadata: {
      Type: 'pod',
      Name: 'web-pod-1',
      Namespace: 'my-namespace',
      Owner: 'web-deployment',
      Status: 'Running'
    },
    status: 'active',
    indicatorCount: 2, // Number of containers
    connections: ['my-service']
  }
];

// Always validate your data
const result = validateTopologyData(myTopology);
console.log('Valid:', result.valid);
console.log('Errors:', result.errors);
console.log('Warnings:', result.warnings);
```

## Data Structure

### K8sNodeData

Each node in the topology must have:

```typescript
interface K8sNodeData {
  id: string;                    // Unique identifier
  type: K8sResourceType;         // 'namespace', 'pod', 'deployment', etc.
  label: string;                 // Display name
  category: K8sResourceCategory; // 'aggregate', 'load', 'service', etc.
  metadata: {
    Type: string;                // Resource type (must match 'type')
    Name: string;                // Resource name
    Namespace?: string;          // Parent namespace (for namespaced resources)
    Owner?: string;              // Owner resource ID (for grouped resources)
    [key: string]: any;          // Additional metadata
  };
  status?: 'ready' | 'deploying' | 'active' | 'error' | 'terminated';
  indicatorCount?: number;       // Badge count (e.g., container count)
  connections?: string[];        // Array of connected node IDs
}
```

### Categories and Lanes

Resources are organized into lanes based on their category:

| Category | Label | Resources |
|----------|-------|-----------|
| `aggregate` | Aggregate | Namespaces |
| `load` | Load | Deployments, Pods, StatefulSets, Jobs |
| `service` | Service | Services, Ingress |
| `network` | Network | Multus, NetworkPolicies |
| `config-storage` | Config and Storage | ConfigMaps, Secrets, PVCs, PVs |

## Hierarchy Configuration

The hierarchy is defined in `config/kubernetes-hierarchy.json`:

- **Hierarchy Levels** - Define containment relationships (namespace → deployment → pod)
- **Grouping Rules** - Automatic grouping based on ownership/namespace
- **Display Rules** - Control spacing, labels, and indicators
- **Lane Configuration** - Define which categories appear as lanes

## Status Colors (Figma Design)

| Status | Stroke Color | Fill Color | Use Case |
|--------|-------------|------------|----------|
| `active`, `ready` | `#108541` (Green) | `rgba(16, 133, 65, 0.2)` | Running, healthy |
| `deploying` | `#ED8B30` (Yellow/Orange) | `rgba(237, 139, 48, 0.2)` | Pending, starting |
| `error` | `#B6261F` (Red) | `rgba(182, 38, 31, 0.2)` | Failed, crashed |
| `default` | `#00112B` (Dark Blue) | `rgba(0, 17, 43, 0.2)` | Unknown, default |

## Validation

The `validateTopologyData()` function checks:

✅ **Required Fields:**
- `id`, `type`, `category`, `metadata`
- `metadata.Type` and `metadata.Name`

⚠️ **Warnings:**
- Missing `label` (recommended)
- Invalid status values
- Broken connections (referenced IDs not found)
- Negative indicator counts

## Example Topology

The example includes:

- 1 Namespace (`ns-workload-example`)
- 2 Deployments (`app-deployment`, `azrdf-deployment`)
- 5 Pods with different statuses:
  - `pod1` - standalone active pod
  - `app-pod-1`, `app-pod-2` - grouped under deployment (active, green)
  - `rdfpod` - deploying status (yellow/warning)
  - `az-pod` - error status (red)

This matches the Figma design example showing:
- `ns` (namespace)
- `pod1` (standalone)
- `pod1` with indicator "2" (deployment with 2 pods)
- `rdfpod` (yellow status)
- `az-pod` (red status)
- `azrdf-deployment` (deployment)

## Testing

### Run Validation in Console

```typescript
import { runExample } from './examples/kubernetes-topology-lane-example';

runExample();
```

This will output:
- Validation results (errors/warnings)
- Lane categories and node counts
- Hierarchy groups

### Validate Custom Data

```typescript
import { validateTopologyData } from './examples/kubernetes-topology-lane-example';

const result = validateTopologyData(myCustomTopology);

if (!result.valid) {
  console.error('Topology data has errors:', result.errors);
} else if (result.warnings.length > 0) {
  console.warn('Topology data has warnings:', result.warnings);
} else {
  console.log('✅ Topology data is valid!');
}
```

## Integration with TopologyCanvas

The `TopologyCanvas` component automatically uses the lane layout when `layoutMode` is set to `'hierarchy'`:

```tsx
import { TopologyCanvas } from './components/topology/TopologyCanvas';
import { useUIStore } from './store/uiStore';

function MyComponent() {
  const { layoutMode } = useUIStore();
  
  return <TopologyCanvas />; // Will use lanes if layoutMode === 'hierarchy'
}
```

## References

- Hierarchy Config: `darkstax-k8s/src/config/kubernetes-hierarchy.json`
- Hierarchy Types: `darkstax-k8s/src/types/hierarchy.ts`
- Lane Component: `darkstax-k8s/src/components/topology/HierarchicalLane.tsx`
- Config Utils: `darkstax-k8s/src/hierarchyConfig.ts`

## Figma Design Match

The implementation matches the Figma design:

- ✅ Vertical rotated lane labels (45px wide, -90deg rotation)
- ✅ Lane background: `#DFDFDF`
- ✅ Label background: `#CECECE`
- ✅ Hexagonal node backgrounds with `backdrop-filter: blur(4px)`
- ✅ Status-based stroke colors
- ✅ Font: Macan for labels, Macan Mono Trial for text
- ✅ Horizontal node arrangement with proper spacing
- ✅ Indicator badges for container/replica counts
