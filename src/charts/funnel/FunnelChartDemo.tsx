import React, { useState } from 'react';
import { FunnelChart, FunnelChartData } from './FunnelChart';
import './FunnelChartDemo.css';

// Sample datasets
const salesFunnelData: FunnelChartData[] = [
  { id: 'step_1', value: 10000, label: 'Website Visits' },
  { id: 'step_2', value: 5000, label: 'Sign Ups' },
  { id: 'step_3', value: 2500, label: 'Trial Started' },
  { id: 'step_4', value: 1200, label: 'Active Users' },
  { id: 'step_5', value: 800, label: 'Paid Customers' },
];

const recruitmentFunnelData: FunnelChartData[] = [
  { id: 'stage_1', value: 500, label: 'Applications' },
  { id: 'stage_2', value: 250, label: 'Phone Screen' },
  { id: 'stage_3', value: 100, label: 'First Interview' },
  { id: 'stage_4', value: 40, label: 'Second Interview' },
  { id: 'stage_5', value: 15, label: 'Offers' },
  { id: 'stage_6', value: 12, label: 'Accepted' },
];

const marketingFunnelData: FunnelChartData[] = [
  { id: 'awareness', value: 100000, label: 'Awareness' },
  { id: 'interest', value: 50000, label: 'Interest' },
  { id: 'consideration', value: 20000, label: 'Consideration' },
  { id: 'intent', value: 8000, label: 'Intent' },
  { id: 'purchase', value: 3000, label: 'Purchase' },
];

const datasets = {
  sales: { name: 'Sales Funnel', data: salesFunnelData },
  recruitment: { name: 'Recruitment Pipeline', data: recruitmentFunnelData },
  marketing: { name: 'Marketing Funnel', data: marketingFunnelData },
};

export const FunnelChartDemo: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof datasets>('sales');
  const [palette, setPalette] = useState<string>('default');
  const [showLegend, setShowLegend] = useState(true);
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [interpolation, setInterpolation] = useState<'smooth' | 'linear'>('smooth');
  const [enableLabel, setEnableLabel] = useState(true);

  const currentDataset = datasets[selectedDataset];

  return (
    <div className="funnel-chart-demo">
      <div className="funnel-chart-demo__header">
        <h2 className="funnel-chart-demo__title">Funnel Chart Demo</h2>
        <p className="funnel-chart-demo__description">
          Interactive funnel chart with multiple datasets and customization options
        </p>
      </div>

      <div className="funnel-chart-demo__controls">
        <div className="funnel-chart-demo__control-group">
          <label className="funnel-chart-demo__label">Dataset:</label>
          <div className="funnel-chart-demo__buttons">
            {(Object.keys(datasets) as Array<keyof typeof datasets>).map((key) => (
              <button
                key={key}
                className={`funnel-chart-demo__button ${
                  selectedDataset === key ? 'funnel-chart-demo__button--active' : ''
                }`}
                onClick={() => setSelectedDataset(key)}
              >
                {datasets[key].name}
              </button>
            ))}
          </div>
        </div>

        <div className="funnel-chart-demo__control-group">
          <label className="funnel-chart-demo__label">Color Palette:</label>
          <div className="funnel-chart-demo__buttons">
            {['default', 'blue', 'warm', 'cool'].map((p) => (
              <button
                key={p}
                className={`funnel-chart-demo__button ${
                  palette === p ? 'funnel-chart-demo__button--active' : ''
                }`}
                onClick={() => setPalette(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="funnel-chart-demo__control-group">
          <label className="funnel-chart-demo__label">Direction:</label>
          <div className="funnel-chart-demo__buttons">
            <button
              className={`funnel-chart-demo__button ${
                direction === 'horizontal' ? 'funnel-chart-demo__button--active' : ''
              }`}
              onClick={() => setDirection('horizontal')}
            >
              Horizontal
            </button>
            <button
              className={`funnel-chart-demo__button ${
                direction === 'vertical' ? 'funnel-chart-demo__button--active' : ''
              }`}
              onClick={() => setDirection('vertical')}
            >
              Vertical
            </button>
          </div>
        </div>

        <div className="funnel-chart-demo__control-group">
          <label className="funnel-chart-demo__label">Interpolation:</label>
          <div className="funnel-chart-demo__buttons">
            <button
              className={`funnel-chart-demo__button ${
                interpolation === 'smooth' ? 'funnel-chart-demo__button--active' : ''
              }`}
              onClick={() => setInterpolation('smooth')}
            >
              Smooth
            </button>
            <button
              className={`funnel-chart-demo__button ${
                interpolation === 'linear' ? 'funnel-chart-demo__button--active' : ''
              }`}
              onClick={() => setInterpolation('linear')}
            >
              Linear
            </button>
          </div>
        </div>

        <div className="funnel-chart-demo__control-group">
          <label className="funnel-chart-demo__label">Display Options:</label>
          <div className="funnel-chart-demo__checkboxes">
            <label className="funnel-chart-demo__checkbox-label">
              <input
                type="checkbox"
                checked={showLegend}
                onChange={(e) => setShowLegend(e.target.checked)}
              />
              Show Legend
            </label>
            <label className="funnel-chart-demo__checkbox-label">
              <input
                type="checkbox"
                checked={enableLabel}
                onChange={(e) => setEnableLabel(e.target.checked)}
              />
              Show Labels
            </label>
          </div>
        </div>
      </div>

      <div className="funnel-chart-demo__chart">
        <FunnelChart
          data={currentDataset.data}
          palette={palette}
          height={direction === 'vertical' ? 600 : 400}
          width={direction === 'vertical' ? 400 : 800}
          showLegend={showLegend}
          direction={direction}
          interpolation={interpolation}
          enableLabel={enableLabel}
        />
      </div>
    </div>
  );
};

export default FunnelChartDemo;
