import { useEffect, useRef, useState } from 'react';
import { 
  Copy, EyeOff, Pin, 
  Maximize2, Info
} from 'lucide-react';
import { TopologyNode, TopologyEdge } from '@/types/graph';

interface ContextMenuProps {
  x: number;
  y: number;
  node?: TopologyNode;
  edge?: TopologyEdge;
  onClose: () => void;
  onAction: (action: string, target?: TopologyNode | TopologyEdge) => void;
}

export function ContextMenu({ x, y, node, edge, onClose, onAction }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const newX = x + rect.width > window.innerWidth ? x - rect.width : x;
      const newY = y + rect.height > window.innerHeight ? y - rect.height : y;
      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAction = (action: string) => {
    const target = node || edge;
    if (target) {
      onAction(action, target);
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[180px] z-50"
      style={{ left: position.x, top: position.y }}
    >
      {node && (
        <>
          <button
            onClick={() => handleAction('view-details')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <Info className="w-4 h-4" />
            View Details
          </button>

          <button
            onClick={() => handleAction('copy-id')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <Copy className="w-4 h-4" />
            Copy ID
          </button>

          <button
            onClick={() => handleAction('pin')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <Pin className="w-4 h-4" />
            Pin Node
          </button>

          <button
            onClick={() => handleAction('hide')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <EyeOff className="w-4 h-4" />
            Hide Node
          </button>

          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

          <button
            onClick={() => handleAction('expand-neighbors')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <Maximize2 className="w-4 h-4" />
            Expand Neighbors
          </button>
        </>
      )}

      {edge && (
        <>
          <button
            onClick={() => handleAction('view-details')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <Info className="w-4 h-4" />
            View Details
          </button>

          <button
            onClick={() => handleAction('copy-id')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <Copy className="w-4 h-4" />
            Copy ID
          </button>

          <button
            onClick={() => handleAction('hide')}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
          >
            <EyeOff className="w-4 h-4" />
            Hide Edge
          </button>
        </>
      )}
    </div>
  );
}
