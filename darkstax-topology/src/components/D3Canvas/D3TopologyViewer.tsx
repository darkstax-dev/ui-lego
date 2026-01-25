import { D3TopologyCanvas } from './D3TopologyCanvas';
import { TopologyConfig as ViewerConfig } from '@/types/topology';
import { TopologyConfig } from '@/types/config';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useD3AutoLayout } from '@/hooks/useD3AutoLayout';
import { useTopologyStore } from '@/store/topologyStore';
import { cn } from '@/utils/cn';
import { Wifi, WifiOff } from 'lucide-react';
import { FilterPanel } from '@/components/controls/FilterPanel';
import { TimelineControls } from '@/components/controls/TimelineControls';
import { D3TopologyControls } from '@/components/controls/D3TopologyControls';
import { TopologyLegend } from '@/components/legend/TopologyLegend';
import { MetadataPanel } from '@/components/panels/MetadataPanel';
import { ExportControls } from '@/components/controls/ExportControls';
import { SearchPanel } from '@/components/controls/SearchPanel';
import { LayoutLockButton } from '@/components/controls/LayoutLockButton';

interface D3TopologyViewerProps extends ViewerConfig {
  className?: string;
  showMetadataPanel?: boolean;
  config?: TopologyConfig;
}

export function D3TopologyViewer({ 
  className,
  theme = 'light',
  websocketUrl,
  showMetadataPanel = true,
  config
}: D3TopologyViewerProps) {
  useWebSocket(websocketUrl);
  useD3AutoLayout();
  
  const { connected } = useTopologyStore();

  return (
    <div className={cn(
      'w-full h-full relative flex',
      theme === 'dark' && 'dark',
      className
    )}>
      <div className="flex-1 relative">
        {websocketUrl && (
          <div className="absolute top-4 right-4 z-50">
            <div className="flex items-center gap-2 px-3 py-2 body-small-macan-book" style={{
              backgroundColor: connected ? 'var(--color-green-100)' : 'var(--color-yellow-100)',
              color: connected ? 'var(--color-green-800)' : 'var(--color-yellow-600)',
              border: '1px solid var(--divider-light)'
            }}>
              {connected ? (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Connecting...</span>
                </>
              )}
            </div>
          </div>
        )}
        
        <D3TopologyCanvas config={config} />
        
        <FilterPanel />
        <SearchPanel />
        <TimelineControls />
        <D3TopologyControls />
        <ExportControls />
        <TopologyLegend />
        
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <LayoutLockButton />
        </div>
      </div>
      
      {showMetadataPanel && <MetadataPanel />}
    </div>
  );
}
