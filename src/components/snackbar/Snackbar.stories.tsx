import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import Snackbar from './Snackbar';
import './Snackbar.stories.css';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  args: {
    variant: 'success',
    title: 'Saved',
    message: 'Your changes have been saved successfully.',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['success', 'error'],
      description: 'Visual style of the snackbar',
      table: { type: { summary: '"success" | "error"' }, defaultValue: { summary: 'success' } },
    },
    title: { control: 'text', description: 'Short title text' },
    message: { control: 'text', description: 'Longer descriptive message' },
    onClose: { action: 'closed', description: 'Handler called when close button is clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Item created successfully.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'We could not save your changes. Please try again.',
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: 'success',
    title: 'Dismissible',
    message: 'You can close this snackbar using the X icon.',
  },
  render: (args) => (
    <div className="snackbar-story-container">
      <Snackbar {...args} onClose={() => { /* handled by Storybook action */ }} />
    </div>
  ),
};

// Interactive example with local state and auto-dismiss
const AutoDismissExample = (props: { variant: 'success' | 'error'; timeoutMs?: number }) => {
  const [open, setOpen] = useState(true);
  const timeout = props.timeoutMs ?? 3000;

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => setOpen(false), timeout);
    return () => clearTimeout(id);
  }, [open, timeout]);

  return (
    <div className="snackbar-story-container">
      <button className="snackbar-story-button" onClick={() => setOpen(true)}>Show snackbar</button>
      {open && (
        <Snackbar
          variant={props.variant}
          title={props.variant === 'success' ? 'Saved' : 'Something went wrong'}
          message={props.variant === 'success' ? 'Your changes were saved.' : 'Please check your connection and try again.'}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export const AutoDismissSuccess = {
  render: () => <AutoDismissExample variant="success" timeoutMs={3000} />,
};
