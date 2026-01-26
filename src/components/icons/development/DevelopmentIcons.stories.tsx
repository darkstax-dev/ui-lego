import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState, useMemo } from 'react'
import './DevelopmentIcons.stories.css'
import '../../../tokens.css'
import { copySVGToClipboard, downloadSVG } from '../utils/svgExtractor'
import { IconCard, CatalogLayout, CatalogControls, CatalogControlGroup, CatalogGrid, CatalogEmptyState } from '../shared'
import * as DevIcons from './index'

const meta: Meta = {
  title: 'Icons/Development',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive collection of development and programming icons organized by technology and function.'
      }
    }
  }
}
export default meta

type Story = StoryObj

// Development icon categories organized by technology and function
const developmentIconCategories = {
  'Code Structure': [
    { name: 'Braces Fill', component: DevIcons.BracesFill, category: 'Syntax', technology: 'General' },
    { name: 'Braces Line', component: DevIcons.BracesLine, category: 'Syntax', technology: 'General' },
    { name: 'Brackets Fill', component: DevIcons.BracketsFill, category: 'Syntax', technology: 'General' },
    { name: 'Brackets Line', component: DevIcons.BracketsLine, category: 'Syntax', technology: 'General' },
    { name: 'Parentheses Fill', component: DevIcons.ParenthesesFill, category: 'Syntax', technology: 'General' },
    { name: 'Parentheses Line', component: DevIcons.ParenthesesLine, category: 'Syntax', technology: 'General' }
  ],
  'Code Editing': [
    { name: 'Code Fill', component: DevIcons.CodeFill, category: 'Editor', technology: 'General' },
    { name: 'Code Line', component: DevIcons.CodeLine, category: 'Editor', technology: 'General' },
    { name: 'Code Box Fill', component: DevIcons.CodeBoxFill, category: 'Editor', technology: 'General' },
    { name: 'Code Box Line', component: DevIcons.CodeBoxLine, category: 'Editor', technology: 'General' },
    { name: 'Code S Fill', component: DevIcons.CodeSFill, category: 'Editor', technology: 'General' },
    { name: 'Code S Line', component: DevIcons.CodeSLine, category: 'Editor', technology: 'General' },
    { name: 'Code S Slash Fill', component: DevIcons.CodeSSlashFill, category: 'Editor', technology: 'General' },
    { name: 'Code S Slash Line', component: DevIcons.CodeSSlashLine, category: 'Editor', technology: 'General' },
    { name: 'Cursor Fill', component: DevIcons.CursorFill, category: 'Editor', technology: 'General' },
    { name: 'Cursor Line', component: DevIcons.CursorLine, category: 'Editor', technology: 'General' }
  ],
  'Terminal & Command Line': [
    { name: 'Terminal Fill', component: DevIcons.TerminalFill, category: 'Terminal', technology: 'CLI' },
    { name: 'Terminal Line', component: DevIcons.TerminalLine, category: 'Terminal', technology: 'CLI' },
    { name: 'Terminal Box Fill', component: DevIcons.TerminalBoxFill, category: 'Terminal', technology: 'CLI' },
    { name: 'Terminal Box Line', component: DevIcons.TerminalBoxLine, category: 'Terminal', technology: 'CLI' },
    { name: 'Terminal Window Fill', component: DevIcons.TerminalWindowFill, category: 'Terminal', technology: 'CLI' },
    { name: 'Terminal Window Line', component: DevIcons.TerminalWindowLine, category: 'Terminal', technology: 'CLI' },
    { name: 'Command Fill', component: DevIcons.CommandFill, category: 'Terminal', technology: 'CLI' },
    { name: 'Command Line', component: DevIcons.CommandLine, category: 'Terminal', technology: 'CLI' }
  ],
  'Version Control (Git)': [
    { name: 'Git Branch Fill', component: DevIcons.GitBranchFill, category: 'Git', technology: 'Git' },
    { name: 'Git Branch Line', component: DevIcons.GitBranchLine, category: 'Git', technology: 'Git' },
    { name: 'Git Commit Fill', component: DevIcons.GitCommitFill, category: 'Git', technology: 'Git' },
    { name: 'Git Commit Line', component: DevIcons.GitCommitLine, category: 'Git', technology: 'Git' },
    { name: 'Git Merge Fill', component: DevIcons.GitMergeFill, category: 'Git', technology: 'Git' },
    { name: 'Git Merge Line', component: DevIcons.GitMergeLine, category: 'Git', technology: 'Git' },
    { name: 'Git Pull Request Fill', component: DevIcons.GitPullRequestFill, category: 'Git', technology: 'Git' }
  ],
  'Repository Management': [
    { name: 'Git Repository Fill', component: DevIcons.GitRepositoryFill, category: 'Repository', technology: 'Git' },
    { name: 'Git Repository Line', component: DevIcons.GitRepositoryLine, category: 'Repository', technology: 'Git' },
    { name: 'Git Repository Commits Fill', component: DevIcons.GitRepositoryCommitsFill, category: 'Repository', technology: 'Git' },
    { name: 'Git Repository Commits Line', component: DevIcons.GitRepositoryCommitsLine, category: 'Repository', technology: 'Git' },
    { name: 'Git Repository Private Fill', component: DevIcons.GitRepositoryPrivateFill, category: 'Repository', technology: 'Git' },
    { name: 'Git Repository Private Line', component: DevIcons.GitRepositoryPrivateLine, category: 'Repository', technology: 'Git' }
  ],
  'Web Technologies': [
    { name: 'HTML5 Fill', component: DevIcons.Html5Fill, category: 'Language', technology: 'HTML' },
    { name: 'HTML5 Line', component: DevIcons.Html5Line, category: 'Language', technology: 'HTML' },
    { name: 'CSS3 Fill', component: DevIcons.Css3Fill, category: 'Language', technology: 'CSS' },
    { name: 'CSS3 Line', component: DevIcons.Css3Line, category: 'Language', technology: 'CSS' }
  ],
  'Debugging & Testing': [
    { name: 'Bug Fill', component: DevIcons.BugFill, category: 'Debug', technology: 'General' },
    { name: 'Bug Line', component: DevIcons.BugLine, category: 'Debug', technology: 'General' }
  ]
};

