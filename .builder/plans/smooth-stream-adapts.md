# Skydive UI to New Design Transformation - Feasibility Analysis & Development Plan

## Executive Summary

This plan analyzes the feasibility of transforming the current Skydive UI (Angular 1.x + D3.js) to match the new Figma design requirements for the darkstax-k8s project, evaluating three technical approaches: **ReactFlow**, **D3.js**, and **Hybrid D3 + ReactFlow**.

**Target Project:** `darkstax-k8s`
**Existing Reference:** `darkstax-k8s-scn` (React + TypeScript + D3.js with d3-flextree)
**Original:** Skydive UI (https://github.com/skydive-project/skydive-ui)
**Design:** Figma design with hierarchical lanes, Kubernetes topology visualization

---

## 📋 Quick Reference - Key Decisions

### ✅ Final Recommendations
1. **Technology:** Pure D3.js with React wrappers (Option B)
2. **Scope:** MVP - Match Figma design quickly
3. **Data Source:** Static/demo JSON (no live WebSocket)
4. **Features:** K8s topology visualization only (no Gremlin, no flow analysis)
5. **Codebase:** Fresh build in `darkstax-k8s`, reusing components from `darkstax-k8s-scn`

### 📅 MVP Timeline: 12-14 days (Core) | 16-18 days (with optional features)

### 🎯 Core MVP Phases
- **Phase 1:** Foundation Setup (2-3 days)
- **Phase 2:** Skydive Static Data Integration (2 days)
- **Phase 3:** D3.js Topology Visualization (4-5 days)
- **Phase 4:** Node Selection & Metadata Panel (2-3 days)
- **Phase 10:** Testing & Polish (2-3 days)

### 🔧 Optional MVP Extensions
- Phase 5: Basic Search/Filter (2 days)
- Phase 6: Multiple Layout Options (2 days)

### ❌ Features NOT in MVP
- Drag-and-drop resources (Phase 7)
- Live WebSocket data (Phase 8)
- Gremlin queries, time travel, flow analysis (Phase 9)

---

## 1. Feasibility Analysis

### 1.1 Technology Options Comparison

#### Option A: Pure ReactFlow
**Description:** Use ReactFlow library for node-based graph visualization

**Pros:**
- ✅ React-native, integrates seamlessly with React ecosystem
- ✅ Built-in drag-and-drop, pan, zoom
- ✅ Easy node/edge customization
- ✅ Good for simple DAG (Directed Acyclic Graph) layouts
- ✅ Active community and documentation
- ✅ Handles large graphs efficiently

**Cons:**
- ❌ **Limited hierarchical layout control** - ReactFlow doesn't natively support fixed lanes/grouping
- ❌ **Complex to implement hierarchical lanes** (Load, Service, Network, Config) shown in Figma
- ❌ **Custom layout algorithms difficult** - Would need to manually position nodes
- ❌ **Not designed for Skydive's graph model** - Skydive uses complex multi-relationship graphs
- ❌ **Animation and transitions less flexible** than D3
- ❌ **Cannot easily replicate D3-flextree layouts** currently in darkstax-k8s-scn

**Verdict:** ⚠️ **NOT RECOMMENDED** - The Figma design requires precise hierarchical lane layouts that ReactFlow cannot easily achieve without significant custom code.

---

#### Option B: Pure D3.js (Recommended ✅)
**Description:** Continue using D3.js with d3-flextree (as in darkstax-k8s-scn)

**Pros:**
- ✅ **Already proven in darkstax-k8s-scn** - Working implementation exists
- ✅ **Excellent hierarchical layout support** - d3-flextree, d3-hierarchy, d3-tree
- ✅ **Full control over positioning** - Can implement exact lane-based layouts
- ✅ **Flexible rendering** - SVG or Canvas, fully customizable
- ✅ **Powerful data binding** - Efficient updates and transitions
- ✅ **Animation capabilities** - Smooth expand/collapse, transitions
- ✅ **Low-level control** - Can implement any custom layout algorithm
- ✅ **Compatible with Skydive's graph model** - Handles nodes, edges, metadata
- ✅ **Mature ecosystem** - Well-documented, stable

**Cons:**
- ⚠️ **Steeper learning curve** than ReactFlow
- ⚠️ **More boilerplate code** for interactions
- ⚠️ **Requires manual DOM manipulation** (React wrappers help)

**Implementation in darkstax-k8s-scn:**
```typescript
// src/lib/layouts/flextreeLayout.ts
import { flextree } from 'd3-flextree';

export function applyFlextreeLayout(nodes, edges, options) {
  const layout = flextree({
    nodeSize: (node) => [nodeWidth + spacing, nodeHeight + spacing],
    spacing: spacing
  });
  
  // Returns positioned nodes with hierarchical layout
  return layout(hierarchy);
}
```

**Verdict:** ✅ **RECOMMENDED** - D3.js is the best fit for the hierarchical lane-based design shown in Figma.

---

#### Option C: Hybrid D3 + ReactFlow
**Description:** Use D3 for layout calculations, ReactFlow for rendering

**Pros:**
- ✅ Combines D3's layout power with ReactFlow's React integration
- ✅ Can leverage ReactFlow's built-in features (drag-and-drop, controls)
- ✅ D3 handles complex layout algorithms
- ✅ ReactFlow handles interaction layer

**Cons:**
- ❌ **Unnecessary complexity** - Adds overhead of maintaining two libraries
- ❌ **Potential conflicts** - D3 and ReactFlow may have different coordinate systems
- ❌ **Harder to debug** - Two abstraction layers
- ❌ **Performance overhead** - Data transformation between D3 and ReactFlow
- ❌ **No clear benefit over pure D3** - darkstax-k8s-scn already wraps D3 in React components

**Verdict:** ❌ **NOT RECOMMENDED** - Adds complexity without significant benefits.

---

### 1.2 Final Recommendation

**🏆 Use Pure D3.js with React Wrappers (Option B)**

**Rationale:**
1. **Already working in darkstax-k8s-scn** - Proven architecture exists
2. **Matches Figma design requirements** - Hierarchical lanes, custom positioning
3. **Handles Skydive's graph model** - Complex nodes, edges, metadata
4. **Flexible for future extensions** - Easy to add new layouts, visualizations
5. **React integration exists** - `TopologyCanvas.tsx` wraps D3 in React
6. **d3-flextree perfect for hierarchies** - Better than ReactFlow for tree structures

**Architecture Pattern:**
```typescript
// React Component (UI layer)
export function TopologyCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    // D3 renders into SVG ref
    const svg = d3.select(svgRef.current);
    renderTopology(svg, nodes, edges);
  }, [nodes, edges]);
  
  return <svg ref={svgRef} />;
}
```

This is the **same pattern used in darkstax-k8s-scn**, which has successfully implemented:
- Hierarchical lanes (Load, Service, Network, Config/Storage)
- Kubernetes icon nodes
- Connection lines
- Status indicators
- Drag-and-drop (via React DnD, not D3)

---

## 2. Architecture Overview

### 2.1 Current darkstax-k8s-scn Stack
```
React 18.3.1
TypeScript 5.9.3
D3.js (via d3-flextree 2.1.2)
Zustand 5.0.10 (state management)
Tailwind CSS 4.1.18
darkstax-topology (local package - Kubernetes icons)
ui-lego (local package - UI components)
Vite 7.3.1
```

### 2.2 Proposed darkstax-k8s Stack
**Reuse darkstax-k8s-scn architecture with Skydive enhancements:**

```
Base: darkstax-k8s-scn codebase
+ Skydive graph JSON parsing
+ WebSocket connection for live data
+ Gremlin query integration
+ Time-based navigation (optional)
+ Flow visualization (if network analysis needed)
```

### 2.3 Component Structure
```
darkstax-k8s/
├── src/
│   ├── components/
│   │   ├── topology/
│   │   │   ├── TopologyCanvas.tsx        // D3 SVG rendering
│   │   │   ├── HierarchicalLane.tsx      // Lane containers
│   │   │   ├── HierarchicalNodeGroup.tsx // Node groups
│   │   │   └── ConnectionLines.tsx       // Edge rendering
│   │   ├── panels/
│   │   │   ├── MetadataPanel.tsx         // Node details
│   │   │   ├── ResourceMenuPanel.tsx     // K8s templates
│   │   │   └── QueryPanel.tsx            // NEW: Gremlin queries
│   │   ├── controls/
│   │   │   ├── SearchFilter.tsx          // Search/filter
│   │   │   └── LayoutSelector.tsx        // Layout options
│   │   └── ui/
│   │       ├── KubernetesIconWrapper.tsx // K8s icons
│   │       └── StatusLegendTooltip.tsx   // Status legend
│   ├── lib/
│   │   ├── layouts/
│   │   │   ├── flextreeLayout.ts         // D3 flextree
│   │   │   ├── forceLayout.ts            // NEW: Force-directed
│   │   │   └── customHierarchical.ts     // Lane-based layout
│   │   ├── skydive/
│   │   │   ├── graphParser.ts            // NEW: Parse Skydive JSON
│   │   │   ├── gremlinQuery.ts           // NEW: Query execution
│   │   │   └── websocketClient.ts        // NEW: Live updates
│   │   └── d3/
│   │       ├── renderNodes.ts            // D3 node rendering
│   │       ├── renderEdges.ts            // D3 edge rendering
│   │       └── interactions.ts           // Zoom, pan, drag
│   ├── store/
│   │   ├── topologyStore.ts              // Topology state
│   │   ├── uiStore.ts                    // UI state
│   │   └── queryStore.ts                 // NEW: Query state
│   ├── types/
│   │   ├── index.ts                      // Base types
│   │   └── skydive.ts                    // NEW: Skydive types
│   └── data/
│       ├── k8sTopologyScenario.ts        // Mock K8s data
│       └── skydiveTopology.ts            // NEW: Skydive data
```

---

## 3. Development Phases

### Phase 1: Foundation Setup (2-3 days)
**Goal:** Set up project structure based on darkstax-k8s-scn

**Tasks:**
1.1. Clone/adapt darkstax-k8s-scn to darkstax-k8s
1.2. Install dependencies
1.3. Configure Tailwind with design tokens
1.4. Set up TypeScript types
1.5. Configure Vite
1.6. Set up local packages (darkstax-topology, ui-lego)
1.7. Verify dev environment

**Deliverables:**
- ✅ Running dev server
- ✅ Basic app shell
- ✅ Design tokens applied

**Prompt File:** `phase-1-foundation-setup.md`

---

### Phase 2: Skydive Data Integration (3-4 days)
**Goal:** Parse and load Skydive graph JSON

**Tasks:**
2.1. Define Skydive TypeScript types
2.2. Implement graph JSON parser
2.3. Convert Skydive nodes to K8s topology nodes
2.4. Map relationships/edges
2.5. Create mock Skydive data
2.6. Load demo topology (kubernetes.json)
2.7. Verify data flow

**Deliverables:**
- ✅ Skydive JSON parser
- ✅ Type-safe data models
- ✅ Demo topology loaded

**Prompt File:** `phase-2-skydive-integration.md`

---

### Phase 3: Topology Visualization (4-5 days)
**Goal:** Render Skydive topology using D3.js with hierarchical lanes

**Tasks:**
3.1. Implement hierarchical lane layout
3.2. Render nodes using D3 + Kubernetes icons
3.3. Render edges/relationships
3.4. Add status indicators (colors, glows)
3.5. Implement expand/collapse
3.6. Add zoom/pan controls
3.7. Handle large topologies

**Deliverables:**
- ✅ D3-rendered topology
- ✅ Hierarchical lanes
- ✅ Interactive nodes/edges
- ✅ Status visualization

**Prompt File:** `phase-3-topology-visualization.md`

---

### Phase 4: Node Selection & Metadata (2-3 days)
**Goal:** Click nodes to view detailed metadata

**Tasks:**
4.1. Implement node click handling
4.2. Update UI state on selection
4.3. Render metadata panel
4.4. Display Skydive node metadata
4.5. Show relationship details
4.6. Add JSON tree viewer
4.7. Keyboard shortcuts (ESC to close)

**Deliverables:**
- ✅ Clickable nodes
- ✅ Metadata slide-out panel
- ✅ Rich node details

**Prompt File:** `phase-4-metadata-panel.md`

---

### Phase 5: Search & Filtering (3-4 days)
**Goal:** Implement search and Gremlin-like queries

**Tasks:**
5.1. Add search input UI
5.2. Implement text-based search
5.3. Filter nodes by type, label, metadata
5.4. Add query console (optional Gremlin)
5.5. Highlight search results
5.6. Save/clear filters
5.7. Query history

**Deliverables:**
- ✅ Search/filter functionality
- ✅ Query console (basic)
- ✅ Active filter chips

**Prompt File:** `phase-5-search-filter.md`

---

### Phase 6: Layout Options (2-3 days)
**Goal:** Multiple layout algorithms

**Tasks:**
6.1. Implement flextree layout (already in scn)
6.2. Add force-directed layout option
6.3. Add circular layout option
6.4. Layout selector UI
6.5. Smooth transitions between layouts
6.6. Persist layout preference

**Deliverables:**
- ✅ Multiple layout options
- ✅ Smooth layout switching
- ✅ User preference storage

**Prompt File:** `phase-6-layout-options.md`

---

### Phase 7: Resource Menu & Drag-Drop (3-4 days)
**Goal:** Drag-and-drop K8s resources from menu

**Tasks:**
7.1. Create resource menu panel
7.2. Load K8s templates from storybook
7.3. Implement drag-and-drop (React DnD)
7.4. Drop zone detection (lanes)
7.5. Add resource to topology on drop
7.6. Update graph data
7.7. Visual feedback during drag

**Deliverables:**
- ✅ Resource menu with K8s icons
- ✅ Drag-and-drop functionality
- ✅ Dynamic resource creation

**Prompt File:** `phase-7-drag-drop-resources.md`

---

### Phase 8: Live Data Connection (Optional, 4-5 days)
**Goal:** Connect to live Skydive analyzer via WebSocket

**Tasks:**
8.1. Implement WebSocket client
8.2. Connect to Skydive analyzer
8.3. Handle real-time topology updates
8.4. Reconnection logic
8.5. Connection status indicator
8.6. Error handling
8.7. Fallback to static data

**Deliverables:**
- ✅ Live topology updates
- ✅ WebSocket integration
- ✅ Robust error handling

**Prompt File:** `phase-8-live-data-websocket.md`

---

### Phase 9: Advanced Features (Optional, 5-7 days)
**Goal:** Time travel, flow visualization, alerts

**Tasks:**
9.1. Timeline component
9.2. Historical topology views
9.3. Flow overlay visualization (if needed)
9.4. Alert/notification system
9.5. Export functionality (JSON, PNG)
9.6. Multi-cluster support
9.7. Authentication

**Deliverables:**
- ✅ Time-based navigation
- ✅ Flow visualization
- ✅ Export options

**Prompt File:** `phase-9-advanced-features.md`

---

### Phase 10: Testing & Polish (3-4 days)
**Goal:** Comprehensive testing and UI polish

**Tasks:**
10.1. Unit tests (Vitest)
10.2. E2E tests (Playwright)
10.3. Visual regression tests
10.4. Performance optimization
10.5. Accessibility (ARIA labels, keyboard nav)
10.6. Responsive design
10.7. Dark mode support
10.8. Documentation

**Deliverables:**
- ✅ Test coverage >80%
- ✅ Passing E2E tests
- ✅ Polished UI

**Prompt File:** `phase-10-testing-polish.md`

---

## 4. Technical Decisions

### 4.1 D3.js Implementation Strategy

**Use d3-flextree for Hierarchical Layout:**
```typescript
import { flextree } from 'd3-flextree';

const layout = flextree({
  nodeSize: (node) => [120, 100], // Width, height
  spacing: (nodeA, nodeB) => 40    // Spacing between nodes
});

const tree = layout.hierarchy(hierarchicalData);
const positioned = layout(tree);
```

**Why d3-flextree:**
- ✅ Better than standard d3-tree for variable node sizes
- ✅ Handles non-uniform spacing
- ✅ Already used in darkstax-k8s-scn
- ✅ Perfect for hierarchical lane layouts

**Rendering Approach:**
```typescript
// React component wraps D3
export function TopologyCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { nodes, edges } = useTopologyStore();
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    // Render nodes
    const nodeGroups = svg.selectAll('.node')
      .data(nodes, d => d.id)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);
    
    // Render edges
    const links = svg.selectAll('.edge')
      .data(edges, d => d.id)
      .join('path')
      .attr('class', 'edge')
      .attr('d', d => generatePath(d));
      
  }, [nodes, edges]);
  
  return <svg ref={svgRef} className="w-full h-full" />;
}
```

### 4.2 State Management: Zustand

**Why Zustand over Redux:**
- ✅ Simpler API
- ✅ No boilerplate
- ✅ TypeScript-friendly
- ✅ Already used in darkstax-k8s-scn
- ✅ Good performance

**Store Structure:**
```typescript
// topologyStore.ts
interface TopologyStore {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  selectedNode: TopologyNode | null;
  layout: 'flextree' | 'force' | 'circular';
  setNodes: (nodes: TopologyNode[]) => void;
  addNode: (node: TopologyNode) => void;
  selectNode: (id: string | null) => void;
}

export const useTopologyStore = create<TopologyStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  layout: 'flextree',
  setNodes: (nodes) => set({ nodes }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  selectNode: (id) => set((state) => ({
    selectedNode: state.nodes.find(n => n.id === id) || null
  })),
}));
```

### 4.3 Component Reuse from darkstax-k8s-scn

**Reusable Components:**
- ✅ `TopologyCanvas.tsx` - D3 wrapper
- ✅ `HierarchicalLane.tsx` - Lane containers
- ✅ `KubernetesIconWrapper.tsx` - K8s icons
- ✅ `MetadataPanel.tsx` - Slide-out panel
- ✅ `ResourceMenuPanel.tsx` - Template menu
- ✅ `StatusLegendTooltip.tsx` - Status legend
- ✅ `AppHeader.tsx`, `AppLayout.tsx` - Layout
- ✅ `SearchFilter.tsx` - Search input
- ✅ `LayoutSelector.tsx` - Layout switcher

**Modifications Needed:**
- Adapt data types for Skydive graph format
- Add Gremlin query support
- Enhance metadata display for Skydive properties
- Add flow visualization (optional)

### 4.4 Storybook Component Reuse

**Kubernetes Icons from darkstax-topology:**
```typescript
import { Kubernetes } from 'darkstax-topology';

<Kubernetes 
  icon="pod" 
  status="active" 
  badge={2}
  onClick={handleClick}
/>
```

**Available Icons:**
- pod, deploy, svc, ns, node, job, ing, secret, cm, pv, pvc, sts, kubevirt, multus

**Reuse from ui-lego:**
- Button components
- Input components
- Panel components
- Tooltip components

---

## 5. Figma Design Implementation

### 5.1 Key Design Elements

**1. Dotted Canvas Background**
```css
.topology-canvas {
  background-image: 
    radial-gradient(circle, #00112B 1px, transparent 1px);
  background-size: 28.53px 26px;
  opacity: 0.24;
}
```

**2. Hierarchical Lanes**
```typescript
const lanes = [
  { id: 'load', label: 'Load', resources: ['deployment', 'pod'] },
  { id: 'service', label: 'Service', resources: ['service'] },
  { id: 'network', label: 'Network', resources: ['multus'] },
  { id: 'config', label: 'Config and Storage', resources: ['cm', 'pv'] }
];
```

**3. Connection Lines**
```typescript
// Dashed lines between resources
.connection-line {
  stroke: #00112B;
  stroke-opacity: 0.4;
  stroke-width: 1px;
  stroke-dasharray: 6px 6px;
}
```

**4. Status Indicators**
```typescript
const statusColors = {
  ready: '#EBEBEB',
  deploying: '#FAA536',
  active: '#2B9952',
  error: '#AA1A00',
  terminated: '#0E2846'
};
```

**5. Hexagon Glows**
```svg
<filter id="hexagon-glow">
  <feGaussianBlur stdDeviation="4" />
  <feComposite in="SourceGraphic" />
</filter>
```

### 5.2 Responsive Layout
- Fluid container widths
- Scalable SVG viewport
- Responsive panels
- Mobile-friendly controls

---

## 6. Risk Assessment

### High Risk
- ⚠️ **Skydive graph complexity** - May need custom parsers for all edge types
- ⚠️ **Performance with large graphs** - 1000+ nodes may need virtualization
- ⚠️ **WebSocket reliability** - Need robust reconnection logic

### Medium Risk
- ⚠️ **Gremlin query implementation** - Complex query parsing
- ⚠️ **Time-based navigation** - Requires historical data storage
- ⚠️ **Cross-browser compatibility** - SVG rendering differences

### Low Risk
- ✅ D3.js rendering - Proven approach in darkstax-k8s-scn
- ✅ React integration - Well-established patterns
- ✅ UI components - Reusable from storybook

---

## 7. Success Criteria

### Must Have (MVP)
- ✅ Load Skydive graph JSON
- ✅ Render topology with hierarchical lanes
- ✅ Click nodes to view metadata
- ✅ Search/filter nodes
- ✅ Match Figma design (lanes, colors, icons)

### Should Have
- ✅ Multiple layout options
- ✅ Drag-and-drop resources
- ✅ Export topology (JSON, PNG)
- ✅ Responsive design

### Nice to Have
- ⚠️ Live WebSocket updates
- ⚠️ Gremlin query console
- ⚠️ Time-based navigation
- ⚠️ Flow visualization

---

## 8. Timeline Estimate (MVP Focus)

| Phase | Duration | Priority | Status |
|-------|----------|----------|--------|
| Phase 1: Foundation | 2-3 days | CRITICAL | ✅ **INCLUDED** |
| Phase 2: Data Integration (Static) | 2 days | CRITICAL | ✅ **INCLUDED** |
| Phase 3: Visualization | 4-5 days | CRITICAL | ✅ **INCLUDED** |
| Phase 4: Metadata | 2-3 days | HIGH | ✅ **INCLUDED** |
| Phase 5: Basic Search | 2 days | MEDIUM | ⚠️ **OPTIONAL** |
| Phase 6: Layouts | 2 days | LOW | ⚠️ **OPTIONAL** |
| Phase 7: Drag-Drop | N/A | SKIPPED | ❌ **NOT IN MVP** |
| Phase 8: Live Data | N/A | SKIPPED | ❌ **NOT IN MVP** |
| Phase 9: Advanced | N/A | SKIPPED | ❌ **NOT IN MVP** |
| Phase 10: Testing & Polish | 2-3 days | HIGH | ✅ **INCLUDED** |
| **Total (Core MVP)** | **12-14 days** | | |
| **Total (MVP + Optional)** | **16-18 days** | | |

---

## 9. Next Steps

1. **Approve this plan** ✓
2. **Start Phase 1** - Foundation setup
3. **Review each phase implementation prompt before proceeding**
4. **Iterate based on feedback**

---

## 10. Conclusion

**Recommendation:** ✅ **Use Pure D3.js (Option B)**

**Rationale:**
- darkstax-k8s-scn provides a proven React + D3 + d3-flextree foundation
- D3.js offers the flexibility needed for the Figma design's hierarchical lanes
- ReactFlow is too limited for this use case
- Hybrid approach adds unnecessary complexity

**Project Scope (Based on User Input):**
- ✅ **MVP - Match Figma design quickly**
- ✅ **Static/demo data** (no WebSocket integration)
- ✅ **K8s topology focus** (no Gremlin queries, no flow analysis)
- ✅ **Fresh build in darkstax-k8s** (reuse components from darkstax-k8s-scn)

**Phases to Implement (Streamlined MVP):**
1. ✅ Phase 1: Foundation Setup (2-3 days)
2. ✅ Phase 2: Skydive Data Integration - Static JSON only (2 days)
3. ✅ Phase 3: Topology Visualization (4-5 days)
4. ✅ Phase 4: Metadata Panel (2-3 days)
5. ⚠️ Phase 5: Basic Search (2 days) - Simplified, no Gremlin
6. ⚠️ Phase 6: Layout Options (Optional, 2 days)
7. ❌ Phase 7: Drag-Drop - Skipped for MVP
8. ❌ Phase 8: Live Data - Skipped (static data only)
9. ❌ Phase 9: Advanced Features - Skipped
10. ✅ Phase 10: Testing & Polish (2-3 days)

**Total MVP Timeline: 14-18 days**

**Next Action:** Proceed to Phase 1 implementation using the phase-specific prompt files.

---

## Appendix: Phase Implementation Prompts

Each phase has a dedicated markdown file with detailed instructions for implementation:

1. `phase-1-foundation-setup.md` - Project structure, dependencies, config
2. `phase-2-skydive-integration.md` - Data parsing, type definitions
3. `phase-3-topology-visualization.md` - D3 rendering, lanes, nodes, edges
4. `phase-4-metadata-panel.md` - Selection, panel UI, details
5. `phase-5-search-filter.md` - Search, query, filtering logic
6. `phase-6-layout-options.md` - Multiple layouts, transitions
7. `phase-7-drag-drop-resources.md` - Resource menu, DnD
8. `phase-8-live-data-websocket.md` - WebSocket, real-time updates
9. `phase-9-advanced-features.md` - Timeline, flows, export
10. `phase-10-testing-polish.md` - Tests, optimization, polish

**All prompts will be generated in the next step upon approval.**
