import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useMemo } from 'react';
import * as AlertIcons from './index';
import { copySVGToClipboard, downloadSVG } from '../utils/svgExtractor';
import { IconCard, CatalogLayout, CatalogControls, CatalogControlGroup, CatalogGrid, CatalogEmptyState } from '../shared';
import './Alerts.stories.css';
import '../../../tokens.css';

const meta: Meta = {
  title: 'Icons/Alerts',
};

export default meta;

type Story = StoryObj;

// Icon categories organized by type and variant
const alertIconCategories = {
  'Basic': [
    { name: 'Dash', component: AlertIcons.Dash, semantic: 'Neutral' },
    { name: 'Plus', component: AlertIcons.Plus, semantic: 'Add/Create' },
    { name: 'Slash', component: AlertIcons.Slash, semantic: 'Block/Disable' },
    { name: 'X', component: AlertIcons.X, semantic: 'Close/Remove' },
    { name: 'Question', component: AlertIcons.Question, semantic: 'Help/Unknown' },
    { name: 'Info', component: AlertIcons.Info, semantic: 'Information' },
    { name: 'Exclamation', component: AlertIcons.Exclamation, semantic: 'Warning/Important' },
    { name: 'Check', component: AlertIcons.Check, semantic: 'Success/Complete' },
    { name: 'Check All', component: AlertIcons.CheckAll, semantic: 'Multiple Success' }
  ],
  'Large': [
    { name: 'Dash Lg', component: AlertIcons.DashLg, semantic: 'Neutral' },
    { name: 'Plus Lg', component: AlertIcons.PlusLg, semantic: 'Add/Create' },
    { name: 'Slash Lg', component: AlertIcons.SlashLg, semantic: 'Block/Disable' },
    { name: 'X Lg', component: AlertIcons.XLg, semantic: 'Close/Remove' },
    { name: 'Info Lg', component: AlertIcons.InfoLg, semantic: 'Information' },
    { name: 'Question Lg', component: AlertIcons.QuestionLg, semantic: 'Help/Unknown' },
    { name: 'Exclamation Lg', component: AlertIcons.ExclamationLg, semantic: 'Warning/Important' },
    { name: 'Check Lg', component: AlertIcons.CheckLg, semantic: 'Success/Complete' },
    { name: 'Check All Lg', component: AlertIcons.CheckAllLg, semantic: 'Multiple Success' }
  ],
  'Circle': [
    { name: 'Dash Circle', component: AlertIcons.DashCircle, semantic: 'Neutral' },
    { name: 'Plus Circle', component: AlertIcons.PlusCircle, semantic: 'Add/Create' },
    { name: 'Slash Circle', component: AlertIcons.SlashCircle, semantic: 'Block/Disable' },
    { name: 'X Circle', component: AlertIcons.XCircle, semantic: 'Close/Remove' },
    { name: 'Info Circle', component: AlertIcons.InfoCircle, semantic: 'Information' },
    { name: 'Question Circle', component: AlertIcons.QuestionCircle, semantic: 'Help/Unknown' },
    { name: 'Exclamation Circle', component: AlertIcons.ExclamationCircle, semantic: 'Warning/Important' },
    { name: 'Check Circle', component: AlertIcons.CheckCircle, semantic: 'Success/Complete' }
  ],
  'Circle Fill': [
    { name: 'Dash Circle Fill', component: AlertIcons.DashCircleFill, semantic: 'Neutral' },
    { name: 'Plus Circle Fill', component: AlertIcons.PlusCircleFill, semantic: 'Add/Create' },
    { name: 'Slash Circle Fill', component: AlertIcons.SlashCircleFill, semantic: 'Block/Disable' },
    { name: 'X Circle Fill', component: AlertIcons.XCircleFill, semantic: 'Close/Remove' },
    { name: 'Info Circle Fill', component: AlertIcons.InfoCircleFill, semantic: 'Information' },
    { name: 'Question Circle Fill', component: AlertIcons.QuestionCircleFill, semantic: 'Help/Unknown' },
    { name: 'Exclamation Circle Fill', component: AlertIcons.ExclamationCircleFill, semantic: 'Warning/Important' },
    { name: 'Check Circle Fill', component: AlertIcons.CheckCircleFill, semantic: 'Success/Complete' }
  ],
  'Square': [
    { name: 'Dash Square', component: AlertIcons.DashSquare, semantic: 'Neutral' },
    { name: 'Plus Square', component: AlertIcons.PlusSquare, semantic: 'Add/Create' },
    { name: 'Slash Square', component: AlertIcons.SlashSquare, semantic: 'Block/Disable' },
    { name: 'X Square', component: AlertIcons.XSquare, semantic: 'Close/Remove' },
    { name: 'Info Square', component: AlertIcons.InfoSquare, semantic: 'Information' },
    { name: 'Question Square', component: AlertIcons.QuestionSquare, semantic: 'Help/Unknown' },
    { name: 'Exclamation Square', component: AlertIcons.ExclamationSquare, semantic: 'Warning/Important' },
    { name: 'Check Square', component: AlertIcons.CheckSquare, semantic: 'Success/Complete' }
  ],
  'Square Fill': [
    { name: 'Dash Square Fill', component: AlertIcons.DashSquareFill, semantic: 'Neutral' },
    { name: 'Plus Square Fill', component: AlertIcons.PlusSquareFill, semantic: 'Add/Create' },
    { name: 'Slash Square Fill', component: AlertIcons.SlashSquareFill, semantic: 'Block/Disable' },
    { name: 'X Square Fill', component: AlertIcons.XSquareFill, semantic: 'Close/Remove' },
    { name: 'Info Square Fill', component: AlertIcons.InfoSquareFill, semantic: 'Information' },
    { name: 'Question Square Fill', component: AlertIcons.QuestionSquareFill, semantic: 'Help/Unknown' },
    { name: 'Exclamation Square Fill', component: AlertIcons.ExclamationSquareFill, semantic: 'Warning/Important' },
    { name: 'Check Square Fill', component: AlertIcons.CheckSquareFill, semantic: 'Success/Complete' }
  ],
  'Triangle': [
    { name: 'Exclamation Triangle', component: AlertIcons.ExclamationTriangle, semantic: 'Warning/Important' },
    { name: 'Exclamation Triangle Fill', component: AlertIcons.ExclamationTriangleFill, semantic: 'Warning/Important' }
  ],
  'Diamond': [
    { name: 'Exclamation Diamond', component: AlertIcons.ExclamationDiamond, semantic: 'Warning/Important' },
    { name: 'Question Diamond', component: AlertIcons.QuestionDiamond, semantic: 'Help/Unknown' },
    { name: 'X Diamond', component: AlertIcons.XDiamond, semantic: 'Close/Remove' },
    { name: 'Exclamation Diamond Fill', component: AlertIcons.ExclamationDiamondFill, semantic: 'Warning/Important' }
  ],
  'Octagon': [
    { name: 'Exclamation Octagon', component: AlertIcons.ExclamationOctagon, semantic: 'Warning/Important' },
    { name: 'Question Octagon', component: AlertIcons.QuestionOctagon, semantic: 'Help/Unknown' },
    { name: 'X Octagon', component: AlertIcons.XOctagon, semantic: 'Close/Remove' },
    { name: 'Exclamation Octagon Fill', component: AlertIcons.ExclamationOctagonFill, semantic: 'Warning/Important' }
  ],
  'Dotted': [
    { name: 'Dash Circle Dotted', component: AlertIcons.DashCircleDotted, semantic: 'Neutral' },
    { name: 'Plus Circle Dotted', component: AlertIcons.PlusCircleDotted, semantic: 'Add/Create' },
    { name: 'Dash Square Dotted', component: AlertIcons.DashSquareDotted, semantic: 'Neutral' },
    { name: 'Plus Square Dotted', component: AlertIcons.PlusSquareDotted, semantic: 'Add/Create' }
  ]
};

