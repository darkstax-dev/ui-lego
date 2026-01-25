import { useTopologyStore } from '@/store/topologyStore';
import { LayoutEngine } from '@/lib/graph/LayoutEngine';
import { useRef } from 'react';

export function useAutoLayout() {
  const { nodes, edges, layoutAlgorithm, setNodes } = useTopologyStore();
  const layoutEngineRef = useRef<LayoutEngine | null>(null);

  if (!layoutEngineRef.current) {
    layoutEngineRef.current = new LayoutEngine(1200, 800);
  }

  const applyLayout = async () => {
    if (!layoutEngineRef.current) return;
    if (nodes.length === 0) return;
    if (layoutAlgorithm === 'manual') return;

    try {
      const positionedNodes = await layoutEngineRef.current.applyLayout(
        nodes,
        edges,
        layoutAlgorithm
      );
      setNodes(positionedNodes);
    } catch (error) {
      console.error('Layout error:', error);
    }
  };

  return { applyLayout };
}
