import React, { useState } from 'react';
import CirclePackingChart, { CirclePackingData, CirclePackingNode } from './CirclePackingChart';
import { chartPalettes } from '../palette';
import { ComputedDatum } from '@nivo/circle-packing';

// Sample hierarchical data for circle packing
const sampleData: CirclePackingData = {
  id: 'root',
  children: [
    {
      id: 'Frontend',
      children: [
        { id: 'React', value: 45 },
        { id: 'Vue', value: 28 },
        { id: 'Angular', value: 22 },
        { id: 'Svelte', value: 15 },
      ],
    },
    {
      id: 'Backend',
      children: [
        { id: 'Node.js', value: 38 },
        { id: 'Python', value: 35 },
        { id: 'Java', value: 32 },
        { id: 'Go', value: 18 },
        { id: 'Rust', value: 12 },
      ],
    },
    {
      id: 'Database',
      children: [
        { id: 'PostgreSQL', value: 42 },
        { id: 'MongoDB', value: 35 },
        { id: 'Redis', value: 25 },
        { id: 'MySQL', value: 20 },
      ],
    },
    {
      id: 'DevOps',
      children: [
        { id: 'Docker', value: 48 },
        { id: 'Kubernetes', value: 35 },
        { id: 'AWS', value: 40 },
        { id: 'GitHub Actions', value: 28 },
      ],
    },
  ],
};

const organizationData: CirclePackingData = {
  id: 'Company',
  children: [
    {
      id: 'Engineering',
      children: [
        { id: 'Frontend Team', value: 12 },
        { id: 'Backend Team', value: 15 },
        { id: 'DevOps Team', value: 8 },
        { id: 'Mobile Team', value: 10 },
      ],
    },
    {
      id: 'Product',
      children: [
        { id: 'Product Managers', value: 6 },
        { id: 'Designers', value: 8 },
        { id: 'Researchers', value: 4 },
      ],
    },
    {
      id: 'Sales & Marketing',
      children: [
        { id: 'Sales Team', value: 10 },
        { id: 'Marketing Team', value: 7 },
        { id: 'Customer Success', value: 5 },
      ],
    },
    {
      id: 'Operations',
      children: [
        { id: 'HR', value: 4 },
        { id: 'Finance', value: 3 },
        { id: 'Legal', value: 2 },
      ],
    },
  ],
};

const CirclePackingChartDemo: React.FC = () => {
  const [selectedPalette, setSelectedPalette] = useState('default');
  const [selectedDataset, setSelectedDataset] = useState<'tech' | 'org'>('tech');
  const [leavesOnly, setLeavesOnly] = useState(false);
  const [enableLabels, setEnableLabels] = useState(true);

  const currentData = selectedDataset === 'tech' ? sampleData : organizationData;

  const handleNodeClick = (node: ComputedDatum<CirclePackingData>) => {
    console.log('Clicked node:', node);
    alert(`Clicked on: ${node.id}${node.value ? ` (${node.value})` : ''}`);
  };

  const handleNodeHover = (node: ComputedDatum<CirclePackingData>) => {
    console.log('Hovered node:', node.id);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 
          style={{ 
            fontFamily: 'var(--font-family-macan-mono-stencil)',
            fontSize: 'var(--font-size-2xl)',
            color: 'var(--Text-Blue-text-Main-text)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Circle Packing Chart Demo
        </h2>
        <p 
          style={{ 
            fontFamily: 'var(--font-family-macan)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-blue-secondary)',
            lineHeight: '1.5',
            marginBottom: '24px'
          }}
        >
          Interactive circle packing visualization showing hierarchical data with customizable palettes and options.
        </p>
      </div>

      {/* Controls */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '24px', 
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <div>
          <label 
            style={{ 
              display: 'block',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--Text-Blue-text-Main-text)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Dataset
          </label>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value as 'tech' | 'org')}
            style={{
              padding: '8px 12px',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              border: '1px solid var(--Divider-Light)',
              borderRadius: '4px',
              backgroundColor: 'var(--Gray-200)',
              color: 'var(--Text-Blue-text-Main-text)',
            }}
          >
            <option value="tech">Technology Stack</option>
            <option value="org">Organization Structure</option>
          </select>
        </div>

        <div>
          <label 
            style={{ 
              display: 'block',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--Text-Blue-text-Main-text)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Color Palette
          </label>
          <select
            value={selectedPalette}
            onChange={(e) => setSelectedPalette(e.target.value)}
            style={{
              padding: '8px 12px',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              border: '1px solid var(--Divider-Light)',
              borderRadius: '4px',
              backgroundColor: 'var(--Gray-200)',
              color: 'var(--Text-Blue-text-Main-text)',
            }}
          >
            {Object.keys(chartPalettes).map((palette) => (
              <option key={palette} value={palette}>
                {palette.charAt(0).toUpperCase() + palette.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--Text-Blue-text-Main-text)',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={leavesOnly}
              onChange={(e) => setLeavesOnly(e.target.checked)}
              style={{ margin: 0 }}
            />
            Leaves Only
          </label>
        </div>

        <div>
          <label 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--Text-Blue-text-Main-text)',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={enableLabels}
              onChange={(e) => setEnableLabels(e.target.checked)}
              style={{ margin: 0 }}
            />
            Show Labels
          </label>
        </div>
      </div>

      {/* Chart */}
      <div 
        style={{ 
          border: '1px solid var(--Divider-Light)',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: 'var(--Gray-200)',
        }}
      >
        <CirclePackingChart
          data={currentData}
          palette={selectedPalette}
          height={500}
          leavesOnly={leavesOnly}
          enableLabels={enableLabels}
          onClick={handleNodeClick}
          onMouseEnter={handleNodeHover}
          padding={3}
          labelsSkipRadius={10}
        />
      </div>

      {/* Info */}
      <div 
        style={{ 
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-blue-100)',
          border: '1px solid var(--color-blue-300)',
          borderRadius: '6px'
        }}
      >
        <p 
          style={{ 
            fontFamily: 'var(--font-family-macan-mono)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-blue-800)',
            margin: 0
          }}
        >
          💡 <strong>Tip:</strong> Click on circles to see interactions. Hover to see tooltips. 
          Toggle "Leaves Only" to show only the innermost circles, or disable labels for a cleaner look.
        </p>
      </div>
    </div>
  );
};

export default CirclePackingChartDemo;