// Flatten all icons for search
const allAlertIcons = Object.values(alertIconCategories).flat();

const AlertIconsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSemantic, setSelectedSemantic] = useState('All');
  const [iconSize, setIconSize] = useState(32);
  const [copyStatus, setCopyStatus] = useState<string>('');

  const filteredIcons = useMemo(() => {
    let filtered = allAlertIcons;

    if (selectedCategory !== 'All') {
      const categoryIcons = alertIconCategories[selectedCategory as keyof typeof alertIconCategories];
      filtered = categoryIcons || [];
    }

    if (selectedSemantic !== 'All') {
      filtered = filtered.filter(icon => icon.semantic === selectedSemantic);
    }

    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.semantic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedSemantic]);

  const categories = ['All', ...Object.keys(alertIconCategories)];
  const semantics = ['All', 'Neutral', 'Add/Create', 'Block/Disable', 'Close/Remove', 'Help/Unknown', 'Information', 'Warning/Important', 'Success/Complete', 'Multiple Success'];

  const handleCopySuccess = (message: string) => {
    setCopyStatus(message);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleCopyError = (error: string) => {
    setCopyStatus(error);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const getSemanticColor = (semantic: string) => {
    switch (semantic) {
      case 'Success/Complete':
      case 'Multiple Success':
        return 'var(--color-green-600)';
      case 'Warning/Important':
        return 'var(--color-yellow-600)';
      case 'Close/Remove':
      case 'Block/Disable':
        return 'var(--color-red-600)';
      case 'Information':
        return 'var(--color-blue-700)';
      case 'Help/Unknown':
        return 'var(--color-blue-600)';
      case 'Add/Create':
        return 'var(--color-green-700)';
      default:
        return 'var(--text-blue-main)';
    }
  };

  return (
    <CatalogLayout
      title="Alert Icons"
      description="Comprehensive collection of alert, warning, and notification icons. Designed to communicate different states and actions clearly."
      copyStatus={copyStatus}
    >
      <CatalogControls>
        <CatalogControlGroup label="Search">
          <input
            type="text"
            placeholder="Search alert icons..."
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
        
        <CatalogControlGroup label="Semantic">
          <select
            value={selectedSemantic}
            onChange={(e) => setSelectedSemantic(e.target.value)}
          >
            {semantics.map(semantic => (
              <option key={semantic} value={semantic}>{semantic}</option>
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
            const semanticColor = getSemanticColor(icon.semantic);
            
            return (
              <IconCard
                key={index}
                icon={icon.component}
                iconSize={iconSize}
                iconColor={semanticColor}
                name={icon.name}
                category={icon.semantic}
                categoryColor={semanticColor}
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            );
          })
        ) : (
          <CatalogEmptyState
            icon={<AlertIcons.QuestionCircle width={48} height={48} fill="var(--text-gray-disabled)" />}
            message="No alert icons found matching your search criteria."
            suggestion="Try adjusting your filters or search terms."
          />
        )}
      </CatalogGrid>
    </CatalogLayout>
  );
};

