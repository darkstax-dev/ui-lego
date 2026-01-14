import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Drawer, { DrawerSize } from './Drawer'
import DrawerExampleContent from './DrawerExampleContent'
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
          <Button onClick={() => setOpen(true)} hideIcon size="sm">
            Open Drawer
          </Button>

          <Drawer
            isOpen={open}
            onClose={() => setOpen(false)}
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            {/* Empty drawer with just the header */}
          </Drawer>
        </div>
      )
    }

    return <Example />
  },
}

export const ExampleDrawer: Story = {
  render: () => {
    const Example: React.FC = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <div className="drawer-story">
          <Button onClick={() => setOpen(true)} hideIcon size="sm">
            Open Drawer
          </Button>

          <Drawer
            isOpen={open}
            onClose={() => setOpen(false)}
            appearance="light"
            size={DrawerSize.STANDARD}
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <DrawerExampleContent />
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
            <Button onClick={() => setOpenPos('right')} hideIcon size="sm">Open Right</Button>
            <Button onClick={() => setOpenPos('left')} hideIcon size="sm">Open Left</Button>
            <Button onClick={() => setOpenPos('top')} hideIcon size="sm">Open Top</Button>
            <Button onClick={() => setOpenPos('bottom')} hideIcon size="sm">Open Bottom</Button>
          </div>

          <Drawer
            isOpen={openPos === 'right'}
            onClose={() => setOpenPos(null)}
            position="right"
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <div className="drawer-sample-content">Right drawer</div>
          </Drawer>

          <Drawer
            isOpen={openPos === 'left'}
            onClose={() => setOpenPos(null)}
            position="left"
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <div className="drawer-sample-content">Left drawer</div>
          </Drawer>

          <Drawer
            isOpen={openPos === 'top'}
            onClose={() => setOpenPos(null)}
            position="top"
            size="30%"
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <div className="drawer-sample-content">Top drawer</div>
          </Drawer>

          <Drawer
            isOpen={openPos === 'bottom'}
            onClose={() => setOpenPos(null)}
            position="bottom"
            size="30%"
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
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
            <Button onClick={() => setSizeOpen('small')} hideIcon size="sm">Small</Button>
            <Button onClick={() => setSizeOpen('standard')} hideIcon size="sm">Standard</Button>
            <Button onClick={() => setSizeOpen('large')} hideIcon size="sm">Large</Button>
          </div>

          <Drawer
            isOpen={sizeOpen === 'small'}
            onClose={() => setSizeOpen(null)}
            size={DrawerSize.SMALL}
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <div className="drawer-sample-content">Small width drawer</div>
          </Drawer>

          <Drawer
            isOpen={sizeOpen === 'standard'}
            onClose={() => setSizeOpen(null)}
            size={DrawerSize.STANDARD}
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <div className="drawer-sample-content">Standard size drawer</div>
          </Drawer>

          <Drawer
            isOpen={sizeOpen === 'large'}
            onClose={() => setSizeOpen(null)}
            size={DrawerSize.LARGE}
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
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
          <Button onClick={() => setOpen(true)} hideIcon size="sm">Open without Backdrop</Button>

          <Drawer
            isOpen={open}
            onClose={() => setOpen(false)}
            hasBackdrop={false}
            appearance="light"
            onExpand={() => console.log('Expand clicked')}
            onFullscreen={() => console.log('Fullscreen clicked')}
          >
            <div className="drawer-sample-content">Drawer without a backdrop</div>
          </Drawer>
        </div>
      )
    }

    return <Example />
  },
}
