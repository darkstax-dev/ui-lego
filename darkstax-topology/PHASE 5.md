Implement comprehensive UI controls, information panels, filters, and timeline controls to create a fully interactive topology viewer. This phase adds user-facing controls for layout manipulation, node/edge inspection, query filtering, and time-travel capabilities.

Prerequisites Verification
Before starting Phase 5, verify Phase 3 is complete:

bash
cd darkstax-topology
npm run type-check  # Should pass
npm run dev         # Should show topology with auto-layout
You should see:

✅ Nodes automatically positioned with force layout
✅ WebSocket connection status indicator
✅ Interactive graph with drag, zoom, pan
✅ MiniMap and basic controls
Phase 5 Overview
This phase implements:

Topology Controls - Zoom, fit view, layout switching, expand/collapse
Filter Panel - Query input, highlight, search
Metadata Panel - Node/edge details, metrics display
Timeline Controls - Time travel, live/history mode
Legend Component - Node type legend with color coding
Object Detail Viewer - JSON tree viewer for metadata
Task 1: Create Topology Controls Component
File: src/components/controls/TopologyControls.tsx

typescript
import { 
  ZoomIn, ZoomOut, Maximize, Expand, Minimize2, 
  LayoutGrid, Pin, PinOff, RefreshCw 
} from 'lucide-react';
import { useReactFlow } from 'reactflow';
import { useTopologyStore } from '@/store/topologyStore';
import { useAutoLayout } from '@/hooks/useAutoLayout';
import { cn } from '@/utils/cn';
export function TopologyControls() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { 
    layoutAlgorithm, 
    setLayoutAlgorithm, 
    autoLayout, 
    setAutoLayout 
  } = useTopologyStore();
  const { applyLayout } = useAutoLayout();
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      {/* Zoom Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1">
        <button
          onClick={() => zoomIn()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors block w-full"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => zoomOut()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors block w-full"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => fitView({ padding: 0.2, duration: 800 })}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors block w-full"
          title="Fit View"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>
      {/* Layout Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1">
        <button
          onClick={() => {
            setLayoutAlgorithm('force');
            setAutoLayout(true);
          }}
          className={cn(
            'p-2 rounded transition-colors block w-full',
            layoutAlgorithm === 'force' 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title="Force Layout"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setLayoutAlgorithm('hierarchical');
            setAutoLayout(true);
          }}
          className={cn(
            'p-2 rounded transition-colors block w-full',
            layoutAlgorithm === 'hierarchical' 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title="Hierarchical Layout"
        >
          <Expand className="w-5 h-5" />
        </button>
        <button
          onClick={() => setAutoLayout(!autoLayout)}
          className={cn(
            'p-2 rounded transition-colors block w-full',
            autoLayout 
              ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          title={autoLayout ? 'Disable Auto-Layout' : 'Enable Auto-Layout'}
        >
          {autoLayout ? <Pin className="w-5 h-5" /> : <PinOff className="w-5 h-5" />}
        </button>
        <button
          onClick={() => applyLayout()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors block w-full"
          title="Re-apply Layout"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
File: src/components/controls/index.ts

typescript
export { TopologyControls } from './TopologyControls';
export { FilterPanel } from './FilterPanel';
export { LayoutControls } from './LayoutControls';
export { TimelineControls } from './TimelineControls';
Task 2: Create Filter Panel Component
File: src/components/controls/FilterPanel.tsx

typescript
import { useState } from 'react';
import { Search, X, Filter, Star, History } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { cn } from '@/utils/cn';
export function FilterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { filter, setFilter, highlight, setHighlight } = useTopologyStore();
  const [favorites, setFavorites] = useState<string[]>([
    'g.V().Has("Type", "host")',
    'g.V().Has("Type", "container")',
    'g.V().Has("State", "UP")',
  ]);
  const addToFavorites = () => {
    if (filter && !favorites.includes(filter)) {
      setFavorites([...favorites, filter]);
    }
  };
  const applyFavorite = (query: string) => {
    setFilter(query);
  };
  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-colors',
          isOpen 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
        title="Toggle Filter Panel"
      >
        <Filter className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-12 left-0 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
          {/* Filter Query */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter Query
              </label>
              <button
                onClick={addToFavorites}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                title="Add to Favorites"
              >
                <Star className="w-3 h-3" />
                Save
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="e.g. g.V().Has('Type', 'host')"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {filter && (
                <button
                  onClick={() => setFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use Gremlin-like syntax to filter nodes
            </p>
          </div>
          {/* Highlight Query */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Highlight
            </label>
            <div className="relative">
              <input
                type="text"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="Highlight nodes..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {highlight && (
                <button
                  onClick={() => setHighlight('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>
          </div>
          {/* Favorites */}
          {favorites.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Favorites
                </label>
              </div>
              <div className="space-y-1">
                {favorites.map((fav, index) => (
                  <button
                    key={index}
                    onClick={() => applyFavorite(fav)}
                    className="w-full text-left px-3 py-2 text-xs bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 transition-colors font-mono"
                  >
                    {fav}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Quick Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('g.V().Has("Type", "host")')}
                className="px-3 py-1 text-xs bg-topology-host text-white rounded-full hover:opacity-80 transition-opacity"
              >
                Hosts
              </button>
              <button
                onClick={() => setFilter('g.V().Has("Type", "container")')}
                className="px-3 py-1 text-xs bg-topology-container text-white rounded-full hover:opacity-80 transition-opacity"
              >
                Containers
              </button>
              <button
                onClick={() => setFilter('g.V().Has("Type", "pod")')}
                className="px-3 py-1 text-xs bg-topology-pod text-white rounded-full hover:opacity-80 transition-opacity"
              >
                Pods
              </button>
              <button
                onClick={() => setFilter('')}
                className="px-3 py-1 text-xs bg-gray-500 text-white rounded-full hover:opacity-80 transition-opacity"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
Task 3: Create Object Detail Viewer
File: src/components/panels/ObjectDetail.tsx

typescript
import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
interface ObjectDetailProps {
  object: any;
  level?: number;
  defaultExpanded?: boolean;
}
export function ObjectDetail({ object, level = 0, defaultExpanded = true }: ObjectDetailProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const copyValue = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };
  const renderValue = (key: string, value: any, depth: number) => {
    const isExpanded = expanded[key] ?? defaultExpanded;
    if (value === null || value === undefined) {
      return (
        <div className="flex items-center gap-2 py-1">
          <span className="text-gray-600 dark:text-gray-400 font-medium">{key}:</span>
          <span className="text-gray-400 dark:text-gray-500 italic">null</span>
        </div>
      );
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div key={key}>
          <button
            onClick={() => toggleExpand(key)}
            className="flex items-center gap-1 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-1 -mx-1 w-full text-left"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <span className="text-gray-600 dark:text-gray-400 font-medium">{key}</span>
            <span className="text-xs text-gray-400">
              {Object.keys(value).length} {Object.keys(value).length === 1 ? 'item' : 'items'}
            </span>
          </button>
          {isExpanded && (
            <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-1">
              <ObjectDetail object={value} level={depth + 1} defaultExpanded={false} />
            </div>
          )}
        </div>
      );
    }
    if (Array.isArray(value)) {
      return (
        <div key={key}>
          <button
            onClick={() => toggleExpand(key)}
            className="flex items-center gap-1 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-1 -mx-1 w-full text-left"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <span className="text-gray-600 dark:text-gray-400 font-medium">{key}</span>
            <span className="text-xs text-gray-400">
              [{value.length}]
            </span>
          </button>
          {isExpanded && (
            <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-1">
              {value.map((item, index) => (
                <div key={index} className="py-1">
                  {typeof item === 'object' ? (
                    <ObjectDetail object={{ [index]: item }} level={depth + 1} defaultExpanded={false} />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">[{index}]</span>
                      <span className="text-gray-900 dark:text-gray-100 font-mono text-sm">
                        {String(item)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    // Primitive value
    const stringValue = String(value);
    const isCopied = copied === key;
    return (
      <div key={key} className="flex items-center justify-between gap-2 py-1 group">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-gray-600 dark:text-gray-400 font-medium flex-shrink-0">{key}:</span>
          <span className={cn(
            'font-mono text-sm truncate',
            typeof value === 'number' && 'text-blue-600 dark:text-blue-400',
            typeof value === 'boolean' && 'text-purple-600 dark:text-purple-400',
            typeof value === 'string' && 'text-gray-900 dark:text-gray-100'
          )}>
            {typeof value === 'string' ? `"${value}"` : stringValue}
          </span>
        </div>
        <button
          onClick={() => copyValue(stringValue, key)}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          title="Copy value"
        >
          {isCopied ? (
            <Check className="w-3 h-3 text-green-600" />
          ) : (
            <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
    );
  };
  return (
    <div className="space-y-0.5">
      {Object.entries(object).map(([key, value]) => renderValue(key, value, level))}
    </div>
  );
}
Task 4: Create Metadata Panel
File: src/components/panels/MetadataPanel.tsx

typescript
import { X, Info, Activity, Network } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { ObjectDetail } from './ObjectDetail';
import { formatBandwidth } from '@/utils/bandwidth';
import { cn } from '@/utils/cn';
export function MetadataPanel() {
  const { selectedNodeId, selectedEdgeId, nodes, edges, selectNode, selectEdge } = useTopologyStore();
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const selectedEdge = edges.find(e => e.id === selectedEdgeId);
  const handleClose = () => {
    selectNode(null);
    selectEdge(null);
  };
  if (!selectedNode && !selectedEdge) {
    return (
      <div className="w-96 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center p-8">
          <Info className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Select a node or edge to view details
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-96 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {selectedNode?.data.label || 'Edge Details'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono truncate">
            {selectedNode?.id || selectedEdge?.id}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedNode && (
          <div className="p-4 space-y-4">
            {/* Node Type Badge */}
            <div className="flex items-center gap-2">
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                selectedNode.type === 'host' && 'bg-topology-host text-white',
                selectedNode.type === 'container' && 'bg-topology-container text-white',
                selectedNode.type === 'pod' && 'bg-topology-pod text-white',
                selectedNode.type === 'service' && 'bg-topology-service text-white',
                !['host', 'container', 'pod', 'service'].includes(selectedNode.type) && 'bg-gray-500 text-white'
              )}>
                {selectedNode.type}
              </span>
              {selectedNode.data.metadata.State && (
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  selectedNode.data.metadata.State === 'UP' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                )}>
                  {selectedNode.data.metadata.State}
                </span>
              )}
            </div>
            {/* Bandwidth Metrics */}
            {selectedNode.data.bandwidth !== undefined && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    Metrics
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Bandwidth:</span>
                    <span className="font-mono text-gray-900 dark:text-gray-100">
                      {formatBandwidth(selectedNode.data.bandwidth * 1e9)}
                    </span>
                  </div>
                  {selectedNode.data.metadata.LastUpdateMetric && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">RX Bytes:</span>
                        <span className="font-mono text-gray-900 dark:text-gray-100">
                          {selectedNode.data.metadata.LastUpdateMetric.RxBytes?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">TX Bytes:</span>
                        <span className="font-mono text-gray-900 dark:text-gray-100">
                          {selectedNode.data.metadata.LastUpdateMetric.TxBytes?.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {/* Metadata */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                Metadata
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <ObjectDetail object={selectedNode.data.metadata} />
              </div>
            </div>
          </div>
        )}
        {selectedEdge && (
          <div className="p-4 space-y-4">
            {/* Edge Type Badge */}
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-gray-500" />
              <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-medium">
                {selectedEdge.type}
              </span>
            </div>
            {/* Connection Info */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Source:</span>
                  <div className="font-mono text-gray-900 dark:text-gray-100 mt-1">
                    {selectedEdge.source}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Target:</span>
                  <div className="font-mono text-gray-900 dark:text-gray-100 mt-1">
                    {selectedEdge.target}
                  </div>
                </div>
              </div>
            </div>
            {/* Edge Metrics */}
            {(selectedEdge.data.bandwidth || selectedEdge.data.latency) && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Metrics
                </h3>
                <div className="space-y-2">
                  {selectedEdge.data.bandwidth && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Bandwidth:</span>
                      <span className="font-mono text-gray-900 dark:text-gray-100">
                        {formatBandwidth(selectedEdge.data.bandwidth * 1e9)}
                      </span>
                    </div>
                  )}
                  {selectedEdge.data.latency && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Latency:</span>
                      <span className="font-mono text-gray-900 dark:text-gray-100">
                        {selectedEdge.data.latency}ms
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Metadata */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                Metadata
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <ObjectDetail object={selectedEdge.data.metadata} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
File: src/components/panels/index.ts

typescript
export { MetadataPanel } from './MetadataPanel';
export { ObjectDetail } from './ObjectDetail';
Task 5: Create Timeline Controls
File: src/components/controls/TimelineControls.tsx

typescript
import { useState } from 'react';
import { Clock, Play, Pause, SkipBack, Calendar } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';
export function TimelineControls() {
  const { mode, setMode, timeContext, setTimeContext } = useTopologyStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toggleMode = () => {
    setMode(mode === 'live' ? 'history' : 'live');
  };
  const goToTime = () => {
    const timestamp = selectedDate.getTime();
    setTimeContext(timestamp);
    setMode('history');
  };
  const goLive = () => {
    setTimeContext(0);
    setMode('live');
  };
  return (
    <div className="absolute bottom-4 left-4 z-10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-colors flex items-center gap-2',
          isExpanded 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <Clock className="w-5 h-5" />
        <span className="text-sm font-medium">
          {mode === 'live' ? 'Live' : 'History'}
        </span>
      </button>
      {isExpanded && (
        <div className="absolute bottom-12 left-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
          {/* Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('live')}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2',
                  mode === 'live'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                <Play className="w-4 h-4" />
                Live
              </button>
              <button
                onClick={() => setMode('history')}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2',
                  mode === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                <Pause className="w-4 h-4" />
                History
              </button>
            </div>
          </div>
          {/* Time Selection (only in history mode) */}
          {mode === 'history' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Time
                </label>
                <input
                  type="datetime-local"
                  value={format(selectedDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToTime}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Go to Time
                </button>
                <button
                  onClick={goLive}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <SkipBack className="w-4 h-4" />
                  Go Live
                </button>
              </div>
              {timeContext > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Viewing: {format(new Date(timeContext), 'PPpp')}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
Task 6: Create Topology Legend
File: src/components/legend/TopologyLegend.tsx

typescript
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
          {/* Node Types */}
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
          {/* Edge Types */}
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
          {/* Bandwidth Indicator */}
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
File: src/components/legend/index.ts

typescript
export { TopologyLegend } from './TopologyLegend';
Task 7: Update TopologyCanvas with All Controls
File: src/components/TopologyViewer/TopologyCanvas.tsx

Update to include all new controls:

typescript
import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTopologyStore } from '@/store/topologyStore';
import { nodeTypes } from '@/lib/reactflow/nodeTypes';
import { edgeTypes } from '@/lib/reactflow/edgeTypes';
import { useAutoLayout } from '@/hooks/useAutoLayout';
import { TopologyControls } from '@/components/controls/TopologyControls';
import { FilterPanel } from '@/components/controls/FilterPanel';
import { TimelineControls } from '@/components/controls/TimelineControls';
import { TopologyLegend } from '@/components/legend/TopologyLegend';
export function TopologyCanvas() {
  const { 
    nodes, 
    edges, 
    selectNode, 
    selectEdge 
  } = useTopologyStore();
  
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const { applyLayout } = useAutoLayout();
  useEffect(() => {
    setRfNodes(nodes);
  }, [nodes, setRfNodes]);
  useEffect(() => {
    setRfEdges(edges);
  }, [edges, setRfEdges]);
  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    selectNode(node.id);
  }, [selectNode]);
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: any) => {
    selectEdge(edge.id);
  }, [selectEdge]);
  const onPaneClick = useCallback(() => {
    selectNode(null);
    selectEdge(null);
  }, [selectNode, selectEdge]);
  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-left"
        className="bg-gray-50 dark:bg-gray-900"
        minZoom={0.1}
        maxZoom={2}
      >
        <Background 
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          className="bg-gray-50 dark:bg-gray-900"
        />
        <Controls 
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          showInteractive={false}
        />
        <MiniMap 
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          nodeColor={(node) => {
            const colorMap: Record<string, string> = {
              host: '#0072ff',
              container: '#2eb969',
              pod: '#ed8b30',
              service: '#00112b',
              default: '#6b7280'
            };
            return colorMap[node.type || 'default'] || colorMap.default;
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
      {/* Custom Controls */}
      <FilterPanel />
      <TimelineControls />
      <TopologyControls />
      <TopologyLegend />
    </div>
  );
}
Task 8: Update TopologyViewer with Metadata Panel
File: src/components/TopologyViewer/TopologyViewer.tsx

typescript
import { ReactFlowProvider } from 'reactflow';
import { TopologyCanvas } from './TopologyCanvas';
import { MetadataPanel } from '@/components/panels/MetadataPanel';
import { TopologyConfig } from '@/types/topology';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useTopologyStore } from '@/store/topologyStore';
import { cn } from '@/utils/cn';
import { Wifi, WifiOff } from 'lucide-react';
interface TopologyViewerProps extends TopologyConfig {
  className?: string;
  showMetadataPanel?: boolean;
}
export function TopologyViewer({ 
  className,
  theme = 'light',
  websocketUrl,
  showMetadataPanel = true
}: TopologyViewerProps) {
  const { isConnected } = useWebSocket(websocketUrl);
  const { connected } = useTopologyStore();
  return (
    <div className={cn(
      'w-full h-full relative flex',
      theme === 'dark' && 'dark',
      className
    )}>
      <ReactFlowProvider>
        <div className="flex-1 relative">
          {websocketUrl && (
            <div className="absolute top-4 right-4 z-50">
              <div className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg text-sm',
                connected 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              )}>
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
          
          <TopologyCanvas />
        </div>
        
        {showMetadataPanel && <MetadataPanel />}
      </ReactFlowProvider>
    </div>
  );
}
Task 9: Update Public API
File: src/index.ts

typescript
// Main component
export { TopologyViewer } from './components/TopologyViewer/TopologyViewer';
// Store
export { useTopologyStore } from './store/topologyStore';
// Node components
export { 
  BaseNode,
  HostNode,
  ContainerNode,
  PodNode,
  ServiceNode,
  NetworkNode,
  GroupNode
} from './components/nodes';
// Edge components
export {
  NetworkEdge,
  OwnershipEdge,
  PolicyEdge
} from './components/edges';
// Control components
export {
  TopologyControls,
  FilterPanel,
  TimelineControls
} from './components/controls';
// Panel components
export {
  MetadataPanel,
  ObjectDetail
} from './components/panels';
// Legend
export { TopologyLegend } from './components/legend';
// Hooks
export { useAutoLayout } from './hooks/useAutoLayout';
export { useWebSocket } from './hooks/useWebSocket';
// Types
export type {
  TopologyNode,
  TopologyEdge,
  NodeGroup,
  NodeMetadata,
  MetricData,
  NodeType
} from './types/graph';
export type {
  TopologyConfig,
  TopologyMode,
  LayoutAlgorithm,
  BandwidthConfig
} from './types/topology';
// Utilities
export { formatBandwidth, getBandwidthColor } from './utils/bandwidth';
export { cn } from './utils/cn';
// Styles
import './styles/index.css';
Task 10: Update App.tsx for Full Testing
File: src/App.tsx

typescript
import { useEffect, useState } from 'react';
import { TopologyViewer } from './components/TopologyViewer/TopologyViewer';
import { useTopologyStore } from './store/topologyStore';
import { TopologyNode, TopologyEdge } from './types/graph';
const mockNodes: TopologyNode[] = [
  {
    id: '1',
    type: 'host',
    position: { x: 250, y: 100 },
    data: {
      metadata: {
        Type: 'host',
        Name: 'host-1',
        TID: 'tid-1',
        State: 'UP',
        LastUpdateMetric: {
          Start: Date.now() - 60000,
          Last: Date.now(),
          RxBytes: 1024000,
          TxBytes: 2048000,
          RxPackets: 1000,
          TxPackets: 2000
        }
      },
      label: 'Host Server 1',
      bandwidth: 0.6
    }
  },
  {
    id: '2',
    type: 'container',
    position: { x: 100, y: 250 },
    data: {
      metadata: {
        Type: 'container',
        Name: 'web-container',
        TID: 'tid-2'
      },
      label: 'Web Container'
    }
  },
  {
    id: '3',
    type: 'pod',
    position: { x: 400, y: 250 },
    data: {
      metadata: {
        Type: 'pod',
        Name: 'app-pod',
        TID: 'tid-3',
        Namespace: 'production'
      },
      label: 'App Pod'
    }
  },
  {
    id: '4',
    type: 'service',
    position: { x: 250, y: 400 },
    data: {
      metadata: {
        Type: 'service',
        Name: 'api-service',
        TID: 'tid-4',
        ClusterIP: '10.0.0.1'
      },
      label: 'API Service'
    }
  }
];
const mockEdges: TopologyEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      },
      bandwidth: 0.4,
      label: '40 Mbps'
    }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'ownership',
    data: {
      metadata: {
        RelationType: 'ownership'
      }
    }
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer3'
      },
      bandwidth: 0.7,
      label: '70 Mbps'
    }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer3'
      },
      bandwidth: 0.3,
      label: '30 Mbps',
      latency: 5
    }
  }
];
function App() {
  const { setNodes, setEdges, setLayoutAlgorithm, setAutoLayout } = useTopologyStore();
  const [useMockData, setUseMockData] = useState(true);
  const [showMetadata, setShowMetadata] = useState(true);
  const websocketUrl = useMockData ? undefined : 'ws://localhost:8082/ws/agent/topology';
  useEffect(() => {
    if (useMockData) {
      setNodes(mockNodes);
      setEdges(mockEdges);
      setLayoutAlgorithm('force');
      setAutoLayout(true);
    }
  }, [useMockData, setNodes, setEdges, setLayoutAlgorithm, setAutoLayout]);
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Dev Controls */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center gap-4">
        <h1 className="font-bold">Darkstax Topology</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useMockData}
            onChange={(e) => setUseMockData(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Use Mock Data</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showMetadata}
            onChange={(e) => setShowMetadata(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Show Metadata Panel</span>
        </label>
        {!useMockData && (
          <span className="text-xs text-gray-400">
            WebSocket: {websocketUrl}
          </span>
        )}
      </div>
      {/* Topology Viewer */}
      <div className="flex-1">
        <TopologyViewer 
          theme="light"
          websocketUrl={websocketUrl}
          showMetadataPanel={showMetadata}
        />
      </div>
    </div>
  );
}
export default App;
Validation Steps
1. Type Check
bash
npm run type-check
2. Start Dev Server
bash
npm run dev
3. Test All Controls
Open http://localhost:5173 and verify:

Topology Controls (bottom-right):

✅ Zoom in/out buttons work
✅ Fit view centers and scales graph
✅ Force layout button applies physics simulation
✅ Hierarchical layout arranges nodes in layers
✅ Auto-layout toggle enables/disables automatic positioning
✅ Re-apply layout button triggers layout recalculation
Filter Panel (top-left):

✅ Opens/closes on click
✅ Filter input accepts text
✅ Quick filter buttons populate filter field
✅ Favorites list displays saved queries
✅ Clear button resets filter
Timeline Controls (bottom-left):

✅ Opens/closes on click
✅ Live/History mode toggle works
✅ Date/time picker appears in history mode
✅ "Go to Time" button sets time context
✅ "Go Live" button returns to live mode
Legend (top-right):

✅ Opens/closes on click
✅ Shows node types with colors
✅ Shows edge types with styles
✅ Shows bandwidth indicators
Metadata Panel (right side):

✅ Shows "Select a node" message when nothing selected
✅ Displays node details when node clicked
✅ Shows node type badge
✅ Shows bandwidth metrics if available
✅ Displays metadata in expandable tree
✅ Shows edge details when edge clicked
✅ Copy buttons work on metadata values
✅ Close button clears selection
Expected Outcome
After Phase 5, you should have:

✅ Full UI Controls - Zoom, layout switching, auto-layout toggle
✅ Filter Panel - Query input, quick filters, favorites
✅ Metadata Panel - Detailed node/edge inspection with metrics
✅ Timeline Controls - Live/history mode, time travel
✅ Legend - Visual guide for node/edge types and bandwidth
✅ Object Detail Viewer - Expandable JSON tree for metadata
✅ Professional UI - Polished, responsive, dark mode ready
The topology viewer is now feature-complete with all interactive controls and information panels!

Troubleshooting
Issue: Controls overlap on small screens

Fix: Add responsive breakpoints or make panels collapsible
Issue: Metadata panel doesn't update when selecting nodes

Fix: Check that selectNode and selectEdge are being called in onNodeClick/onEdgeClick
Issue: Filter panel doesn't close when clicking outside

Fix: Add click-outside detection using useEffect and event listeners
Issue: Timeline date picker doesn't work

Fix: Ensure date-fns is installed: npm install date-fns
Issue: Legend colors don't match node colors

Fix: Verify tailwind.config.js has matching topology color definitions