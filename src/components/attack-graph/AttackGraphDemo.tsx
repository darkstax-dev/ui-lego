import React, { useState } from 'react';
import { GraphNode } from './GraphNode';
import { NodeBox } from './NodeBox';
import { ConnectorLine } from './ConnectorLine';
import { InfoButton } from './InfoButton';
import { AttackGraphLegend } from './AttackGraphLegend';
import { ShowAllButton } from './ShowAllButton';
import { OptimalButton } from './OptimalButton';
import { GraphStats } from './GraphStats';
import './AttackGraphDemo.css';

export const AttackGraphDemo: React.FC = () => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="attack-graph-demo">
      <div className="attack-graph-demo-header">
        <div className="attack-graph-demo-title">
          <h2>Attack Graph Components Demo</h2>
          <p>Click on any node to view its details</p>
        </div>

        <div className="attack-graph-controls">
          <InfoButton onClick={() => setShowLegend(!showLegend)} />
          <div className="control-buttons">
            <ShowAllButton />
            <OptimalButton />
          </div>
          <GraphStats nodes={22} edges={31} optimal={8} />
        </div>
      </div>

      {showLegend && (
        <div className="legend-container">
          <AttackGraphLegend />
        </div>
      )}

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
