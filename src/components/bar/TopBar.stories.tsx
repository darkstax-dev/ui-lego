import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TopBar } from './TopBar';
import type { TopBarProps } from './TopBar';
import './TopBar.stories.css';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive top navigation bar component featuring menu navigation, user actions, and branding. Includes responsive design, accessibility features, and interactive states.',
      },
    },
  },
  args: {
    activeSection: 'topology',
  },
  argTypes: {
    activeSection: {
      control: 'select',
      options: ['dashboard', 'topology', 'modeling', 'template'],
      description: 'Currently active navigation section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'topology' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    onMenuItemClick: {
      action: 'menu-clicked',
      description: 'Handler for when a menu item is clicked',
    },
    onActionClick: {
      action: 'action-clicked',
      description: 'Handler for when an action button is clicked',
    },
    onTopologyItemClick: {
      action: 'topology-item-clicked',
      description: 'Handler for when a topology dropdown item is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  args: {
    activeSection: 'topology',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const topologyButton = canvas.getByRole('button', { name: /topology/i });
    expect(topologyButton).toBeInTheDocument();
    expect(topologyButton).toHaveClass('top-bar__menu-item--active');
  },
};

export const Dashboard: Story = {
  args: {
    activeSection: 'dashboard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dashboardButton = canvas.getByRole('button', { name: /dashboard/i });
    await userEvent.click(dashboardButton);
    expect(dashboardButton).toHaveClass('top-bar__menu-item--active');
  },
};

export const Modeling: Story = {
  args: {
    activeSection: 'modeling',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modelingButton = canvas.getByRole('button', { name: /modeling/i });
    expect(modelingButton).toHaveClass('top-bar__menu-item--active');
  },
};

export const Template: Story = {
  args: {
    activeSection: 'template',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const templateButton = canvas.getByRole('button', { name: /template/i });
    expect(templateButton).toHaveClass('top-bar__menu-item--active');
  },
};

export const InteractiveDemo: Story = {
  render: (args) => {
    const [activeSection, setActiveSection] = React.useState<TopBarProps['activeSection']>('topology');
    const [selectedTopologyItems, setSelectedTopologyItems] = React.useState<string[]>([]);
    
    const handleMenuItemClick = (section: string) => {
      setActiveSection(section as TopBarProps['activeSection']);
      args.onMenuItemClick?.(section);
    };

    const handleActionClick = (action: string) => {
      args.onActionClick?.(action);
    };

    const handleTopologyItemClick = (item: string) => {
      setSelectedTopologyItems(prev =>
        prev.includes(item)
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
      args.onTopologyItemClick?.(item);
    };

    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <TopBar
          activeSection={activeSection}
          onMenuItemClick={handleMenuItemClick}
          onActionClick={handleActionClick}
          onTopologyItemClick={handleTopologyItemClick}
        />
        <div style={{ 
          padding: '40px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '24px'
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Interactive TopBar Demo</h2>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
              Current active section: <strong style={{ color: '#071F42' }}>{activeSection}</strong>
            </p>
            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
              Click on menu items or action buttons to see the interactions. Check the Actions panel below for event logs.
            </p>
            {activeSection === 'topology' && (
              <div style={{
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <strong style={{ color: '#071F42' }}>Topology Dropdown Active:</strong>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
                  Click on topology dropdown items (Kubernetes Dashboard, Scenario, Resource Template, Metamapper) to expand/collapse them.
                </p>
                {selectedTopologyItems.length > 0 && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#28a745' }}>
                    <strong>Expanded items:</strong> {selectedTopologyItems.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Quick Navigation Test</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {(['dashboard', 'topology', 'modeling', 'template'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: activeSection === section ? '#071F42' : 'white',
                    color: activeSection === section ? 'white' : '#333',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontSize: '14px'
                  }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test menu navigation
    const dashboardButton = canvas.getByRole('button', { name: /dashboard/i });
    await userEvent.click(dashboardButton);
    
    // Test action buttons
    const themeButton = canvas.getByLabelText(/toggle theme/i);
    await userEvent.click(themeButton);
    
    const settingsButton = canvas.getByLabelText(/settings/i);
    await userEvent.click(settingsButton);
  },
};

export const UserActions: Story = {
  args: {
    activeSection: 'topology',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test all action buttons
    const themeButton = canvas.getByLabelText(/toggle theme/i);
    const securityButton = canvas.getByLabelText(/security settings/i);
    const settingsButton = canvas.getByLabelText(/settings/i);
    const notificationsButton = canvas.getByLabelText(/notifications/i);
    
    await userEvent.click(themeButton);
    await userEvent.click(securityButton);
    await userEvent.click(settingsButton);
    await userEvent.click(notificationsButton);
    
    // Verify buttons are present
    expect(themeButton).toBeInTheDocument();
    expect(securityButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    expect(notificationsButton).toBeInTheDocument();
  },
};

export const AllSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8f9fa', padding: '16px' }}>
      {(['dashboard', 'topology', 'modeling', 'template'] as const).map((section) => (
        <div key={section} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ 
            background: '#071F42', 
            color: 'white', 
            padding: '8px 16px', 
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            {section} Active
          </div>
          <TopBar activeSection={section} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all sections are rendered
    const dashboardSection = canvas.getByText('Dashboard Active');
    const topologySection = canvas.getByText('Topology Active');
    const modelingSection = canvas.getByText('Modeling Active');
    const templateSection = canvas.getByText('Template Active');
    
    expect(dashboardSection).toBeInTheDocument();
    expect(topologySection).toBeInTheDocument();
    expect(modelingSection).toBeInTheDocument();
    expect(templateSection).toBeInTheDocument();
  },
};
