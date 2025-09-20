import React, { useState, useRef, useEffect, useCallback } from 'react';
import './MainNavigation.css';

export interface MainNavigationProps {
  variant?: 'default' | 'hub' | 'modeling-active';
  className?: string;
}

interface DropdownMenuData {
  [key: string]: string[];
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  variant = 'default',
  className = '',
}) => {
  const isModelingActive = variant === 'modeling-active';
  const isHubVariant = variant === 'hub';
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample dropdown data - can be customized per menu item
  const dropdownData: DropdownMenuData = {
    dashboard: ['Kubernetes Dashboard', 'System Overview', 'Cluster Metrics'],
    topology: ['Network Topology', 'Service Mesh', 'Infrastructure Map'],
    modeling: ['Data Models', 'Process Models', 'System Architecture'],
    template: ['Deployment Templates', 'Configuration Templates', 'Workflow Templates'],
    administration: ['User Management', 'Role Configuration', 'Security Settings'],
    settings: ['General Settings', 'Advanced Configuration', 'Integration Settings']
  };

  const closeAll = useCallback(() => setOpenDropdown(null), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeAll();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [closeAll]);

  const handleMenuItemClick = (menuKey: string) => {
    setOpenDropdown(openDropdown === menuKey ? null : menuKey);
  };

  const handleDropdownItemClick = (item: string) => {
    console.log('Dropdown item clicked:', item);
    setOpenDropdown(null);
  };

  const dropdownId = (key: string) => `main-navigation__dropdown--${key}`;

  return (
    <nav className={`main-navigation ${className}`}>
      <div className="main-navigation__container">
        <div className="main-navigation__left">
          {/* Logo */}
          <div className="main-navigation__logo">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/66d85f041619c4b1cc791ac3409ce1ffa1c59ca7?width=240" 
              alt="Logo" 
              className="main-navigation__logo-image"
            />
          </div>

          {/* Menu Items */}
          <div className="main-navigation__menu" ref={dropdownRef}>
            <div className="main-navigation__menu-item-wrapper">
              <button
                type="button"
                className={`main-navigation__menu-item ${openDropdown === 'dashboard' ? 'main-navigation__menu-item--open' : ''}`}
                onClick={() => handleMenuItemClick('dashboard')}
                aria-expanded={openDropdown === 'dashboard'}
                aria-haspopup="true"
                aria-controls={dropdownId('dashboard')}
              >
                <svg className="main-navigation__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.833 17.5V9.16667H17.4997V17.5H10.833ZM2.49969 10.8333V2.5H9.16636V10.8333H2.49969ZM7.49969 9.16667V4.16667H4.16636V9.16667H7.49969ZM2.49969 17.5V12.5H9.16636V17.5H2.49969ZM4.16636 15.8333H7.49969V14.1667H4.16636V15.8333ZM12.4997 15.8333H15.833V10.8333H12.4997V15.8333ZM10.833 2.5H17.4997V7.5H10.833V2.5ZM12.4997 4.16667V5.83333H15.833V4.16667H12.4997Z" fill="currentColor"/>
                </svg>
                <span className="main-navigation__menu-text">Dashboard</span>
                <svg
                  className={`main-navigation__menu-expand ${openDropdown === 'dashboard' ? 'main-navigation__menu-expand--open' : ''}`}
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                >
                  <path d={openDropdown === 'dashboard' ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : "M9.16667 9.16666V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16666H9.16667Z"} fill="currentColor"/>
                </svg>
              </button>

              {openDropdown === 'dashboard' && (
                <div className="main-navigation__dropdown" id={dropdownId('dashboard')}>
                  {dropdownData.dashboard.map((item, index) => (
                    <button
                      key={index}
                      className="main-navigation__dropdown-item"
                      onClick={() => handleDropdownItemClick(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!isHubVariant && (
              <>
                <div className="main-navigation__menu-item-wrapper">
                  <button
                    type="button"
                    className={`main-navigation__menu-item ${openDropdown === 'topology' ? 'main-navigation__menu-item--open' : ''}`}
                    onClick={() => handleMenuItemClick('topology')}
                    aria-expanded={openDropdown === 'topology'}
                    aria-haspopup="true"
                    aria-controls={dropdownId('topology')}
                  >
                    <svg className="main-navigation__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5.62471 2.08331C6.0898 2.08331 6.55035 2.17492 6.98004 2.35291C7.40974 2.53089 7.80017 2.79177 8.12904 3.12064C8.45792 3.44952 8.71879 3.83995 8.89678 4.26964C9.07477 4.69934 9.16637 5.15988 9.16637 5.62498V9.16665H5.62471C4.6854 9.16665 3.78456 8.79351 3.12037 8.12932C2.45618 7.46513 2.08304 6.56429 2.08304 5.62498C2.08304 4.68567 2.45618 3.78483 3.12037 3.12064C3.78456 2.45645 4.6854 2.08331 5.62471 2.08331Z" fill="currentColor"/>
                    </svg>
                    <span className="main-navigation__menu-text">Topology</span>
                    <svg
                      className={`main-navigation__menu-expand ${openDropdown === 'topology' ? 'main-navigation__menu-expand--open' : ''}`}
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                    >
                      <path d={openDropdown === 'topology' ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : "M9.16667 9.16666V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16666H9.16667Z"} fill="currentColor"/>
                    </svg>
                  </button>

                  {openDropdown === 'topology' && (
                    <div className="main-navigation__dropdown" id={dropdownId('topology')}>
                      {dropdownData.topology.map((item, index) => (
                        <button
                          key={index}
                          className="main-navigation__dropdown-item"
                          onClick={() => handleDropdownItemClick(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="main-navigation__menu-item-wrapper">
                  <button
                    type="button"
                    className={`main-navigation__menu-item ${isModelingActive ? 'main-navigation__menu-item--active' : ''} ${openDropdown === 'modeling' ? 'main-navigation__menu-item--open' : ''}`}
                    onClick={() => handleMenuItemClick('modeling')}
                    aria-expanded={openDropdown === 'modeling'}
                    aria-haspopup="true"
                    aria-controls={dropdownId('modeling')}
                  >
                    <svg className="main-navigation__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.49969 2.5H7.49969V5.83333H2.49969V2.5ZM12.4997 8.33333H17.4997V11.6667H12.4997V8.33333ZM12.4997 14.1667H17.4997V17.5H12.4997V14.1667ZM10.833 10.8333H5.83303V15H10.833V16.6667H5.83303H4.16636V7.5H5.83303V9.16667H10.833V10.8333Z" fill="currentColor"/>
                    </svg>
                    <span className="main-navigation__menu-text">Modeling</span>
                    <svg
                      className={`main-navigation__menu-expand ${openDropdown === 'modeling' ? 'main-navigation__menu-expand--open' : ''}`}
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                    >
                      <path d={(isModelingActive && openDropdown !== 'modeling') ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : (openDropdown === 'modeling' ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : "M9.16667 9.16666V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16666H9.16667Z")} fill="currentColor"/>
                    </svg>
                  </button>

                  {openDropdown === 'modeling' && (
                    <div className="main-navigation__dropdown" id={dropdownId('modeling')}>
                      {dropdownData.modeling.map((item, index) => (
                        <button
                          key={index}
                          className="main-navigation__dropdown-item"
                          onClick={() => handleDropdownItemClick(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="main-navigation__menu-item-wrapper">
                  <button
                    type="button"
                    className={`main-navigation__menu-item ${openDropdown === 'template' ? 'main-navigation__menu-item--open' : ''}`}
                    onClick={() => handleMenuItemClick('template')}
                    aria-expanded={openDropdown === 'template'}
                    aria-haspopup="true"
                    aria-controls={dropdownId('template')}
                  >
                    <svg className="main-navigation__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6.66636 3.33335H17.4997V5.00002H6.66636V3.33335ZM2.49969 2.91669H4.99969V5.41669H2.49969V2.91669ZM2.49969 8.75002H4.99969V11.25H2.49969V8.75002ZM2.49969 14.5834H4.99969V17.0834H2.49969V14.5834ZM6.66636 9.16669H17.4997V10.8334H6.66636V9.16669ZM6.66636 15H17.4997V16.6667H6.66636V15Z" fill="currentColor"/>
                    </svg>
                    <span className="main-navigation__menu-text">Template</span>
                    <svg
                      className={`main-navigation__menu-expand ${openDropdown === 'template' ? 'main-navigation__menu-expand--open' : ''}`}
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                    >
                      <path d={openDropdown === 'template' ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : "M9.16667 9.16666V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16666H9.16667Z"} fill="currentColor"/>
                    </svg>
                  </button>

                  {openDropdown === 'template' && (
                    <div className="main-navigation__dropdown" id={dropdownId('template')}>
                      {dropdownData.template.map((item, index) => (
                        <button
                          key={index}
                          className="main-navigation__dropdown-item"
                          onClick={() => handleDropdownItemClick(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {isHubVariant && (
              <>
                <div className="main-navigation__menu-item-wrapper">
                  <button
                    type="button"
                    className={`main-navigation__menu-item ${openDropdown === 'administration' ? 'main-navigation__menu-item--open' : ''}`}
                    onClick={() => handleMenuItemClick('administration')}
                    aria-expanded={openDropdown === 'administration'}
                    aria-haspopup="true"
                    aria-controls={dropdownId('administration')}
                  >
                    <svg className="main-navigation__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.33304 18.3333C3.33304 16.5652 4.03542 14.8695 5.28566 13.6193C6.5359 12.369 8.2316 11.6666 9.9997 11.6666C11.7678 11.6666 13.4635 12.369 14.7137 13.6193C15.964 14.8695 16.6664 16.5652 16.6664 18.3333H14.9997C14.9997 17.0072 14.4729 15.7355 13.5352 14.7978C12.5976 13.8601 11.3258 13.3333 9.9997 13.3333C8.67362 13.3333 7.40185 13.8601 6.46417 14.7978C5.52649 15.7355 4.9997 17.0072 4.9997 18.3333H3.33304ZM9.9997 10.8333C7.2372 10.8333 4.9997 8.59581 4.9997 5.83331C4.9997 3.07081 7.2372 0.833313 9.9997 0.833313C12.7622 0.833313 14.9997 3.07081 14.9997 5.83331C14.9997 8.59581 12.7622 10.8333 9.9997 10.8333Z" fill="currentColor"/>
                    </svg>
                    <span className="main-navigation__menu-text">Administration</span>
                    <svg
                      className={`main-navigation__menu-expand ${openDropdown === 'administration' ? 'main-navigation__menu-expand--open' : ''}`}
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                    >
                      <path d={openDropdown === 'administration' ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : "M9.16667 9.16666V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16666H9.16667Z"} fill="currentColor"/>
                    </svg>
                  </button>

                  {openDropdown === 'administration' && (
                    <div className="main-navigation__dropdown" id={dropdownId('administration')}>
                      {dropdownData.administration.map((item, index) => (
                        <button
                          key={index}
                          className="main-navigation__dropdown-item"
                          onClick={() => handleDropdownItemClick(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="main-navigation__menu-item-wrapper">
                  <button
                    type="button"
                    className={`main-navigation__menu-item ${openDropdown === 'settings' ? 'main-navigation__menu-item--open' : ''}`}
                    onClick={() => handleMenuItemClick('settings')}
                    aria-expanded={openDropdown === 'settings'}
                    aria-haspopup="true"
                    aria-controls={dropdownId('settings')}
                  >
                    <svg className="main-navigation__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9.99967 0.833313L17.9163 5.41665V14.5833L9.99967 19.1666L2.08301 14.5833V5.41665L9.99967 0.833313ZM9.99967 2.75915L3.74967 6.37748V13.6225L9.99967 17.2408L16.2497 13.6225V6.37748L9.99967 2.75915ZM9.99967 13.3333C9.11562 13.3333 8.26777 12.9821 7.64265 12.357C7.01753 11.7319 6.66634 10.884 6.66634 9.99998C6.66634 9.11592 7.01753 8.26808 7.64265 7.64296C8.26777 7.01784 9.11562 6.66665 9.99967 6.66665C10.8837 6.66665 11.7316 7.01784 12.3567 7.64296C12.9818 8.26808 13.333 9.11592 13.333 9.99998C13.333 10.884 12.9818 11.7319 12.3567 12.357C11.7316 12.9821 10.8837 13.3333 9.99967 13.3333Z" fill="currentColor"/>
                    </svg>
                    <span className="main-navigation__menu-text">Settings</span>
                    <svg
                      className={`main-navigation__menu-expand ${openDropdown === 'settings' ? 'main-navigation__menu-expand--open' : ''}`}
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                    >
                      <path d={openDropdown === 'settings' ? "M4.16667 9.16666H15.8333V10.8333H4.16667V9.16666Z" : "M9.16667 9.16666V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16666H9.16667Z"} fill="currentColor"/>
                    </svg>
                  </button>

                  {openDropdown === 'settings' && (
                    <div className="main-navigation__dropdown" id={dropdownId('settings')}>
                      {dropdownData.settings.map((item, index) => (
                        <button
                          key={index}
                          className="main-navigation__dropdown-item"
                          onClick={() => handleDropdownItemClick(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="main-navigation__right">
          {/* Hub Icon */}
          <div className="main-navigation__hub">
            <div className="main-navigation__hub-icon">
              {/* Hub pattern SVG - Simplified diamond pattern matching Figma design */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                {/* Row 1 */}
                <path d="M6.5 0L4 2L6.5 4L9 2L6.5 0Z" fill="var(--color-red-600)"/>
                <path d="M10.5 0L8 2L10.5 4L13 2L10.5 0Z" fill="var(--color-red-600)"/>
                <path d="M14.5 0L12 2L14.5 4L17 2L14.5 0Z" fill="var(--color-red-600)"/>
                <path d="M18.5 0L16 2L18.5 4L21 2L18.5 0Z" fill="var(--color-red-600)"/>
                <path d="M22.5 0L20 2L22.5 4L25 2L22.5 0Z" fill="var(--color-red-600)"/>
                <path d="M26.5 0L24 2L26.5 4L29 2L26.5 0Z" fill="var(--color-red-600)"/>

                {/* Row 2 */}
                <path d="M2 4L0 6L2 8L4 6L2 4Z" fill="var(--color-red-600)"/>
                <path d="M6.5 4L4 6L6.5 8L9 6L6.5 4Z" fill="var(--color-red-600)"/>
                <path d="M10.5 4L8 6L10.5 8L13 6L10.5 4Z" fill="var(--color-red-600)"/>
                <path d="M14.5 4L12 6L14.5 8L17 6L14.5 4Z" fill="var(--color-red-600)"/>
                <path d="M18.5 4L16 6L18.5 8L21 6L18.5 4Z" fill="var(--color-red-600)"/>
                <path d="M22.5 4L20 6L22.5 8L25 6L22.5 4Z" fill="var(--color-red-600)"/>
                <path d="M26.5 4L24 6L26.5 8L29 6L26.5 4Z" fill="var(--color-red-600)"/>
                <path d="M30 4L28 6L30 8L32 6L30 4Z" fill="var(--color-red-600)"/>

                {/* Row 3 */}
                <path d="M2 8L0 10L2 12L4 10L2 8Z" fill="var(--color-red-600)"/>
                <path d="M6.5 8L4 10L6.5 12L9 10L6.5 8Z" fill="var(--color-red-600)"/>
                <path d="M18.5 8L16 10L18.5 12L21 10L18.5 8Z" fill="var(--color-red-600)"/>
                <path d="M22.5 8L20 10L22.5 12L25 10L22.5 8Z" fill="var(--color-red-600)"/>
                <path d="M26.5 8L24 10L26.5 12L29 10L26.5 8Z" fill="var(--color-red-600)"/>
                <path d="M30 8L28 10L30 12L32 10L30 8Z" fill="var(--color-red-600)"/>
              </svg>
            </div>
            <span className="main-navigation__hub-text">HUB</span>
          </div>

          {/* Divider */}
          <div className="main-navigation__divider"></div>

          {/* User Actions */}
          <div className="main-navigation__actions">
            <button className="main-navigation__action-btn" aria-label="Theme toggle" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.0001 7C9.99992 8.39064 10.4139 9.74983 11.1893 10.9042C11.9648 12.0586 13.0665 12.9559 14.3539 13.4816C15.6413 14.0073 17.0562 14.1376 18.418 13.8559C19.7798 13.5742 21.0269 12.8933 22.0001 11.9V12C22.0001 17.523 17.5231 22 12.0001 22C6.47712 22 2.00012 17.523 2.00012 12C2.00012 6.477 6.47712 2 12.0001 2H12.1001C11.4342 2.65113 10.9053 3.42896 10.5446 4.28768C10.1839 5.1464 9.99881 6.06862 10.0001 7Z" fill="currentColor"/>
              </svg>
            </button>

            <button className="main-navigation__action-btn" aria-label="Security" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.00012 10H20.0001C20.2653 10 20.5197 10.1054 20.7072 10.2929C20.8948 10.4805 21.0001 10.7348 21.0001 11V21C21.0001 21.2652 20.8948 21.5196 20.7072 21.7071C20.5197 21.8947 20.2653 22 20.0001 22H4.00012C3.73491 22 3.48055 21.8947 3.29302 21.7071C3.10548 21.5196 3.00012 21.2652 3.00012 21V11C3.00012 10.7348 3.10548 10.4805 3.29302 10.2929C3.48055 10.1054 3.73491 10 4.00012 10H5.00012V9.00003C4.99955 7.42273 5.5317 5.89147 6.51031 4.65446C7.48892 3.41746 8.85663 2.54721 10.3917 2.18479C11.9268 1.82237 13.5393 1.98903 14.9678 2.65774C16.3964 3.32645 17.5572 4.45802 18.2621 5.86903L16.4731 6.76303C15.9696 5.75505 15.1404 4.94668 14.1199 4.46898C13.0995 3.99128 11.9476 3.87225 10.851 4.13121C9.75442 4.39016 8.77745 5.0119 8.07848 5.89564C7.37951 6.77937 6.99952 7.87329 7.00012 9.00003V10Z" fill="currentColor"/>
              </svg>
            </button>

            <button className="main-navigation__action-btn" aria-label="Settings" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.0001 1L21.5001 6.5V17.5L12.0001 23L2.50012 17.5V6.5L12.0001 1ZM12.0001 3.311L4.50012 7.653V16.347L12.0001 20.689L19.5001 16.347V7.653L12.0001 3.311ZM12.0001 16C10.9393 16 9.92184 15.5786 9.17169 14.8284C8.42155 14.0783 8.00012 13.0609 8.00012 12C8.00012 10.9391 8.42155 9.92172 9.17169 9.17157C9.92184 8.42143 10.9393 8 12.0001 8C13.061 8 14.0784 8.42143 14.8285 9.17157C15.5787 9.92172 16.0001 10.9391 16.0001 12C16.0001 13.0609 15.5787 14.0783 14.8285 14.8284C14.0784 15.5786 13.061 16 12.0001 16Z" fill="currentColor"/>
              </svg>
            </button>

            <button className="main-navigation__action-btn" aria-label="Notifications" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.0001 17H22.0001V19H2.00012V17H4.00012V10C4.00012 7.87827 4.84298 5.84344 6.34327 4.34315C7.84356 2.84285 9.87839 2 12.0001 2C14.1219 2 16.1567 2.84285 17.657 4.34315C19.1573 5.84344 20.0001 7.87827 20.0001 10V17ZM18.0001 17V10C18.0001 8.4087 17.368 6.88258 16.2428 5.75736C15.1175 4.63214 13.5914 4 12.0001 4C10.4088 4 8.8827 4.63214 7.75748 5.75736C6.63226 6.88258 6.00012 8.4087 6.00012 10V17H18.0001Z" fill="currentColor"/>
              </svg>
            </button>

            {/* Avatar */}
            <div className="main-navigation__avatar">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/a48d5bc2fd1b7d01958dc2614a4a8c974336e21d?width=80" 
                alt="User avatar" 
                className="main-navigation__avatar-image"
              />
              <div className="main-navigation__avatar-indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
