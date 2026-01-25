import { create } from 'zustand';
import { TopologyNode, TopologyEdge, NodeGroup } from '../types/graph';
import { TopologyMode, LayoutAlgorithm } from '../types/topology';

export type VisualizationMode = 'default' | 'heatmap' | 'flow' | 'cluster';

interface TopologyState {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  groups: NodeGroup[];
  
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  
  mode: TopologyMode;
  timeContext: number;
  filter: string;
  highlight: string;
  
  layoutAlgorithm: LayoutAlgorithm;
  autoLayout: boolean;
  layoutStable: boolean;
  layoutLocked: boolean;
  
  visualizationMode: VisualizationMode;
  
  connected: boolean;
  
  setNodes: (nodes: TopologyNode[]) => void;
  setEdges: (edges: TopologyEdge[]) => void;
  addNode: (node: TopologyNode) => void;
  updateNode: (id: string, data: Partial<TopologyNode['data']>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: TopologyEdge) => void;
  removeEdge: (id: string) => void;
  
  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  
  setFilter: (filter: string) => void;
  setHighlight: (highlight: string) => void;
  
  addGroup: (group: NodeGroup) => void;
  toggleGroup: (groupId: string) => void;
  
  setMode: (mode: TopologyMode) => void;
  setTimeContext: (time: number) => void;
  setLayoutAlgorithm: (algorithm: LayoutAlgorithm) => void;
  setAutoLayout: (enabled: boolean) => void;
  setLayoutStable: (stable: boolean) => void;
  setLayoutLocked: (locked: boolean) => void;
  setVisualizationMode: (mode: VisualizationMode) => void;
  setConnected: (connected: boolean) => void;
}

export const useTopologyStore = create<TopologyState>((set) => ({
  nodes: [],
  edges: [],
  groups: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  mode: 'live',
  timeContext: 0,
  filter: '',
  highlight: '',
  layoutAlgorithm: 'force',
  autoLayout: true,
  layoutStable: false,
  layoutLocked: false,
  visualizationMode: 'default',
  connected: false,
  
  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map(n => 
      n.id === id ? { ...n, data: { ...n.data, ...data } } : n
    )
  })),
  
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter(n => n.id !== id),
    edges: state.edges.filter(e => e.source !== id && e.target !== id),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),
  
  removeEdge: (id) => set((state) => ({
    edges: state.edges.filter(e => e.id !== id),
    selectedEdgeId: state.selectedEdgeId === id ? null : state.selectedEdgeId
  })),
  
  selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  
  selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
  
  setFilter: (filter) => set({ filter }),
  
  setHighlight: (highlight) => set({ highlight }),
  
  addGroup: (group) => set((state) => ({
    groups: [...state.groups, group]
  })),
  
  toggleGroup: (groupId) => set((state) => ({
    groups: state.groups.map(g =>
      g.id === groupId ? { ...g, collapsed: !g.collapsed } : g
    )
  })),
  
  setMode: (mode) => set({ mode }),
  
  setTimeContext: (timeContext) => set({ timeContext }),
  
  setLayoutAlgorithm: (algorithm) => set({ layoutAlgorithm: algorithm }),
  setAutoLayout: (enabled) => set({ autoLayout: enabled }),
  setLayoutStable: (stable) => set({ layoutStable: stable }),
  setLayoutLocked: (locked) => set({ layoutLocked: locked }),
  setVisualizationMode: (mode) => set({ visualizationMode: mode }),
  
  setConnected: (connected) => set({ connected })
}));
