import React, { useState } from 'react';
import { TopBar, TopBarProps } from './TopBar';

export const TopBarDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<TopBarProps['activeSection']>('topology');

  const handleMenuItemClick = (section: string) => {
    setActiveSection(section as TopBarProps['activeSection']);
    console.log('Menu item clicked:', section);
  };

  const handleActionClick = (action: string) => {
    console.log('Action clicked:', action);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f5f5f5' }}>
      <TopBar
        activeSection={activeSection}
        onMenuItemClick={handleMenuItemClick}
        onActionClick={handleActionClick}
      />
      
      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <h1 style={{ color: '#333', marginBottom: '24px' }}>TopBar Component Demo</h1>
        
        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{ color: '#333', marginBottom: '16px' }}>Current State</h2>
          <p><strong>Active Section:</strong> {activeSection}</p>
          <p><em>Click on menu items or action buttons to see interactions in the console.</em></p>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{ color: '#333', marginBottom: '16px' }}>Features</h2>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Responsive design that adapts to different screen sizes</li>
            <li>Interactive menu items with active state highlighting</li>
            <li>User action buttons (theme, security, settings, notifications)</li>
            <li>Avatar with notification indicator</li>
            <li>HUB section with custom icon pattern</li>
            <li>Keyboard navigation support</li>
            <li>Accessibility features with proper ARIA labels</li>
          </ul>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '16px' }}>Test Different States</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['dashboard', 'topology', 'modeling', 'template'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section as TopBarProps['activeSection'])}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: activeSection === section ? '#071F42' : 'white',
                  color: activeSection === section ? 'white' : '#333',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarDemo;
