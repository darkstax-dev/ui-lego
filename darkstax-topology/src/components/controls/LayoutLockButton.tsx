import { Lock, Unlock } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';

export function LayoutLockButton() {
  const { layoutLocked, layoutStable, setLayoutLocked } = useTopologyStore();

  const handleToggle = () => {
    setLayoutLocked(!layoutLocked);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        px-3 py-2 rounded-lg border transition-all
        ${layoutLocked 
          ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200' 
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }
      `}
      title={layoutLocked ? 'Unlock layout (allow movement)' : 'Lock layout (freeze positions)'}
    >
      <div className="flex items-center gap-2">
        {layoutLocked ? (
          <>
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Locked</span>
          </>
        ) : (
          <>
            <Unlock className="w-4 h-4" />
            <span className="text-sm font-medium">Unlocked</span>
          </>
        )}
        {!layoutLocked && layoutStable && (
          <span className="ml-1 w-2 h-2 bg-green-500 rounded-full" title="Layout is stable" />
        )}
      </div>
    </button>
  );
}
