import { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LegendItem {
  type: string;
  label: string;
  color: string;
  icon?: string;
}

const nodeLegend: LegendItem[] = [
  { type: 'host', label: 'Host', color: '#0072ff', icon: '🖥️' },
  { type: 'container', label: 'Container', color: '#2eb969', icon: '📦' },
  { type: 'pod', label: 'Pod', color: '#ed8b30', icon: '⬡' },
  { type: 'service', label: 'Service', color: '#00112b', icon: '☁️' },
  { type: 'network', label: 'Network', color: '#ff3b31', icon: '🔌' },
];

const edgeLegend: LegendItem[] = [
  { type: 'network', label: 'Network Link', color: '#10b981' },
  { type: 'ownership', label: 'Ownership', color: '#d1d5db' },
  { type: 'policy', label: 'Policy', color: '#ef4444' },
];

export function TopologyLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute top-4 right-20 z-10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-colors flex items-center gap-2',
          isExpanded 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <Info className="w-5 h-5" />
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Node Types
            </h3>
            <div className="space-y-2">
              {nodeLegend.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.icon && <span className="text-sm">{item.icon}</span>}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Edge Types
            </h3>
            <div className="space-y-2">
              {edgeLegend.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="w-8 h-0.5 flex-shrink-0"
                    style={{ 
                      backgroundColor: item.color,
                      ...(item.type === 'ownership' && { 
                        backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0, currentColor 4px, transparent 4px, transparent 8px)',
                        backgroundColor: 'transparent',
                        color: item.color
                      })
                    }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Bandwidth
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Low (&lt; 30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-yellow-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Medium (30-60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1.5 bg-orange-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">High (60-80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Critical (&gt; 80%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
