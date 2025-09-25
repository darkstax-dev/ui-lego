import React from 'react';
import './TopBar.css';

export interface TopBarProps {
  activeSection?: 'dashboard' | 'topology' | 'modeling' | 'template';
  className?: string;
  onMenuItemClick?: (section: string) => void;
  onActionClick?: (action: string) => void;
  onTopologyItemClick?: (item: string) => void;
}

type TopologyItem = 'kubernetes-dashboard' | 'scenario' | 'resource-template' | 'metamapper';

export const TopBar: React.FC<TopBarProps> = ({
  activeSection = 'topology',
  className = '',
  onMenuItemClick,
  onActionClick,
  onTopologyItemClick,
}) => {
  const [expandedTopologyItems, setExpandedTopologyItems] = React.useState<TopologyItem[]>([]);

  const topologyOptions: { key: TopologyItem; label: string }[] = [
    { key: 'kubernetes-dashboard', label: 'Kubernetes Dashboard' },
    { key: 'scenario', label: 'Scenario' },
    { key: 'resource-template', label: 'Resource Template' },
    { key: 'metamapper', label: 'Metamapper' },
  ];

  const toggleTopologyItem = (item: TopologyItem) => {
    setExpandedTopologyItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
    onTopologyItemClick?.(item);
  };

  const handleMenuClick = (section: string) => {
    onMenuItemClick?.(section);
  };

  const handleActionClick = (action: string) => {
    onActionClick?.(action);
  };

  return (
    <nav className={`top-bar ${className}`}>
      <div className="top-bar__container">
        {/* Left Section */}
        <div className="top-bar__left">
          {/* Logo */}
          <div className="top-bar__logo">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/66d85f041619c4b1cc791ac3409ce1ffa1c59ca7?width=240" 
              alt="DARKSTAX Logo" 
              className="top-bar__logo-image"
            />
          </div>

          {/* Menu Items */}
          <div className="top-bar__menu">
            {/* Dashboard */}
            <button 
              className={`top-bar__menu-item ${activeSection === 'dashboard' ? 'top-bar__menu-item--active' : ''}`}
              onClick={() => handleMenuClick('dashboard')}
            >
              <svg className="top-bar__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_dashboard)">
                  <path d="M10.8328 17.5V9.16667H17.4995V17.5H10.8328ZM2.49951 10.8333V2.5H9.16618V10.8333H2.49951ZM7.49951 9.16667V4.16667H4.16618V9.16667H7.49951ZM2.49951 17.5V12.5H9.16618V17.5H2.49951ZM4.16618 15.8333H7.49951V14.1667H4.16618V15.8333ZM12.4995 15.8333H15.8328V10.8333H12.4995V15.8333ZM10.8328 2.5H17.4995V7.5H10.8328V2.5ZM12.4995 4.16667V5.83333H15.8328V4.16667H12.4995Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_dashboard">
                    <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="top-bar__menu-text">Dashboard</span>
              <svg className="top-bar__menu-expand" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_add)">
                  <path d="M9.16602 9.16675V4.16675H10.8327V9.16675H15.8327V10.8334H10.8327V15.8334H9.16602V10.8334H4.16602V9.16675H9.16602Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_add">
                    <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Topology Section with Dropdown */}
            <div className="top-bar__menu-section">
              <button 
                className={`top-bar__menu-item ${activeSection === 'topology' ? 'top-bar__menu-item--active' : ''}`}
                onClick={() => handleMenuClick('topology')}
              >
                <svg className="top-bar__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_topology)">
                    <path d="M5.62468 2.08325C6.08977 2.08325 6.55032 2.17486 6.98001 2.35285C7.40971 2.53083 7.80014 2.79171 8.12901 3.12058C8.45789 3.44946 8.71876 3.83989 8.89675 4.26958C9.07473 4.69928 9.16634 5.15982 9.16634 5.62492V9.16658H5.62468C4.68537 9.16658 3.78453 8.79345 3.12034 8.12926C2.45615 7.46506 2.08301 6.56423 2.08301 5.62492C2.08301 4.68561 2.45615 3.78477 3.12034 3.12058C3.78453 2.45639 4.68537 2.08325 5.62468 2.08325ZM7.49968 7.49992V5.62492C7.49968 5.25408 7.38971 4.89157 7.18368 4.58322C6.97765 4.27488 6.68482 4.03456 6.34221 3.89264C5.9996 3.75073 5.6226 3.7136 5.25888 3.78595C4.89517 3.85829 4.56107 4.03687 4.29885 4.29909C4.03663 4.56132 3.85805 4.89541 3.7857 5.25912C3.71336 5.62284 3.75049 5.99984 3.8924 6.34245C4.03432 6.68506 4.27464 6.9779 4.58298 7.18392C4.89132 7.38995 5.25384 7.49992 5.62468 7.49992H7.49968ZM5.62468 10.8333H9.16634V14.3749C9.16634 15.0754 8.95863 15.7601 8.56946 16.3426C8.1803 16.925 7.62717 17.3789 6.98001 17.647C6.33286 17.9151 5.62075 17.9852 4.93373 17.8485C4.24672 17.7119 3.61565 17.3746 3.12034 16.8793C2.62503 16.3839 2.28772 15.7529 2.15106 15.0659C2.01441 14.3788 2.08454 13.6667 2.3526 13.0196C2.62066 12.3724 3.07461 11.8193 3.65703 11.4301C4.23946 11.041 4.9242 10.8333 5.62468 10.8333ZM5.62468 12.4999C5.25384 12.4999 4.89132 12.6099 4.58298 12.8159C4.27464 13.0219 4.03432 13.3148 3.8924 13.6574C3.75049 14 3.71336 14.377 3.7857 14.7407C3.85805 15.1044 4.03663 15.4385 4.29885 15.7007C4.56107 15.963 4.89517 16.1415 5.25888 16.1869C5.62259 16.2323 5.9996 16.1436 6.34221 16.0017C6.68482 15.8598 6.97765 15.6701 7.18368 15.4518C7.38971 15.2334 7.49968 14.9953 7.49968 14.7499C7.49968 14.3791 7.38971 14.0166 7.18368 13.7082C6.97765 13.3999 6.68482 13.1596 6.34221 13.0177C5.9996 12.8758 5.6226 12.8386 5.25888 12.911C4.89517 12.9833 4.56107 13.1619 4.29885 13.4241C4.03663 13.6863 3.85805 14.0204 3.7857 14.3841Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_topology">
                      <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                    </clipPath>
                  </defs>
                </svg>
                <span className="top-bar__menu-text">Topology</span>
                <svg className="top-bar__menu-expand" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_subtract)">
                    <path d="M4.16602 9.16675H15.8327V10.8334H4.16602V9.16675Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_subtract">
                      <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              
              {/* Topology Dropdown Menu */}
              {activeSection === 'topology' && (
                <div className="top-bar__dropdown">
                  {topologyOptions.map((option) => (
                    <button
                      key={option.key}
                      className="top-bar__dropdown-item"
                      onClick={() => toggleTopologyItem(option.key)}
                    >
                      <span className="top-bar__dropdown-text">{option.label}</span>
                      <svg 
                        className="top-bar__dropdown-expand" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none"
                      >
                        {expandedTopologyItems.includes(option.key) ? (
                          <g clipPath="url(#clip0_minus)">
                            <path d="M4.16602 9.16675H15.8327V10.8334H4.16602V9.16675Z" fill="currentColor"/>
                          </g>
                        ) : (
                          <g clipPath="url(#clip0_plus)">
                            <path d="M9.16602 9.16675V4.16675H10.8327V9.16675H15.8327V10.8334H10.8327V15.8334H9.16602V10.8334H4.16602V9.16675H9.16602Z" fill="currentColor"/>
                          </g>
                        )}
                        <defs>
                          <clipPath id="clip0_minus">
                            <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                          </clipPath>
                          <clipPath id="clip0_plus">
                            <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modeling */}
            <button 
              className={`top-bar__menu-item ${activeSection === 'modeling' ? 'top-bar__menu-item--active' : ''}`}
              onClick={() => handleMenuClick('modeling')}
            >
              <svg className="top-bar__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.49951 2.5H7.49951V5.83333H2.49951V2.5ZM12.4995 8.33333H17.4995V11.6667H12.4995V8.33333ZM12.4995 14.1667H17.4995V17.5H12.4995V14.1667ZM10.8328 10.8333H5.83284V15H10.8328V16.6667H5.83284H4.16618V7.5H5.83284V9.16667H10.8328V10.8333Z" fill="currentColor"/>
              </svg>
              <span className="top-bar__menu-text">Modeling</span>
              <svg className="top-bar__menu-expand" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_add2)">
                  <path d="M9.16602 9.16675V4.16675H10.8327V9.16675H15.8327V10.8334H10.8327V15.8334H9.16602V10.8334H4.16602V9.16675H9.16602Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_add2">
                    <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Template */}
            <button 
              className={`top-bar__menu-item ${activeSection === 'template' ? 'top-bar__menu-item--active' : ''}`}
              onClick={() => handleMenuClick('template')}
            >
              <svg className="top-bar__menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_template)">
                  <path d="M6.66618 3.33341H17.4995V5.00008H6.66618V3.33341ZM2.49951 2.91675H4.99951V5.41675H2.49951V2.91675ZM2.49951 8.75008H4.99951V11.2501H2.49951V8.75008ZM2.49951 14.5834H4.99951V17.0834H2.49951V14.5834ZM6.66618 9.16675H17.4995V10.8334H6.66618V9.16675ZM6.66618 15.0001H17.4995V16.6667H6.66618V15.0001Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_template">
                    <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="top-bar__menu-text">Template</span>
              <svg className="top-bar__menu-expand" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_add3)">
                  <path d="M9.16602 9.16675V4.16675H10.8327V9.16675H15.8327V10.8334H10.8327V15.8334H9.16602V10.8334H4.16602V9.16675H9.16602Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_add3">
                    <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="top-bar__right">
          {/* HUB Section */}
          <div className="top-bar__hub">
            <div className="top-bar__hub-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M2.51272 0.0488281L0.561523 2.00003L2.51272 3.95122L4.46392 2.00003L2.51272 0.0488281Z" fill="#D9322A" transform="translate(4, 0)"/>
                <path d="M2.02395 0.0488281L0.0727539 2.00003L2.02395 3.95122L3.97515 2.00003L2.02395 0.0488281Z" fill="#D9322A" transform="translate(7, 0)"/>
                <path d="M2.53665 0.0488281L0.585449 2.00003L2.53665 3.95122L4.48784 2.00003L2.53665 0.0488281Z" fill="#D9322A" transform="translate(11, 0)"/>
                <path d="M2.04885 0.0488281L0.0976562 2.00003L2.04885 3.95122L4.00005 2.00003L2.04885 0.0488281Z" fill="#D9322A" transform="translate(14, 0)"/>
                <path d="M2.56106 0.0488281L0.609863 2.00003L2.56106 3.95122L4.51226 2.00003L2.56106 0.0488281Z" fill="#D9322A" transform="translate(18, 0)"/>
                <path d="M2.07278 0.0488281L0.121582 2.00003L2.07278 3.95122L4.02398 2.00003L2.07278 0.0488281Z" fill="#D9322A" transform="translate(21, 0)"/>
                <path d="M2.58499 0.0488281L0.633789 2.00003L2.58499 3.95122L4.53618 2.00003L2.58499 0.0488281Z" fill="#D9322A" transform="translate(25, 0)"/>
                <path d="M2.00003 0.561279L0.0488281 2.51248L2.00003 4.46367L3.95122 2.51248L2.00003 0.561279Z" fill="#D9322A" transform="translate(0, 4)"/>
                <path d="M2.5129 1.73218L1.73242 2.51266L2.5129 3.29314L3.29338 2.51266L2.5129 1.73218Z" fill="#D9322A" transform="translate(4, 4)"/>
                <path d="M2.02413 1.73218L1.24365 2.51266L2.02413 3.29314L2.80461 2.51266L2.02413 1.73218Z" fill="#D9322A" transform="translate(7, 4)"/>
                <path d="M2.53634 1.73218L1.75586 2.51266L2.53634 3.29314L3.31682 2.51266L2.53634 1.73218Z" fill="#D9322A" transform="translate(11, 4)"/>
                <path d="M2.04903 1.73218L1.26855 2.51266L2.04903 3.29314L2.82951 2.51266L2.04903 1.73218Z" fill="#D9322A" transform="translate(14, 4)"/>
                <path d="M2.56124 1.73218L1.78076 2.51266L2.56124 3.29314L3.34172 2.51266L2.56124 1.73218Z" fill="#D9322A" transform="translate(18, 4)"/>
                <path d="M2.07296 1.73218L1.29248 2.51266L2.07296 3.29314L2.85344 2.51266L2.07296 1.73218Z" fill="#D9322A" transform="translate(21, 4)"/>
                <path d="M2.58517 1.73218L1.80469 2.51266L2.58517 3.29314L3.36565 2.51266L2.58517 1.73218Z" fill="#D9322A" transform="translate(25, 4)"/>
                <path d="M2.09768 0.561279L0.146484 2.51248L2.09768 4.46367L4.04888 2.51248L2.09768 0.561279Z" fill="#D9322A" transform="translate(28, 4)"/>
              </svg>
            </div>
            <span className="top-bar__hub-text">HUB</span>
          </div>

          {/* Divider */}
          <div className="top-bar__divider"></div>

          {/* User Actions */}
          <div className="top-bar__actions">
            <button 
              className="top-bar__action-btn" 
              onClick={() => handleActionClick('theme')}
              aria-label="Toggle theme"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_moon)">
                  <path d="M10 7C9.9998 8.39064 10.4138 9.74983 11.1892 10.9042C11.9646 12.0586 13.0663 12.9559 14.3538 13.4816C15.6412 14.0073 17.0561 14.1376 18.4179 13.8559C19.7797 13.5742 21.0268 12.8933 22 11.9V12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2H12.1C11.434 2.65113 10.9051 3.42896 10.5445 4.28768C10.1838 5.1464 9.99869 6.06862 10 7ZM4 12C3.99927 13.785 4.59553 15.5189 5.69389 16.926C6.79226 18.333 8.32963 19.3323 10.0614 19.7648C11.7932 20.1974 13.6199 20.0383 15.2508 19.313C16.8818 18.5876 18.2233 17.3377 19.062 15.762C17.5694 16.1136 16.0118 16.0781 14.5368 15.6587C13.0619 15.2394 11.7185 14.4501 10.6342 13.3658C9.54992 12.2815 8.76065 10.9381 8.34128 9.46318C7.92192 7.98821 7.88636 6.43056 8.238 4.938C6.95758 5.62014 5.88678 6.63766 5.14026 7.88164C4.39373 9.12562 3.99958 10.5492 4 12Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_moon">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button 
              className="top-bar__action-btn" 
              onClick={() => handleActionClick('security')}
              aria-label="Security settings"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_lock)">
                  <path d="M7 10.0001H20C20.2652 10.0001 20.5196 10.1054 20.7071 10.293C20.8946 10.4805 21 10.7349 21 11.0001V21.0001C21 21.2653 20.8946 21.5197 20.7071 21.7072C20.5196 21.8947 20.2652 22.0001 20 22.0001H4C3.73478 22.0001 3.48043 21.8947 3.29289 21.7072C3.10536 21.5197 3 21.2653 3 21.0001V11.0001C3 10.7349 3.10536 10.4805 3.29289 10.293C3.48043 10.1054 3.73478 10.0001 4 10.0001H5V9.00009C4.99943 7.42279 5.53158 5.89153 6.51019 4.65452C7.4888 3.41752 8.8565 2.54727 10.3916 2.18485C11.9267 1.82243 13.5392 1.98909 14.9677 2.6578C16.3963 3.32651 17.5571 4.45809 18.262 5.86909L16.473 6.76309C15.9695 5.75511 15.1403 4.94674 14.1198 4.46904C13.0994 3.99134 11.9475 3.87232 10.8509 4.13127C9.7543 4.39022 8.77733 5.01196 8.07836 5.8957C7.37939 6.77943 6.9994 7.87335 7 9.00009V10.0001ZM5 12.0001V20.0001H19V12.0001H5ZM10 15.0001H14V17.0001H10V15.0001Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_lock">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button 
              className="top-bar__action-btn" 
              onClick={() => handleActionClick('settings')}
              aria-label="Settings"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_settings)">
                  <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.653V16.347L12 20.689L19.5 16.347V7.653L12 3.311ZM12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_settings">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button 
              className="top-bar__action-btn" 
              onClick={() => handleActionClick('notifications')}
              aria-label="Notifications"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_notification)">
                  <path d="M20 17H22V19H2V17H4V10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10V17ZM18 17V10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10V17H18ZM9 21H15V23H9V21Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_notification">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Avatar */}
            <div className="top-bar__avatar" onClick={() => handleActionClick('profile')}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/a48d5bc2fd1b7d01958dc2614a4a8c974336e21d?width=80" 
                alt="User avatar" 
                className="top-bar__avatar-image"
              />
              <div className="top-bar__avatar-indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
