import type { Meta, StoryObj } from '@storybook/react-vite';
import ModelingCard from './ModelingCard';
import './ModelingCard.stories.css';

const meta: Meta<typeof ModelingCard> = {
  title: 'Components/ModelingCard',
  component: ModelingCard,
  tags: ['autodocs'],
  args: {
    title: 'Top view',
    state: 'default',
    showIndicator: true,
    indicatorValue: '2',
    indicatorVariant: 'green',
    onClick: () => console.log('ModelingCard clicked'),
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'active'],
      description: 'Visual state of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: 'text',
      description: 'Title text for the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Top view' },
      },
    },
    showIndicator: {
      control: 'boolean',
      description: 'Whether to show the indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    indicatorValue: {
      control: 'text',
      description: 'Value to display in the indicator',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '2' },
      },
    },
    indicatorVariant: {
      control: 'select',
      options: ['green', 'blue', 'variant3'],
      description: 'Color variant for the indicator',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'green' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Handler for when the card is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModelingCard>;

export const Default: Story = {};

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
};

export const Active: Story = {
  parameters: {
    pseudo: { active: true },
  },
};

export const WithoutIndicator: Story = {
  args: {
    showIndicator: false,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <ModelingCard
        title="Card 1"
        state="active"
      />
      <ModelingCard
        title="Card 2"
        state="default"
      />
    </div>
  ),
};
