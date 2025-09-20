import React, { useState } from 'react';
import './FoldersLeftPanel.css';

export interface FolderItem {
  id: string;
  name: string;
  type: 'default' | 'selected' | 'empty' | 'hover';
  level?: number;
  children?: FolderItem[];
  expanded?: boolean;
  isChildItem?: boolean;
}

export interface FoldersLeftPanelProps {
  folders: FolderItem[];
  onFolderClick?: (folder: FolderItem) => void;
  onFolderToggle?: (folderId: string, expanded: boolean) => void;
  className?: string;
}

const FolderIcon: React.FC<{ type: 'default' | 'selected' | 'empty' | 'hover'; expanded?: boolean }> = ({ type, expanded }) => {
  if (type === 'empty') {
    return (
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_empty_folder)">
          <path d="M2.66668 3.83333V13.1667H13.3333V5.16667H7.724L6.39067 3.83333H2.66668ZM8.276 3.83333H14C14.1768 3.83333 14.3464 3.90357 14.4714 4.0286C14.5964 4.15362 14.6667 4.32319 14.6667 4.5V13.8333C14.6667 14.0101 14.5964 14.1797 14.4714 14.3047C14.3464 14.4298 14.1768 14.5 14 14.5H2C1.82319 14.5 1.65362 14.4298 1.52859 14.3047C1.40357 14.1797 1.33333 14.0101 1.33333 13.8333V3.16667C1.33333 2.98986 1.40357 2.82029 1.52859 2.69526C1.65362 2.57024 1.82319 2.5 2 2.5H6.94267L8.276 3.83333Z" fill="#00112B"/>
        </g>
        <defs>
          <clipPath id="clip0_empty_folder">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (type === 'selected') {
    return (
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_selected_folder)">
          <path d="M8.276 3.83333H14C14.1768 3.83333 14.3464 3.90357 14.4714 4.0286C14.5964 4.15362 14.6667 4.32319 14.6667 4.5V13.8333C14.6667 14.0101 14.5964 14.1797 14.4714 14.3047C14.3464 14.4298 14.1768 14.5 14 14.5H2C1.82319 14.5 1.65362 14.4298 1.52859 14.3047C1.40357 14.1797 1.33333 14.0101 1.33333 13.8333V3.16667C1.33333 2.98986 1.40357 2.82029 1.52859 2.69526C1.65362 2.57024 1.82319 2.5 2 2.5H6.94267L8.276 3.83333ZM5.33333 8.5V9.83333H10.6667V8.5H5.33333Z" fill="#00112B"/>
        </g>
        <defs>
          <clipPath id="clip0_selected_folder">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_default_folder)">
        <path d="M8.276 3.83333H14C14.1768 3.83333 14.3464 3.90357 14.4714 4.0286C14.5964 4.15362 14.6667 4.32319 14.6667 4.5V13.8333C14.6667 14.0101 14.5964 14.1797 14.4714 14.3047C14.3464 14.4298 14.1768 14.5 14 14.5H2C1.82319 14.5 1.65362 14.4298 1.52859 14.3047C1.40357 14.1797 1.33333 14.0101 1.33333 13.8333V3.16667C1.33333 2.98986 1.40357 2.82029 1.52859 2.69526C1.65362 2.57024 1.82319 2.5 2 2.5H6.94267L8.276 3.83333ZM2.66667 3.83333V13.1667H13.3333V5.16667H7.724L6.39067 3.83333H2.66667ZM7.33333 8.5V6.5H8.66667V8.5H10.6667V9.83333H8.66667V11.8333H7.33333V9.83333H5.33333V8.5H7.33333Z" fill="#00112B"/>
      </g>
      <defs>
        <clipPath id="clip0_default_folder">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
      </defs>
    </svg>
  );
};

const FolderTreeItem: React.FC<{
  folder: FolderItem;
  onFolderClick?: (folder: FolderItem) => void;
  onFolderToggle?: (folderId: string, expanded: boolean) => void;
}> = ({ folder, onFolderClick, onFolderToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const level = folder.level || 0;
  const hasChildren = folder.children && folder.children.length > 0;
  const isExpanded = folder.expanded || false;

  const handleClick = () => {
    if (hasChildren) {
      onFolderToggle?.(folder.id, !isExpanded);
    } else {
      onFolderClick?.(folder);
    }
  };

  const displayType = isHovered ? 'hover' : folder.type;

  const indentClass = `folders-panel__indent--${Math.min(level, 2)}`;
  const isTextOnly = folder.isChildItem && folder.type === 'selected' && level === 2;

  return (
    <>
      <div
        className={`folders-panel__item folders-panel__item--${displayType} ${folder.type === 'selected' ? 'folders-panel__item--selected' : ''} ${indentClass}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isTextOnly && <FolderIcon type={displayType} expanded={isExpanded} />}
        <span className="folders-panel__item-text">{folder.name}</span>
      </div>

      {hasChildren && isExpanded && folder.children?.map((child) => (
        <FolderTreeItem
          key={child.id}
          folder={{
            ...child,
            level: level + 1
          }}
          onFolderClick={onFolderClick}
          onFolderToggle={onFolderToggle}
        />
      ))}
    </>
  );
};

export const FoldersLeftPanel: React.FC<FoldersLeftPanelProps> = ({
  folders,
  onFolderClick,
  onFolderToggle,
  className = '',
}) => {
  const renderFoldersWithDividers = () => {
    const result: React.ReactNode[] = [];
    let addedDivider = false;

    folders.forEach((folder, index) => {
      if (!addedDivider && index > 0 && folder.name.toLowerCase().includes('galactic')) {
        result.push(
          <div key="divider" className="folders-panel__divider" />
        );
        addedDivider = true;
      }

      result.push(
        <FolderTreeItem
          key={folder.id}
          folder={folder}
          onFolderClick={onFolderClick}
          onFolderToggle={onFolderToggle}
        />
      );
    });

    return result;
  };

  return (
    <div className={`folders-panel ${className}`}>
      <div className="folders-panel__content">
        {renderFoldersWithDividers()}
      </div>
    </div>
  );
};

export default FoldersLeftPanel;
