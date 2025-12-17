import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InfoButton } from './InfoButton';
import { AttackGraphLegend } from './AttackGraphLegend';
import { ShowAllButton } from './ShowAllButton';
import { OptimalButton } from './OptimalButton';
import { GraphStats } from './GraphStats';
import './AttackGraphDemo.css';

const ComponentShowcase = () => {
  const [showLegend, setShowLegend] = React.useState(false);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        fontFamily: 'Macan Mono Trial, monospace', 
        fontSize: '24px', 
        color: '#00112B',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        Attack Graph Components Showcase
      </h2>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '48px' 
      }}>
        <section>
          <h3 style={{ 
            fontFamily: 'Macan Mono Trial, monospace', 
            fontSize: '18px', 
            color: '#00112B',
            marginBottom: '16px'
          }}>
            Info Button
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <InfoButton size="big" onClick={() => setShowLegend(!showLegend)} />
            <InfoButton size="small" />
          </div>
        </section>

        {showLegend && (
          <section>
            <h3 style={{ 
              fontFamily: 'Macan Mono Trial, monospace', 
              fontSize: '18px', 
              color: '#00112B',
              marginBottom: '16px'
            }}>
              Legend
            </h3>
            <AttackGraphLegend />
          </section>
        )}

        <section>
          <h3 style={{ 
            fontFamily: 'Macan Mono Trial, monospace', 
            fontSize: '18px', 
            color: '#00112B',
            marginBottom: '16px'
          }}>
            Action Buttons
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <ShowAllButton />
            <OptimalButton />
          </div>
        </section>

        <section>
          <h3 style={{ 
            fontFamily: 'Macan Mono Trial, monospace', 
            fontSize: '18px', 
            color: '#00112B',
            marginBottom: '16px'
          }}>
            Graph Statistics
          </h3>
          <GraphStats nodes={22} edges={31} optimal={8} />
        </section>

        <section>
          <h3 style={{ 
            fontFamily: 'Macan Mono Trial, monospace', 
            fontSize: '18px', 
            color: '#00112B',
            marginBottom: '16px'
          }}>
            Complete Toolbar Layout
          </h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            flexWrap: 'wrap',
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <InfoButton onClick={() => setShowLegend(!showLegend)} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <ShowAllButton />
              <OptimalButton />
            </div>
            <GraphStats nodes={22} edges={31} optimal={8} />
          </div>
        </section>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Attack Graph/All Components',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

export const Showcase: StoryObj = {
  render: () => <ComponentShowcase />,
};
