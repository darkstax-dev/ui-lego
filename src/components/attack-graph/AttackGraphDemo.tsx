import React from 'react';
import { GraphNode } from './GraphNode';
import { NodeBox } from './NodeBox';
import { ConnectorLine } from './ConnectorLine';
import './AttackGraphDemo.css';

export const AttackGraphDemo: React.FC = () => {
  return (
    <div className="attack-graph-demo">
      <div className="attack-graph-demo-title">
        <h2>Attack Graph Components Demo</h2>
        <p>Click on any node to view its details</p>
      </div>
      
      <div className="attack-graph-demo-content">
        <div className="attack-graph-row">
          <GraphNode
            label="Entry\nPoint"
            tooltipData={{
              type: 'workstation',
              priority: '6.5',
              criticality: '7.2',
              status: 'compromised',
            }}
          />
          <ConnectorLine startX={0} startY={0} endX={80} endY={40} />
          <GraphNode
            label="Server\n001"
            tooltipData={{
              type: 'datacenter',
              priority: '9.5',
              criticality: '9.4',
              status: 'operational',
            }}
          />
        </div>

        <div className="attack-graph-row">
          <h3>Node Box Variants</h3>
          <div className="node-box-grid">
            <NodeBox variant="blue" />
            <NodeBox variant="green" />
            <NodeBox variant="orange" />
          </div>
        </div>
      </div>
    </div>
  );
};
