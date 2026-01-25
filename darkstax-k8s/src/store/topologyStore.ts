import { create } from 'zustand';
import { K8sNodeData, K8sNodeGroup } from '../types';

interface TopologyStore {
  nodes: K8sNodeData[];
  groups: K8sNodeGroup[];
  
  setNodes: (nodes: K8sNodeData[]) => void;
  setGroups: (groups: K8sNodeGroup[]) => void;
  
  toggleGroupCollapse: (groupId: string) => void;
  
  getVisibleNodes: () => K8sNodeData[];
  
  isNodeInCollapsedGroup: (nodeId: string) => boolean;
}

export const useTopologyStore = create<TopologyStore>((set, get) => ({
  nodes: [],
  groups: [],
  
  setNodes: (nodes) => set({ nodes }),
  
  setGroups: (groups) => set({ groups }),
  
  toggleGroupCollapse: (groupId) => set((state) => ({
    groups: state.groups.map((group) =>
      group.id === groupId ? { ...group, collapsed: !group.collapsed } : group
    )
  })),
  
  getVisibleNodes: () => {
    const { nodes, groups } = get();
    const hiddenIds = new Set<string>();

    groups.forEach((group) => {
      if (!group.collapsed) return;
      group.memberIds.forEach((id) => hiddenIds.add(id));
    });

    return nodes.filter((node) => !hiddenIds.has(node.id));
  },
  
  isNodeInCollapsedGroup: (nodeId) => {
    const { groups } = get();
    return groups.some((g) => g.collapsed && g.memberIds.includes(nodeId));
  }
}));
