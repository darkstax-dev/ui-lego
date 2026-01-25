import { create } from 'zustand';
import { K8sNodeData, Filter, LayoutMode } from '../types';

interface UIStore {
  // Selection
  selectedNode: K8sNodeData | null;
  setSelectedNode: (node: K8sNodeData | null) => void;
  clearSelection: () => void;
  openMetadataPanel: (node?: K8sNodeData) => void;
  closeMetadataPanel: () => void;
  
  // Panel states
  metadataPanelOpen: boolean;
  toggleMetadataPanel: () => void;
  resourceMenuOpen: boolean;
  toggleResourceMenu: () => void;
  
  // Filters
  filters: Filter[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addFilter: (filter: Omit<Filter, 'id'>) => void;
  removeFilter: (id: string) => void;
  toggleFilter: (id: string) => void;
  clearFilters: () => void;
  
  // Layout
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  
  // Status legend tooltip
  showStatusLegend: boolean;
  toggleStatusLegend: () => void;
}

const getInitialLayoutMode = (): LayoutMode => {
  // Always default to hierarchy so lanes render immediately in demos.
  // Users can still switch via the LayoutSelector.
  return 'hierarchy';
};

const getInitialFilters = (): Filter[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem('topologyFilters');
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed.filter((filter) => filter && typeof filter.id === 'string');
    }
  } catch (error) {
    console.warn('Failed to parse stored filters', error);
  }
  return [];
};

const persistFilters = (filters: Filter[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('topologyFilters', JSON.stringify(filters));
};

export const useUIStore = create<UIStore>((set) => ({
  // Selection
  selectedNode: null,
  setSelectedNode: (node) => set({
    selectedNode: node,
  }),
  clearSelection: () => set({
    selectedNode: null,
    metadataPanelOpen: false
  }),
  openMetadataPanel: (node) => set((state) => ({
    selectedNode: node ?? state.selectedNode,
    metadataPanelOpen: true,
  })),
  closeMetadataPanel: () => set({
    metadataPanelOpen: false,
  }),
  
  // Panel states
  metadataPanelOpen: false,
  toggleMetadataPanel: () => set((state) => ({ 
    metadataPanelOpen: !state.metadataPanelOpen 
  })),
  resourceMenuOpen: true,
  toggleResourceMenu: () => set((state) => ({ 
    resourceMenuOpen: !state.resourceMenuOpen 
  })),
  
  // Filters
  filters: getInitialFilters(),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addFilter: (filter) => set((state) => {
    const nextFilters = [...state.filters, { ...filter, id: Date.now().toString() }];
    persistFilters(nextFilters);
    return { filters: nextFilters };
  }),
  removeFilter: (id) => set((state) => {
    const nextFilters = state.filters.filter(f => f.id !== id);
    persistFilters(nextFilters);
    return { filters: nextFilters };
  }),
  toggleFilter: (id) => set((state) => {
    const nextFilters = state.filters.map(f =>
      f.id === id ? { ...f, active: !f.active } : f
    );
    persistFilters(nextFilters);
    return { filters: nextFilters };
  }),
  clearFilters: () => {
    persistFilters([]);
    set({
      filters: [],
      searchQuery: ''
    });
  },
  
  // Layout
  layoutMode: getInitialLayoutMode(),
  setLayoutMode: (mode) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('layoutMode', mode);
    }
    set({ layoutMode: mode });
  },
  
  // Status legend
  showStatusLegend: false,
  toggleStatusLegend: () => set((state) => ({ 
    showStatusLegend: !state.showStatusLegend 
  })),
}));
