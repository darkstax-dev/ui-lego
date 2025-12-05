import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import ToggleSelection, { ToggleOption } from './ToggleSelection';

const meta: Meta<typeof ToggleSelection> = {
  title: 'Components/Filter/ToggleSelection',
  component: ToggleSelection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle selection component with switch controls. Perfect for enabling/disabling features or selecting multiple options.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px', border: '1px solid #c8c8c8' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleSelection>;

// Sample options
const columnOptions: ToggleOption[] = [
  { id: 'label', label: 'label', checked: true },
  { id: 'value', label: 'value', checked: true },
  { id: 'trend', label: 'trend', checked: true },
  { id: 'trendValue', label: 'trendValue', checked: true },
];

const featureOptions: ToggleOption[] = [
  { id: 'notifications', label: 'Enable Notifications', checked: true },
  { id: 'analytics', label: 'Enable Analytics', checked: false },
  { id: 'logging', label: 'Enable Logging', checked: true },
  { id: 'debug', label: 'Debug Mode', checked: false },
];

const permissionOptions: ToggleOption[] = [
  { id: 'read', label: 'Read Access', checked: true },
  { id: 'write', label: 'Write Access', checked: true },
  { id: 'delete', label: 'Delete Access', checked: false },
  { id: 'admin', label: 'Admin Access', checked: false },
  { id: 'share', label: 'Share Access', checked: true },
];

export const Default: Story = {
  args: {
    title: 'Find column',
    options: columnOptions,
    showSearch: true,
    searchPlaceholder: 'Column title',
    onChange: (options) => console.log('Options changed:', options),
  },
};

export const FeatureToggles: Story = {
  args: {
    options: featureOptions,
    onChange: (options) => console.log('Features:', options),
  },
};

export const Permissions: Story = {
  args: {
    options: permissionOptions,
    onChange: (options) => console.log('Permissions:', options),
  },
};

export const WithoutSearch: Story = {
  args: {
    options: columnOptions,
    showSearch: false,
    onChange: (options) => console.log('Options:', options),
  },
};