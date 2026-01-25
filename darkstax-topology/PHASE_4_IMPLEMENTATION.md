# Phase 4 Implementation: Advanced D3 Physics Simulation & Layout Engine

## Objective
Implement advanced D3.js-based physics simulation and layout algorithms matching the Skydive UI repository, **WITHOUT using React Flow**. This phase focuses on creating a pure D3.js/SVG-based topology visualization with sophisticated force-directed layouts, hierarchical grouping, and real-time physics simulation.

## Important Notes
- ❌ **DO NOT use React Flow** - We are using pure D3.js for rendering
- ✅ Use D3.js force simulation for physics-based layouts
- ✅ Implement custom SVG rendering for nodes and edges
- ✅ Match Skydive UI's layout behavior and physics parameters

## Current State Analysis

### Already Implemented (Phases 1-3)
✅ Project structure and TypeScript configuration  
✅ Core type definitions (`TopologyNode`, `TopologyEdge`, `NodeGroup`)  
✅ Zustand state management store  
✅ Basic D3 canvas rendering (`D3TopologyCanvas.tsx`)  
✅ Basic force layout engine (`forceLayout.ts`)  
✅ Hierarchical layout engine (`hierarchicalLayout.ts`)  
✅ WebSocket integration hook (`useWebSocket.ts`)  
✅ Auto-layout hook (`useD3AutoLayout.ts`)  
✅ Node and edge components (BaseNode, HostNode, etc.)  

### What Needs Enhancement (Phase 4)

## Tasks

### 1. Remove React Flow Dependencies

**Action:**
```bash
cd darkstax-topology
npm uninstall reactflow @reactflow/core @reactflow/background @reactflow/controls @reactflow/minimap @reactflow/node-resizer @reactflow/node-toolbar
```

**Files to Update:**
- `src/types/graph.ts` - Remove React Flow imports and types
- `package.json` - Remove reactflow from dependencies

**File: `src/types/graph.ts`**

Replace React Flow types with pure D3 types:

```typescript
export type NodeType = 
  | 'host' 
  | 'netns' 
  | 'ovsbridge' 
  | 'veth' 
  | 'device' 
  | 'internal' 
  | 'container' 
  | 'pod'
  | 'service' 
  | 'networkpolicy'
  | 'deployment'
  | 'namespace';

export interface NodeMetadata {
  Type: NodeType;
  Name: string;
  TID: string;
  Speed?: number;
  Driver?: string;
  State?: string;
  MAC?: string;
  IPV4?: string;
  IPV6?: string;
  IfIndex?: number;
  Manager?: string;
  Neutron?: any;
  OfPort?: number;
  UUID?: string;
  Captures?: any[];
  LastUpdateMetric?: MetricData;
  [key: string]: any;
}

export interface MetricData {
  Start: number;
  Last: number;
  RxBytes: number;
  TxBytes: number;
  RxPackets: number;
  TxPackets: number;
  RTT?: number;
}

// Pure D3 Node (no React Flow dependency)
export interface TopologyNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    metadata: NodeMetadata;
    label: string;
    groupId?: string;
    collapsed?: boolean;
    bandwidth?: number;
    selected?: boolean;
  };
  hidden?: boolean;
  // D3 force simulation properties
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

// Pure D3 Edge (no React Flow dependency)
export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  type: 'network' | 'ownership' | 'policy';
  data: {
    metadata: {
      RelationType: 'ownership' | 'layer2' | 'layer3';
      [key: string]: any;
    };
    bandwidth?: number;
    bandwidthBaseline?: number;
    latency?: number;
    label?: string;
  };
  animated?: boolean;
  style?: React.CSSProperties;
}

export interface NodeGroup {
  id: string;
  ownerId: string;
  memberIds: string[];
  collapsed: boolean;
  level: number;
  depth: number;
  parentGroupId?: string;
}
```

---

### 2. Enhanced Force Layout Engine (Skydive-Style Physics)

