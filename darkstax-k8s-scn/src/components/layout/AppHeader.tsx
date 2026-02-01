import { useState } from 'react';
import { SearchFilter } from '../controls/SearchFilter';
import { LayoutSelector } from '../controls/LayoutSelector';

export function AppHeader() {
  const [folderPath, setFolderPath] = useState('');
  const [fileName, setFileName] = useState('Untitled 1');

  return (
    <header className="w-full bg-gray-300 border-b border-gray-400 flex items-center px-5 gap-2" style={{ height: '72px', minHeight: '72px', maxHeight: '72px', boxSizing: 'border-box' }}>
      {/* Back Button */}
      <button 
        className="bg-gray-200 flex items-center justify-center hover:bg-gray-400 transition-colors"
        style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', boxSizing: 'border-box' }}
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6.52301 9.16786H16.6663V10.8345H6.52301L10.993 15.3045L9.81467 16.4829L3.33301 10.0012L9.81467 3.51953L10.993 4.69786L6.52301 9.16786Z" fill="#78797A"/>
        </svg>
      </button>

      {/* Folder Path Input */}
      <input
        type="text"
        value={folderPath}
        onChange={(e) => setFolderPath(e.target.value)}
        placeholder="Folder path"
        aria-label="Folder path"
        className="px-4 bg-gray-200 text-gray-500 font-macan text-base placeholder:text-gray-500"
        style={{ width: '180px', height: '40px', boxSizing: 'border-box' }}
      />

      {/* File Name Input */}
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="File name"
        aria-label="File name"
        className="px-4 bg-gray-200 text-blue-dark-950 font-macan text-base"
        style={{ width: '180px', height: '40px', boxSizing: 'border-box' }}
      />

      {/* Dropdown */}
      <button className="px-4 pr-3 bg-gray-200 flex items-center justify-between hover:bg-gray-400 transition-colors" style={{ width: '180px', height: '40px', boxSizing: 'border-box' }}>
        <span className="text-gray-500 font-macan text-base">Select node</span>
        <span
          className="w-5 h-5 text-gray-500 inline-flex items-center justify-center font-semibold leading-none text-[18px]"
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Layout Selector */}
      <LayoutSelector />

      {/* Search Filter */}
      <SearchFilter />
    </header>
  );
}
