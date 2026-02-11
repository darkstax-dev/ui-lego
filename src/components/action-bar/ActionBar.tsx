import React from 'react';
import './ActionBar.css';
import Button from '../buttons/Button';
import SearchField from '../inputs/SearchField';
import SwitchField from '../inputs/SwitchField';

export interface ActionBarProps {
  title: string;
  onlyLockedRecords?: boolean;
  onToggleLocked?: (checked: boolean) => void;
  filterValue?: string;
  onFilterChange?: (filter: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onDownload?: () => void;
  onUpload?: () => void;
  onCreateScenario?: () => void;
  className?: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  title,
  onlyLockedRecords = false,
  onToggleLocked,
  filterValue = 'All',
  onFilterChange,
  searchValue = '',
  onSearchChange,
  onDownload,
  onUpload,
  onCreateScenario,
  className = '',
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const filterOptions = ['All', 'Active', 'Inactive', 'Locked'];

  const handleFilterSelect = (option: string) => {
    onFilterChange?.(option);
    setIsFilterOpen(false);
  };

  return (
    <div className={`action-bar ${className}`}>
      <div className="action-bar__container">
        {/* Left Section - Title and Toggle */}
        <div className="action-bar__left">
          <h1 className="action-bar__title">{title}</h1>
          
          <div className="action-bar__toggle">
            <SwitchField
              label="Only locked records"
              checked={onlyLockedRecords}
              onChange={(checked) => onToggleLocked?.(checked)}
              labelPosition="left"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="action-bar__right">
          {/* Filter Dropdown */}
          <div className="action-bar__filter">
            <button
              className="action-bar__filter-button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>{filterValue}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isFilterOpen && (
              <div className="action-bar__filter-dropdown">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className={`action-bar__filter-option ${filterValue === option ? 'action-bar__filter-option--selected' : ''}`}
                    onClick={() => handleFilterSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="action-bar__search">
            <SearchField
              value={searchValue}
              onChange={(value) => onSearchChange?.(value)}
              placeholder="Search"
            />
          </div>

          {/* Download Button */}
          <button
            className="action-bar__icon-button"
            onClick={onDownload}
            aria-label="Download"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 12.5L6.25 8.75L7.54167 7.41667L9.16667 9.04167V2.5H10.8333V9.04167L12.4583 7.41667L13.75 8.75L10 12.5ZM4.16667 17.5C3.70833 17.5 3.31583 17.3369 2.98917 17.0108C2.66306 16.6842 2.5 16.2917 2.5 15.8333V12.5H4.16667V15.8333H15.8333V12.5H17.5V15.8333C17.5 16.2917 17.3369 16.6842 17.0108 17.0108C16.6842 17.3369 16.2917 17.5 15.8333 17.5H4.16667Z" fill="currentColor"/>
            </svg>
          </button>

          {/* Upload Button */}
          <button
            className="action-bar__icon-button"
            onClick={onUpload}
            aria-label="Upload"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5L13.75 6.25L12.4583 7.58333L10.8333 5.95833V12.5H9.16667V5.95833L7.54167 7.58333L6.25 6.25L10 2.5ZM4.16667 17.5C3.70833 17.5 3.31583 17.3369 2.98917 17.0108C2.66306 16.6842 2.5 16.2917 2.5 15.8333V12.5H4.16667V15.8333H15.8333V12.5H17.5V15.8333C17.5 16.2917 17.3369 16.6842 17.0108 17.0108C16.6842 17.3369 16.2917 17.5 15.8333 17.5H4.16667Z" fill="currentColor"/>
            </svg>
          </button>

          {/* Create Scenario Button */}
          <Button
            variant="primary"
            size="md"
            onClick={onCreateScenario}
          >
            CREATE_SCENARIO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
