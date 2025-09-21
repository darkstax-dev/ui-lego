import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Menu, MenuItem, MenuHeader, MenuHeading, MenuSection, MenuSeparator } from './index';
import { FiHome, FiSettings, FiUser, FiLogOut, FiEdit, FiTrash2 } from 'react-icons/fi';
import './Menu.stories.css';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// Basic Menu
export const Basic: Story = {
  render: () => (
    <div className="menu-story">
      <Menu>
        <MenuItem
          label="Home"
          icon={<FiHome />}
          onClick={() => console.log('Home clicked')}
        />
        <MenuItem
          label="Profile"
          icon={<FiUser />}
          onClick={() => console.log('Profile clicked')}
        />
        <MenuItem
          label="Settings"
          icon={<FiSettings />}
          onClick={() => console.log('Settings clicked')}
        />
        <MenuSeparator />
        <MenuItem
          label="Logout"
          icon={<FiLogOut />}
          onClick={() => console.log('Logout clicked')}
        />
      </Menu>
    </div>
  ),
};

// Menu with descriptions and shortcuts
export const WithDescriptions: Story = {
  render: () => (
    <div className="menu-story">
      <Menu>
        <MenuItem
          label="New Document"
          description="Create a new file"
          icon={<FiEdit />}
          shortcut="⌘N"
          onClick={() => console.log('New Document')}
        />
        <MenuItem
          label="Open..."
          description="Open an existing file"
          icon={<FiHome />}
          shortcut="⌘O"
          onClick={() => console.log('Open')}
        />
        <MenuSeparator />
        <MenuItem
          label="Delete"
          description="Remove selected item"
          icon={<FiTrash2 />}
          shortcut="⌫"
          onClick={() => console.log('Delete')}
        />
      </Menu>
    </div>
  ),
};

// Menu with sections and headers
export const WithSections: Story = {
  render: () => (
    <div className="menu-story">
      <Menu>
        <MenuHeader title="My App" />
        <MenuSection>
          <MenuHeading>File</MenuHeading>
          <MenuItem
            label="New"
            icon={<FiEdit />}
            shortcut="⌘N"
            onClick={() => console.log('New')}
          />
          <MenuItem
            label="Open"
            icon={<FiHome />}
            shortcut="⌘O"
            onClick={() => console.log('Open')}
          />
        </MenuSection>

        <MenuSeparator />

        <MenuSection>
          <MenuHeading>Edit</MenuHeading>
          <MenuItem
            label="Copy"
            shortcut="⌘C"
            onClick={() => console.log('Copy')}
          />
          <MenuItem
            label="Paste"
            shortcut="⌘V"
            onClick={() => console.log('Paste')}
          />
          <MenuItem
            label="Delete"
            icon={<FiTrash2 />}
            shortcut="⌫"
            onClick={() => console.log('Delete')}
          />
        </MenuSection>

        <MenuSeparator />

        <MenuSection>
          <MenuHeading>Account</MenuHeading>
          <MenuItem
            label="Profile"
            icon={<FiUser />}
            onClick={() => console.log('Profile')}
          />
          <MenuItem
            label="Settings"
            icon={<FiSettings />}
            onClick={() => console.log('Settings')}
          />
          <MenuSeparator />
          <MenuItem
            label="Logout"
            icon={<FiLogOut />}
            onClick={() => console.log('Logout')}
          />
        </MenuSection>
      </Menu>
    </div>
  ),
};

// Menu with disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <div className="menu-story">
      <Menu>
        <MenuItem
          label="Available Action"
          icon={<FiEdit />}
          onClick={() => console.log('Action performed')}
        />
        <MenuItem
          label="Disabled Action"
          icon={<FiTrash2 />}
          disabled
          onClick={() => console.log('This should not log')}
        />
        <MenuItem
          label="Another Available Action"
          icon={<FiSettings />}
          onClick={() => console.log('Another action')}
        />
      </Menu>
    </div>
  ),
};

// Interactive dropdown menu example
const DropdownMenuExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-menu-example">
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        Menu {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <Menu>
            <MenuItem
              label="Profile"
              icon={<FiUser />}
              onClick={() => {
                console.log('Profile clicked');
                setIsOpen(false);
              }}
            />
            <MenuItem
              label="Settings"
              icon={<FiSettings />}
              onClick={() => {
                console.log('Settings clicked');
                setIsOpen(false);
              }}
            />
            <MenuSeparator />
            <MenuItem
              label="Logout"
              icon={<FiLogOut />}
              onClick={() => {
                console.log('Logout clicked');
                setIsOpen(false);
              }}
            />
          </Menu>
        </div>
      )}
    </div>
  );
};

export const DropdownExample = {
  render: () => <DropdownMenuExample />,
};
