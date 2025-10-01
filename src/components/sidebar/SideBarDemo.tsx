import React, { useState } from 'react';
import { SideBar, SideBarItem } from './SideBar';

const sampleData: SideBarItem[] = [
  {
    id: '1',
    label: 'Default',
  },
  {
    id: '2',
    label: 'Traffic light',
  },
  {
    id: '3',
    label: 'Example',
  },
  {
    id: '4',
    label: 'Default',
  },
  {
    id: '5',
    label: 'Darkstax demo',
    isExpanded: true,
    children: [
      {
        id: '5-1',
        label: 'API',
      },
      {
        id: '5-2',
        label: 'Darkstax demo',
        isExpanded: true,
        children: [
          {
            id: '5-2-1',
            label: 'Resources',
          },
          {
            id: '5-2-2',
            label: 'Main resources',
          },
        ],
      },
    ],
  },
  {
    id: '6',
    label: 'Galactic Drift',
  },
  {
    id: '7',
    label: 'Echoes of Eternity',
  },
  {
    id: '8',
    label: 'Crimson Horizon',
  },
  {
    id: '9',
    label: 'Example',
  },
  {
    id: '10',
    label: 'Default',
  },
  {
    id: '11',
    label: 'Default',
  },
  {
    id: '12',
    label: 'Default',
  },
  {
    id: '13',
    label: 'Crimson Horizon',
  },
];

export const SideBarDemo: React.FC = () => {
  const [items, setItems] = useState<SideBarItem[]>(sampleData);

  const handleItemClick = (item: SideBarItem) => {
    console.log('Item clicked:', item);
  };

  const handleToggle = (itemId: string, isExpanded: boolean) => {
    const updateItems = (items: SideBarItem[]): SideBarItem[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, isExpanded };
        }
        if (item.children) {
          return { ...item, children: updateItems(item.children) };
        }
        return item;
      });
    };

    setItems(updateItems(items));
    console.log('Item toggled:', itemId, 'expanded:', isExpanded);
  };

  return (
    <div style={{ display: 'flex', height: '600px', gap: '24px' }}>
      <SideBar
        items={items}
        onItemClick={handleItemClick}
        onToggle={handleToggle}
      />
      
      <div style={{ 
        flex: 1, 
        padding: '16px', 
        backgroundColor: 'var(--surface-default)',
        borderRadius: '4px',
        fontFamily: 'var(--font-family-macan-mono)'
      }}>
        <h3 style={{ 
          margin: '0 0 16px 0',
          fontFamily: 'var(--font-family-macan-mono-stencil)',
          fontSize: 'var(--font-size-lg)',
          color: 'var(--text-blue-main)',
          textTransform: 'uppercase'
        }}>
          SIDEBAR DEMO
        </h3>
        
        <div style={{ 
          marginBottom: '16px',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-blue-secondary)'
        }}>
          A hierarchical sidebar with folder icons. Items without children show regular folder icons, while expandable items show folder plus/minus icons.
        </div>
        
        <div style={{ 
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-gray-main)'
        }}>
          <strong>Features:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Folder icons for all items</li>
            <li>Plus/minus icons for expandable folders</li>
            <li>Hierarchical structure with proper indentation</li>
            <li>Click to expand/collapse functionality</li>
            <li>Responsive design with dark mode support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBarDemo;
