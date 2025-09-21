import type { Meta, StoryObj } from '@storybook/react-vite';
import Notification from './Notification';
import './Notification.stories.css';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notifications/Notification',
  component: Notification,
  tags: ['autodocs'],
  args: {
    title: 'New Message',
    body: 'You have received a new message from John Doe.',
    date: '2m ago',
    avatar: 'https://i.pravatar.cc/40?img=1',
    variant: 'new',
    hasNotificationDot: true,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the notification',
      table: {
        type: { summary: 'string' },
      },
    },
    body: {
      control: 'text',
      description: 'Body text of the notification',
      table: {
        type: { summary: 'string' },
      },
    },
    date: {
      control: 'text',
      description: 'Date/time string for the notification',
      table: {
        type: { summary: 'string' },
      },
    },
    avatar: {
      control: 'text',
      description: 'URL for the avatar image',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['new', 'hover', 'read'],
      description: 'Visual variant of the notification',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'new' },
      },
    },
    hasNotificationDot: {
      control: 'boolean',
      description: 'Whether to show the notification dot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Handler for when the notification is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const NewNotification: Story = {};

export const HoverState: Story = {
  args: {
    variant: 'hover',
  },
};

export const ReadNotification: Story = {
  args: {
    variant: 'read',
  },
};

export const WithCustomAvatar: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
};

export const WithoutNotificationDot: Story = {
  args: {
    hasNotificationDot: false,
  },
};
