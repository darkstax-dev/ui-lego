import { useState, useEffect } from 'react';
import { Search, X, Filter, Star, History } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { FilterEngine } from '@/lib/graph/FilterEngine';
import { cn } from '@/utils/cn';

export function FilterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { nodes, edges, filter, setFilter, setNodes, setEdges } = useTopologyStore();
  const [originalNodes, setOriginalNodes] = useState(nodes);
  const [originalEdges, setOriginalEdges] = useState(edges);
  const [favorites, setFavorites] = useState<string[]>([
    'g.V().Has("Type", "host")',
    'g.V().Has("Type", "container")',
    'g.V().Has("State", "UP")',
  ]);

  useEffect(() => {
    if (!filter && nodes.length > 0) {
      setOriginalNodes(nodes);
      setOriginalEdges(edges);
    }
  }, [nodes, edges, filter]);

  useEffect(() => {
    if (!filter) {
      if (originalNodes.length > 0) {
        setNodes(originalNodes);
        setEdges(originalEdges);
      }
      return;
    }

    const filterEngine = new FilterEngine(originalNodes, originalEdges);
    const result = filterEngine.executeQuery(filter);
    
    setNodes(result.nodes.length > 0 ? result.nodes : originalNodes);
    setEdges(result.edges.length > 0 ? result.edges : originalEdges);
  }, [filter, originalNodes, originalEdges, setNodes, setEdges]);

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
        aria-label="Toggle filter panel"
        aria-expanded={isOpen}
      >
        <Filter className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
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
                aria-label="Filter query input"
              />
              {filter && (
                <button
                  onClick={() => setFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear filter"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use Gremlin-like syntax to filter nodes
            </p>
          </div>


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
