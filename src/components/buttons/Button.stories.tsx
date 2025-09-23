import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Button from './Button';
import './Button.stories.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component that supports multiple variants, sizes, and states. It provides consistent styling and accessibility features across the application.',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'big',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'big'],
      description: 'Size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'big' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Handler for when the button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /primary button/i });
    await userEvent.click(button);
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    children: 'White Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });
    
    // Verify the button is disabled and cannot be clicked
    expect(button).toBeDisabled();
    
    // Try to click (should not trigger onClick)
    await userEvent.click(button);
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="button-sizes-container">
      <Button size="small">Small Button</Button>
      <Button size="big">Big Button</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const smallButton = canvas.getByRole('button', { name: /small button/i });
    const bigButton = canvas.getByRole('button', { name: /big button/i });
    
    await userEvent.click(smallButton);
    await userEvent.click(bigButton);
  },
};
