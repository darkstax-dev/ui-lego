import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from './ActionBar';
import React from 'react';

const meta: Meta<typeof ActionBar> = {
  title: 'Components/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const Default: Story = {
  args: {
    title: '[SCENARIO]',
    onlyLockedRecords: false,
    filterValue: 'All',
    searchValue: '',
  },
  render: (args) => {
    const [onlyLocked, setOnlyLocked] = React.useState(args.onlyLockedRecords || false);
    const [filter, setFilter] = React.useState(args.filterValue || 'All');
    const [search, setSearch] = React.useState(args.searchValue || '');

    return (
      <ActionBar
        {...args}
        onlyLockedRecords={onlyLocked}
        filterValue={filter}
        searchValue={search}
        onToggleLocked={setOnlyLocked}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onDownload={() => console.log('Download clicked')}
        onUpload={() => console.log('Upload clicked')}
        onCreateScenario={() => console.log('Create Scenario clicked')}
      />
    );
  },
};

export const WithLockedRecords: Story = {
  args: {
    title: '[SCENARIO]',
    onlyLockedRecords: true,
    filterValue: 'Locked',
    searchValue: '',
  },
  render: (args) => {
    const [onlyLocked, setOnlyLocked] = React.useState(args.onlyLockedRecords || false);
    const [filter, setFilter] = React.useState(args.filterValue || 'All');
    const [search, setSearch] = React.useState(args.searchValue || '');

    return (
      <ActionBar
        {...args}
        onlyLockedRecords={onlyLocked}
        filterValue={filter}
        searchValue={search}
        onToggleLocked={setOnlyLocked}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onDownload={() => console.log('Download clicked')}
        onUpload={() => console.log('Upload clicked')}
        onCreateScenario={() => console.log('Create Scenario clicked')}
      />
    );
  },
};

export const WithSearch: Story = {
  args: {
    title: '[SCENARIO]',
    onlyLockedRecords: false,
    filterValue: 'Active',
    searchValue: 'test scenario',
  },
  render: (args) => {
    const [onlyLocked, setOnlyLocked] = React.useState(args.onlyLockedRecords || false);
    const [filter, setFilter] = React.useState(args.filterValue || 'All');
    const [search, setSearch] = React.useState(args.searchValue || '');

    return (
      <ActionBar
        {...args}
        onlyLockedRecords={onlyLocked}
        filterValue={filter}
        searchValue={search}
        onToggleLocked={setOnlyLocked}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onDownload={() => console.log('Download clicked')}
        onUpload={() => console.log('Upload clicked')}
        onCreateScenario={() => console.log('Create Scenario clicked')}
      />
    );
  },
};

export const DifferentTitles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <ActionBar
        title="[DASHBOARD]"
        onlyLockedRecords={false}
        filterValue="All"
        searchValue=""
        onCreateScenario={() => console.log('Create clicked')}
      />
      <ActionBar
        title="[TOPOLOGY]"
        onlyLockedRecords={false}
        filterValue="All"
        searchValue=""
        onCreateScenario={() => console.log('Create clicked')}
      />
      <ActionBar
        title="[MODELING]"
        onlyLockedRecords={true}
        filterValue="Locked"
        searchValue=""
        onCreateScenario={() => console.log('Create clicked')}
      />
      <ActionBar
        title="[TEMPLATE]"
        onlyLockedRecords={false}
        filterValue="Active"
        searchValue=""
        onCreateScenario={() => console.log('Create clicked')}
      />
    </div>
  ),
};
