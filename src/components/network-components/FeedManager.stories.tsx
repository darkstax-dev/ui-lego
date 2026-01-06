import type { Meta, StoryObj } from '@storybook/react-vite'
import FeedManager from './FeedManager'

const meta: Meta<typeof FeedManager> = {
  title: 'Network Components/FeedManager',
  component: FeedManager,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'FeedManager component for managing emergency feeds and information sources.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FeedManager>

export const Default: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    contributingFeeds: [
      { id: 'nwas', label: 'NWAS', checked: false },
      { id: 'highway', label: 'Highway Patrol', checked: false },
      { id: 'emergency', label: 'Emergency', checked: false },
      { id: 'social', label: 'Social feed', checked: false }
    ],
    feedInfo: [
      { name: 'Danaging Winds', value: '38-49 mhp', valueColor: 'default' },
      { name: 'Hall possible', value: 'Large', valueColor: 'default' },
      { name: 'Herricane', value: 'Very Likely', valueColor: 'warning' },
      { name: 'Flooding', value: 'Confirmed', valueColor: 'danger' },
      { name: 'Location affected', value: '4', valueColor: 'default' },
      { name: 'Trail last update', value: '00:00:00 UTC', valueColor: 'default' },
      { name: 'Est Persons', value: '3,672', valueColor: 'default' },
      { name: 'State of emergency', value: 'No', valueColor: 'default' }
    ],
    informationSources: [
      { id: 'nwas', label: 'NWAS' },
      { id: 'neh', label: 'NEH' },
      { id: 'faa', label: 'FAA' }
    ]
  }
}

export const EmergencyTab: Story = {
  args: {
    ...Default.args,
    activeTab: 'emergency'
  }
}

export const ActivityTab: Story = {
  args: {
    ...Default.args,
    activeTab: 'activity'
  }
}

export const WithSelectedFeeds: Story = {
  args: {
    ...Default.args,
    contributingFeeds: [
      { id: 'nwas', label: 'NWAS', checked: true },
      { id: 'highway', label: 'Highway Patrol', checked: true },
      { id: 'emergency', label: 'Emergency', checked: false },
      { id: 'social', label: 'Social feed', checked: false }
    ]
  }
}

export const LongerDistance: Story = {
  args: {
    ...Default.args,
    distance: 500
  }
}

export const ShorterDistance: Story = {
  args: {
    ...Default.args,
    distance: 100
  }
}

export const WithInteractions: Story = {
  args: {
    ...Default.args,
    onTabChange: (tab: string) => console.log('Tab changed to:', tab),
    onDistanceChange: (distance: number) => console.log('Distance changed to:', distance),
    onContributingFeedsChange: (feeds) => console.log('Contributing feeds changed:', feeds),
    onSeeDetails: () => console.log('See details clicked'),
    onRemoveSource: (id: string) => console.log('Source removed:', id),
    onCollapse: () => console.log('Collapse clicked'),
    onMore: () => console.log('More options clicked'),
    onClose: () => console.log('Close clicked')
  }
}

export const CompleteDemo: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    contributingFeeds: [
      { id: 'nwas', label: 'NWAS', checked: true },
      { id: 'highway', label: 'Highway Patrol', checked: false },
      { id: 'emergency', label: 'Emergency', checked: true },
      { id: 'social', label: 'Social feed', checked: false }
    ],
    feedInfo: [
      { name: 'Danaging Winds', value: '38-49 mhp', valueColor: 'default' },
      { name: 'Hall possible', value: 'Large', valueColor: 'default' },
      { name: 'Herricane', value: 'Very Likely', valueColor: 'warning' },
      { name: 'Flooding', value: 'Confirmed', valueColor: 'danger' },
      { name: 'Location affected', value: '4', valueColor: 'default' },
      { name: 'Trail last update', value: '00:00:00 UTC', valueColor: 'default' },
      { name: 'Est Persons', value: '3,672', valueColor: 'default' },
      { name: 'State of emergency', value: 'No', valueColor: 'default' }
    ],
    informationSources: [
      { id: 'nwas', label: 'NWAS' },
      { id: 'neh', label: 'NEH' },
      { id: 'faa', label: 'FAA' }
    ],
    onTabChange: (tab: string) => console.log('Tab changed to:', tab),
    onDistanceChange: (distance: number) => console.log('Distance changed to:', distance),
    onContributingFeedsChange: (feeds) => console.log('Contributing feeds changed:', feeds),
    onSeeDetails: () => console.log('See details clicked'),
    onRemoveSource: (id: string) => console.log('Source removed:', id),
    onCollapse: () => console.log('Collapse clicked'),
    onMore: () => console.log('More options clicked'),
    onClose: () => console.log('Close clicked')
  }
}

export const CustomFeedInfo: Story = {
  args: {
    ...Default.args,
    feedInfo: [
      { name: 'Tornado Warning', value: 'Active', valueColor: 'danger' },
      { name: 'Wind Speed', value: '75-90 mph', valueColor: 'danger' },
      { name: 'Severe Thunderstorm', value: 'Likely', valueColor: 'warning' },
      { name: 'Flash Flood', value: 'Watch', valueColor: 'warning' },
      { name: 'Areas Affected', value: '12', valueColor: 'default' },
      { name: 'Last Updated', value: '14:32:15 UTC', valueColor: 'default' },
      { name: 'Population Impact', value: '45,892', valueColor: 'default' },
      { name: 'Evacuation Order', value: 'Yes', valueColor: 'danger' }
    ]
  }
}

export const MinimalSources: Story = {
  args: {
    ...Default.args,
    informationSources: [
      { id: 'nwas', label: 'NWAS' }
    ]
  }
}

export const ManySources: Story = {
  args: {
    ...Default.args,
    informationSources: [
      { id: 'nwas', label: 'NWAS' },
      { id: 'neh', label: 'NEH' },
      { id: 'faa', label: 'FAA' },
      { id: 'noaa', label: 'NOAA' },
      { id: 'fema', label: 'FEMA' },
      { id: 'dhs', label: 'DHS' }
    ]
  }
}
