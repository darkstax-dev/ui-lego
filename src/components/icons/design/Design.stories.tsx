import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import './Design.stories.css'

// Import all design icons
import {
  Layout3Fill,
  Layout2Fill,
  LayoutTop2Fill,
  Contrast2Fill,
  FocusFill,
  DragDropLine,
  EditFill,
  PencilRulerFill,
  PaintBrushFill,
  LayoutGridFill,
  MagicFill,
  CropFill,
  GridFill,
  SliceFill,
  ScissorsFill,
  PaletteFill,
  RulerFill,
  CompassesFill,
  PencilFill
} from './index'

const meta: Meta = {
  title: 'Icons/Design',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A collection of design-related icons for UI layout, editing, and design tools. These icons use CSS tokens for consistent theming.'
      }
    }
  }
}

export default meta
type Story = StoryObj

// Individual icon stories
export const Layout3FillIcon: Story = {
  render: () => <Layout3Fill />,
  name: 'Layout 3 Fill'
}

export const Layout2FillIcon: Story = {
  render: () => <Layout2Fill />,
  name: 'Layout 2 Fill'
}

export const LayoutTop2FillIcon: Story = {
  render: () => <LayoutTop2Fill />,
  name: 'Layout Top 2 Fill'
}

export const Contrast2FillIcon: Story = {
  render: () => <Contrast2Fill />,
  name: 'Contrast 2 Fill'
}

export const FocusFillIcon: Story = {
  render: () => <FocusFill />,
  name: 'Focus Fill'
}

export const DragDropLineIcon: Story = {
  render: () => <DragDropLine />,
  name: 'Drag Drop Line'
}

export const EditFillIcon: Story = {
  render: () => <EditFill />,
  name: 'Edit Fill'
}

export const PencilRulerFillIcon: Story = {
  render: () => <PencilRulerFill />,
  name: 'Pencil Ruler Fill'
}

export const PaintBrushFillIcon: Story = {
  render: () => <PaintBrushFill />,
  name: 'Paint Brush Fill'
}

export const LayoutGridFillIcon: Story = {
  render: () => <LayoutGridFill />,
  name: 'Layout Grid Fill'
}

export const MagicFillIcon: Story = {
  render: () => <MagicFill />,
  name: 'Magic Fill'
}

export const CropFillIcon: Story = {
  render: () => <CropFill />,
  name: 'Crop Fill'
}

export const GridFillIcon: Story = {
  render: () => <GridFill />,
  name: 'Grid Fill'
}

export const SliceFillIcon: Story = {
  render: () => <SliceFill />,
  name: 'Slice Fill'
}

export const ScissorsFillIcon: Story = {
  render: () => <ScissorsFill />,
  name: 'Scissors Fill'
}

export const PaletteFillIcon: Story = {
  render: () => <PaletteFill />,
  name: 'Palette Fill'
}

export const RulerFillIcon: Story = {
  render: () => <RulerFill />,
  name: 'Ruler Fill'
}

export const CompassesFillIcon: Story = {
  render: () => <CompassesFill />,
  name: 'Compasses Fill'
}

export const PencilFillIcon: Story = {
  render: () => <PencilFill />,
  name: 'Pencil Fill'
}

