import React from 'react';
import { StreamChart, StreamChartData } from './StreamChart';

// Generate sample stream data similar to the Figma design
const generateStreamData = (): StreamChartData[] => {
  const data: StreamChartData[] = [];
  
  for (let i = 0; i <= 10; i++) {
    const baseValues = {
      x: i,
      // Primary layer (dark blue) - largest values
      Engineering: Math.floor(Math.random() * 200) + 300,
      // Secondary layer (green) - medium values  
      Design: Math.floor(Math.random() * 150) + 150,
      // Tertiary layer (orange) - medium values
      Marketing: Math.floor(Math.random() * 120) + 100,
      // Top layer (red) - smaller values
      Sales: Math.floor(Math.random() * 80) + 50,
    };
    
    // Add some realistic variations to make it look more like the Figma design
    if (i === 2 || i === 5 || i === 9) {
      // Create peaks at certain points
      baseValues.Engineering *= 1.4;
      baseValues.Design *= 1.3;
      baseValues.Marketing *= 1.2;
      baseValues.Sales *= 1.1;
    }
    
    if (i === 1 || i === 6) {
      // Create valleys at certain points
      baseValues.Engineering *= 0.6;
      baseValues.Design *= 0.7;
      baseValues.Marketing *= 0.8;
      baseValues.Sales *= 0.9;
    }
    
    data.push(baseValues);
  }
  
  return data;
};

const streamData = generateStreamData();

const StreamChartDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontFamily: 'var(--font-family-macan-mono)', 
        marginBottom: '20px',
        color: 'var(--Text-Blue-text-Main-text)'
      }}>
        Stream Chart Demo
      </h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Default Stream Chart
        </h3>
        <StreamChart
          data={streamData}
          keys={['Engineering', 'Design', 'Marketing', 'Sales']}
          height={400}
          showLegend={true}
          axisBottom={{
            legend: 'Time Period',
            legendPosition: 'middle',
            legendOffset: 36,
          }}
          axisLeft={{
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Blue Palette Stream Chart
        </h3>
        <StreamChart
          data={streamData}
          keys={['Engineering', 'Design', 'Marketing', 'Sales']}
          palette="blue"
          height={400}
          showLegend={true}
          offsetType="silhouette"
          curve="basis"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Warm Palette Stream Chart
        </h3>
        <StreamChart
          data={streamData}
          keys={['Engineering', 'Design', 'Marketing', 'Sales']}
          palette="warm"
          height={400}
          showLegend={true}
          offsetType="expand"
          curve="cardinal"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-family-macan-mono)', 
          marginBottom: '16px',
          color: 'var(--Text-Blue-text-Main-text)'
        }}>
          Cool Palette Stream Chart
        </h3>
        <StreamChart
          data={streamData}
          keys={['Engineering', 'Design', 'Marketing', 'Sales']}
          palette="cool"
          height={400}
          showLegend={true}
          offsetType="diverging"
          curve="natural"
        />
      </div>
    </div>
  );
};

export default StreamChartDemo;
