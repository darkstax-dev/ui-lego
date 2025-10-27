import type { Meta, StoryObj } from '@storybook/react-vite'
import Divider from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical']
    },
    color: {
      control: 'color'
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10 }
    }
  }
}

export default meta

type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>Content above divider</div>
      <Divider />
      <div style={{ marginTop: '16px' }}>Content below divider</div>
    </div>
  )
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '200px', padding: '24px' }}>
      <div style={{ marginRight: '16px' }}>Left content</div>
      <Divider orientation="vertical" />
      <div style={{ marginLeft: '16px' }}>Right content</div>
    </div>
  )
}

export const CustomColor: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <Divider color="#FF5733" thickness={2} />
    </div>
  )
}

export const ThickDivider: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <Divider thickness={4} />
    </div>
  )
}

export const Dotted: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>Content above dotted divider</div>
      <Divider style="dotted" />
      <div style={{ marginTop: '16px' }}>Content below dotted divider</div>
    </div>
  )
}

export const Dashed: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>Content above dashed divider</div>
      <Divider style="dashed" />
      <div style={{ marginTop: '16px' }}>Content below dashed divider</div>
    </div>
  )
}

export const Solid: Story = {
  render: () => (
    <div style={{ width: '575px', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>Content above solid divider</div>
      <Divider style="solid" />
      <div style={{ marginTop: '16px' }}>Content below solid divider</div>
    </div>
  )
}

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    thickness: 1,
    style: 'dotted'
  },
  render: (args) => (
    <div style={{ width: '575px', padding: '24px' }}>
      <Divider {...args} />
    </div>
  )
}