**File: `src/lib/d3/forceLayout.ts`**

Update with Skydive UI's physics parameters:

```typescript
import * as d3 from 'd3-force';
import { TopologyNode, TopologyEdge } from '@/types/graph';

export interface ForceLayoutOptions {
  width: number;
  height: number;
  // Skydive-specific parameters
  chargeStrength?: number;        // Repulsion between nodes
  linkDistance?: number;          // Default link distance
  linkStrength?: number;          // Link force strength
  collideRadius?: number;         // Collision detection radius
  centerStrength?: number;        // Centering force strength
  alphaDecay?: number;           // Simulation cooling rate
  alphaMin?: number;             // Minimum alpha before stopping
  velocityDecay?: number;        // Velocity damping (friction)
  
  // Grouping parameters
  groupPadding?: number;         // Padding around groups
  groupStrength?: number;        // Force keeping groups together
}

export interface D3SimulationNode extends TopologyNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;
}

export interface D3SimulationLink {
  source: string | D3SimulationNode;
  target: string | D3SimulationNode;
  distance?: number;
  strength?: number;
}

export class ForceLayoutEngine {
  private simulation: d3.Simulation<D3SimulationNode, D3SimulationLink> | null = null;
  private options: Required<ForceLayoutOptions>;

  constructor(options: ForceLayoutOptions) {
    // Skydive UI default parameters (tuned for network topology)
    this.options = {
      chargeStrength: -800,          // Strong repulsion
      linkDistance: 120,             // Moderate spacing
      linkStrength: 0.7,             // Strong links
      collideRadius: 60,             // Prevent overlap
      centerStrength: 0.1,           // Weak centering
      alphaDecay: 0.0228,           // Skydive default
      alphaMin: 0.001,              // Skydive default
      velocityDecay: 0.4,           // Moderate friction
      groupPadding: 20,
      groupStrength: 0.5,
      ...options
    };
  }

  createSimulation(
    nodes: TopologyNode[], 
    edges: TopologyEdge[],
    groups?: Map<string, TopologyNode[]>
  ): d3.Simulation<D3SimulationNode, D3SimulationLink> {
    const { 
      width, 
      height, 
      chargeStrength, 
      linkDistance, 
      linkStrength,
      collideRadius, 
      centerStrength, 
      alphaDecay,
      alphaMin,
      velocityDecay
    } = this.options;

    // Create D3 nodes with initial positions
    const d3Nodes: D3SimulationNode[] = nodes.map(node => ({
      ...node,
      x: node.position.x || width / 2 + (Math.random() - 0.5) * 100,
      y: node.position.y || height / 2 + (Math.random() - 0.5) * 100,
    }));

    // Create D3 links with calculated distances
    const d3Links: D3SimulationLink[] = edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      distance: this.calculateLinkDistance(edge),
      strength: this.calculateLinkStrength(edge)
    }));

    // Initialize simulation
    this.simulation = d3.forceSimulation(d3Nodes)
      .velocityDecay(velocityDecay)
      .alphaDecay(alphaDecay)
      .alphaMin(alphaMin);

    // Add forces
    this.simulation
      // Charge force (node repulsion)
      .force('charge', d3.forceManyBody()
        .strength(chargeStrength)
        .distanceMax(500)
      )
      // Link force (edge attraction)
      .force('link', d3.forceLink<D3SimulationNode, D3SimulationLink>(d3Links)
        .id(d => d.id)
        .distance(d => d.distance || linkDistance)
        .strength(d => d.strength || linkStrength)
      )
      // Collision force (prevent overlap)
      .force('collide', d3.forceCollide<D3SimulationNode>()
        .radius(collideRadius)
        .strength(0.7)
      )
      // Centering forces
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(centerStrength))
      .force('y', d3.forceY(height / 2).strength(centerStrength));

    // Add group clustering if groups exist
    if (groups && groups.size > 0) {
      this.addGroupForces(groups);
    }

    return this.simulation;
  }

  private calculateLinkDistance(edge: TopologyEdge): number {
    const baseDistance = 120;
    
    // Ownership edges should be shorter (parent-child relationship)
    if (edge.type === 'ownership') {
      return baseDistance * 0.6; // 72px
    }
    
    // Policy edges can be longer
    if (edge.type === 'policy') {
      return baseDistance * 1.5; // 180px
    }
    
    // Network edges - adjust based on bandwidth if available
    let distance = baseDistance;
    if (edge.data.bandwidth) {
      // Higher bandwidth = shorter distance (more important connection)
      distance *= (1 - edge.data.bandwidth * 0.3);
    }
    
    return distance;
  }

  private calculateLinkStrength(edge: TopologyEdge): number {
    // Ownership edges should be stronger (keep hierarchy tight)
    if (edge.type === 'ownership') {
      return 1.0;
    }
    
    // Policy edges can be weaker
    if (edge.type === 'policy') {
      return 0.3;
    }
    
    // Network edges - default strength
    return 0.7;
  }

  private addGroupForces(groups: Map<string, TopologyNode[]>) {
    const { groupStrength } = this.options;
    
    // Create a force that pulls group members together
    this.simulation?.force('group', (alpha) => {
      groups.forEach((members, groupId) => {
        if (members.length < 2) return;
        
        // Calculate group centroid
        let cx = 0, cy = 0;
        members.forEach(node => {
          cx += node.x || 0;
          cy += node.y || 0;
        });
        cx /= members.length;
        cy /= members.length;
        
        // Pull members toward centroid
        members.forEach(node => {
          if (node.x !== undefined && node.y !== undefined) {
            const dx = cx - node.x;
            const dy = cy - node.y;
            node.vx = (node.vx || 0) + dx * groupStrength * alpha;
            node.vy = (node.vy || 0) + dy * groupStrength * alpha;
          }
        });
      });
    });
  }

  restart() {
    if (this.simulation) {
      this.simulation.alpha(1).restart();
    }
  }

  stop() {
    if (this.simulation) {
      this.simulation.stop();
    }
  }

  getSimulation() {
    return this.simulation;
  }

  // Update simulation parameters dynamically
  updateParameters(params: Partial<ForceLayoutOptions>) {
    Object.assign(this.options, params);
    
    if (!this.simulation) return;
    
    // Update forces
    if (params.chargeStrength !== undefined) {
      this.simulation.force('charge', d3.forceManyBody()
        .strength(params.chargeStrength)
        .distanceMax(500)
      );
    }
    
    if (params.collideRadius !== undefined) {
      this.simulation.force('collide', d3.forceCollide<D3SimulationNode>()
        .radius(params.collideRadius)
        .strength(0.7)
      );
    }
    
    this.restart();
  }
}
```

