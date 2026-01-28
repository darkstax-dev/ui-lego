import { ReactNode } from 'react';
import { ResourceMenuPanel } from '../panels/ResourceMenuPanel';
import { MetadataPanel } from '../panels/MetadataPanel';
import { StatusLegendTooltip } from '../ui/StatusLegendTooltip';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <main className="flex-1 relative bg-gray-300">
              {children}
              <ResourceMenuPanel />
              <StatusLegendTooltip />
              <MetadataPanel />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
