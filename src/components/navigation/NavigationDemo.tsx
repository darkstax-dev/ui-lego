import React, { useState } from 'react';
import { MainNavigation } from './MainNavigation';
import { SecondaryNavigation } from './SecondaryNavigation';
import { FoldersLeftPanel, FolderItem } from './FoldersLeftPanel';

const sampleFolders: FolderItem[] = [
  {
    id: '1',
    name: 'Default',
    type: 'default',
    level: 0
  },
  {
    id: '2',
    name: 'Traffic light',
    type: 'default',
    level: 0
  },
  {
    id: '3',
    name: 'Example',
    type: 'default',
    level: 0
  },
  {
    id: '4',
    name: 'Default',
    type: 'default',
    level: 0
  },
  {
    id: '5',
    name: 'Darkstax demo',
    type: 'selected',
    expanded: true,
    level: 0,
    children: [
      {
        id: '5-1',
        name: 'API',
        type: 'default',
        level: 1
      },
      {
        id: '5-2',
        name: 'Darkstax demo',
        type: 'selected',
        expanded: true,
        level: 1,
        children: [
          {
            id: '5-2-1',
            name: 'Resources',
            type: 'selected',
            level: 2,
            isChildItem: true
          },
          {
            id: '5-2-2',
            name: 'Main resources',
            type: 'default',
            level: 2,
            isChildItem: true
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Galactic Drift',
    type: 'default',
    level: 0
  },
  {
    id: '7',
    name: 'Echoes of Eternity',
    type: 'default',
    level: 0
  },
  {
    id: '8',
    name: 'Crimson Horizon',
    type: 'default',
    level: 0
  },
  {
    id: '9',
    name: 'Example',
    type: 'default',
    level: 0
  },
  {
    id: '10',
    name: 'Default',
    type: 'empty',
    level: 0
  },
  {
    id: '11',
    name: 'Default',
    type: 'empty',
    level: 0
  },
  {
    id: '12',
    name: 'Default',
    type: 'default',
    level: 0
  },
  {
    id: '13',
    name: 'Crimson Horizon',
    type: 'empty',
    level: 0
  }
];

export const NavigationDemo: React.FC = () => {
  const [folders, setFolders] = useState<FolderItem[]>(sampleFolders);
  const [lockedRecords, setLockedRecords] = useState(true);
  const [mainNavVariant, setMainNavVariant] = useState<'default' | 'hub' | 'modeling-active'>('default');
  const [secondaryVariant, setSecondaryVariant] = useState<'default' | 'with-back'>('default');

  const handleFolderClick = (folder: FolderItem) => {
    console.log('Folder clicked:', folder);
    
    // Update selection
    const updateFolderSelection = (items: FolderItem[]): FolderItem[] => {
      return items.map(item => ({
        ...item,
        type: item.id === folder.id ? 'selected' : (item.type === 'selected' ? 'default' : item.type),
        children: item.children ? updateFolderSelection(item.children) : undefined
      }));
    };

    setFolders(updateFolderSelection(folders));
  };

  const handleFolderToggle = (folderId: string, expanded: boolean) => {
    const updateFolderExpansion = (items: FolderItem[]): FolderItem[] => {
      return items.map(item => ({
        ...item,
        expanded: item.id === folderId ? expanded : item.expanded,
        children: item.children ? updateFolderExpansion(item.children) : undefined
      }));
    };

    setFolders(updateFolderExpansion(folders));
  };

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleCreateScenario = () => {
    console.log('Create scenario clicked');
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Controls for demo */}
      <div style={{ 
        padding: '20px', 
        background: 'white', 
        borderBottom: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Macan, sans-serif' }}>Navigation Demo Controls</h3>
        
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Main Navigation Variant:
            </label>
            <select
              value={mainNavVariant}
              onChange={(e) => setMainNavVariant(e.target.value as any)}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white'
              }}
            >
              <option value="default">Default</option>
              <option value="modeling-active">Modeling Active</option>
              <option value="hub">Hub</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Secondary Navigation Variant:
            </label>
            <select
              value={secondaryVariant}
              onChange={(e) => setSecondaryVariant(e.target.value as any)}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white'
              }}
            >
              <option value="default">Default</option>
              <option value="with-back">With Back Arrow</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <MainNavigation variant={mainNavVariant} />

      {/* Secondary Navigation */}
      <SecondaryNavigation
        variant={secondaryVariant}
        scenarioTitle="[Demo Scenario]"
        showLockedToggle={true}
        lockedRecords={lockedRecords}
        onLockedToggle={setLockedRecords}
        onSearch={handleSearch}
        onCreateScenario={handleCreateScenario}
      />

      {/* Content area with folders panel */}
      <div style={{ 
        display: 'flex', 
        maxWidth: '1400px', 
        margin: '0 auto',
        minHeight: '600px',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <FoldersLeftPanel
          folders={folders}
          onFolderClick={handleFolderClick}
          onFolderToggle={handleFolderToggle}
        />
        
        {/* Main content area */}
        <div style={{ 
          flex: 1, 
          padding: '24px',
          background: 'white'
        }}>
          <h2 style={{ 
            margin: '0 0 16px 0',
            color: '#00112B',
            fontFamily: "'Macan Mono Stencil Trial', sans-serif",
            fontSize: '24px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '1.2px'
          }}>
            Main Content Area
          </h2>
          <p style={{ 
            color: '#00112B',
            fontFamily: 'Macan, sans-serif',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            This demo shows the three navigation components working together:
          </p>
          <ul style={{ 
            color: '#00112B',
            fontFamily: 'Macan, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            paddingLeft: '20px'
          }}>
            <li><strong>Main Navigation:</strong> Top navigation bar with logo, menu items, and user actions</li>
            <li><strong>Secondary Navigation:</strong> Scenario-based navigation with search, filters, and actions</li>
            <li><strong>Folders Left Panel:</strong> Hierarchical folder structure with expandable items</li>
          </ul>

          <div style={{ 
            marginTop: '24px',
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
              Current State:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', lineHeight: '1.4' }}>
              <li>Main Nav Variant: <code>{mainNavVariant}</code></li>
              <li>Secondary Nav Variant: <code>{secondaryVariant}</code></li>
              <li>Locked Records: <code>{lockedRecords ? 'true' : 'false'}</code></li>
              <li>Selected Folder: <code>{folders.find(f => f.type === 'selected')?.name || 'None'}</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationDemo;
