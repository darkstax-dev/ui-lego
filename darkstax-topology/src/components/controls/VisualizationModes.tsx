import { useState } from 'react';
import { Eye, Activity, Layers, Zap } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { cn } from '@/utils/cn';

export type VisualizationMode = 'default' | 'heatmap' | 'flow' | 'cluster';

export function VisualizationModes() {
  const [mode, setMode] = useState<VisualizationMode>('default');
  const { setVisualizationMode } = useTopologyStore();

  const handleModeChange = (newMode: VisualizationMode) => {
    setMode(newMode);
    setVisualizationMode(newMode);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1 flex gap-1">
        <button
          onClick={() => handleModeChange('default')}
          className={cn(
            'px-3 py-2 rounded flex items-center gap-2 text-sm font-medium transition-colors',
            mode === 'default'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title="Default View"
        >
          <Eye className="w-4 h-4" />
          Default
        </button>

        <button
          onClick={() => handleModeChange('heatmap')}
          className={cn(
            'px-3 py-2 rounded flex items-center gap-2 text-sm font-medium transition-colors',
            mode === 'heatmap'
              ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title="Heat Map View"
        >
          <Activity className="w-4 h-4" />
          Heat Map
        </button>

        <button
          onClick={() => handleModeChange('cluster')}
          className={cn(
            'px-3 py-2 rounded flex items-center gap-2 text-sm font-medium transition-colors',
            mode === 'cluster'
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title="Cluster View"
        >
          <Layers className="w-4 h-4" />
          Clusters
        </button>

        <button
          onClick={() => handleModeChange('flow')}
          className={cn(
            'px-3 py-2 rounded flex items-center gap-2 text-sm font-medium transition-colors',
            mode === 'flow'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title="Traffic Flow View"
        >
          <Zap className="w-4 h-4" />
          Flow
        </button>
      </div>
    </div>
  );
}
