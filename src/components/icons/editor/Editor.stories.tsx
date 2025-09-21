import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useMemo } from 'react';
import * as EditorIcons from './index';
import './Editor.stories.css';

const meta: Meta = {
  title: 'Icons/Editor',
};

export default meta;

type Story = StoryObj;

// Icon categories organized by functionality
const editorIconCategories = {
  'Text Formatting': [
    { name: 'Bold', component: EditorIcons.Bold, semantic: 'Strong Text' },
    { name: 'Italic', component: EditorIcons.Italic, semantic: 'Emphasized Text' },
    { name: 'Underline', component: EditorIcons.Underline, semantic: 'Underlined Text' },
    { name: 'Strikethrough', component: EditorIcons.Strikethrough, semantic: 'Crossed Out Text' },
    { name: 'Superscript', component: EditorIcons.Superscript, semantic: 'Superscript Text' },
    { name: 'Subscript', component: EditorIcons.Subscript, semantic: 'Subscript Text' }
  ],
  'Text Alignment': [
    { name: 'Align Left', component: EditorIcons.AlignLeft, semantic: 'Left Alignment' },
    { name: 'Align Center', component: EditorIcons.AlignCenter, semantic: 'Center Alignment' },
    { name: 'Align Right', component: EditorIcons.AlignRight, semantic: 'Right Alignment' },
    { name: 'Align Justify', component: EditorIcons.AlignJustify, semantic: 'Justified Text' }
  ],
  'Lists': [
    { name: 'Ordered List', component: EditorIcons.ListOrdered, semantic: 'Numbered List' },
    { name: 'Unordered List', component: EditorIcons.ListUnordered, semantic: 'Bulleted List' }
  ],
  'Structure': [
    { name: 'Heading', component: EditorIcons.Heading, semantic: 'Header Text' },
    { name: 'Quote', component: EditorIcons.Quote, semantic: 'Block Quote' },
    { name: 'Text', component: EditorIcons.Text, semantic: 'Plain Text' }
  ],
  'Interactive': [
    { name: 'Link', component: EditorIcons.Link, semantic: 'Hyperlink' },
    { name: 'Code View', component: EditorIcons.CodeView, semantic: 'Code Block' }
  ],
  'Tables': [
    { name: 'Table', component: EditorIcons.Table, semantic: 'Table Structure' }
  ]
};

// Flatten all icons for search
const allEditorIcons = Object.values(editorIconCategories).flat();

const EditorIconsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSemantic, setSelectedSemantic] = useState('All');
  const [iconSize, setIconSize] = useState(32);

  const filteredIcons = useMemo(() => {
    let filtered = allEditorIcons;

    if (selectedCategory !== 'All') {
      const categoryIcons = editorIconCategories[selectedCategory as keyof typeof editorIconCategories];
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

  const categories = ['All', ...Object.keys(editorIconCategories)];
  const semantics = ['All', 'Strong Text', 'Emphasized Text', 'Underlined Text', 'Crossed Out Text', 
                    'Superscript Text', 'Subscript Text', 'Left Alignment', 'Center Alignment', 
                    'Right Alignment', 'Justified Text', 'Numbered List', 'Bulleted List', 
                    'Header Text', 'Block Quote', 'Plain Text', 'Hyperlink', 'Code Block', 'Table Structure'];

  const getSemanticColor = (semantic: string) => {
    switch (semantic) {
      case 'Strong Text':
      case 'Emphasized Text':
        return 'var(--color-blue-800)';
      case 'Underlined Text':
      case 'Crossed Out Text':
        return 'var(--color-blue-700)';
      case 'Superscript Text':
      case 'Subscript Text':
        return 'var(--color-green-600)';
      case 'Left Alignment':
      case 'Center Alignment':
      case 'Right Alignment':
      case 'Justified Text':
        return 'var(--color-yellow-600)';
      case 'Numbered List':
      case 'Bulleted List':
        return 'var(--color-blue-600)';
      case 'Header Text':
      case 'Block Quote':
      case 'Plain Text':
        return 'var(--color-green-700)';
      case 'Hyperlink':
      case 'Code Block':
        return 'var(--color-red-600)';
      case 'Table Structure':
        return 'var(--color-blue-950)';
      default:
        return 'var(--text-blue-main)';
    }
  };

  return (
    <div className="editor-icons-catalog">
      <div className="editor-icons-header">
        <h1>Editor Icons Catalog</h1>
        <p className="editor-icons-description">
          Comprehensive collection of text editor and content formatting icons for rich text editing interfaces.
          These icons follow design token standards and provide consistent visual language for editor functionality.
        </p>
        
        <div className="editor-icons-controls">
          <div className="editor-icons-control-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="editor-icons-search"
            />
          </div>
          
          <div className="editor-icons-control-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="editor-icons-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="editor-icons-control-group">
            <label>Semantic:</label>
            <select
              value={selectedSemantic}
              onChange={(e) => setSelectedSemantic(e.target.value)}
              className="editor-icons-select"
            >
              {semantics.map(semantic => (
                <option key={semantic} value={semantic}>{semantic}</option>
              ))}
            </select>
          </div>
          
          <div className="editor-icons-control-group">
            <label>Size:</label>
            <input
              type="range"
              min="16"
              max="64"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="editor-icons-size-slider"
            />
            <span className="editor-icons-size-value">{iconSize}px</span>
          </div>
        </div>
      </div>

      <div className="editor-icons-results">
        <p className="editor-icons-count">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="editor-icons-grid">
        {filteredIcons.map((icon, index) => {
          const IconComponent = icon.component;
          const semanticColor = getSemanticColor(icon.semantic);
          
          return (
            <div key={index} className="editor-icon-item">
              <div className="editor-icon-preview">
                <IconComponent 
                  width={iconSize} 
                  height={iconSize} 
                  fill={semanticColor}
                />
              </div>
              <div className="editor-icon-info">
                <h3 className="editor-icon-name">{icon.name}</h3>
                <span className="editor-icon-semantic" style={{ color: semanticColor }}>
                  {icon.semantic}
                </span>
              </div>
              <button
                className="editor-icon-copy"
                onClick={() => navigator.clipboard.writeText(icon.name.replace(/\s+/g, ''))}
                title="Copy icon name"
              >
                Copy
              </button>
            </div>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="editor-icons-empty">
          <EditorIcons.Text width={48} height={48} fill="var(--color-gray-400)" />
          <p>No editor icons found matching your search criteria.</p>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export const Catalog: Story = {
  render: () => <EditorIconsCatalog />,
};

// Usage Examples
const EditorUsageExamples = () => {
  return (
    <div className="editor-icons-usage-examples">
      <h2>Editor Icons Usage Examples</h2>
      <p>Examples of how to use editor icons in text editing interfaces with design tokens:</p>
      
      <div className="usage-example-grid">
        <div className="usage-example">
          <h3>Text Formatting Toolbar</h3>
          <div className="editor-toolbar-example">
            <EditorIcons.Bold width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.Italic width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.Underline width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.Strikethrough width={20} height={20} fill="var(--text-blue-main)" />
          </div>
          <p>Use for basic text formatting operations in rich text editors.</p>
        </div>
        
        <div className="usage-example">
          <h3>Text Alignment Controls</h3>
          <div className="editor-toolbar-example">
            <EditorIcons.AlignLeft width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.AlignCenter width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.AlignRight width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.AlignJustify width={20} height={20} fill="var(--text-blue-main)" />
          </div>
          <p>Use for paragraph and text alignment in documents.</p>
        </div>
        
        <div className="usage-example">
          <h3>Content Structure</h3>
          <div className="editor-toolbar-example">
            <EditorIcons.Heading width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.Quote width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.ListOrdered width={20} height={20} fill="var(--text-blue-main)" />
            <EditorIcons.ListUnordered width={20} height={20} fill="var(--text-blue-main)" />
          </div>
          <p>Use for document structure and content organization.</p>
        </div>
        
        <div className="usage-example">
          <h3>Interactive Elements</h3>
          <div className="editor-toolbar-example">
            <EditorIcons.Link width={20} height={20} fill="var(--color-blue-700)" />
            <EditorIcons.CodeView width={20} height={20} fill="var(--color-green-600)" />
            <EditorIcons.Table width={20} height={20} fill="var(--text-blue-main)" />
          </div>
          <p>Use for adding interactive content and special formatting.</p>
        </div>
      </div>

      <div className="design-tokens-example">
        <h3>Design Token Usage</h3>
        <p>All editor icons use CSS design tokens for consistent theming:</p>
        <div className="token-examples">
          <div className="token-example">
            <code>fill="var(--text-blue-main)"</code>
            <span className="token-description">Primary text color for main icons</span>
          </div>
          <div className="token-example">
            <code>fill="var(--color-blue-700)"</code>
            <span className="token-description">Interactive elements like links</span>
          </div>
          <div className="token-example">
            <code>fill="var(--color-green-600)"</code>
            <span className="token-description">Code and technical elements</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UsageExamples: Story = {
  render: () => <EditorUsageExamples />,
};
