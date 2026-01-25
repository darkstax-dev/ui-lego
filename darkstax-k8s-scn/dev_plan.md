DarkStax-k8s-scn 
Needs to have default hierarchical view similar to skydive-ui https://github.com/skydive-project/skydive-ui  The top hierarchy  layer will have an aggregate group icon and underneath it will have kubernetes hierarchy as shown in figma design. On the right have we will have kubernetes icon resource menu which will have drag and drop capability and it will place the icon in the appropriate  group lane (e.g. pod, service, aggregate). It is also shown in figma design. Reuse the components from storybook where applicable. Search all components first.

Use kubernetes icons from storybook. 

Phase 1: Project Setup & Infrastructure
Duration: 1-2 days | Priority: High
1.1 Project Initialization

bash


# Create new project
npm create vite@latest darkstax-k8s-scn -- --template react-ts
cd darkstax-k8s-scn
1.2 Dependencies

json


{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "darkstax-topology": "file:../darkstax-topology",
    "zustand": "^5.0.10",
    "lucide-react": "^0.563.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0",
    "react-json-view": "^1.21.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.2",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.9.3",
    "vite": "^7.3.1"
  }
}
1.3 Project Structure



darkstax-k8s-scn/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx
│   │   │   └── AppLayout.tsx
│   │   ├── panels/
│   │   │   └── MetadataPanel.tsx
│   │   ├── controls/
│   │   │   ├── SearchFilter.tsx
│   │   │   └── LayoutSelector.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Panel.tsx
│   ├── store/
│   │   └── uiStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
1.4 Tailwind Configuration
Reuse design tokens from 
darkstax-topology/tokens.css


Phase 2: Core Topology Integration
Duration: 1 day | Priority: High
2.1 Basic App Layout
File: 
src/App.tsx


typescript


import { D3TopologyViewer } from 'darkstax-topology';
import { AppLayout } from './components/layout/AppLayout';
import { useUIStore } from './store/uiStore';

function App() {
  const { selectedNode, selectedEdge } = useUIStore();
  
  return (
    <AppLayout>
      <D3TopologyViewer 
        theme="light"
        onNodeSelect={(node) => useUIStore.getState().setSelectedNode(node)}
        onEdgeSelect={(edge) => useUIStore.getState().setSelectedEdge(edge)}
      />
    </AppLayout>
  );
}
2.2 App Layout Component
File: src/components/layout/AppLayout.tsx

typescript


interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader />
      <div className="flex-1 flex">
        <main className="flex-1">{children}</main>
        <MetadataPanel />
      </div>
    </div>
  );
}
2.3 Deliverables
* ✅ Working topology visualization
* ✅ Basic app shell with header
* ✅ Responsive layout

Phase 3: Node Selection & Metadata Panel
Duration: 2-3 days | Priority: High
3.1 UI Store for Selection State
File: src/store/uiStore.ts

typescript


import { create } from 'zustand';
import { TopologyNode, TopologyEdge } from 'darkstax-topology';

interface UIStore {
  // Selection
  selectedNode: TopologyNode | null;
  selectedEdge: TopologyEdge | null;
  setSelectedNode: (node: TopologyNode | null) => void;
  setSelectedEdge: (edge: TopologyEdge | null) => void;
  clearSelection: () => void;
  
  // Panel
  metadataPanelOpen: boolean;
  toggleMetadataPanel: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedNode: null,
  selectedEdge: null,
  setSelectedNode: (node) => set({ 
    selectedNode: node, 
    selectedEdge: null,
    metadataPanelOpen: !!node 
  }),
  setSelectedEdge: (edge) => set({ 
    selectedEdge: edge, 
    selectedNode: null,
    metadataPanelOpen: !!edge 
  }),
  clearSelection: () => set({ 
    selectedNode: null, 
    selectedEdge: null,
    metadataPanelOpen: false 
  }),
  metadataPanelOpen: false,
  toggleMetadataPanel: () => set((state) => ({ 
    metadataPanelOpen: !state.metadataPanelOpen 
  })),
}));
3.2 Metadata Panel Component
File: src/components/panels/MetadataPanel.tsx

typescript


