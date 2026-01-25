import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { FilterEngine } from '@/lib/graph/FilterEngine';

export function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const { nodes, edges, setHighlight } = useTopologyStore();

  useEffect(() => {
    if (!searchTerm) {
      setHighlightedNodes(new Set());
      setHighlight('');
      return;
    }

    const filterEngine = new FilterEngine(nodes, edges);
    const highlighted = filterEngine.highlightNodes(searchTerm);
    setHighlightedNodes(highlighted);
    setHighlight(searchTerm);
  }, [searchTerm, nodes, edges, setHighlight]);

  return (
    <div className="absolute top-20 left-4 z-10 w-80">
      <div className="p-3" style={{ backgroundColor: 'var(--color-gray-200)', border: '1px solid var(--divider-light)' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-gray-main)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search nodes..."
            className="w-full pl-10 pr-10 py-2 body-small-macan-book"
            style={{ 
              backgroundColor: 'var(--Inputs-Input-Background)', 
              color: 'var(--text-blue-main)',
              border: '1px solid var(--divider-light)'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" style={{ color: 'var(--text-gray-main)' }} />
            </button>
          )}
        </div>

        {highlightedNodes.size > 0 && (
          <div className="mt-2 body-small-mono-book" style={{ color: 'var(--text-gray-main)' }}>
            Found {highlightedNodes.size} {highlightedNodes.size === 1 ? 'node' : 'nodes'}
          </div>
        )}
      </div>
    </div>
  );
}
