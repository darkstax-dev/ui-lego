import { useEffect } from 'react';
import { useTopologyStore } from '@/store/topologyStore';
import { useAutoLayout } from './useAutoLayout';

export function useKeyboardShortcuts(
  onShowShortcuts?: () => void,
  onZoomIn?: () => void,
  onZoomOut?: () => void,
  onFitView?: () => void
) {
  const { 
    setLayoutAlgorithm, 
    setAutoLayout, 
    autoLayout,
    selectNode,
    selectEdge 
  } = useTopologyStore();
  const { applyLayout } = useAutoLayout();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const { key, ctrlKey, metaKey, shiftKey } = event;
      const cmdOrCtrl = ctrlKey || metaKey;

      if (key === '+' || key === '=') {
        event.preventDefault();
        onZoomIn?.();
      } else if (key === '-' || key === '_') {
        event.preventDefault();
        onZoomOut?.();
      } else if (key === '0') {
        event.preventDefault();
        onFitView?.();
      }
      else if (key === 'f' && !cmdOrCtrl) {
        event.preventDefault();
        setLayoutAlgorithm('force');
        setAutoLayout(true);
      } else if (key === 'h' && !cmdOrCtrl) {
        event.preventDefault();
        setLayoutAlgorithm('hierarchical');
        setAutoLayout(true);
      } else if (key === 'l' && !cmdOrCtrl) {
        event.preventDefault();
        applyLayout();
      } else if (key === 'a' && !cmdOrCtrl) {
        event.preventDefault();
        setAutoLayout(!autoLayout);
      }
      else if (key === 'Escape') {
        event.preventDefault();
        selectNode(null);
        selectEdge(null);
      }
      else if (key === 'e' && cmdOrCtrl) {
        event.preventDefault();
        console.log('Export shortcut triggered');
      }
      else if (key === '?' && shiftKey) {
        event.preventDefault();
        onShowShortcuts?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setLayoutAlgorithm, setAutoLayout, autoLayout, applyLayout, selectNode, selectEdge, onShowShortcuts, onZoomIn, onZoomOut, onFitView]);
}
