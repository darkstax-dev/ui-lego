import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShowAllButton } from './ShowAllButton';
import { OptimalButton } from './OptimalButton';

const showAllMeta: Meta<typeof ShowAllButton> = {
  title: 'Attack Graph/Components/ShowAllButton',
  component: ShowAllButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default showAllMeta;
type ShowAllStory = StoryObj<typeof showAllMeta>;

export const ShowAll: ShowAllStory = {};

const optimalMeta: Meta<typeof OptimalButton> = {
  title: 'Attack Graph/Components/OptimalButton',
  component: OptimalButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

type OptimalStory = StoryObj<typeof optimalMeta>;

export const Optimal: OptimalStory = {};

export const ButtonGroup = () => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <ShowAllButton />
    <OptimalButton />
  </div>
);

ButtonGroup.parameters = {
  layout: 'centered',
};