import { useUIStore } from '../../store/uiStore';
import ReactJson from 'react-json-view';
import { X } from 'lucide-react';

export function MetadataPanel() {
  const { selectedNode, selectedEdge, metadataPanelOpen, clearSelection } = useUIStore();
  
  if (!metadataPanelOpen) return null;
  
  const data = selectedNode || selectedEdge;
  
  return (
    <div className="w-96 border-l bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">
          {selectedNode ? 'Node Details' : 'Edge Details'}
        </h2>
        <button onClick={clearSelection}>
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {data && (
          <>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">ID</h3>
              <p className="text-sm font-mono">{data.id}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Type</h3>
              <p className="text-sm">{data.type}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Metadata</h3>
              <ReactJson 
                src={data.data?.metadata || {}}
                theme="rjv-default"
                collapsed={1}
                displayDataTypes={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
3.3 Integration with D3TopologyViewer
Extend 
darkstax-topology to support selection callbacks:


typescript


// Add to D3TopologyViewer props
interface D3TopologyViewerProps {
  onNodeSelect?: (node: TopologyNode | null) => void;
  onEdgeSelect?: (edge: TopologyEdge | null) => void;
}
3.4 Deliverables
* ✅ Click to select nodes/edges
* ✅ Slide-out metadata panel
* ✅ JSON tree view of metadata
* ✅ Close/clear selection

Phase 4: Search & Filter System
Duration: 3-4 days | Priority: High
4.1 Filter State in UI Store
File: src/store/uiStore.ts (extend)

typescript


interface Filter {
  id: string;
  label: string;
  query: string;
  active: boolean;
}

interface UIStore {
  // ... existing fields
  
  // Filters
  filters: Filter[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addFilter: (filter: Omit<Filter, 'id'>) => void;
  removeFilter: (id: string) => void;
  toggleFilter: (id: string) => void;
  clearFilters: () => void;
}
4.2 Search Filter Component
File: src/components/controls/SearchFilter.tsx

typescript


import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export function SearchFilter() {
  const [inputValue, setInputValue] = useState('');
  const { searchQuery, setSearchQuery, filters, addFilter, removeFilter } = useUIStore();
  
  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
      addFilter({
        label: inputValue,
        query: inputValue,
        active: true
      });
      setInputValue('');
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search nodes (e.g., G.V().Has('Type', 'device'))"
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      
      {/* Active Filters */}
      {filters.map((filter) => (
        <div key={filter.id} className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full">
          <span className="text-sm">{filter.label}</span>
          <button onClick={() => removeFilter(filter.id)}>
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
4.3 Filter Logic
File: src/lib/filterNodes.ts

typescript


import { TopologyNode } from 'darkstax-topology';

export function filterNodes(
  nodes: TopologyNode[], 
  query: string
): TopologyNode[] {
  if (!query.trim()) return nodes;
  
  const lowerQuery = query.toLowerCase();
  
  return nodes.filter(node => {
    // Simple text search in node properties
    const searchableText = [
      node.id,
      node.type,
      node.data?.label,
      JSON.stringify(node.data?.metadata)
    ].join(' ').toLowerCase();
    
    return searchableText.includes(lowerQuery);
  });
}

// Future: Add Gremlin-like query parser
export function parseGremlinQuery(query: string): any {
  // Parse queries like: G.V().Has('Type', 'device')
  // For MVP, just do simple text matching
  return { type: 'simple', value: query };
}
4.4 Integration
Update 
App.tsx to filter nodes based on search:


typescript


const { searchQuery } = useUIStore();
const filteredNodes = useMemo(
  () => filterNodes(nodes, searchQuery),
  [nodes, searchQuery]
);
4.5 Deliverables
* ✅ Search input in header
* ✅ Filter nodes by text search
* ✅ Active filter chips
* ✅ Clear filters
* ⚠️ Basic Gremlin-like syntax (future enhancement)

Phase 5: Flextree Layout Implementation
Duration: 2-3 days | Priority: Medium
5.1 Add Flextree Dependency

bash



npm install d3-flextree
5.2 Flextree Layout Algorithm
File: src/lib/layouts/flextreeLayout.ts

typescript


import { flextree } from 'd3-flextree';
import { TopologyNode, TopologyEdge } from 'darkstax-topology';

interface FlextreeNode {
  id: string;
  children?: FlextreeNode[];
}

export function applyFlextreeLayout(
  nodes: TopologyNode[],
  edges: TopologyEdge[],
  options: {
    nodeWidth?: number;
    nodeHeight?: number;
    spacing?: number;
  } = {}
): TopologyNode[] {
  const { nodeWidth = 150, nodeHeight = 80, spacing = 50 } = options;
  
  // Build hierarchy from edges
  const hierarchy = buildHierarchy(nodes, edges);
  
  // Create flextree layout
  const layout = flextree({
    nodeSize: (node: any) => [nodeWidth + spacing, nodeHeight + spacing],
    spacing: spacing
  });
  
  // Apply layout
  const tree = layout.hierarchy(hierarchy);
  const positioned = layout(tree);
  
  // Map positions back to nodes
  const nodeMap = new Map<string, { x: number; y: number }>();
  positioned.each((d: any) => {
    nodeMap.set(d.data.id, { x: d.x, y: d.y });
  });
  
  return nodes.map(node => ({
    ...node,
    position: nodeMap.get(node.id) || node.position
  }));
}

function buildHierarchy(
  nodes: TopologyNode[],
  edges: TopologyEdge[]
): FlextreeNode {
  // Find root (node with no incoming edges)
  const hasIncoming = new Set(edges.map(e => e.target));
  const roots = nodes.filter(n => !hasIncoming.has(n.id));
  
  // Build tree structure
  const nodeMap = new Map(nodes.map(n => [n.id, { id: n.id, children: [] }]));
  
  edges.forEach(edge => {
    const parent = nodeMap.get(edge.source);
    const child = nodeMap.get(edge.target);
    if (parent && child) {
      parent.children.push(child);
    }
  });
  
  // Return root or create virtual root
  return roots.length === 1 
    ? nodeMap.get(roots[0].id)! 
    : { id: 'root', children: roots.map(r => nodeMap.get(r.id)!) };
}
5.3 Integration with Layout Selector
Extend 
darkstax-topology layout options or create wrapper:


typescript


// In App.tsx
const layoutAlgorithm = useTopologyStore(state => state.layoutAlgorithm);

useEffect(() => {
  if (layoutAlgorithm === 'flextree') {
    const positioned = applyFlextreeLayout(nodes, edges);
    setNodes(positioned);
  }
}, [layoutAlgorithm, nodes, edges]);
5.4 Deliverables
* ✅ Flextree layout algorithm
* ✅ Integration with layout selector
* ✅ Hierarchical tree visualization
* ✅ Configurable node spacing

Phase 6: Testing & Polish
Duration: 2-3 days | Priority: Medium
6.1 Unit Tests

typescript


// tests/filterNodes.test.ts
import { describe, it, expect } from 'vitest';
import { filterNodes } from '../src/lib/filterNodes';

describe('filterNodes', () => {
  it('filters nodes by text search', () => {
    const nodes = [
      { id: '1', type: 'device', data: { label: 'router' } },
      { id: '2', type: 'switch', data: { label: 'switch1' } }
    ];
    
    const result = filterNodes(nodes, 'router');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});
6.2 E2E Tests

typescript


// tests/e2e/topology.spec.ts
import { test, expect } from '@playwright/test';

test('select node and view metadata', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Click on a node
  await page.click('[data-node-id="node-1"]');
  
  // Metadata panel should open
  await expect(page.locator('[data-testid="metadata-panel"]')).toBeVisible();
  
  // Should show node details
  await expect(page.locator('text=Node Details')).toBeVisible();
});

test('search and filter nodes', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Enter search query
  await page.fill('input[placeholder*="Search"]', 'device');
  await page.press('input[placeholder*="Search"]', 'Enter');
  
  // Filter chip should appear
  await expect(page.locator('text=device')).toBeVisible();
});
6.3 Polish Checklist
* ✅ Keyboard shortcuts (Esc to clear selection)
* ✅ Loading states
* ✅ Error handling
* ✅ Responsive design
* ✅ Accessibility (ARIA labels)
* ✅ Dark mode support (optional)