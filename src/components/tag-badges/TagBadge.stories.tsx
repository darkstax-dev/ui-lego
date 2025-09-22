import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Tag from './Tag';
import Badge from './Badge';
import './TagBadge.stories.css';

const meta: Meta = {
  title: 'Components/Tag & Badge',
};

export default meta;

// Tag Stories
const TagTemplate: StoryObj<typeof Tag> = {
  render: (args: React.ComponentProps<typeof Tag>) => (
    <div className="tag-story">
      <Tag {...args} />
    </div>
  ),
};

export const TagBasic = {
  ...TagTemplate,
  args: {
    children: 'React',
    scheme: 'brand',
  },
} as const satisfies StoryObj<typeof Tag>;

export const TagSchemes = {
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
} as const satisfies StoryObj<typeof Tag>;

export const TagRemovable = {
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
} as const satisfies StoryObj<typeof Tag>;

export const TagNonRemovable = {
  ...TagTemplate,
  args: {
    children: 'Read-only',
    scheme: 'neutral',
    removable: false,
  },
} as const satisfies StoryObj<typeof Tag>;

export const TagHoverState = {
  ...TagTemplate,
  args: {
    children: 'Hover me',
    scheme: 'brand',
    state: 'hover',
  },
} as const satisfies StoryObj<typeof Tag>;

// Badge Stories
const BadgeTemplate: StoryObj<typeof Badge> = {
  render: (args: React.ComponentProps<typeof Badge>) => (
    <div className="badge-story">
      <Badge {...args} />
    </div>
  ),
};

export const BadgeBasic = {
  ...BadgeTemplate,
  args: {
    status: 'active',
    children: 'Active',
  },
} as const satisfies StoryObj<typeof Badge>;

export const BadgeStatuses = {
  render: () => (
    <div className="badge-story">
      <div className="badge-grid">
        <Badge status="active">Active</Badge>
        <Badge status="pending">Pending</Badge>
        <Badge status="canceled">Canceled</Badge>
      </div>
    </div>
  ),
} as const satisfies StoryObj<typeof Badge>;

export const BadgeWithoutText = {
  render: () => (
    <div className="badge-story">
      <div className="badge-grid">
        <Badge status="active" />
        <Badge status="pending" />
        <Badge status="canceled" />
      </div>
      <p className="badge-instructions">Badges show default text when no children provided</p>
    </div>
  ),
} as const satisfies StoryObj<typeof Badge>;

// Combined Example
export const TagsAndBadges = {
  render: () => (
    <div className="combined-story">
      <div className="example-card">
        <h3>Project Status</h3>
        <div className="status-row">
          <Badge status="active" />
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
          <Badge status="pending" />
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
} as const satisfies StoryObj<typeof Tag>;
