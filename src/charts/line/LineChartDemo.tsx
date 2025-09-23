import React from 'react';
import { LineChart, LineChartData } from './LineChart';

// Generate sample line data similar to the Figma design
const generateTrafficData = (): LineChartData[] => {
  // Data points based on the Figma design
  const trafficData = [
    { x: 0, y: 0.62 },
    { x: 2, y: 0.64 },
    { x: 4, y: 0.72 },
    { x: 6, y: 0.76 },
    { x: 8, y: 0.84 },
    { x: 10, y: 0.82 },
    { x: 12, y: 0.72 },
    { x: 14, y: 0.68 },
    { x: 16, y: 0.74 },
    { x: 20, y: 0.76 },
    { x: 22, y: 0.82 },
  ];

  return [
    {
      id: 'Traffic Volume',
      color: 'var(--color-blue-dark-950)',
      data: trafficData,
    },
  ];
};

// Generate multi-series data for demos
const generateMultiSeriesData = (): LineChartData[] => {
  const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
  
  return [
    {
      id: 'Website Traffic',
      data: hours.map(hour => ({
        x: hour,
        y: Math.random() * 0.3 + 0.6 + Math.sin(hour * 0.3) * 0.1,
      })),
    },
    {
      id: 'Mobile App',
      data: hours.map(hour => ({
        x: hour,
        y: Math.random() * 0.25 + 0.5 + Math.cos(hour * 0.4) * 0.08,
      })),
    },
    {
      id: 'API Calls',
      data: hours.map(hour => ({
        x: hour,
        y: Math.random() * 0.2 + 0.45 + Math.sin(hour * 0.5) * 0.06,
      })),
    },
  ];
};

const trafficData = generateTrafficData();
const multiSeriesData = generateMultiSeriesData();

const LineChartDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontFamily: 'var(--font-family-macan-mono)', 
        marginBottom: '20px',
        color: 'var(--Text-Blue-text-Main-text)'
      }}>
        Line Chart Demo
      </h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Traffic Volume Chart (Figma Design)
        </h3>
        <LineChart
          data={trafficData}
          height={400}
          enableArea={true}
          areaOpacity={0.6}
          enablePoints={true}
          pointSize={8}
          curve="catmullRom"
          yScale={{
            type: 'linear',
            min: 0.6,
            max: 0.9,
          }}
          axisLeft={{
            legend: 'Traffic volume in %',
            legendPosition: 'middle',
            legendOffset: -50,
            format: (value) => value.toFixed(2),
          }}
          axisBottom={{
            legend: 'Time (Hour)',
            legendPosition: 'middle',
            legendOffset: 36,
          }}
          enableSlices="x"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Multi-Series Line Chart
        </h3>
        <LineChart
          data={multiSeriesData}
          height={400}
          showLegend={true}
          enableArea={false}
          enablePoints={true}
          pointSize={6}
          curve="catmullRom"
          axisLeft={{
            legend: 'Usage Rate',
            legendPosition: 'middle',
            legendOffset: -40,
            format: (value) => `${(value * 100).toFixed(0)}%`,
          }}
          axisBottom={{
            legend: 'Hour of Day',
            legendPosition: 'middle',
            legendOffset: 36,
          }}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Blue Palette Line Chart
        </h3>
        <LineChart
          data={multiSeriesData}
          palette="blue"
          height={400}
          showLegend={true}
          enableArea={true}
          areaOpacity={0.2}
          curve="cardinal"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Warm Palette Line Chart
        </h3>
        <LineChart
          data={multiSeriesData}
          palette="warm"
          height={400}
          showLegend={true}
          enableArea={false}
          pointSize={8}
          curve="basis"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Linear Curve Line Chart
        </h3>
        <LineChart
          data={trafficData}
          height={350}
          enableArea={true}
          areaOpacity={0.4}
          enablePoints={true}
          pointSize={10}
          curve="linear"
          palette="cool"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Step Line Chart
        </h3>
        <LineChart
          data={trafficData}
          height={350}
          enableArea={false}
          enablePoints={true}
          pointSize={6}
          curve="step"
          enableGridX={true}
          palette="warm"
        />
      </div>
    </div>
  );
};

export default LineChartDemo;
