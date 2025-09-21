import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';
import Button from '../buttons/Button';
import './Tooltip.stories.css';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    title: 'Tooltip Title',
    body: 'This is a helpful tooltip message that provides additional context.',
    placement: 'top',
    visible: true,
    hasBody: true,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the target element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    visible: {
      control: 'boolean',
      description: 'Controls the visibility of the tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    hasBody: {
      control: 'boolean',
      description: 'Whether to show the body text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    title: {
      control: 'text',
      description: 'The main text displayed in the tooltip',
    },
    body: {
      control: 'text',
      description: 'Additional descriptive text (only shown if hasBody is true)', 
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    placement: 'top',
    title: 'Top Tooltip',
    body: 'This tooltip appears above the target element.',
  },
  render: (args) => (
    <div className="tooltip-container">
      <Tooltip {...args}>
        <Button>Hover me (Top)</Button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  ...Top,
  args: {
    ...Top.args,
    placement: 'bottom',
    title: 'Bottom Tooltip',
    body: 'This tooltip appears below the target element.',
  },
  render: (args) => (
    <div className="tooltip-container">
      <Tooltip {...args}>
        <Button>Hover me (Bottom)</Button>
      </Tooltip>
    </div>
  ),
};

export const Left: Story = {
  ...Top,
  args: {
    ...Top.args,
    placement: 'left',
    title: 'Left Tooltip',
    body: 'This tooltip appears to the left of the target element.',
  },
  render: (args) => (
    <div className="tooltip-container">
      <Tooltip {...args}>
        <Button>Hover me (Left)</Button>
      </Tooltip>
    </div>
  ),
};

export const Right: Story = {
  ...Top,
  args: {
    ...Top.args,
    placement: 'right',
    title: 'Right Tooltip',
    body: 'This tooltip appears to the right of the target element.',
  },
  render: (args) => (
    <div className="tooltip-container">
      <Tooltip {...args}>
        <Button>Hover me (Right)</Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutBody: Story = {
  ...Top,
  args: {
    ...Top.args,
    title: 'Simple Tooltip',
    hasBody: false,
  },
  render: (args) => (
    <div className="tooltip-container">
      <Tooltip {...args}>
        <Button>Hover for simple tooltip</Button>
      </Tooltip>
    </div>
  ),
};
