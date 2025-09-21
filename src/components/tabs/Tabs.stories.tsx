import type { Meta, StoryObj } from '@storybook/react-vite'
import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  args: {
    items: [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' }
    ],
    activeTab: 'one'
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};
