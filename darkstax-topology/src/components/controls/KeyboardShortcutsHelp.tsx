import { X } from 'lucide-react';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { category: 'Navigation', items: [
    { keys: ['+', '='], description: 'Zoom in' },
    { keys: ['-'], description: 'Zoom out' },
    { keys: ['0'], description: 'Fit view' },
    { keys: ['Esc'], description: 'Clear selection' },
  ]},
  { category: 'Layout', items: [
    { keys: ['F'], description: 'Force layout' },
    { keys: ['H'], description: 'Hierarchical layout' },
    { keys: ['L'], description: 'Re-apply layout' },
    { keys: ['A'], description: 'Toggle auto-layout' },
  ]},
  { category: 'Actions', items: [
    { keys: ['Ctrl/Cmd', 'E'], description: 'Export menu' },
    { keys: ['?'], description: 'Show shortcuts' },
  ]},
];

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Close shortcuts help"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {shortcuts.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">
                            {key}
                          </kbd>
                          {keyIndex < item.keys.length - 1 && (
                            <span className="mx-1 text-gray-400">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
