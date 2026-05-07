import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Tag, { type TagProps } from './Tag';
import Badge, { type BadgeProps } from './Badge';
import './TagBadge.stories.css';

const meta: Meta = {
  title: 'Components/Tag & Badge',
};

export default meta;

// Tag Stories
const TagTemplate: StoryObj<typeof Tag> = {
  render: (args: TagProps) => (
    <div className="tag-story">
      <Tag {...args} />
    </div>
  ),
};

export const TagSchemes: StoryObj<typeof Tag> = {
  render: () => (
    <div className="tag-story">
      <div className="tag-grid">
        <Tag scheme="brand">Brand</Tag>
        <Tag scheme="danger">Danger</Tag>
        <Tag scheme="positive">Positive</Tag>
        <Tag scheme="warning">Warning</Tag>
        <Tag scheme="neutral">Neutral</Tag>
      </div>
    </div>
  ),
};

export const TagRemovable: StoryObj<typeof Tag> = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'JavaScript', 'CSS']);
    
    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
      <div className="tag-story">
        <div className="tag-grid">
          {tags.map(tag => (
            <Tag 
              key={tag} 
              scheme="brand" 
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
        <p className="tag-instructions">Click the × to remove tags</p>
      </div>
    );
  },
};

export const TagNonRemovable: StoryObj<typeof Tag> = {
  ...TagTemplate,
  args: {
    children: 'Read-only',
    scheme: 'neutral',
    removable: false,
  },
};

export const TagHoverState: StoryObj<typeof Tag> = {
  ...TagTemplate,
  args: {
    children: 'Hover me',
    scheme: 'brand',
    state: 'hover',
  },
};

// Badge Stories
const BadgeTemplate: StoryObj<typeof Badge> = {
  render: (args: BadgeProps) => (
    <div className="badge-story">
      <Badge {...args} />
    </div>
  ),
};



export const BadgeStatuses: StoryObj<typeof Badge> = {
  render: () => (
    <div className="badge-story">
      <div className="badge-grid">
        <Badge variant="active">Active</Badge>
        <Badge variant="pending">Pending</Badge>
        <Badge variant="canceled">Canceled</Badge>
      </div>
    </div>
  ),
};

export const BadgeWithoutText: StoryObj<typeof Badge> = {
  render: () => (
    <div className="badge-story">
      <div className="badge-grid">
        <Badge variant="active" />
        <Badge variant="pending" />
        <Badge variant="canceled" />
      </div>
      <p className="badge-instructions">Badges show default text when no children provided</p>
    </div>
  ),
};

// Combined Example
export const TagsAndBadges: StoryObj<typeof Tag> = {
  render: () => (
    <div className="combined-story">
      <div className="example-card">
        <h3>Project Status</h3>
        <div className="status-row">
          <Badge variant="active" />
          <span>Active Project</span>
        </div>

        <h4>Technologies Used</h4>
        <div className="tags-row">
          <Tag scheme="brand">React</Tag>
          <Tag scheme="warning">TypeScript</Tag>
          <Tag scheme="positive">Node.js</Tag>
          <Tag scheme="neutral">MongoDB</Tag>
        </div>
      </div>

      <div className="example-card">
        <h3>Task Status</h3>
        <div className="status-row">
          <Badge variant="pending" />
          <span>In Review</span>
        </div>

        <h4>Priority Tags</h4>
        <div className="tags-row">
          <Tag scheme="danger">High Priority</Tag>
          <Tag scheme="warning">Frontend</Tag>
          <Tag scheme="positive">UI/UX</Tag>
        </div>
      </div>
    </div>
  ),
};

// Kanban and Gantt Badges
export const KanbanAndGanttBadges: StoryObj<typeof Badge> = {
  render: () => (
    <div className="badge-story">
      <h3>Kanban and Gantt Badges</h3>
      
      <h4>Status Badges</h4>
      <div className="badge-grid">
        <Badge variant="to-do" />
        <Badge variant="in-process" />
        <Badge variant="review" />
        <Badge variant="done" />
        <Badge variant="agents-active" />
        <Badge variant="user-action-required" />
        <Badge variant="customer-action-required" />
        <Badge variant="blocked" />
        <Badge variant="waiting" />
        <Badge variant="archived" />
      </div>

      <h4>Priority Badges</h4>
      <div className="badge-grid">
        <Badge variant="critical" />
        <Badge variant="high" />
        <Badge variant="medium" />
        <Badge variant="low" />
        <Badge variant="normal" />
      </div>
    </div>
  ),
};
