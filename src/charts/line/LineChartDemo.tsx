import React, { useState } from 'react';
import { LineChart } from './LineChart';
import { chartPalettes } from '../palette';
import './LineChartDemo.css';

const generateLineData = (series = 1) => {
  const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
  const seriesNames = ['Series A', 'Series B', 'Series C', 'Series D'];

  return Array.from({ length: series }, (_, i) => ({
    id: seriesNames[i] || `Series ${i + 1}`,
    data: hours.map(hour => ({ x: hour, y: Number((Math.random() * 0.3 + 0.5 + Math.sin((hour + i * 2) * 0.3) * 0.1).toFixed(3)) })),
  }));
};

const trafficData = [
  {
    id: 'Traffic Volume',
    data: [
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
    ],
  },
];

const sampleMulti = generateLineData(3);

const LineChartDemo: React.FC = () => {
  const [dataset, setDataset] = useState<'traffic' | 'single' | 'multi'>('traffic');
  const [palette, setPalette] = useState<string>('default');

  const datasets: Record<string, any> = {
    traffic: { data: trafficData, label: 'Traffic Volume' },
    single: { data: generateLineData(1), label: 'Single Series' },
    multi: { data: sampleMulti, label: 'Multi Series' },
  };

  const current = datasets[dataset];

  return (
    <div className="line-chart-demo">
      <div className="demo-controls">
        <div className="control-group">
          <label className="control-label" htmlFor="dataset-select">Dataset</label>
          <select id="dataset-select" className="control-select" value={dataset} onChange={(e) => setDataset(e.target.value as any)}>
            <option value="traffic">Traffic Volume</option>
            <option value="single">Single Series</option>
            <option value="multi">Multi Series</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label" htmlFor="palette-select">Color Palette</label>
          <select id="palette-select" className="control-select" value={palette} onChange={(e) => setPalette(e.target.value)}>
            {Object.keys(chartPalettes).map((p) => (
              <option key={p} value={p}>{chartPalettes[p].name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="demo-section">
        <h3 className="section-title">{current.label}</h3>
        <LineChart data={current.data} palette={palette} height={420} showLegend={true} enableArea={true} />
      </div>

      <div className="demo-section">
        <h4 className="section-subtitle">Variations</h4>
        <div className="chart-variations">
          <div className="variation-card">
            <div className="variation-title">Compact</div>
            <LineChart data={generateLineData(1)} palette="blue" height={240} showLegend={false} enableArea={false} />
          </div>

          <div className="variation-card">
            <div className="variation-title">Multi-series</div>
            <LineChart data={generateLineData(3)} palette="warm" height={260} showLegend={true} enableArea={true} areaOpacity={0.25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartDemo;
