import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoButton } from './InfoButton';

const meta: Meta<typeof InfoButton> = {
  title: 'Attack Graph/InfoButton/Icon',
  component: InfoButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'big',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
