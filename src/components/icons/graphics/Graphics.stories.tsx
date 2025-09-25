import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import * as GraphicsIcons from './index'
import './Graphics.stories.css'

const meta: Meta = {
  title: 'Icons/Graphics',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

// Icon categories for graphics
const graphicsCategories = {
  'Boolean Operations': [
    { name: 'Union', component: GraphicsIcons.Union, description: 'Combine shapes into one' },
    { name: 'Subtract', component: GraphicsIcons.Subtract, description: 'Remove overlapping areas' },
    { name: 'Intersect', component: GraphicsIcons.Intersect, description: 'Keep only overlapping areas' },
    { name: 'Exclude', component: GraphicsIcons.Exclude, description: 'Remove overlapping areas from both' },
  ],
  'Transform Tools': [
    { name: 'Symmetry Horizontal', component: GraphicsIcons.SymmetryHorizontal, description: 'Mirror horizontally' },
    { name: 'Symmetry Vertical', component: GraphicsIcons.SymmetryVertical, description: 'Mirror vertically' },
    { name: 'Distribute Horizontal', component: GraphicsIcons.DistributeHorizontal, description: 'Distribute objects horizontally' },
    { name: 'Distribute Vertical', component: GraphicsIcons.DistributeVertical, description: 'Distribute objects vertically' },
    { name: 'Stack', component: GraphicsIcons.Stack, description: 'Layer objects' },
  ],
  'Alignment': [
    { name: 'Align Start', component: GraphicsIcons.AlignStart, description: 'Align to start edge' },
    { name: 'Align End', component: GraphicsIcons.AlignEnd, description: 'Align to end edge' },
    { name: 'Align Center', component: GraphicsIcons.AlignCenterGraphic, description: 'Align to center' },
    { name: 'Align Top', component: GraphicsIcons.AlignTop, description: 'Align to top edge' },
    { name: 'Align Bottom', component: GraphicsIcons.AlignBottom, description: 'Align to bottom edge' },
    { name: 'Align Middle', component: GraphicsIcons.AlignMiddle, description: 'Align to middle' },
  ],
  'Layer Management': [
    { name: 'Layers', component: GraphicsIcons.Layers, description: 'Layer management' },
    { name: 'Layers Fill', component: GraphicsIcons.LayersFill, description: 'Filled layer stack' },
    { name: 'Mask', component: GraphicsIcons.Mask, description: 'Apply mask effect' },
  ],
  'Drawing Tools': [
    { name: 'Vector Pen', component: GraphicsIcons.VectorPen, description: 'Vector drawing tool' },
    { name: 'Bezier', component: GraphicsIcons.Bezier, description: 'Bezier curve tool' },
    { name: 'Node Plus', component: GraphicsIcons.NodePlus, description: 'Add node point' },
    { name: 'Node Minus', component: GraphicsIcons.NodeMinus, description: 'Remove node point' },
    { name: 'Eraser', component: GraphicsIcons.Eraser, description: 'Erase tool' },
  ],
  'Color & View': [
    { name: 'Palette', component: GraphicsIcons.Palette, description: 'Color palette' },
    { name: 'Eyedropper', component: GraphicsIcons.Eyedropper, description: 'Pick color from canvas' },
    { name: 'Zoom In', component: GraphicsIcons.ZoomIn, description: 'Zoom in view' },
    { name: 'Zoom Out', component: GraphicsIcons.ZoomOut, description: 'Zoom out view' },
  ],
  'Selection & Transform': [
    { name: 'Bounding Box', component: GraphicsIcons.BoundingBox, description: 'Selection bounding box' },
    { name: 'Crop', component: GraphicsIcons.Crop, description: 'Crop tool' },
    { name: 'Sliders', component: GraphicsIcons.Sliders, description: 'Adjustment controls' },
  ],
}

// Flatten all icons for search
const allGraphicsIcons = Object.values(graphicsCategories).flat()

const GraphicsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState(24)

  const filteredIcons = allGraphicsIcons.filter(icon => {
    const matchesSearch = !searchTerm || 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || 
      Object.entries(graphicsCategories).some(([category, icons]) => 
        category === selectedCategory && icons.includes(icon)
      )
    
    return matchesSearch && matchesCategory
  })

  const categories = ['All', ...Object.keys(graphicsCategories)]
  const sizes = [16, 20, 24, 32, 48]

  return (
    <div className="graphics-catalog">
      <div className="graphics-header">
        <h1>Graphics Icons</h1>
        <p>Design and graphics tools for creative applications</p>
        
        <div className="graphics-controls">
          <input
            type="text"
            placeholder="Search graphics icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="graphics-search"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="graphics-category-select"
            aria-label="Select icon category"
            title="Select icon category"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
            className="graphics-size-select"
            aria-label="Select icon size"
            title="Select icon size"
          >
            {sizes.map(size => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </div>
      </div>

      <div className="graphics-results">
        <p className="graphics-count">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="graphics-grid">
        {filteredIcons
          .filter(icon => Boolean(icon.component))
          .map((icon, index) => {
          const IconComponent = icon.component
          return (
            <div key={index} className="graphics-item">
              <div className="graphics-preview">
                <IconComponent width={selectedSize} height={selectedSize} />
              </div>
              <div className="graphics-info">
                <h3 className="graphics-name">{icon.name}</h3>
                <p className="graphics-description">{icon.description}</p>
              </div>
              <button
                className="graphics-copy"
                onClick={() => navigator.clipboard.writeText(icon.name)}
                title="Copy icon name"
              >
                Copy
              </button>
            </div>
          )
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="graphics-empty">
          <p>No graphics icons found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export const Catalog: Story = {
  render: () => <GraphicsCatalog />,
}

export const BooleanOperations: Story = {
  render: () => {
    const icons = graphicsCategories['Boolean Operations'].filter(i => Boolean(i.component))
    return (
      <div className="graphics-showcase">
        <h2>Boolean Operations</h2>
        <div className="graphics-grid">
          {icons.map((icon, index) => {
            const IconComponent = icon.component
            return (
              <div key={index} className="graphics-item">
                <div className="graphics-preview">
                  <IconComponent width={32} height={32} />
                </div>
                <div className="graphics-info">
                  <h3 className="graphics-name">{icon.name}</h3>
                  <p className="graphics-description">{icon.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export const DrawingTools: Story = {
  render: () => {
    const icons = graphicsCategories['Drawing Tools'].filter(i => Boolean(i.component))
    return (
      <div className="graphics-showcase">
        <h2>Drawing Tools</h2>
        <div className="graphics-grid">
          {icons.map((icon, index) => {
            const IconComponent = icon.component
            return (
              <div key={index} className="graphics-item">
                <div className="graphics-preview">
                  <IconComponent width={32} height={32} />
                </div>
                <div className="graphics-info">
                  <h3 className="graphics-name">{icon.name}</h3>
                  <p className="graphics-description">{icon.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export const Alignment: Story = {
  render: () => {
    const icons = graphicsCategories['Alignment'].filter(i => Boolean(i.component))
    return (
      <div className="graphics-showcase">
        <h2>Alignment Tools</h2>
        <div className="graphics-grid">
          {icons.map((icon, index) => {
            const IconComponent = icon.component
            return (
              <div key={index} className="graphics-item">
                <div className="graphics-preview">
                  <IconComponent width={32} height={32} />
                </div>
                <div className="graphics-info">
                  <h3 className="graphics-name">{icon.name}</h3>
                  <p className="graphics-description">{icon.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
