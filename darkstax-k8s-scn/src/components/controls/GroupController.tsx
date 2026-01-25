import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTopologyStore } from '../../store/topologyStore';
import { useState } from 'react';

export function GroupController() {
  const { groups, toggleGroupCollapse } = useTopologyStore();
  const [isExpanded, setIsExpanded] = useState(true);

  if (groups.length === 0) {
    return null;
  }

  const sortedGroups = [...groups].sort((a, b) => a.level - b.level);

  return (
    <div 
      className="bg-white rounded-lg shadow-lg max-w-[200px] z-20"
      style={{ position: 'absolute', top: '1rem', right: '1rem' }}
    >
      <div 
        className="flex items-center justify-between p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xs font-macan font-semibold text-blue-dark-950">
          Groups
        </h3>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </div>
      {isExpanded && (
        <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto">
          {sortedGroups.map((group) => {
            const ownerNode = useTopologyStore.getState().nodes.find(n => n.id === group.ownerId);
            const indentLevel = group.level * 12;
            
            return (
              <div
                key={group.id}
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
                style={{ paddingLeft: `${indentLevel + 4}px` }}
                onClick={() => toggleGroupCollapse(group.id)}
              >
                <button className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  {group.collapsed ? (
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-gray-600" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-macan text-blue-dark-950 truncate">
                    {ownerNode?.label || group.ownerId}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {group.memberIds.length}m{group.collapsed && ' ✓'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
