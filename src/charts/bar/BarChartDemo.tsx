import React, { useState } from 'react';
import BarChart, { BarChartData } from './BarChart';

// Sample data based on Figma design
const protocolData: BarChartData[] = [
  { id: 'ssh', label: 'SSH', value: 0.43 },
  { id: 'ftp', label: 'FTP', value: 0.30 },
  { id: 'http', label: 'HTTP', value: 0.065 },
  { id: 'other', label: 'Other', value: 0.15 },
];

const salesData: BarChartData[] = [
  { id: 'q1', label: 'Q1', value: 125000 },
  { id: 'q2', label: 'Q2', value: 148000 },
  { id: 'q3', label: 'Q3', value: 167000 },
  { id: 'q4', label: 'Q4', value: 152000 },
];

const serverMetrics: BarChartData[] = [
  { id: 'cpu', label: 'CPU', value: 85.3 },
  { id: 'memory', label: 'Memory', value: 67.8 },
  { id: 'disk', label: 'Disk', value: 23.1 },
  { id: 'network', label: 'Network', value: 92.4 },
];

const regionData: BarChartData[] = [
  { id: 'us-east', label: 'US East', value: 342 },
  { id: 'us-west', label: 'US West', value: 278 },
  { id: 'europe', label: 'Europe', value: 198 },
  { id: 'asia', label: 'Asia', value: 156 },
  { id: 'australia', label: 'Australia', value: 89 },
];

const datasets = {
  protocol: { name: 'Protocol Usage', data: protocolData },
  sales: { name: 'Quarterly Sales', data: salesData },
  metrics: { name: 'Server Metrics', data: serverMetrics },
  regions: { name: 'Regional Activity', data: regionData },
};

const palettes = ['default', 'blue', 'warm', 'cool'] as const;

const BarChartDemo: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof datasets>('protocol');
  const [selectedPalette, setSelectedPalette] = useState<string>('default');
  const [showLegend, setShowLegend] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [interactive, setInteractive] = useState(true);

  const currentDataset = datasets[selectedDataset];

  const handleBarClick = (bar: any) => {
    alert(`Clicked on ${bar.data.label}: ${bar.data.value}`);
  };

  const handleBarHover = (bar: any) => {
    console.log('Hovered:', bar.data.label, bar.data.value);
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-family-macan-mono-stencil)',
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--text-blue-main)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Bar Chart Demo
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-family-macan)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-blue-secondary)',
            lineHeight: '1.5',
            marginBottom: '24px',
          }}
        >
          Interactive bar chart component built with Nivo and design tokens.
          Switch between different datasets and customize the appearance.
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          padding: '16px',
          background: 'var(--surface-subtle)',
          borderRadius: 'var(--sds-size-radius-100)',
        }}
      >
        <div>
          <label
            style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-blue-main)',
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Dataset
          </label>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value as keyof typeof datasets)}
            style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              padding: '8px 12px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--sds-size-radius-100)',
              background: 'var(--surface-card)',
              color: 'var(--text-blue-main)',
            }}
          >
            {Object.entries(datasets).map(([key, dataset]) => (
              <option key={key} value={key}>
                {dataset.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-blue-main)',
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Palette
          </label>
          <select
            value={selectedPalette}
            onChange={(e) => setSelectedPalette(e.target.value)}
            style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              padding: '8px 12px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--sds-size-radius-100)',
              background: 'var(--surface-card)',
              color: 'var(--text-blue-main)',
            }}
          >
            {palettes.map((palette) => (
              <option key={palette} value={palette}>
                {palette.charAt(0).toUpperCase() + palette.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-blue-main)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Options
          </label>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { key: 'showLegend', label: 'Legend', value: showLegend, setter: setShowLegend },
              { key: 'showGrid', label: 'Grid', value: showGrid, setter: setShowGrid },
              { key: 'interactive', label: 'Interactive', value: interactive, setter: setInteractive },
            ].map(({ key, label, value, setter }) => (
              <label
                key={key}
                style={{
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-blue-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setter(e.target.checked)}
                  style={{ margin: 0 }}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          height: '500px',
          background: 'var(--surface-card)',
          borderRadius: 'var(--sds-size-radius-100)',
          padding: '16px',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <BarChart
          data={currentDataset.data}
          palette={selectedPalette}
          height={500}
          showLegend={showLegend}
          showGrid={showGrid}
          interactive={interactive}
          onBarClick={handleBarClick}
          onBarHover={handleBarHover}
          axisLeft={{
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
            legend: selectedDataset === 'protocol' ? 'Food' : 'Value',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
            legend: selectedDataset === 'protocol' ? 'Country' : 'Category',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
        />
      </div>

      {/* Data Display */}
      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          background: 'var(--surface-subtle)',
          borderRadius: 'var(--sds-size-radius-100)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-family-macan-mono)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-blue-main)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Current Dataset: {currentDataset.name}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {currentDataset.data.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'var(--surface-card)',
                borderRadius: 'var(--sds-size-radius-100)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-blue-secondary)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-blue-main)',
                }}
              >
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChartDemo;
