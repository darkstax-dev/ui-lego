import { 
  ZoomIn, ZoomOut, Maximize, Expand, 
  LayoutGrid, Pin, PinOff, RefreshCw 
} from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';

export function D3TopologyControls() {
  const { 
    layoutAlgorithm, 
    setLayoutAlgorithm, 
    autoLayout, 
    setAutoLayout 
  } = useTopologyStore();

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <div className="p-1" style={{ backgroundColor: 'var(--color-gray-200)', border: '1px solid var(--divider-light)' }}>
        <button
          onClick={() => {
            const event = new CustomEvent('topology-zoom', { detail: { action: 'in' } });
            window.dispatchEvent(event);
          }}
          className="p-2 transition-colors block w-full"
          style={{ color: 'var(--text-blue-main)' }}
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => {
            const event = new CustomEvent('topology-zoom', { detail: { action: 'out' } });
            window.dispatchEvent(event);
          }}
          className="p-2 transition-colors block w-full"
          style={{ color: 'var(--text-blue-main)' }}
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => {
            const event = new CustomEvent('topology-zoom', { detail: { action: 'fit' } });
            window.dispatchEvent(event);
          }}
          className="p-2 transition-colors block w-full"
          style={{ color: 'var(--text-blue-main)' }}
          title="Fit View"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      <div className="p-1" style={{ backgroundColor: 'var(--color-gray-200)', border: '1px solid var(--divider-light)' }}>
        <button
          onClick={() => {
            setLayoutAlgorithm('force');
            setAutoLayout(true);
          }}
          className="p-2 transition-colors block w-full"
          style={{
            backgroundColor: layoutAlgorithm === 'force' ? 'var(--color-blue-700)' : 'transparent',
            color: layoutAlgorithm === 'force' ? 'var(--color-white)' : 'var(--text-blue-main)'
          }}
          title="Force Layout"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            setLayoutAlgorithm('hierarchical');
            setAutoLayout(true);
          }}
          className="p-2 transition-colors block w-full"
          style={{
            backgroundColor: layoutAlgorithm === 'hierarchical' ? 'var(--color-blue-700)' : 'transparent',
            color: layoutAlgorithm === 'hierarchical' ? 'var(--color-white)' : 'var(--text-blue-main)'
          }}
          title="Hierarchical Layout"
        >
          <Expand className="w-5 h-5" />
        </button>

        <button
          onClick={() => setAutoLayout(!autoLayout)}
          className="p-2 transition-colors block w-full"
          style={{
            backgroundColor: autoLayout ? 'var(--color-green-600)' : 'transparent',
            color: autoLayout ? 'var(--color-white)' : 'var(--text-blue-main)'
          }}
          title={autoLayout ? 'Disable Auto-Layout' : 'Enable Auto-Layout'}
        >
          {autoLayout ? <Pin className="w-5 h-5" /> : <PinOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => {
            setAutoLayout(false);
            setTimeout(() => setAutoLayout(true), 100);
          }}
          className="p-2 transition-colors block w-full"
          style={{ color: 'var(--text-blue-main)' }}
          title="Re-apply Layout"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
