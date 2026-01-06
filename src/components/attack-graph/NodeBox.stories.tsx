import type { Meta, StoryObj } from '@storybook/react-vite';
import { NodeBox } from './NodeBox';

const meta: Meta<typeof NodeBox> = {
  title: 'Attack Graph/Components/NodeBox',
  component: NodeBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'gray', 'red-hexagon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NodeBox>;

export const Blue: Story = {
  args: {
    variant: 'blue',
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
  },
};

export const Orange: Story = {
  args: {
    variant: 'orange',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
  },
};

export const RedHexagon: Story = {
  args: {
    variant: 'red-hexagon',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
      <NodeBox variant="blue" />
      <NodeBox variant="green" />
      <NodeBox variant="orange" />
      <NodeBox variant="gray" />
      <NodeBox variant="red-hexagon" />
    </div>
  ),
};

export const Editable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexDirection: 'column' }}>
      <p style={{ fontFamily: 'Macan Mono Trial, monospace', fontSize: '14px', color: '#00112B' }}>
        Click on the boxes to edit the text
      </p>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <NodeBox variant="blue" editable defaultText="Node 1" />
        <NodeBox variant="green" editable defaultText="Node 2" />
        <NodeBox variant="orange" editable defaultText="Node 3" />
        <NodeBox variant="gray" editable defaultText="Node 4" />
        <NodeBox variant="red-hexagon" editable defaultText="Node 5" />
      </div>
    </div>
  ),
};
