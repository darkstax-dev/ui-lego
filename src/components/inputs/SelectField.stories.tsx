import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import CheckboxGroup from './CheckboxGroup';
import './SelectField.stories.css';

const meta: Meta = {
  title: 'Components/Inputs/Select & Radio/Checkbox',
};

export default meta;

// Sample data for all examples
const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const radioOptions = [
  { value: 'small', label: 'Small', description: 'Compact size' },
  { value: 'medium', label: 'Medium', description: 'Standard size' },
  { value: 'large', label: 'Large', description: 'Spacious size' },
];

const checkboxOptions = [
  { value: 'notifications', label: 'Email notifications', description: 'Receive updates via email' },
  { value: 'marketing', label: 'Marketing emails', description: 'Promotional content and offers' },
  { value: 'updates', label: 'Product updates', description: 'New features and improvements' },
];

// SelectField Stories
const SelectFieldTemplate: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div className="input-story">
        <SelectField
          {...args}
          value={value}
          onChange={(val) => setValue(val)}
        />
      </div>
    );
  },
};

export const SelectFieldBasic = {
  ...SelectFieldTemplate,
  args: {
    label: 'Choose an option',
    options: sampleOptions,
    placeholder: 'Select an option',
  },
};

export const SelectFieldWithError = {
  ...SelectFieldTemplate,
  args: {
    label: 'Country',
    options: sampleOptions,
    placeholder: 'Select your country',
    error: 'Please select a valid country',
  },
};

export const SelectFieldWithSuccess = {
  ...SelectFieldTemplate,
  args: {
    label: 'Department',
    options: sampleOptions,
    placeholder: 'Choose department',
    success: 'Department selected successfully',
  },
};

export const SelectFieldDisabled = {
  ...SelectFieldTemplate,
  args: {
    label: 'Disabled Select',
    options: sampleOptions,
    value: 'option2',
    disabled: true,
    supportingText: 'This field is disabled',
  },
};

// RadioGroup Stories
const RadioGroupTemplate: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.selectedValue || '');
    return (
      <div className="input-story">
        <RadioGroup
          {...args}
          selectedValue={selectedValue}
          onChange={(val) => setSelectedValue(val)}
        />
      </div>
    );
  },
};

export const RadioGroupBasic = {
  ...RadioGroupTemplate,
  args: {
    name: 'size',
    options: radioOptions,
    selectedValue: 'medium',
  },
};

export const RadioGroupDisabled = {
  ...RadioGroupTemplate,
  args: {
    name: 'disabled-radio',
    options: [
      ...radioOptions,
      { value: 'xlarge', label: 'Extra Large', description: 'Maximum size', disabled: true },
    ],
    selectedValue: 'medium',
    disabled: true,
  },
};

// CheckboxGroup Stories
const CheckboxGroupTemplate: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.selectedValues || []);
    return (
      <div className="input-story">
        <CheckboxGroup
          {...args}
          selectedValues={selectedValues}
          onChange={(vals) => setSelectedValues(vals)}
        />
      </div>
    );
  },
};

export const CheckboxGroupBasic = {
  ...CheckboxGroupTemplate,
  args: {
    options: checkboxOptions,
    selectedValues: ['notifications'],
  },
};

export const CheckboxGroupDisabled = {
  ...CheckboxGroupTemplate,
  args: {
    options: [
      ...checkboxOptions,
      { value: 'security', label: 'Security alerts', description: 'Critical security notifications', disabled: true },
    ],
    selectedValues: ['notifications', 'updates'],
    disabled: true,
  },
};

// Combined Form Example
export const FormExample = {
  render: () => {
    const [formData, setFormData] = useState({
      department: '',
      priority: '',
      notifications: [] as string[],
    });

    const handleSelectChange = (field: string, value: string | string[]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="form-example">
        <h3>Project Settings</h3>

        <div className="form-field">
          <SelectField
            label="Department"
            options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'design', label: 'Design' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'sales', label: 'Sales' },
            ]}
            value={formData.department}
            onChange={(val) => handleSelectChange('department', val)}
            placeholder="Select department"
          />
        </div>

        <div className="form-field">
          <RadioGroup
            name="priority"
            options={[
              { value: 'low', label: 'Low Priority', description: 'Non-urgent tasks' },
              { value: 'medium', label: 'Medium Priority', description: 'Standard timeline' },
              { value: 'high', label: 'High Priority', description: 'Urgent tasks' },
            ]}
            selectedValue={formData.priority}
            onChange={(val) => handleSelectChange('priority', val)}
          />
        </div>

        <div className="form-field">
          <CheckboxGroup
            options={[
              { value: 'email', label: 'Email notifications', description: 'Receive updates via email' },
              { value: 'slack', label: 'Slack notifications', description: 'Get notified in Slack' },
              { value: 'sms', label: 'SMS alerts', description: 'Critical updates via SMS' },
            ]}
            selectedValues={formData.notifications}
            onChange={(vals) => handleSelectChange('notifications', vals)}
          />
        </div>

        <div className="form-summary">
          <h4>Form Data:</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    );
  },
};
