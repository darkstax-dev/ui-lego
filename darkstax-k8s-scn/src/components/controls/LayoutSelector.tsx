import { useUIStore } from '../../store/uiStore';
import { LayoutMode } from '../../types';

export function LayoutSelector() {
  const { layoutMode, setLayoutMode } = useUIStore();

  const layouts: Array<{ value: LayoutMode; label: string }> = [
    { value: 'hierarchy', label: 'Hierarchy' },
    { value: 'force', label: 'Force' },
    { value: 'tree', label: 'Tree' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-macan text-gray-500">Layout:</label>
      <select
        value={layoutMode}
        onChange={(e) => setLayoutMode(e.target.value as LayoutMode)}
        className="h-10 px-3 bg-gray-200 text-blue-dark-950 font-macan text-base outline-none hover:bg-gray-400 transition-colors"
        aria-label="Select layout mode"
      >
        {layouts.map((layout) => (
          <option key={layout.value} value={layout.value}>
            {layout.label}
          </option>
        ))}
      </select>
    </div>
  );
}
