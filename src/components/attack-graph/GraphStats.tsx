import React from 'react';
import './GraphStats.css';

export interface GraphStatsProps {
  nodes?: number;
  edges?: number;
  optimal?: number;
}

export const GraphStats: React.FC<GraphStatsProps> = ({ 
  nodes = 0, 
  edges = 0, 
  optimal = 0 
}) => {
  return (
    <div className="graph-stats">
      <div className="stat-item">
        <span className="stat-label">Nodes:</span>
        <span className="stat-value">{nodes}</span>
      </div>
      
      <div className="stat-item">
        <span className="stat-label">Edges:</span>
        <span className="stat-value">{edges}</span>
      </div>
      
      <div className="stat-item">
        <span className="stat-label">Optimal:</span>
        <span className="stat-value stat-optimal">{optimal}</span>
      </div>
    </div>
  );
};