// All icons showcase
export const AllDesignIcons: Story = {
  render: () => (
    <div className="design-icons-showcase">
      <h2 className="showcase-title">Design Icons Collection</h2>
      <div className="icons-grid">
        <div className="icon-item">
          <Layout3Fill />
          <span className="icon-name">Layout3Fill</span>
        </div>
        <div className="icon-item">
          <Layout2Fill />
          <span className="icon-name">Layout2Fill</span>
        </div>
        <div className="icon-item">
          <LayoutTop2Fill />
          <span className="icon-name">LayoutTop2Fill</span>
        </div>
        <div className="icon-item">
          <Contrast2Fill />
          <span className="icon-name">Contrast2Fill</span>
        </div>
        <div className="icon-item">
          <FocusFill />
          <span className="icon-name">FocusFill</span>
        </div>
        <div className="icon-item">
          <DragDropLine />
          <span className="icon-name">DragDropLine</span>
        </div>
        <div className="icon-item">
          <EditFill />
          <span className="icon-name">EditFill</span>
        </div>
        <div className="icon-item">
          <PencilRulerFill />
          <span className="icon-name">PencilRulerFill</span>
        </div>
        <div className="icon-item">
          <PaintBrushFill />
          <span className="icon-name">PaintBrushFill</span>
        </div>
        <div className="icon-item">
          <LayoutGridFill />
          <span className="icon-name">LayoutGridFill</span>
        </div>
        <div className="icon-item">
          <MagicFill />
          <span className="icon-name">MagicFill</span>
        </div>
        <div className="icon-item">
          <CropFill />
          <span className="icon-name">CropFill</span>
        </div>
        <div className="icon-item">
          <GridFill />
          <span className="icon-name">GridFill</span>
        </div>
        <div className="icon-item">
          <SliceFill />
          <span className="icon-name">SliceFill</span>
        </div>
        <div className="icon-item">
          <ScissorsFill />
          <span className="icon-name">ScissorsFill</span>
        </div>
        <div className="icon-item">
          <PaletteFill />
          <span className="icon-name">PaletteFill</span>
        </div>
        <div className="icon-item">
          <RulerFill />
          <span className="icon-name">RulerFill</span>
        </div>
        <div className="icon-item">
          <CompassesFill />
          <span className="icon-name">CompassesFill</span>
        </div>
        <div className="icon-item">
          <PencilFill />
          <span className="icon-name">PencilFill</span>
        </div>
      </div>
    </div>
  ),
  name: 'All Design Icons'
}

// Customization examples
export const WithCustomColors: Story = {
  render: () => (
    <div className="design-icons-showcase">
      <h2 className="showcase-title">Design Icons with Custom Colors</h2>
      <div className="icons-grid">
        <div className="icon-item">
          <EditFill fill="var(--color-red-600)" />
          <span className="icon-name">Red Edit</span>
        </div>
        <div className="icon-item">
          <PaintBrushFill fill="var(--color-blue-700)" />
          <span className="icon-name">Blue Paint Brush</span>
        </div>
        <div className="icon-item">
          <MagicFill fill="var(--color-yellow-500)" />
          <span className="icon-name">Yellow Magic</span>
        </div>
        <div className="icon-item">
          <PaletteFill fill="var(--color-green-600)" />
          <span className="icon-name">Green Palette</span>
        </div>
        <div className="icon-item">
          <GridFill fill="var(--color-gray-500)" />
          <span className="icon-name">Gray Grid</span>
        </div>
        <div className="icon-item">
          <RulerFill fill="var(--text-blue-tertiary)" />
          <span className="icon-name">Tertiary Ruler</span>
        </div>
      </div>
    </div>
  ),
  name: 'Custom Colors'
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="design-icons-showcase">
      <h2 className="showcase-title">Design Icons in Different Sizes</h2>
      <div className="size-variations">
        <div className="size-group">
          <h3>Small (16px)</h3>
          <div className="icons-row">
            <EditFill width={16} height={16} />
            <PaintBrushFill width={16} height={16} />
            <PaletteFill width={16} height={16} />
            <RulerFill width={16} height={16} />
          </div>
        </div>
        <div className="size-group">
          <h3>Medium (24px - Default)</h3>
          <div className="icons-row">
            <EditFill />
            <PaintBrushFill />
            <PaletteFill />
            <RulerFill />
          </div>
        </div>
        <div className="size-group">
          <h3>Large (32px)</h3>
          <div className="icons-row">
            <EditFill width={32} height={32} />
            <PaintBrushFill width={32} height={32} />
            <PaletteFill width={32} height={32} />
            <RulerFill width={32} height={32} />
          </div>
        </div>
        <div className="size-group">
          <h3>Extra Large (48px)</h3>
          <div className="icons-row">
            <EditFill width={48} height={48} />
            <PaintBrushFill width={48} height={48} />
            <PaletteFill width={48} height={48} />
            <RulerFill width={48} height={48} />
          </div>
        </div>
      </div>
    </div>
  ),
  name: 'Different Sizes'
}
