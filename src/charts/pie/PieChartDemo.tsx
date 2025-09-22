import React, { useState } from 'react';
import PieChart, { PieChartData } from './PieChart';
import { chartPalettes } from '../palette';

// Sample data based on the Figma design
const programmingLanguagesData: PieChartData[] = [
  { id: 'haskell', label: 'haskell', value: 37.1 },
  { id: 'rust', label: 'Rust', value: 588 },
  { id: 'stylus', label: 'stylus', value: 109 },
  { id: 'lisp', label: 'Lisp', value: 279 },
  { id: 'ruby', label: 'Ruby', value: 265 },
];

const salesData: PieChartData[] = [
  { id: 'q1', label: 'Q1 Sales', value: 125000 },
  { id: 'q2', label: 'Q2 Sales', value: 148000 },
  { id: 'q3', label: 'Q3 Sales', value: 167000 },
  { id: 'q4', label: 'Q4 Sales', value: 152000 },
];

const marketShareData: PieChartData[] = [
  { id: 'product-a', label: 'Product A', value: 45 },
  { id: 'product-b', label: 'Product B', value: 28 },
  { id: 'product-c', label: 'Product C', value: 15 },
  { id: 'product-d', label: 'Product D', value: 12 },
];

export const PieChartDemo: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>('languages');
  const [selectedPalette, setSelectedPalette] = useState<string>('default');

  const datasets = {
    languages: {
      data: programmingLanguagesData,
      total: '5,2M',
      label: 'Programming Languages Usage',
    },
    sales: {
      data: salesData,
      total: 592000,
      label: 'Quarterly Sales',
    },
    market: {
      data: marketShareData,
      total: '100%',
      label: 'Market Share',
    },
  };

  const currentDataset = datasets[selectedDataset as keyof typeof datasets];

  return (
    <div className="pie-chart-demo">
      <div className="demo-controls" style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div>
          <label htmlFor="dataset-select" style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'var(--font-family-macan-mono)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--Text-Blue-text-Main-text)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Dataset
          </label>
          <select
            id="dataset-select"
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid var(--Stroke-Table-header)',
              backgroundColor: 'var(--Inputs-Input-Background)',
              color: 'var(--Text-Blue-text-Main-text)',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: '14px'
            }}
          >
            <option value="languages">Programming Languages</option>
            <option value="sales">Quarterly Sales</option>
            <option value="market">Market Share</option>
          </select>
        </div>

        <div>
          <label htmlFor="palette-select" style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'var(--font-family-macan-mono)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--Text-Blue-text-Main-text)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Color Palette
          </label>
          <select
            id="palette-select"
            value={selectedPalette}
            onChange={(e) => setSelectedPalette(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid var(--Stroke-Table-header)',
              backgroundColor: 'var(--Inputs-Input-Background)',
              color: 'var(--Text-Blue-text-Main-text)',
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: '14px'
            }}
          >
            {Object.keys(chartPalettes).map((paletteName) => (
              <option key={paletteName} value={paletteName}>
                {chartPalettes[paletteName].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: 'var(--font-family-macan-mono-stencil)',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--Text-Blue-text-Main-text)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px'
        }}>
          {currentDataset.label}
        </h3>
        
        <PieChart
          data={currentDataset.data}
          palette={selectedPalette}
          total={currentDataset.total}
          totalLabel="TOTAL"
          height={400}
          showLegend={true}
          onSliceClick={(slice) => {
            console.log('Slice clicked:', slice);
          }}
          onSliceHover={(slice) => {
            console.log('Slice hovered:', slice);
          }}
        />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h4 style={{
          fontFamily: 'var(--font-family-macan-mono)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--Text-Blue-text-Main-text)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '16px'
        }}>
          Chart Variations
        </h4>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {/* Small chart without legend */}
          <div>
            <h5 style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--Text-Blue-text-Tetriary-text)',
              marginBottom: '12px'
            }}>
              Compact (No Legend)
            </h5>
            <PieChart
              data={programmingLanguagesData}
              palette="blue"
              total="5,2M"
              height={250}
              showLegend={false}
              innerRadius={0.7}
            />
          </div>

          {/* Warm palette */}
          <div>
            <h5 style={{
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--Text-Blue-text-Tetriary-text)',
              marginBottom: '12px'
            }}>
              Warm Colors
            </h5>
            <PieChart
              data={marketShareData}
              palette="warm"
              total="100%"
              height={250}
              showLegend={true}
              innerRadius={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartDemo;
