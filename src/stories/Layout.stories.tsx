import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TopBar } from '../components/bar/TopBar';
import { ActionBar } from '../components/action-bar/ActionBar';
import ScenarioTable from '../components/scenario-listing/ScenarioTable';
import type { Scenario } from '../components/scenario-listing/types';

const meta: Meta = {
  title: 'Examples/Complete Layout',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const mockScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Default',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
  },
  {
    id: '2',
    name: 'Untitled',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
  },
  {
    id: '3',
    name: 'Test_scenario',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '2.0',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
  },
  {
    id: '4',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
  },
];

export const CompleteLayout: Story = {
  render: () => {
    const [activeSection, setActiveSection] = React.useState<'dashboard' | 'topology' | 'modeling' | 'template'>('topology');
    const [onlyLocked, setOnlyLocked] = React.useState(false);
    const [filter, setFilter] = React.useState('All');
    const [search, setSearch] = React.useState('');
    const [selectedScenarios, setSelectedScenarios] = React.useState<Set<string>>(new Set());

    const filteredScenarios = mockScenarios.filter((scenario) => {
      const matchesSearch = search === '' || scenario.name.toLowerCase().includes(search.toLowerCase());
      const matchesLocked = !onlyLocked || scenario.isLocked;
      const matchesFilter =
        filter === 'All' ||
        (filter === 'Locked' && scenario.isLocked) ||
        (filter === 'Active' && !scenario.isLocked);

      return matchesSearch && matchesLocked && matchesFilter;
    });

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#CECECE' }}>
        {/* TopBar */}
        <TopBar
          activeSection={activeSection}
          onMenuItemClick={(section) => setActiveSection(section as any)}
          onActionClick={(action) => console.log('Action clicked:', action)}
          onTopologyItemClick={(item) => console.log('Topology item clicked:', item)}
        />

        {/* ActionBar */}
        <ActionBar
          title={`[${activeSection.toUpperCase()}]`}
          onlyLockedRecords={onlyLocked}
          onToggleLocked={setOnlyLocked}
          filterValue={filter}
          onFilterChange={setFilter}
          searchValue={search}
          onSearchChange={setSearch}
          onDownload={() => console.log('Download clicked')}
          onUpload={() => console.log('Upload clicked')}
          onCreateScenario={() => console.log('Create scenario clicked')}
        />

        {/* Content Area - Scenario Table */}
        <div style={{ flex: 1, padding: '0', background: '#CECECE' }}>
          <ScenarioTable
            scenarios={filteredScenarios}
            selectedScenarios={selectedScenarios}
            onScenarioSelect={(id) => {
              setSelectedScenarios((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(id)) {
                  newSet.delete(id);
                } else {
                  newSet.add(id);
                }
                return newSet;
              })}
            }
            onSelectAll={() => {
              if (selectedScenarios.size === filteredScenarios.length) {
                setSelectedScenarios(new Set());
              } else {
                setSelectedScenarios(new Set(filteredScenarios.map((s) => s.id)));
              }
            }}
            onScenarioAction={(id, action) => console.log('Scenario action:', id, action)}
            sortBy="lastModified"
            sortDirection="desc"
          />
        </div>

        {/* Info Panel */}
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            background: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '300px',
            fontSize: '12px',
            fontFamily: 'var(--font-family-macan)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Current State</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <strong>Active Section:</strong>{' '}
              <span style={{ color: '#FF3B31', textTransform: 'uppercase' }}>{activeSection}</span>
            </div>
            <div>
              <strong>Only Locked:</strong> {onlyLocked ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Filter:</strong> {filter}
            </div>
            <div>
              <strong>Search:</strong> {search || '(empty)'}
            </div>
            <div>
              <strong>Showing:</strong> {filteredScenarios.length} / {mockScenarios.length} scenarios
            </div>
            <div>
              <strong>Selected:</strong> {selectedScenarios.size} scenarios
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithDashboardActive: Story = {
  render: () => {
    const [onlyLocked, setOnlyLocked] = React.useState(true);
    const [filter, setFilter] = React.useState('Locked');
    const [search, setSearch] = React.useState('');

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#CECECE' }}>
        <TopBar
          activeSection="dashboard"
          onMenuItemClick={(section) => console.log('Menu clicked:', section)}
          onActionClick={(action) => console.log('Action clicked:', action)}
        />
        <ActionBar
          title="[DASHBOARD]"
          onlyLockedRecords={onlyLocked}
          onToggleLocked={setOnlyLocked}
          filterValue={filter}
          onFilterChange={setFilter}
          searchValue={search}
          onSearchChange={setSearch}
          onCreateScenario={() => console.log('Create scenario')}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00112B',
            fontFamily: 'var(--font-family-macan)',
            fontSize: '24px',
          }}
        >
          Dashboard Content Area
        </div>
      </div>
    );
  },
};

export const WithModelingActive: Story = {
  render: () => {
    const [onlyLocked, setOnlyLocked] = React.useState(false);
    const [filter, setFilter] = React.useState('Active');
    const [search, setSearch] = React.useState('model');

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#CECECE' }}>
        <TopBar
          activeSection="modeling"
          onMenuItemClick={(section) => console.log('Menu clicked:', section)}
          onActionClick={(action) => console.log('Action clicked:', action)}
        />
        <ActionBar
          title="[MODELING]"
          onlyLockedRecords={onlyLocked}
          onToggleLocked={setOnlyLocked}
          filterValue={filter}
          onFilterChange={setFilter}
          searchValue={search}
          onSearchChange={setSearch}
          onCreateScenario={() => console.log('Create scenario')}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00112B',
            fontFamily: 'var(--font-family-macan)',
            fontSize: '24px',
          }}
        >
          Modeling Content Area
        </div>
      </div>
    );
  },
};
