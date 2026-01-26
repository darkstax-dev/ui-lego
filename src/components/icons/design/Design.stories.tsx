import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState, useMemo } from 'react'
import './Design.stories.css'
import { copySVGToClipboard, downloadSVG } from '../utils/svgExtractor'
import { IconCard, CatalogLayout, CatalogControls, CatalogControlGroup, CatalogGrid, CatalogEmptyState } from '../shared'
import '../../../tokens.css'

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

// Icon categories organized by design function
const designIconCategories = {
  'Layout & Structure': [
    { name: 'Layout 3 Fill', component: Layout3Fill, category: 'Layout' },
    { name: 'Layout 2 Fill', component: Layout2Fill, category: 'Layout' },
    { name: 'Layout Top 2 Fill', component: LayoutTop2Fill, category: 'Layout' },
    { name: 'Layout Grid Fill', component: LayoutGridFill, category: 'Grid' },
    { name: 'Grid Fill', component: GridFill, category: 'Grid' },
    { name: 'Drag Drop Line', component: DragDropLine, category: 'Interaction' }
  ],
  'Drawing & Creation': [
    { name: 'Pencil Fill', component: PencilFill, category: 'Drawing' },
    { name: 'Paint Brush Fill', component: PaintBrushFill, category: 'Painting' },
    { name: 'Edit Fill', component: EditFill, category: 'Editing' },
    { name: 'Magic Fill', component: MagicFill, category: 'Effects' },
    { name: 'Palette Fill', component: PaletteFill, category: 'Color' }
  ],
  'Measurement & Precision': [
    { name: 'Ruler Fill', component: RulerFill, category: 'Measurement' },
    { name: 'Pencil Ruler Fill', component: PencilRulerFill, category: 'Measurement' },
    { name: 'Compasses Fill', component: CompassesFill, category: 'Geometry' }
  ],
  'Image & Content Editing': [
    { name: 'Crop Fill', component: CropFill, category: 'Image Editing' },
    { name: 'Slice Fill', component: SliceFill, category: 'Cutting' },
    { name: 'Scissors Fill', component: ScissorsFill, category: 'Cutting' }
  ],
  'Visual Effects': [
    { name: 'Contrast 2 Fill', component: Contrast2Fill, category: 'Adjustment' },
    { name: 'Focus Fill', component: FocusFill, category: 'Focus' }
  ]
};

// Flatten all icons for search
const allDesignIcons = Object.values(designIconCategories).flat();

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

const DesignIconsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFunction, setSelectedFunction] = useState('All');
  const [iconSize, setIconSize] = useState(32);
  const [copyStatus, setCopyStatus] = useState<string>('');

  const filteredIcons = useMemo(() => {
    let filtered = allDesignIcons;

    if (selectedCategory !== 'All') {
      const categoryIcons = designIconCategories[selectedCategory as keyof typeof designIconCategories];
      filtered = categoryIcons || [];
    }

    if (selectedFunction !== 'All') {
      filtered = filtered.filter(icon => icon.category === selectedFunction);
    }

    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedFunction]);

  const categories = ['All', ...Object.keys(designIconCategories)];
  const functions = ['All', 'Layout', 'Grid', 'Interaction', 'Drawing', 'Painting', 'Editing', 'Effects', 'Color', 'Measurement', 'Geometry', 'Image Editing', 'Cutting', 'Adjustment', 'Focus'];

  const handleCopySuccess = (message: string) => {
    setCopyStatus(message);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleCopyError = (error: string) => {
    setCopyStatus(error);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Layout':
      case 'Grid':
        return 'var(--color-blue-600)';
      case 'Drawing':
      case 'Painting':
        return 'var(--color-green-600)';
      case 'Editing':
      case 'Effects':
        return 'var(--color-purple-600)';
      case 'Measurement':
      case 'Geometry':
        return 'var(--color-orange-600)';
      case 'Image Editing':
      case 'Cutting':
        return 'var(--color-red-600)';
      default:
        return 'var(--text-blue-main)';
    }
  };

  return (
    <CatalogLayout
      title="Design Icons"
      description="Professional design tools and layout icons for creative applications. Organized by function and purpose for easy discovery."
      copyStatus={copyStatus}
    >
      <CatalogControls>
        <CatalogControlGroup label="Search">
          <input
            type="text"
            placeholder="Search design icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CatalogControlGroup>
        
        <CatalogControlGroup label="Category">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </CatalogControlGroup>
        
        <CatalogControlGroup label="Function">
          <select
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
          >
            {functions.map(func => (
              <option key={func} value={func}>{func}</option>
            ))}
          </select>
        </CatalogControlGroup>
        
        <CatalogControlGroup label="Size">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sds-size-space-200)' }}>
            <input
              type="range"
              min="16"
              max="64"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
            />
            <span className="catalog-control-group__size-value">{iconSize}px</span>
          </div>
        </CatalogControlGroup>
      </CatalogControls>

      <CatalogGrid resultCount={filteredIcons.length}>
        {filteredIcons.length > 0 ? (
          filteredIcons.map((icon, index) => {
            const categoryColor = getCategoryColor(icon.category);
            
            return (
              <IconCard
                key={index}
                icon={icon.component}
                iconSize={iconSize}
                iconColor={categoryColor}
                name={icon.name}
                category={icon.category}
                categoryColor={categoryColor}
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            );
          })
        ) : (
          <CatalogEmptyState
            icon={<EditFill width={48} height={48} fill="var(--text-gray-disabled)" />}
            message="No design icons found matching your search criteria."
            suggestion="Try adjusting your filters or search terms."
          />
        )}
      </CatalogGrid>
    </CatalogLayout>
  );
};

// All icons showcase
export const Catalog: Story = {
  render: () => <DesignIconsCatalog />,
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
  )
}