// Flatten all icons for search
const allDevelopmentIcons = Object.values(developmentIconCategories).flat();

// Development Icons Catalog Component
const DevelopmentIconsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [selectedFunction, setSelectedFunction] = useState('All');
  const [iconSize, setIconSize] = useState(32);
  const [copyStatus, setCopyStatus] = useState<string>('');

  const filteredIcons = useMemo(() => {
    let filtered = allDevelopmentIcons;

    if (selectedCategory !== 'All') {
      const categoryIcons = developmentIconCategories[selectedCategory as keyof typeof developmentIconCategories];
      filtered = categoryIcons || [];
    }

    if (selectedTechnology !== 'All') {
      filtered = filtered.filter(icon => icon.technology === selectedTechnology);
    }

    if (selectedFunction !== 'All') {
      filtered = filtered.filter(icon => icon.category === selectedFunction);
    }

    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.technology.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedTechnology, selectedFunction]);

  const categories = ['All', ...Object.keys(developmentIconCategories)];
  const technologies = ['All', 'General', 'Git', 'CLI', 'HTML', 'CSS'];
  const functions = ['All', 'Syntax', 'Editor', 'Terminal', 'Git', 'Repository', 'Language', 'Debug'];

  const handleCopySuccess = (message: string) => {
    setCopyStatus(message);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleCopyError = (error: string) => {
    setCopyStatus(error);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const getTechnologyColor = (technology: string) => {
    switch (technology) {
      case 'Git':
        return 'var(--color-orange-600)';
      case 'CLI':
        return 'var(--color-green-600)';
      case 'HTML':
        return 'var(--color-red-600)';
      case 'CSS':
        return 'var(--color-blue-600)';
      case 'General':
        return 'var(--color-purple-600)';
      default:
        return 'var(--text-blue-main)';
    }
  };

  return (
    <CatalogLayout
      title="Development Icons"
      description="Comprehensive collection of development, programming, and version control icons. Organized by technology stack and workflow."
      copyStatus={copyStatus}
    >
      <CatalogControls>
        <CatalogControlGroup label="Search">
          <input
            type="text"
            placeholder="Search development icons..."
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
        
        <CatalogControlGroup label="Technology">
          <select
            value={selectedTechnology}
            onChange={(e) => setSelectedTechnology(e.target.value)}
          >
            {technologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
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
            const technologyColor = getTechnologyColor(icon.technology);
            
            return (
              <IconCard
                key={index}
                icon={icon.component}
                iconSize={iconSize}
                iconColor={technologyColor}
                name={icon.name}
                category={`${icon.category} • ${icon.technology}`}
                categoryColor={technologyColor}
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            );
          })
        ) : (
          <CatalogEmptyState
            icon={<DevIcons.CodeFill width={48} height={48} fill="var(--text-gray-disabled)" />}
            message="No development icons found matching your search criteria."
            suggestion="Try adjusting your filters or search terms."
          />
        )}
      </CatalogGrid>
    </CatalogLayout>
  );
};

export const Catalog: Story = {
  render: () => <DevelopmentIconsCatalog />,
}

export const All: Story = {
  render: () => (
    <div className="dev-icons-grid">
      {Object.entries(DevIcons).map(([name, Icon]) => (
        <div key={name} className="dev-icon-card">
          {React.createElement(Icon as React.FC<any>, { width: 24, height: 24, fill: 'var(--text-blue-main)' })}
          <div className="dev-icon-label">{name}</div>
        </div>
      ))}
    </div>
  ),
}
