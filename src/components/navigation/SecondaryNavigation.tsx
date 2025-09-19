import React from 'react';
import './SecondaryNavigation.css';

export interface SecondaryNavigationProps {
  variant?: 'default' | 'with-back';
  scenarioTitle?: string;
  showLockedToggle?: boolean;
  lockedRecords?: boolean;
  onLockedToggle?: (checked: boolean) => void;
  onSearch?: (value: string) => void;
  onCreateScenario?: () => void;
  className?: string;
}

export const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({
  variant = 'default',
  scenarioTitle = '[Scenario]',
  showLockedToggle = true,
  lockedRecords = true,
  onLockedToggle,
  onSearch,
  onCreateScenario,
  className = '',
}) => {
  const showBackArrow = variant === 'with-back';

  return (
    <nav className={`secondary-navigation ${className}`}>
      <div className="secondary-navigation__container">
        <div className="secondary-navigation__left">
          {showBackArrow && (
            <button className="secondary-navigation__back-btn" aria-label="Go back">
              <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                <path d="M5.656 13L15.556 22.9L12.728 25.728L0 13L12.728 0.272029L15.556 3.10003L5.656 13Z" fill="#78797A"/>
              </svg>
            </button>
          )}
          <h1 className="secondary-navigation__title">{scenarioTitle}</h1>
        </div>

        <div className="secondary-navigation__right">
          {showLockedToggle && (
            <div className="secondary-navigation__toggle">
              <div className="secondary-navigation__switch">
                <input
                  type="checkbox"
                  id="locked-records"
                  className="secondary-navigation__switch-input"
                  checked={lockedRecords}
                  onChange={(e) => onLockedToggle?.(e.target.checked)}
                />
                <label htmlFor="locked-records" className="secondary-navigation__switch-label">
                  <div className="secondary-navigation__switch-track">
                    <div className="secondary-navigation__switch-thumb"></div>
                  </div>
                </label>
              </div>
              <label htmlFor="locked-records" className="secondary-navigation__toggle-text">
                Only locked records
              </label>
            </div>
          )}

          <div className="secondary-navigation__select">
            <select className="secondary-navigation__select-input">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <svg className="secondary-navigation__select-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.99999 10.9767L14.125 6.85168L15.3033 8.03002L9.99999 13.3334L4.69666 8.03002L5.87499 6.85168L9.99999 10.9767Z" fill="#78797A"/>
            </svg>
          </div>

          <div className="secondary-navigation__search">
            <svg className="secondary-navigation__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.0259 13.8475L18.595 17.4158L17.4159 18.595L13.8475 15.0258C12.5198 16.0901 10.8684 16.669 9.16669 16.6666C5.02669 16.6666 1.66669 13.3066 1.66669 9.16663C1.66669 5.02663 5.02669 1.66663 9.16669 1.66663C13.3067 1.66663 16.6667 5.02663 16.6667 9.16663C16.6691 10.8683 16.0902 12.5197 15.0259 13.8475Z" fill="#78797A"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="secondary-navigation__search-input"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>

          <div className="secondary-navigation__actions">
            <button className="secondary-navigation__action-btn" aria-label="Download">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 10.9766L15.8925 5.91663L17.0708 7.09496L10 14.1666L2.92917 7.09579L4.1075 5.91663L9.16667 10.975V1.66663H10.8333V10.9766Z" fill="#78797A"/>
              </svg>
            </button>

            <button className="secondary-navigation__action-btn" aria-label="Upload">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z" fill="#78797A"/>
              </svg>
            </button>

            <button
              className="secondary-navigation__create-btn"
              onClick={onCreateScenario}
            >
              <span className="secondary-navigation__create-text">Create scenario</span>
              <div className="secondary-navigation__create-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16663 9.16663V4.16663H10.8333V9.16663H15.8333V10.8333H10.8333V15.8333H9.16663V10.8333H4.16663V9.16663H9.16663Z" fill="white"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNavigation;
