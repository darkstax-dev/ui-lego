import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShieldAlertIcon } from './ShieldAlertIcon'
import { KubernetesIcon } from './KubernetesIcon'
import { LinkIcon } from './LinkIcon'

const meta: Meta = {
  title: 'Network Components/Icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const ShieldAlert: StoryObj<typeof ShieldAlertIcon> = {
  render: () => <ShieldAlertIcon />,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const Kubernetes: StoryObj<typeof KubernetesIcon> = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <KubernetesIcon variant="green" />
        <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Green</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <KubernetesIcon variant="red" />
        <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Red</span>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const Link: StoryObj<typeof LinkIcon> = {
  render: () => <LinkIcon />,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const SizeVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ fontSize: '14px', fontFamily: 'monospace', marginBottom: '16px' }}>Shield Alert Sizes</h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <ShieldAlertIcon />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Default</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <ShieldAlertIcon size={60} />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Large (60px)</span>
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: '14px', fontFamily: 'monospace', marginBottom: '16px' }}>Kubernetes Sizes</h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <KubernetesIcon variant="green" />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Default</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <KubernetesIcon variant="green" size={80} />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Large (80px)</span>
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: '14px', fontFamily: 'monospace', marginBottom: '16px' }}>Link Sizes</h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <LinkIcon />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Default</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <LinkIcon size={48} />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Large (48px)</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const AllIcons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <ShieldAlertIcon />
        <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Shield Alert</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <KubernetesIcon variant="green" />
        <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Kubernetes Green</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <KubernetesIcon variant="red" />
        <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Kubernetes Red</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <LinkIcon />
        <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>Link</span>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}
