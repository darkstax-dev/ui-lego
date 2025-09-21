import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import InputField from './InputField';
import { FiMail, FiLock, FiSearch } from 'react-icons/fi';
import './InputField.stories.css';

const meta: Meta<typeof InputField> = {
  title: 'Components/Inputs/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: '',
    disabled: false,
    type: 'text',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
    onChange: {
      action: 'changed',
      description: 'Handler for when the input value changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    success: {
      control: 'text',
      description: 'Success message to display below the input',
    },
    supportingText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    leadingIcon: {
      control: { type: null },
      description: 'Icon to display at the start of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Interactive example with state management
const InteractiveInputField = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <InputField 
      {...args} 
      value={value} 
      onChange={(e) => setValue(e)} 
    />
  );
};

// Basic Input
const BasicTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

// With Icon
const WithIconTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    ...BasicTemplate.args,
    label: 'Email',
    placeholder: 'email@example.com',
    leadingIcon: <FiMail className="input-icon" />,
  },
};

// Password Field
const PasswordTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    ...BasicTemplate.args,
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    leadingIcon: <FiLock className="input-icon" />,
  },
};

// With Error
const ErrorTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    ...BasicTemplate.args,
    label: 'Email',
    placeholder: 'email@example.com',
    error: 'Please enter a valid email address',
  },
};

// With Success
const SuccessTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    ...BasicTemplate.args,
    label: 'Verification Code',
    value: '123456',
    success: 'Code verified successfully',
  },
};

// Disabled State
const DisabledTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    ...BasicTemplate.args,
    value: 'readonly@example.com',
    disabled: true,
    supportingText: 'This field cannot be edited',
  },
};

// Search Input
const SearchTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: <FiSearch className="input-icon" />,
    type: 'search',
  },
};

export const Basic = BasicTemplate;
export const WithIcon = WithIconTemplate;
export const PasswordField = PasswordTemplate;
export const WithError = ErrorTemplate;
export const WithSuccess = SuccessTemplate;
export const Disabled = DisabledTemplate;
export const Search = SearchTemplate;
