import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Drawer, { DrawerSize } from './Drawer'
import Button from '../buttons/Button'
import './Drawer.stories.css'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A slide-in panel that appears from one edge of the screen. Supports configurable position, size, and focus management.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => {
    const Example: React.FC = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <div className="drawer-story">
          <Button onClick={() => setOpen(true)} icon={<></>}>
            Open Drawer
          </Button>

          <Drawer isOpen={open} onClose={() => setOpen(false)} title="Default Drawer">
            <div className="drawer-sample-content">
              <p>This is the default drawer content. Use the close button or click the backdrop to close.</p>
              <Button variant="secondary" onClick={() => setOpen(false)} icon={<></>}>Close</Button>
            </div>
          </Drawer>
        </div>
      )
    }

    return <Example />
  },
}

export const Positions: Story = {
  render: () => {
    const Example: React.FC = () => {
      const [openPos, setOpenPos] = React.useState<'right' | 'left' | 'top' | 'bottom' | null>(null)
      return (
        <div className="drawer-story drawer-positions">
          <div className="drawer-position-buttons">
            <Button onClick={() => setOpenPos('right')} icon={<></>}>Open Right</Button>
            <Button onClick={() => setOpenPos('left')} icon={<></>}>Open Left</Button>
            <Button onClick={() => setOpenPos('top')} icon={<></>}>Open Top</Button>
            <Button onClick={() => setOpenPos('bottom')} icon={<></>}>Open Bottom</Button>
          </div>

          <Drawer
            isOpen={openPos === 'right'}
            onClose={() => setOpenPos(null)}
            position="right"
            title="Right"
          >
            <div className="drawer-sample-content">Right drawer</div>
          </Drawer>

          <Drawer
            isOpen={openPos === 'left'}
            onClose={() => setOpenPos(null)}
            position="left"
            title="Left"
          >
            <div className="drawer-sample-content">Left drawer</div>
          </Drawer>

          <Drawer
            isOpen={openPos === 'top'}
            onClose={() => setOpenPos(null)}
            position="top"
            size="30%"
            title="Top"
          >
            <div className="drawer-sample-content">Top drawer</div>
          </Drawer>

          <Drawer
            isOpen={openPos === 'bottom'}
            onClose={() => setOpenPos(null)}
            position="bottom"
            size="30%"
            title="Bottom"
          >
            <div className="drawer-sample-content">Bottom drawer</div>
          </Drawer>
        </div>
      )
    }

    return <Example />
  },
}

export const Sizes: Story = {
  render: () => {
    const Example: React.FC = () => {
      const [sizeOpen, setSizeOpen] = React.useState<string | null>(null)
      return (
        <div className="drawer-story drawer-sizes">
          <div className="drawer-position-buttons">
            <Button onClick={() => setSizeOpen('small')} icon={<></>}>Small</Button>
            <Button onClick={() => setSizeOpen('standard')} icon={<></>}>Standard</Button>
            <Button onClick={() => setSizeOpen('large')} icon={<></>}>Large</Button>
          </div>

          <Drawer
            isOpen={sizeOpen === 'small'}
            onClose={() => setSizeOpen(null)}
            size={DrawerSize.SMALL}
            title="Small Drawer"
          >
            <div className="drawer-sample-content">Small width drawer</div>
          </Drawer>

          <Drawer
            isOpen={sizeOpen === 'standard'}
            onClose={() => setSizeOpen(null)}
            size={DrawerSize.STANDARD}
            title="Standard Drawer"
          >
            <div className="drawer-sample-content">Standard size drawer</div>
          </Drawer>

          <Drawer
            isOpen={sizeOpen === 'large'}
            onClose={() => setSizeOpen(null)}
            size={DrawerSize.LARGE}
            title="Large Drawer"
          >
            <div className="drawer-sample-content">Large drawer</div>
          </Drawer>
        </div>
      )
    }

    return <Example />
  },
}

export const NoBackdrop: Story = {
  render: () => {
    const Example: React.FC = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <div className="drawer-story">
          <Button onClick={() => setOpen(true)} icon={<></>}>Open without Backdrop</Button>

          <Drawer isOpen={open} onClose={() => setOpen(false)} hasBackdrop={false} title="No Backdrop">
            <div className="drawer-sample-content">Drawer without a backdrop</div>
          </Drawer>
        </div>
      )
    }

    return <Example />
  },
}
