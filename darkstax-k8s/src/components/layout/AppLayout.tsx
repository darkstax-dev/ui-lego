import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { MetadataPanel } from '../panels/MetadataPanel';
import { ResourceMenuPanel } from '../panels/ResourceMenuPanel';
import { StatusLegendTooltip } from '../ui/StatusLegendTooltip';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      <AppHeader />

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-14 flex items-center px-4 border-b border-gray-200">
            <span className="text-sm font-macan text-gray-500">Navigation</span>
          </div>
          <nav className="flex-1 px-2 py-3 space-y-1 text-sm text-blue-dark-950">
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Settings</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Documentation</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">About</button>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <main className="flex-1 relative bg-gray-300">
              {children}
            </main>
            <ResourceMenuPanel />
            <StatusLegendTooltip />
          </div>
          <MetadataPanel />
        </div>
      </div>
    </div>
  );
}
