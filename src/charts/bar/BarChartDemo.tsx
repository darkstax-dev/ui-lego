import React, { useState } from 'react';
import BarChart, { BarChartData, GroupedBarChartData } from './BarChart';

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

// Type for dataset entries
type DatasetEntry = {
  name: string;
  data: BarChartData[] | GroupedBarChartData[];
  keys?: string[];
};

// Grouped data with multiple categories per item (inspired by Nivo examples)
const groupedData: GroupedBarChartData[] = [
  { id: 'AD', Sales: 150, Marketing: 200, Support: 140, Engineering: 80 },
  { id: 'AE', Sales: 65, Marketing: 175, Support: 155, Engineering: 120 },
  { id: 'AF', Sales: 140, Marketing: 167, Support: 110, Engineering: 85 },
  { id: 'AG', Sales: 48, Marketing: 102, Support: 180, Engineering: 82 },
  { id: 'AI', Sales: 82, Marketing: 115, Support: 190, Engineering: 35 },
  { id: 'AL', Sales: 67, Marketing: 45, Support: 155, Engineering: 95 },
];

const datasets: Record<string, DatasetEntry> = {
  protocol: { name: 'Protocol Usage', data: protocolData },
  sales: { name: 'Quarterly Sales', data: salesData },
  metrics: { name: 'Server Metrics', data: serverMetrics },
  regions: { name: 'Regional Activity', data: regionData },
  grouped: { name: 'Grouped Categories', data: groupedData, keys: ['Sales', 'Marketing', 'Support', 'Engineering'] },
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
          Switch between different datasets and customize the appearance. The "Grouped Categories" dataset demonstrates multi-category visualization with different colors for each data series, similar to{' '}
          <a
            href="https://cdn.builder.io/api/v1/image/assets%2F02e850346d0644a8a586de0c50a0af62%2Fd9e9ea00d1fd4472af3c053fa5c44311?format=webp&width=800"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-blue-700)', textDecoration: 'underline' }}
          >
            Nivo's grouped bar chart examples
          </a>.
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
          showGrid={showGrid}
          interactive={interactive}
          onBarClick={handleBarClick}
          onBarHover={handleBarHover}
          keys={currentDataset.keys || ['value']}
          showLegend={selectedDataset === 'grouped' ? true : showLegend}
          margin={selectedDataset === 'grouped' ? { top: 50, right: 130, bottom: 50, left: 60 } : undefined}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: selectedDataset === 'protocol' ? 'Food' : selectedDataset === 'grouped' ? 'Values' : 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: selectedDataset === 'protocol' ? 'Country' : selectedDataset === 'grouped' ? 'Countries' : 'Category',
            legendPosition: 'middle',
            legendOffset: 32,
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {currentDataset.data.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '12px',
                background: 'var(--surface-card)',
                borderRadius: 'var(--sds-size-radius-100)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-blue-main)',
                  marginBottom: '8px',
                }}
              >
                {selectedDataset === 'grouped' ? `Country ${item.id}` : (item as any).label || item.id}
              </div>
              {selectedDataset === 'grouped' ? (
                // Show all categories for grouped data
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {currentDataset.keys?.map((key) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'var(--font-size-xs)',
                      }}
                    >
                      <span style={{ color: 'var(--text-blue-secondary)' }}>{key}:</span>
                      <span style={{ color: 'var(--text-blue-main)', fontWeight: 'var(--font-weight-medium)' }}>
                        {((item as any)[key] || 0).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                // Show single value for simple data
                <span
                  style={{
                    fontFamily: 'var(--font-family-macan-mono)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-blue-main)',
                  }}
                >
                  {((item as any).value || 0).toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChartDemo;
