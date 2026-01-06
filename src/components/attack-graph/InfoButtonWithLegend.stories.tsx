import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { InfoButton } from './InfoButton';
import { AttackGraphLegend } from './AttackGraphLegend';

const InfoButtonWithLegendDemo = () => {
  const [showLegend, setShowLegend] = React.useState(false);

  return (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <InfoButton size="big" onClick={() => setShowLegend(!showLegend)} />
      </div>
      
      {showLegend && (
        <div>
          <AttackGraphLegend />
        </div>
      )}
    </div>
  );
};

const meta: Meta = {
  title: 'Attack Graph/InfoButton/With Legend',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => <InfoButtonWithLegendDemo />,
};
