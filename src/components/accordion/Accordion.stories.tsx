import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import './Accordion.stories.css';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A collapsible accordion component for organizing content in expandable sections. Supports multiple items, custom headers, and smooth animations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic single item
export const SingleItem: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="What is UI Lego?"
          content="UI Lego is a reusable component library for building consistent, accessible apps."
        />
      </Accordion>
    </div>
  ),
};

// Multiple items (uncontrolled, can open more than one)
export const MultipleItems: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="Getting Started"
          content="Install the package, import components, and start composing your UI."
        />
        <AccordionItem 
          title="Theming"
          content="Use tokens.css to align with brand colors, spacing, and typography."
        />
        <AccordionItem 
          title="Accessibility"
          content="Components are designed with keyboard navigation and screen readers in mind."
        />
      </Accordion>
    </div>
  ),
};

// Default open item
export const DefaultOpen: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="Open by Default"
          content="This section starts expanded using the defaultOpen prop."
          defaultOpen
        />
        <AccordionItem 
          title="Closed by Default"
          content="Click the header to expand this section."
        />
      </Accordion>
    </div>
  ),
};

// Long content example
export const LongContent: Story = {
  render: () => (
    <div className="accordion-story">
      <Accordion>
        <AccordionItem 
          title="Release Notes"
          content={
            'Version 1.2.0\n\n' +
            '- Added new components and improved performance.\n' +
            '- Fixed various accessibility issues and refined focus styles.\n' +
            '- Updated documentation and usage examples.\n\n' +
            'Version 1.1.0\n\n' +
            '- Introduced modeling components and enhanced theming support.'
          }
        />
      </Accordion>
    </div>
  ),
};
