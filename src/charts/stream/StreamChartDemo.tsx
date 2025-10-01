import React, { useState } from 'react';
import { StreamChart } from './StreamChart';
import { chartPalettes } from '../palette';
import './StreamChartDemo.css';

const generateData = (points = 11) => {
  const data: any[] = [];
  for (let i = 0; i < points; i++) {
    data.push({
      x: i,
      Engineering: Math.floor(Math.random() * 200) + 300 + Math.sin(i * 0.5) * 100,
      Design: Math.floor(Math.random() * 150) + 150 + Math.cos(i * 0.3) * 80,
      Marketing: Math.floor(Math.random() * 120) + 100 + Math.sin(i * 0.8) * 60,
      Sales: Math.floor(Math.random() * 80) + 50 + Math.cos(i * 0.6) * 40,
    });
  }
  return data;
};

const sampleData = generateData();

const StreamChartDemo: React.FC = () => {
  const [palette, setPalette] = useState<string>('default');
  const [offsetType, setOffsetType] = useState<string>('wiggle');
  const [order, setOrder] = useState<string>('none');

  return (
    <div className="stream-chart-demo">
      <div className="demo-controls">
        <div className="control-group">
          <label className="control-label" htmlFor="palette-select">Color Palette</label>
          <select id="palette-select" className="control-select" value={palette} onChange={(e) => setPalette(e.target.value)}>
            {Object.keys(chartPalettes).map((p) => (
              <option key={p} value={p}>{chartPalettes[p].name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label" htmlFor="offset-select">Offset Type</label>
          <select id="offset-select" className="control-select" value={offsetType} onChange={(e) => setOffsetType(e.target.value)}>
            <option value="diverging">diverging</option>
            <option value="expand">expand</option>
            <option value="none">none</option>
            <option value="silhouette">silhouette</option>
            <option value="wiggle">wiggle</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label" htmlFor="order-select">Order</label>
          <select id="order-select" className="control-select" value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
            <option value="insideOut">insideOut</option>
            <option value="none">none</option>
            <option value="reverse">reverse</option>
          </select>
        </div>
      </div>

      <div className="demo-section">
        <h3 className="section-title">Stream Chart Demo</h3>
        <StreamChart data={sampleData} keys={["Engineering","Design","Marketing","Sales"]} palette={palette} height={420} offsetType={offsetType as any} order={order as any} />
      </div>

      <div className="demo-section">
        <h4 className="section-subtitle">Variations</h4>
        <div className="chart-variations">
          <div className="variation-card">
            <div className="variation-title">Blue Palette</div>
            <StreamChart 
              data={generateData(9)} 
              keys={["Engineering","Design","Marketing","Sales"]} 
              palette="blue" 
              height={300} 
              width={400}
              showLegend={true} 
            />
          </div>

          <div className="variation-card">
            <div className="variation-title">Many Categories</div>
            <StreamChart 
              data={Array.from({length:9},(_,i)=>({
                x:i, 
                A:Math.random()*100+20,
                B:Math.random()*80+10,
                C:Math.random()*60+5,
                D:Math.random()*50+3
              }))} 
              keys={["A","B","C","D"]} 
              palette="cool" 
              height={300}
              width={400}
              showLegend={true} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamChartDemo;
