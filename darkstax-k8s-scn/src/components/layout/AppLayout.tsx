import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { BottomPanel } from './BottomPanel';
import { ResourceMenuPanel } from '../panels/ResourceMenuPanel';
import { MetadataPanel } from '../panels/MetadataPanel';
import { StatusLegendTooltip } from '../ui/StatusLegendTooltip';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-300 overflow-hidden">
      {/* Header */}
      <AppHeader />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Topology Canvas */}
        <main className="flex-1 relative">
          {children}
          <ResourceMenuPanel />
          <StatusLegendTooltip />
        </main>

        {/* Metadata Panel (slides in when node selected) */}
        <MetadataPanel />
      </div>
      
      {/* Bottom Panel */}
      <BottomPanel />
    </div>
  );
}
