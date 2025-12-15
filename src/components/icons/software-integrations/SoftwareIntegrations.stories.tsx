import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from './index';

const meta = {
  title: 'Icons/Software Integrations',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const AllIcons: StoryObj = {
  render: () => {
    const iconEntries = Object.entries(Icons);
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
        gap: '24px',
        padding: '24px',
        maxWidth: '1200px'
      }}>
        {iconEntries.map(([name, Icon]) => (
          <div 
            key={name}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <Icon />
            <span style={{ 
              fontSize: '12px', 
              textAlign: 'center',
              color: '#666'
            }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const Amazon: StoryObj = {
  render: () => <Icons.Amazon />,
};

export const Asana: StoryObj = {
  render: () => <Icons.Asana />,
};

export const Atlassian: StoryObj = {
  render: () => <Icons.Atlassian />,
};

export const Basecamp: StoryObj = {
  render: () => <Icons.Basecamp />,
};

export const Confluence: StoryObj = {
  render: () => <Icons.Confluence />,
};

export const Dropbox: StoryObj = {
  render: () => <Icons.Dropbox />,
};

export const Evernote: StoryObj = {
  render: () => <Icons.Evernote />,
};

export const Flowmapp: StoryObj = {
  render: () => <Icons.Flowmapp />,
};

export const GitHub: StoryObj = {
  render: () => <Icons.GitHub />,
};

export const GitLab: StoryObj = {
  render: () => <Icons.GitLab />,
};

export const Gmail: StoryObj = {
  render: () => <Icons.Gmail />,
};

export const GoogleDrive: StoryObj = {
  render: () => <Icons.GoogleDrive />,
};

export const Intercom: StoryObj = {
  render: () => <Icons.Intercom />,
};

export const Jira: StoryObj = {
  render: () => <Icons.Jira />,
};

export const Linear: StoryObj = {
  render: () => <Icons.Linear />,
};

export const Loom: StoryObj = {
  render: () => <Icons.Loom />,
};

export const Mailchimp: StoryObj = {
  render: () => <Icons.Mailchimp />,
};

export const MicrosoftTeams: StoryObj = {
  render: () => <Icons.MicrosoftTeams />,
};

export const Notion: StoryObj = {
  render: () => <Icons.Notion />,
};

export const Trello: StoryObj = {
  render: () => <Icons.Trello />,
};

export const Zapier: StoryObj = {
  render: () => <Icons.Zapier />,
};

export const Zendesk: StoryObj = {
  render: () => <Icons.Zendesk />,
};
