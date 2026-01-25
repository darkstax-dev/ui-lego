import { useEffect, useRef } from 'react';
import { useTopologyStore } from '@/store/topologyStore';
import { LayoutEngine } from '@/lib/graph/LayoutEngine';

export function useD3AutoLayout() {
  const { nodes, edges, layoutAlgorithm, autoLayout, setNodes } = useTopologyStore();
  const layoutEngineRef = useRef<LayoutEngine | null>(null);
  const isLayoutingRef = useRef(false);
  const prevLayoutAlgorithmRef = useRef(layoutAlgorithm);

  useEffect(() => {
    layoutEngineRef.current = new LayoutEngine(1200, 800);
    
    return () => {
      layoutEngineRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    const applyLayout = async () => {
      if (!layoutEngineRef.current || isLayoutingRef.current || !autoLayout) {
        return;
      }

      if (nodes.length === 0) return;
      if (layoutAlgorithm === 'manual') return;

      const algorithmChanged = prevLayoutAlgorithmRef.current !== layoutAlgorithm;
      prevLayoutAlgorithmRef.current = layoutAlgorithm;

      if (!algorithmChanged && nodes.length > 0) {
        return;
      }

      isLayoutingRef.current = true;

      console.log('Applying D3 layout:', layoutAlgorithm, 'to', nodes.length, 'nodes');

      try {
        const positionedNodes = await layoutEngineRef.current.applyLayout(
          nodes,
          edges,
          layoutAlgorithm
        );

        console.log('D3 layout complete, updating nodes');
        setNodes(positionedNodes);
      } catch (error) {
        console.error('D3 layout error:', error);
      } finally {
        isLayoutingRef.current = false;
      }
    };

    applyLayout();
  }, [layoutAlgorithm, autoLayout, nodes, edges, setNodes]);
}
