import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useMemo } from 'react';
import * as Icons from './index';
import './Icons.stories.css';

const meta: Meta = {
  title: 'Icons',
};

export default meta;

type Story = StoryObj;

// Icon categories and their components
const iconCategories = {
  'Building & Property': [
    { name: 'Hospital Line', component: Icons.HospitalLine, category: 'Healthcare' },
    { name: 'Government Fill', component: Icons.GovernmentFill, category: 'Government' },
    { name: 'Bank Fill', component: Icons.BankFill, category: 'Finance' },
    { name: 'Building Fill', component: Icons.BuildingFill, category: 'Commercial' },
    { name: 'Building 4 Fill', component: Icons.Building4Fill, category: 'Commercial' },
    { name: 'Store Fill', component: Icons.StoreFill, category: 'Retail' },
    { name: 'Hotel Fill', component: Icons.HotelFill, category: 'Hospitality' },
    { name: 'Community Fill', component: Icons.CommunityFill, category: 'Community' },
    { name: 'Ancient Pavilion Fill', component: Icons.AncientPavilionFill, category: 'Historical' },
    { name: 'Ancient Gate Fill', component: Icons.AncientGateFill, category: 'Historical' }
  ],
  'Home & Residential': [
    { name: 'Home Fill', component: Icons.HomeFill, category: 'Residential' },
    { name: 'Home 2 Fill', component: Icons.Home2Fill, category: 'Residential' },
    { name: 'Home 3 Fill', component: Icons.Home3Fill, category: 'Residential' },
    { name: 'Home 8 Fill', component: Icons.Home8Fill, category: 'Residential' },
    { name: 'Home Heart Line', component: Icons.HomeHeartLine, category: 'Special' }
  ],
  'File Types': [
    { name: 'PDF', component: Icons.FiletypePdf, category: 'Document' },
    { name: 'PDF Fill', component: Icons.FiletypePdfFill, category: 'Document' },
    { name: 'DOC', component: Icons.FiletypeDoc, category: 'Document' },
    { name: 'PNG', component: Icons.FiletypePng, category: 'Image' },
    { name: 'JPG', component: Icons.FiletypeJpg, category: 'Image' },
    { name: 'SVG', component: Icons.FiletypeSvg, category: 'Image' },
    { name: 'JavaScript', component: Icons.FiletypeJs, category: 'Code' },
    { name: 'JSON', component: Icons.FiletypeJson, category: 'Code' },
    { name: 'CSS', component: Icons.FiletypeCss, category: 'Code' },
    { name: 'HTML', component: Icons.FiletypeHtml, category: 'Code' },
    { name: 'XML', component: Icons.FiletypeXml, category: 'Code' },
    { name: 'TXT', component: Icons.FiletypeTxt, category: 'Document' },
    { name: 'MP4', component: Icons.FiletypeMp4, category: 'Video' },
    { name: 'MP3', component: Icons.FiletypeMp3, category: 'Audio' },
    { name: 'ZIP', component: Icons.FiletypeZip, category: 'Archive' },
    { name: 'AI', component: Icons.FiletypeAi, category: 'Design' },
    { name: 'XLS', component: Icons.FiletypeXls, category: 'Spreadsheet' },
    { name: 'PPT', component: Icons.FiletypePpt, category: 'Presentation' }
  ],
  'Business & Communication': [
    { name: 'Advertisement Line', component: Icons.AdvertisementLine, category: 'Marketing' },
    { name: 'At Line', component: Icons.AtLine, category: 'Communication' },
    { name: 'Mail Send Line', component: Icons.MailSendLine, category: 'Communication' },
    { name: 'Inbox Fill', component: Icons.InboxFill, category: 'Communication' },
    { name: 'Mail Line', component: Icons.MailLine, category: 'Communication' },
    { name: 'Briefcase Fill', component: Icons.BriefcaseFill, category: 'Business' },
    { name: 'Calendar Line', component: Icons.CalendarLine, category: 'Time' },
    { name: 'Customer Service Fill', component: Icons.CustomerServiceFill, category: 'Support' },
    { name: 'Global Fill', component: Icons.GlobalFill, category: 'International' },
    { name: 'Send Plane Fill', component: Icons.SendPlaneFill, category: 'Communication' },
    { name: 'Printer Fill', component: Icons.PrinterFill, category: 'Office' },
    { name: 'Projector Line', component: Icons.ProjectorLine, category: 'Presentation' }
  ],
  'Data & Analytics': [
    { name: 'Bar Chart Fill', component: Icons.BarChartFill, category: 'Charts' },
    { name: 'Pie Chart Fill', component: Icons.PieChartFill, category: 'Charts' },
    { name: 'Line Chart Fill', component: Icons.LineChartFill, category: 'Charts' },
    { name: 'Window Line', component: Icons.WindowLine, category: 'Interface' },
    { name: 'Cloud Off Line', component: Icons.CloudOffLine, category: 'Cloud' }
  ],
  'Awards & Media': [
    { name: 'Award Line', component: Icons.AwardLine, category: 'Achievement' },
    { name: 'Bookmark Fill', component: Icons.BookmarkFill, category: 'Bookmarks' },
    { name: 'Archive Fill', component: Icons.ArchiveFill, category: 'Storage' },
    { name: 'Image Icon', component: Icons.ImageIcon, category: 'Media' }
  ],
  'Navigation': [
    { name: 'Chevron Up', component: Icons.ChevronUp, category: 'Navigation' },
    { name: 'Chevron Down', component: Icons.ChevronDown, category: 'Navigation' }
  ],
  'Kubernetes': [
    { name: 'Kubernetes Namespace', component: Icons.KubernetesNamespace, category: 'Workloads' },
    { name: 'Kubernetes Service', component: Icons.KubernetesService, category: 'Networking' },
    { name: 'Kubernetes Deployment', component: Icons.KubernetesDeployment, category: 'Workloads' },
    { name: 'Kubernetes Job', component: Icons.KubernetesJob, category: 'Workloads' },
    { name: 'Kubernetes Ingress', component: Icons.KubernetesIngress, category: 'Networking' },
    { name: 'Kubernetes Pod', component: Icons.KubernetesPod, category: 'Workloads' },
    { name: 'Kubernetes Secret', component: Icons.KubernetesSecret, category: 'Config' },
    { name: 'Kubernetes ConfigMap', component: Icons.KubernetesConfigMap, category: 'Config' },
    { name: 'Kubernetes PersistentVolume', component: Icons.KubernetesPersistentVolume, category: 'Storage' },
    { name: 'Kubernetes PersistentVolumeClaim', component: Icons.KubernetesPersistentVolumeClaim, category: 'Storage' },
    { name: 'Kubernetes StatefulSet', component: Icons.KubernetesStatefulSet, category: 'Workloads' },
    { name: 'Kubernetes Node', component: Icons.KubernetesNode, category: 'Cluster' }
  ],
  'Graphics & Design': [
    { name: 'Union', component: Icons.Union, category: 'Boolean' },
    { name: 'Subtract', component: Icons.Subtract, category: 'Boolean' },
    { name: 'Intersect', component: Icons.Intersect, category: 'Boolean' },
    { name: 'Exclude', component: Icons.Exclude, category: 'Boolean' },
    { name: 'Vector Pen', component: Icons.VectorPen, category: 'Drawing' },
    { name: 'Bezier', component: Icons.Bezier, category: 'Drawing' },
    { name: 'Eyedropper', component: Icons.Eyedropper, category: 'Tools' },
    { name: 'Eraser', component: Icons.Eraser, category: 'Tools' },
    { name: 'Palette', component: Icons.Palette, category: 'Color' },
    { name: 'Layers', component: Icons.Layers, category: 'Layers' },
    { name: 'Layers Fill', component: Icons.LayersFill, category: 'Layers' },
    { name: 'Mask', component: Icons.Mask, category: 'Effects' },
    { name: 'Align Start', component: Icons.AlignStart, category: 'Alignment' },
    { name: 'Align End', component: Icons.AlignEnd, category: 'Alignment' },
    { name: 'Align Center', component: Icons.AlignCenter, category: 'Alignment' },
    { name: 'Align Top', component: Icons.AlignTop, category: 'Alignment' },
    { name: 'Align Bottom', component: Icons.AlignBottom, category: 'Alignment' },
    { name: 'Align Middle', component: Icons.AlignMiddle, category: 'Alignment' },
    { name: 'Distribute Horizontal', component: Icons.DistributeHorizontal, category: 'Distribution' },
    { name: 'Distribute Vertical', component: Icons.DistributeVertical, category: 'Distribution' },
    { name: 'Symmetry Horizontal', component: Icons.SymmetryHorizontal, category: 'Transform' },
    { name: 'Symmetry Vertical', component: Icons.SymmetryVertical, category: 'Transform' },
    { name: 'Stack', component: Icons.Stack, category: 'Layers' },
    { name: 'Zoom In', component: Icons.ZoomIn, category: 'View' },
    { name: 'Zoom Out', component: Icons.ZoomOut, category: 'View' },
    { name: 'Bounding Box', component: Icons.BoundingBox, category: 'Selection' },
    { name: 'Crop', component: Icons.Crop, category: 'Tools' },
    { name: 'Sliders', component: Icons.Sliders, category: 'Controls' },
    { name: 'Node Plus', component: Icons.NodePlus, category: 'Nodes' },
    { name: 'Node Minus', component: Icons.NodeMinus, category: 'Nodes' }
  ]
};

// Flatten all icons for search
const allIcons = Object.values(iconCategories).flat();

const IconsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIcons = useMemo(() => {
    let filtered = allIcons;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(icon => {
        const categoryIcons = iconCategories[selectedCategory as keyof typeof iconCategories];
        return categoryIcons && categoryIcons.includes(icon);
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const categories = ['All', ...Object.keys(iconCategories)];

  return (
    <div className="icons-catalog">
      <div className="icons-header">
        <h1>Icons Catalog</h1>
        <div className="icons-controls">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="icons-search"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="icons-category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="icons-results">
        <p className="icons-count">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="icons-grid">
        {filteredIcons.map((icon, index) => {
          const IconComponent = icon.component;
          return (
            <div key={index} className="icon-item">
              <div className="icon-preview">
                <IconComponent width={32} height={32} />
              </div>
              <div className="icon-info">
                <h3 className="icon-name">{icon.name}</h3>
                <span className="icon-category">{icon.category}</span>
              </div>
              <button
                className="icon-copy"
                onClick={() => navigator.clipboard.writeText(icon.name)}
                title="Copy icon name"
              >
                Copy
              </button>
            </div>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="icons-empty">
          <p>No icons found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export const Catalog: Story = {
  render: () => <IconsCatalog />,
};