---

### 3. Enhanced D3 Canvas with Real-time Physics

**File: `src/components/D3Canvas/D3TopologyCanvas.tsx`**

Implement continuous physics simulation:

```typescript
import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { useTopologyStore } from '@/store/topologyStore';
import { TopologyNode, TopologyEdge } from '@/types/graph';
import { ForceLayoutEngine, D3SimulationNode } from '@/lib/d3/forceLayout';

export function D3TopologyCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<ForceLayoutEngine | null>(null);
  const transformRef = useRef(d3.zoomIdentity);
  
  const { 
    nodes, 
    edges, 
    selectNode, 
    selectEdge, 
    selectedNodeId, 
    selectedEdgeId,
    layoutAlgorithm,
    autoLayout,
    setNodes
  } = useTopologyStore();

  // Initialize simulation
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;
    
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create container group for zoom/pan
    const g = svg.append('g').attr('class', 'topology-container');

    // Setup zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        transformRef.current = event.transform;
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create groups for edges and nodes (order matters for z-index)
    const edgeGroup = g.append('g').attr('class', 'edges');
    const nodeGroup = g.append('g').attr('class', 'nodes');

    // Initialize force simulation if auto-layout is enabled
    if (autoLayout && layoutAlgorithm === 'force') {
      simulationRef.current = new ForceLayoutEngine({
        width,
        height,
        chargeStrength: -800,
        linkDistance: 120,
        collideRadius: 60,
      });

      const simulation = simulationRef.current.createSimulation(nodes, edges);

      // Update visualization on each tick
      simulation.on('tick', () => {
        updateEdges(edgeGroup, edges, simulation.nodes());
        updateNodes(nodeGroup, simulation.nodes(), selectedNodeId, selectNode);
      });

      // Update store with final positions when simulation stabilizes
      simulation.on('end', () => {
        const updatedNodes = nodes.map(node => {
          const simNode = simulation.nodes().find(n => n.id === node.id);
          if (simNode && simNode.x !== undefined && simNode.y !== undefined) {
            return {
              ...node,
              position: { x: simNode.x, y: simNode.y }
            };
          }
          return node;
        });
        setNodes(updatedNodes);
      });
    } else {
      // Static rendering without physics
      renderEdges(edgeGroup, edges, nodes, selectedEdgeId, selectEdge);
      renderNodes(nodeGroup, nodes, selectedNodeId, selectNode);
    }

    // Click on canvas to deselect
    svg.on('click', (event) => {
      if (event.target === svgRef.current) {
        selectNode(null);
        selectEdge(null);
      }
    });

    // Cleanup
    return () => {
      simulationRef.current?.stop();
    };
  }, [nodes, edges, layoutAlgorithm, autoLayout]);

  // Update selection highlighting
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    
    // Update node selection
    svg.selectAll('g.node rect.node-background')
      .attr('stroke', (d: any) => d.id === selectedNodeId ? '#3b82f6' : '#e2e8f0')
      .attr('stroke-width', (d: any) => d.id === selectedNodeId ? 3 : 2)
      .attr('filter', (d: any) => 
        d.id === selectedNodeId ? 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))' : 'none'
      );
    
    // Update edge selection
    svg.selectAll('line.edge')
      .attr('stroke', (d: any) => {
        if (d.id === selectedEdgeId) return '#3b82f6';
        if (d.type === 'ownership') return '#94a3b8';
        return '#cbd5e1';
      })
      .attr('stroke-width', (d: any) => d.id === selectedEdgeId ? 3 : 2);
      
  }, [selectedNodeId, selectedEdgeId]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full bg-gray-50 dark:bg-gray-900"
      style={{ cursor: 'grab' }}
    />
  );
}

// Helper functions for rendering
function updateEdges(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  edges: TopologyEdge[],
  nodes: D3SimulationNode[]
) {
  const edgeSelection = group
    .selectAll<SVGLineElement, TopologyEdge>('line.edge')
    .data(edges, (d) => d.id);

  edgeSelection.exit().remove();

  const edgeEnter = edgeSelection
    .enter()
    .append('line')
    .attr('class', 'edge')
    .attr('stroke', (d) => d.type === 'ownership' ? '#94a3b8' : '#cbd5e1')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', (d) => d.type === 'ownership' ? '5,5' : 'none');

  edgeSelection.merge(edgeEnter)
    .attr('x1', (d) => {
      const source = nodes.find(n => n.id === d.source);
      return source?.x || 0;
    })
    .attr('y1', (d) => {
      const source = nodes.find(n => n.id === d.source);
      return source?.y || 0;
    })
    .attr('x2', (d) => {
      const target = nodes.find(n => n.id === d.target);
      return target?.x || 0;
    })
    .attr('y2', (d) => {
      const target = nodes.find(n => n.id === d.target);
      return target?.y || 0;
    });
}

function updateNodes(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: D3SimulationNode[],
  selectedNodeId: string | null,
  selectNode: (id: string | null) => void
) {
  const nodeSelection = group
    .selectAll<SVGGElement, D3SimulationNode>('g.node')
    .data(nodes, (d) => d.id);

  nodeSelection.exit().remove();

  const nodeEnter = nodeSelection
    .enter()
    .append('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .on('click', function(event, d) {
      event.stopPropagation();
      selectNode(d.id);
    })
    .call(d3.drag<SVGGElement, D3SimulationNode>()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
    );

  // Add node visuals
  nodeEnter.append('rect')
    .attr('class', 'node-background')
    .attr('width', 140)
    .attr('height', 60)
    .attr('x', -70)
    .attr('y', -30)
    .attr('rx', 8)
    .attr('fill', 'white')
    .attr('stroke', '#e2e8f0')
    .attr('stroke-width', 2);

  nodeEnter.append('text')
    .attr('class', 'node-label')
    .attr('x', 0)
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('font-weight', '600')
    .attr('fill', '#1e293b');

  const nodeMerge = nodeSelection.merge(nodeEnter);

  nodeMerge
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  nodeMerge.select('text.node-label')
    .text((d) => {
      const label = d.data.label || d.id;
      return label.length > 15 ? label.substring(0, 15) + '...' : label;
    });
}

// Drag handlers
function dragStarted(event: any, d: D3SimulationNode) {
  if (!event.active && simulationRef.current) {
    simulationRef.current.restart();
  }
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event: any, d: D3SimulationNode) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event: any, d: D3SimulationNode) {
  if (!event.active && simulationRef.current) {
    simulationRef.current.getSimulation()?.alphaTarget(0);
  }
  d.fx = null;
  d.fy = null;
}

// Static rendering functions (same as before)
function renderEdges(...) { /* ... */ }
function renderNodes(...) { /* ... */ }
```

