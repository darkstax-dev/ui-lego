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
        {/* Left Section - Title only */}
        <div className="action-bar__left">
          <h1 className="action-bar__title">{title}</h1>
        </div>

        {/* Right Section - Actions */}
        <div className="action-bar__right">
          {/* Only Locked Records toggle - left of filter */}
          <div className="action-bar__toggle">
            <SwitchField
              label="Only locked records"
              checked={onlyLockedRecords}
              onChange={(checked) => onToggleLocked?.(checked)}
              labelPosition="left"
            />
          </div>

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

          {/* Export Button */}
          <button
            className="action-bar__icon-button"
            onClick={onUpload}
            aria-label="Export"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_6770_12977)">
                <path d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85666V14.1667H9.16667V4.85666L4.1075 9.91666L2.92917 8.73832L10 1.66666L17.0708 8.73749L15.8925 9.91582L10.8333 4.85832V4.85666Z" fill="#78797A"/>
              </g>
              <defs>
                <clipPath id="clip0_6770_12977">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Import Button */}
          <button
            className="action-bar__icon-button"
            onClick={onDownload}
            aria-label="Import"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_6770_12972)">
                <path d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 10.9767L15.8925 5.91666L17.0708 7.09499L10 14.1667L2.92917 7.09582L4.1075 5.91666L9.16667 10.975V1.66666H10.8333V10.9767Z" fill="#78797A"/>
              </g>
              <defs>
                <clipPath id="clip0_6770_12972">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Create Scenario Button */}
          <Button
            variant="primary"
            size="big"
            onClick={onCreateScenario}
          >
            Create Scenario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
