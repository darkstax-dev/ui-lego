import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
