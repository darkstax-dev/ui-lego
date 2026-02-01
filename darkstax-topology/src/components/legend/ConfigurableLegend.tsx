import { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/utils/cn';
import { TopologyConfig } from '@/types/config';

interface ConfigurableLegendProps {
  config: TopologyConfig;
  className?: string;
}

export function ConfigurableLegend({ config, className }: ConfigurableLegendProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const nodeTypes = Object.entries(config.nodeTypes);
  const edgeTypes = Object.entries(config.edgeTypes);

  return (
    <div className={cn('absolute top-4 right-20 z-10', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-colors flex items-center gap-2',
          isExpanded 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
        aria-label="Toggle legend"
      >
        <Info className="w-5 h-5" />
        <span
          className="w-4 h-4 inline-flex items-center justify-center font-semibold leading-none text-[16px]"
          aria-hidden="true"
        >
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
          {nodeTypes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Node Types
              </h3>
              <div className="space-y-2">
                {nodeTypes.map(([type, nodeConfig]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: nodeConfig.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {nodeConfig.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {edgeTypes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Edge Types
              </h3>
              <div className="space-y-2">
                {edgeTypes.map(([type, edgeConfig]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div
                      className="w-8 h-0.5 flex-shrink-0"
                      style={{ 
                        backgroundColor: edgeConfig.color,
                        ...(edgeConfig.style === 'dashed' && { 
                          backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0, currentColor 4px, transparent 4px, transparent 8px)',
                          backgroundColor: 'transparent',
                          color: edgeConfig.color
                        })
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {edgeConfig.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {config.metadata.name}
            </p>
            {config.metadata.version && (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                v{config.metadata.version}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