---

### 4. Update Index Exports

**File: `src/index.ts`**

Remove React Flow references:

```typescript
// Main D3-based viewer (not React Flow)
export { D3TopologyViewer as TopologyViewer } from './components/D3Canvas/D3TopologyViewer';
export { D3TopologyCanvas } from './components/D3Canvas/D3TopologyCanvas';

export { useTopologyStore } from './store/topologyStore';

// Remove React Flow node/edge exports - we're using D3 SVG rendering
// export { BaseNode, HostNode, ... } from './components/nodes';
// export { NetworkEdge, ... } from './components/edges';

export type {
  TopologyNode,
  TopologyEdge,
  NodeGroup,
  NodeMetadata,
  MetricData,
  NodeType
} from './types/graph';

export type {
  TopologyConfig,
  TopologyMode,
  LayoutAlgorithm,
  BandwidthConfig
} from './types/topology';

export { formatBandwidth, getBandwidthColor } from './utils/bandwidth';
export { cn } from './utils/cn';

import './styles/index.css';
```

---

### 5. Update README

**File: `README.md`**

```markdown
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
```

---

## Validation Steps

After completing all tasks, verify:

1. ✅ React Flow completely removed: `npm ls reactflow` should show nothing
2. ✅ TypeScript compiles: `npm run type-check`
3. ✅ Physics simulation runs smoothly with 50+ nodes
4. ✅ Drag-and-drop works on individual nodes
5. ✅ Zoom and pan work correctly
6. ✅ Node selection and highlighting work
7. ✅ Edge rendering updates in real-time during simulation
8. ✅ Simulation stabilizes after ~300 ticks
9. ✅ Group clustering keeps related nodes together

## Expected Outcome

You should have:
- Pure D3.js-based topology visualization
- Smooth physics simulation matching Skydive UI behavior
- No React Flow dependencies
- Real-time force-directed layout
- Interactive drag, zoom, and pan
- Proper node/edge rendering with SVG
- Optimized performance for large graphs (100+ nodes)

## Performance Targets

- Initial layout: < 2 seconds for 100 nodes
- 60 FPS during simulation
- Smooth interactions (drag, zoom, pan)
- Memory efficient (< 100MB for 500 nodes)
