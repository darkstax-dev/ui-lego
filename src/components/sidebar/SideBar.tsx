import React, { useState } from 'react';
import Folder from '../icons/system/Folder';
import FolderPlus from '../icons/system/FolderPlus';
import FolderMinus from '../icons/system/FolderMinus';
import './SideBar.css';

export interface SideBarItem {
  id: string;
  label: string;
  children?: SideBarItem[];
  isExpanded?: boolean;
  level?: number;
}

export interface SideBarProps {
  items: SideBarItem[];
  onItemClick?: (item: SideBarItem) => void;
  onToggle?: (itemId: string, isExpanded: boolean) => void;
  className?: string;
}

const SideBarItemComponent: React.FC<{
  item: SideBarItem;
  onItemClick?: (item: SideBarItem) => void;
  onToggle?: (itemId: string, isExpanded: boolean) => void;
  level: number;
}> = ({ item, onItemClick, onToggle, level }) => {
  const [isExpanded, setIsExpanded] = useState(item.isExpanded || false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      onToggle?.(item.id, newExpanded);
    }
  };

  const handleItemClick = () => {
    onItemClick?.(item);
  };

  const renderIcon = () => {
    if (hasChildren) {
      return (
        <button 
          className="sidebar-item__toggle"
          onClick={handleToggle}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <FolderMinus width={16} height={16} />
          ) : (
            <FolderPlus width={16} height={16} />
          )}
        </button>
      );
    } else {
      return (
        <div className="sidebar-item__icon">
          <Folder width={16} height={16} />
        </div>
      );
    }
  };

  return (
    <div className="sidebar-item-container">
      <div 
        className={`sidebar-item sidebar-item--level-${Math.min(level, 3)}`}
        onClick={handleItemClick}
      >
        <div className="sidebar-item__content">
          {renderIcon()}
          <span className="sidebar-item__label">{item.label}</span>
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="sidebar-item__children">
          {item.children?.map((child) => (
            <SideBarItemComponent
              key={child.id}
              item={child}
              onItemClick={onItemClick}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SideBar: React.FC<SideBarProps> = ({
  items,
  onItemClick,
  onToggle,
  className = '',
}) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar__content">
        {items.map((item) => (
          <SideBarItemComponent
            key={item.id}
            item={item}
            onItemClick={onItemClick}
            onToggle={onToggle}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
