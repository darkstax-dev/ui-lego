import React, { useState } from 'react';
import { MainNavigation } from './MainNavigation';
import { SecondaryNavigation } from './SecondaryNavigation';
import { FoldersLeftPanel, FolderItem } from './FoldersLeftPanel';
import './NavigationDemo.css';

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
    <div className="navigation-demo">
      <div className="navigation-demo__controls">
        <h3 className="navigation-demo__controls-title">Navigation Demo Controls</h3>

        <div className="navigation-demo__controls-row">
          <div>
            <label className="navigation-demo__label">Main Navigation Variant:</label>
            <select
              value={mainNavVariant}
              onChange={(e) => setMainNavVariant(e.target.value as any)}
              className="navigation-demo__select"
            >
              <option value="default">Default</option>
              <option value="modeling-active">Modeling Active</option>
              <option value="hub">Hub</option>
            </select>
          </div>

          <div>
            <label className="navigation-demo__label">Secondary Navigation Variant:</label>
            <select
              value={secondaryVariant}
              onChange={(e) => setSecondaryVariant(e.target.value as any)}
              className="navigation-demo__select"
            >
              <option value="default">Default</option>
              <option value="with-back">With Back Arrow</option>
            </select>
          </div>
        </div>
      </div>

      <MainNavigation variant={mainNavVariant} />

      <SecondaryNavigation
        variant={secondaryVariant}
        scenarioTitle="[Demo Scenario]"
        showLockedToggle={true}
        lockedRecords={lockedRecords}
        onLockedToggle={setLockedRecords}
        onSearch={handleSearch}
        onCreateScenario={handleCreateScenario}
      />

      <div className="navigation-layout">
        <FoldersLeftPanel
          folders={folders}
          onFolderClick={handleFolderClick}
          onFolderToggle={handleFolderToggle}
        />

        <div className="navigation-content">
          <h2 className="navigation-content__title">Main Content Area</h2>
          <p className="navigation-content__description">
            This demo shows the three navigation components working together:
          </p>
          <ul className="navigation-content__list">
            <li><strong>Main Navigation:</strong> Top navigation bar with logo, menu items, and user actions</li>
            <li><strong>Secondary Navigation:</strong> Scenario-based navigation with search, filters, and actions</li>
            <li><strong>Folders Left Panel:</strong> Hierarchical folder structure with expandable items</li>
          </ul>

          <div className="navigation-content__panel">
            <h4 className="navigation-content__panel-title">
              Current State:
            </h4>
            <ul className="navigation-content__panel-list">
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
