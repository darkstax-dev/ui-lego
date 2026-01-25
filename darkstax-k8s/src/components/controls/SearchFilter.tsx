import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export function SearchFilter() {
  const [inputValue, setInputValue] = useState('');
  const { filters, addFilter, removeFilter, toggleFilter } = useUIStore();
  
  const handleSearch = () => {
    if (inputValue.trim()) {
      addFilter({
        label: inputValue,
        query: inputValue,
        active: true
      });
      setInputValue('');
    }
  };
  
  return (
    <div className="flex items-center gap-2 flex-1">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search nodes (e.g., name, namespace, type, status)"
          className="w-full h-10 pl-10 pr-4 bg-gray-200 text-blue-dark-950 font-macan text-base placeholder:text-gray-500 outline-none focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300"
        />
      </div>
      
      {/* Active Filters */}
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
              filter.active ? 'bg-blue-500 text-white' : 'bg-gray-300 text-blue-dark-950'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFilter(filter.id)}
              className="text-sm font-macan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300"
              aria-pressed={filter.active}
              aria-label={`Toggle filter: ${filter.label}`}
            >
              {filter.label}
            </button>
            <button
              onClick={() => removeFilter(filter.id)}
              className={`rounded-full p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 ${
                filter.active ? 'hover:bg-blue-600' : 'hover:bg-gray-400'
              }`}
              aria-label={`Remove filter: ${filter.label}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