export const Catalog: Story = {
  render: () => <AlertIconsCatalog />,
};

// Semantic Usage Examples
const SemanticUsageExamples = () => {
  return (
    <div className="alert-icons-semantic-examples">
      <h2>Semantic Usage Examples</h2>
      <p>Examples of how to use alert icons in different contexts with appropriate colors:</p>
      
      <div className="semantic-example-grid">
        <div className="semantic-example">
          <h3>Success States</h3>
          <div className="semantic-icons">
            <AlertIcons.CheckCircleFill width={24} height={24} fill="var(--color-green-600)" />
            <AlertIcons.Check width={24} height={24} fill="var(--color-green-600)" />
            <AlertIcons.CheckSquareFill width={24} height={24} fill="var(--color-green-600)" />
          </div>
          <p>Use for successful operations, completed tasks, and positive confirmations.</p>
        </div>
        
        <div className="semantic-example">
          <h3>Warning States</h3>
          <div className="semantic-icons">
            <AlertIcons.ExclamationTriangleFill width={24} height={24} fill="var(--color-yellow-600)" />
            <AlertIcons.ExclamationCircleFill width={24} height={24} fill="var(--color-yellow-600)" />
            <AlertIcons.Exclamation width={24} height={24} fill="var(--color-yellow-600)" />
          </div>
          <p>Use for warnings, caution messages, and important notifications.</p>
        </div>
        
        <div className="semantic-example">
          <h3>Error States</h3>
          <div className="semantic-icons">
            <AlertIcons.XCircleFill width={24} height={24} fill="var(--color-red-600)" />
            <AlertIcons.X width={24} height={24} fill="var(--color-red-600)" />
            <AlertIcons.XOctagon width={24} height={24} fill="var(--color-red-600)" />
          </div>
          <p>Use for errors, failed operations, and destructive actions.</p>
        </div>
        
        <div className="semantic-example">
          <h3>Information States</h3>
          <div className="semantic-icons">
            <AlertIcons.InfoCircleFill width={24} height={24} fill="var(--color-blue-700)" />
            <AlertIcons.Info width={24} height={24} fill="var(--color-blue-700)" />
            <AlertIcons.InfoSquare width={24} height={24} fill="var(--color-blue-700)" />
          </div>
          <p>Use for informational messages and helpful tips.</p>
        </div>
        
        <div className="semantic-example">
          <h3>Help/Question States</h3>
          <div className="semantic-icons">
            <AlertIcons.QuestionCircleFill width={24} height={24} fill="var(--color-blue-600)" />
            <AlertIcons.Question width={24} height={24} fill="var(--color-blue-600)" />
            <AlertIcons.QuestionDiamond width={24} height={24} fill="var(--color-blue-600)" />
          </div>
          <p>Use for help sections, tooltips, and unknown states.</p>
        </div>
        
        <div className="semantic-example">
          <h3>Action States</h3>
          <div className="semantic-icons">
            <AlertIcons.PlusCircleFill width={24} height={24} fill="var(--color-green-700)" />
            <AlertIcons.Plus width={24} height={24} fill="var(--color-green-700)" />
            <AlertIcons.Dash width={24} height={24} fill="var(--text-blue-main)" />
          </div>
          <p>Use for actions like add, remove, expand, and collapse.</p>
        </div>
      </div>
    </div>
  );
};

export const SemanticUsage: Story = {
  render: () => <SemanticUsageExamples />,
};
