import { ChevronDown } from 'lucide-react';
import { Menu, UserCircle } from 'lucide-react';
import { SearchFilter } from '../controls/SearchFilter';
import { LayoutSelector } from '../controls/LayoutSelector';

export function AppHeader() {
  return (
    <header className="w-full h-14 bg-blue-800 text-white flex items-center px-4 gap-4 shadow-sm">
      <button
        className="w-9 h-9 flex items-center justify-center rounded hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 font-macan text-base font-semibold">
        <div className="w-7 h-7 rounded-full bg-white text-blue-800 flex items-center justify-center text-xs font-bold">
          S
        </div>
        Skydive UI
      </div>

      <div className="flex-1 flex items-center gap-3 justify-end">
        <LayoutSelector />
        <div className="max-w-md w-full">
          <SearchFilter />
        </div>
        <button
          className="w-9 h-9 flex items-center justify-center rounded hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="User menu"
        >
          <UserCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
