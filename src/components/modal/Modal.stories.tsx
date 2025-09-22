import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../buttons/Button';
import './Modal.stories.css';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    isOpen: false,
    title: 'Modal Title',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    showActions: true,
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the modal',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Handler for when the modal is closed',
    },
    onCancel: {
      action: 'cancelled',
      description: 'Handler for the cancel action',
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Handler for the confirm action',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the modal header',
    },
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button',
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show the action buttons',
    },
    children: {
      control: false,
      description: 'Modal content',
    },
  },
};

export default meta;
type Story = StoryObj;

// Interactive example with state management
const InteractiveModal = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    console.log('Confirmed!');
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal 
        {...args} 
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={args.onConfirm || handleConfirm}
      >
        {args.children || <p>This is the modal content. You can put any React components here.</p>}
      </Modal>
    </div>
  );
};

// Basic Modal
const BasicTemplate: Story = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Basic Modal',
    children: (
      <div className="modal-content">
        <p>This is a basic modal with some content. You can add any React components here.</p>
      </div>
    ),
  },
};

// Form Modal
const FormTemplate: Story = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Create New Item',
    children: (
      <div className="modal-content">
        <div className="form-group">
          <label htmlFor="item-name">Item Name</label>
          <input id="item-name" placeholder="Enter item name" />
        </div>
        <div className="form-group">
          <label htmlFor="item-desc">Description</label>
          <textarea id="item-desc" placeholder="Enter description" />
        </div>
      </div>
    ),
  },
};

// Confirmation Modal
const ConfirmationTemplate: Story = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Are you sure?',
    children: (
      <div className="modal-content">
        <p>This action cannot be undone. Are you sure you want to continue?</p>
      </div>
    ),
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
};

// Without Actions
const NoActionsTemplate: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Info Modal</Button>
        <Modal 
          {...args} 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showActions={false}
        >
          <div className="modal-content">
            <h3>Information</h3>
            <p>This is an informational modal without action buttons.</p>
            <div className="modal-actions">
              <Button onClick={() => setIsOpen(false)}>Got it</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    title: 'Information',
    showActions: false,
  },
};

export const Basic = BasicTemplate;
export const Form = FormTemplate;
export const Confirmation = ConfirmationTemplate;
export const NoActions = NoActionsTemplate;
