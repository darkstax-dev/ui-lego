import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SecondaryNavigation } from './SecondaryNavigation';
import './Navigation.stories.css';

const meta: Meta<typeof SecondaryNavigation> = {
  title: 'Components/Navigation',
  component: SecondaryNavigation,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    scenarioTitle: 'Project Dashboard',
    showLockedToggle: true,
    lockedRecords: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'with-back'],
      description: 'Navigation variant',
    },
    scenarioTitle: {
      control: 'text',
      description: 'Title displayed in navigation',
    },
    showLockedToggle: {
      control: 'boolean',
      description: 'Whether to show the locked records toggle',
    },
    lockedRecords: {
      control: 'boolean',
      description: 'Current state of locked records',
    },
    onLockedToggle: {
      action: 'lockedToggled',
      description: 'Handler for locked toggle changes',
    },
    onSearch: {
      action: 'searched',
      description: 'Handler for search input',
    },
    onCreateScenario: {
      action: 'scenarioCreated',
      description: 'Handler for create scenario action',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SecondaryNavigation>;

// Interactive example with state management
const InteractiveNavigation = (args: any) => {
  const [lockedRecords, setLockedRecords] = useState(args.lockedRecords);
  const [searchValue, setSearchValue] = useState('');

  const handleLockedToggle = (checked: boolean) => {
    setLockedRecords(checked);
    args.onLockedToggle?.(checked);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    args.onSearch?.(value);
  };

  const handleCreateScenario = () => {
    console.log('Creating new scenario...');
    args.onCreateScenario?.();
  };

  return (
    <div className="navigation-story">
      <SecondaryNavigation
        {...args}
        lockedRecords={lockedRecords}
        onLockedToggle={handleLockedToggle}
        onSearch={handleSearch}
        onCreateScenario={handleCreateScenario}
      />

      <div className="navigation-content">
        <h2>{args.scenarioTitle}</h2>
        <div className="navigation-state">
          <p><strong>Locked Records:</strong> {lockedRecords ? 'Yes' : 'No'}</p>
          <p><strong>Search Value:</strong> "{searchValue}"</p>
        </div>

        <div className="navigation-actions">
          <button className="action-btn" onClick={() => setSearchValue('example search')}>
            Set Search
          </button>
          <button className="action-btn" onClick={() => setLockedRecords(!lockedRecords)}>
            Toggle Lock
          </button>
        </div>
      </div>
    </div>
  );
};

// Basic Navigation
const BasicTemplate: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    scenarioTitle: 'Data Analysis Dashboard',
  },
};

// With Back Button
const WithBackTemplate: Story = {
  ...BasicTemplate,
  args: {
    ...BasicTemplate.args,
    variant: 'with-back',
    scenarioTitle: 'Analysis Results',
  },
};

// Without Lock Toggle
const NoLockTemplate: Story = {
  ...BasicTemplate,
  args: {
    ...BasicTemplate.args,
    showLockedToggle: false,
    scenarioTitle: 'Public Dashboard',
  },
};

// Minimal Navigation
const MinimalTemplate: Story = {
  ...BasicTemplate,
  args: {
    ...BasicTemplate.args,
    showLockedToggle: false,
    scenarioTitle: 'Simple View',
  },
};

// Full Featured
const FullFeaturedTemplate: Story = {
  ...BasicTemplate,
  args: {
    ...BasicTemplate.args,
    scenarioTitle: 'Advanced Analytics',
  },
};

export const Basic = BasicTemplate;
export const WithBackButton = WithBackTemplate;
export const WithoutLockToggle = NoLockTemplate;
export const Minimal = MinimalTemplate;
export const FullFeatured = FullFeaturedTemplate;
