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

export const ShieldAlertLarge: StoryObj<typeof ShieldAlertIcon> = {
  render: () => <ShieldAlertIcon size={60} />,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const KubernetesGreen: StoryObj<typeof KubernetesIcon> = {
  render: () => <KubernetesIcon variant="green" />,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const KubernetesRed: StoryObj<typeof KubernetesIcon> = {
  render: () => <KubernetesIcon variant="red" />,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const KubernetesLarge: StoryObj<typeof KubernetesIcon> = {
  render: () => <KubernetesIcon variant="green" size={80} />,
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

export const LinkLarge: StoryObj<typeof LinkIcon> = {
  render: () => <LinkIcon size={48} />,
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
