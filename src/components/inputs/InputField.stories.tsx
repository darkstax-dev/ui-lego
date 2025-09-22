import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import InputField from './InputField';
import { FiMail, FiLock, FiSearch } from 'react-icons/fi';
import './InputField.stories.css';

const meta: Meta = {
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
      control: false,
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
type Story = StoryObj;

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/email/i);
    
    // Type an email address
    await userEvent.type(input, 'test@example.com');
    
    // Verify the input has the expected value
    expect(input).toHaveValue('test@example.com');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/password/i);
    
    // Type a password
    await userEvent.type(input, 'secretpassword123');
    
    // Verify the input has the expected value
    expect(input).toHaveValue('secretpassword123');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/username/i);
    
    // Verify the input is disabled
    expect(input).toBeDisabled();
    
    // Try to type (should not work)
    await userEvent.type(input, 'should not work');
    
    // Verify value didn't change
    expect(input).toHaveValue('readonly@example.com');
  },
};

// Search Input
const SearchTemplate: Story = {
  render: (args) => <InteractiveInputField {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: <FiSearch className="input-icon" />,
    type: 'text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/search/i);
    
    // Type a search query
    await userEvent.type(input, 'react components');
    
    // Verify the input has the expected value
    expect(input).toHaveValue('react components');
  },
};

export const Basic = BasicTemplate;
export const WithIcon = WithIconTemplate;
export const PasswordField = PasswordTemplate;
export const WithError = ErrorTemplate;
export const WithSuccess = SuccessTemplate;
export const Disabled = DisabledTemplate;
export const Search = SearchTemplate;
