import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export function SearchFilter() {
  const [inputValue, setInputValue] = useState('');
  const { filters, addFilter, removeFilter } = useUIStore();
  
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
          placeholder="Search nodes (e.g., pod, deployment, active)"
          className="w-full h-10 pl-10 pr-4 bg-gray-200 text-blue-dark-950 font-macan text-base placeholder:text-gray-500 outline-none focus:bg-white transition-colors"
        />
      </div>
      
      {/* Active Filters */}
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <div 
            key={filter.id} 
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-full"
          >
            <span className="text-sm font-macan">{filter.label}</span>
            <button 
              onClick={() => removeFilter(filter.id)}
              className="hover:bg-blue-600 rounded-full p-0.5 transition-colors"
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
