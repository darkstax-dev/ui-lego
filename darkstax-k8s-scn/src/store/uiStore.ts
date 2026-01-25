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
  filters: [],
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addFilter: (filter) => set((state) => ({
    filters: [...state.filters, { ...filter, id: Date.now().toString() }]
  })),
  removeFilter: (id) => set((state) => ({
    filters: state.filters.filter(f => f.id !== id)
  })),
  toggleFilter: (id) => set((state) => ({
    filters: state.filters.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    )
  })),
  clearFilters: () => set({ 
    filters: [],
    searchQuery: '' 
  }),
  
  // Layout
  layoutMode: 'hierarchy',
  setLayoutMode: (mode) => set({ layoutMode: mode }),
  
  // Status legend
  showStatusLegend: false,
  toggleStatusLegend: () => set((state) => ({ 
    showStatusLegend: !state.showStatusLegend 
  })),
}));
