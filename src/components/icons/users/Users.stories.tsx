import type { Meta, StoryObj } from '@storybook/react-vite'
import * as UserIcons from './index'
import '../Icons.stories.css'
import '../../../tokens.css'

const meta: Meta = {
  title: 'Icons/Users',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive collection of user and people-related icons for user management, authentication, social features, and team collaboration. These icons use CSS tokens for consistent theming and come in both line and fill variants.'
      }
    }
  }
}

export default meta

type Story = StoryObj

// Icon categories organized by user management functionality
const userIconCategories = {
  'Individual Users': [
    { name: 'User Line', component: UserIcons.UserLine, description: 'Basic user outline icon' },
    { name: 'User Fill', component: UserIcons.UserFill, description: 'Basic user filled icon' },
    { name: 'Account Circle Fill', component: UserIcons.AccountCircleFill, description: 'User profile avatar' }
  ],
  'User Actions': [
    { name: 'User Add Line', component: UserIcons.UserAddLine, description: 'Add new user outline' },
    { name: 'User Add Fill', component: UserIcons.UserAddFill, description: 'Add new user filled' },
    { name: 'User Search Line', component: UserIcons.UserSearchLine, description: 'Search users outline' },
    { name: 'User Search Fill', component: UserIcons.UserSearchFill, description: 'Search users filled' },
    { name: 'User Voice Line', component: UserIcons.UserVoiceLine, description: 'User communication/voice' }
  ],
  'Teams & Groups': [
    { name: 'Team Line', component: UserIcons.TeamLine, description: 'Team group outline' },
    { name: 'Team Fill', component: UserIcons.TeamFill, description: 'Team group filled' },
    { name: 'Group Line', component: UserIcons.GroupLine, description: 'User group outline' },
    { name: 'Group Fill', component: UserIcons.GroupFill, description: 'User group filled' }
  ],
  'Roles & Permissions': [
    { name: 'Admin Line', component: UserIcons.AdminLine, description: 'Administrator role outline' },
    { name: 'Admin Fill', component: UserIcons.AdminFill, description: 'Administrator role filled' }
  ],
  'Contact Management': [
    { name: 'Contacts Line', component: UserIcons.ContactsLine, description: 'Contact management outline' },
    { name: 'Contacts Fill', component: UserIcons.ContactsFill, description: 'Contact management filled' }
  ],
  'AI & Automation': [
    { name: 'Robot Line', component: UserIcons.RobotLine, description: 'AI/Bot user outline' },
    { name: 'Robot Fill', component: UserIcons.RobotFill, description: 'AI/Bot user filled' }
  ],
  'Emotions & Status': [
    { name: 'Emotion Happy Line', component: UserIcons.EmotionHappyLine, description: 'Happy emotion outline' },
    { name: 'Emotion Happy Fill', component: UserIcons.EmotionHappyFill, description: 'Happy emotion filled' }
  ]
}

// Flatten all icons for easy iteration
const allUserIcons = Object.entries(userIconCategories).flatMap(([category, icons]) =>
  icons.map(icon => ({ ...icon, category }))
)

export const Catalog: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">User & People Icons</h1>
        <p className="body-base-macan-book" style={{ color: 'var(--inputs-placeholder-text)', marginTop: 'var(--sds-size-space-200)' }}>
          Complete collection of user and people icons for authentication, user management, and social features
        </p>
      </div>

      {/* Category sections */}
      {Object.entries(userIconCategories).map(([categoryName, categoryIcons]) => (
        <div key={categoryName} style={{ marginBottom: 'var(--sds-size-space-800)' }}>
          <h2 className="heading-section" style={{ 
            marginBottom: 'var(--sds-size-space-400)',
            color: 'var(--text-blue-main)',
            borderBottom: '1px solid var(--gray-100)',
            paddingBottom: 'var(--sds-size-space-200)'
          }}>
            {categoryName}
          </h2>
          <div className="icons-grid">
            {categoryIcons.map(({ name, component: IconComponent, description }) => (
              <div className="icon-item" key={name}>
                <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
                  <IconComponent width={32} height={32} fill={'currentColor'} />
                </div>
                <div className="icon-info">
                  <h3 className="icon-name body-base-macan-semibold">{name}</h3>
                  <span className="icon-category body-small-mono-book">{description}</span>
                </div>
                <button
                  className="icon-copy"
                  onClick={() => navigator.clipboard.writeText(name.replace(/\s/g, ''))}
                  title={`Copy ${name.replace(/\s/g, '')} component name`}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary */}
      <div style={{ 
        marginTop: 'var(--sds-size-space-800)', 
        padding: 'var(--sds-size-space-400)',
        backgroundColor: 'var(--background-card)',
        borderRadius: 'var(--sds-size-space-200)'
      }}>
        <p className="body-small-mono-book" style={{ color: 'var(--inputs-placeholder-text)' }}>
          Total: {allUserIcons.length} user icons across {Object.keys(userIconCategories).length} categories
        </p>
      </div>
    </div>
  )
}

// Individual category stories for easier navigation
export const IndividualUsers: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">Individual User Icons</h1>
      </div>
      <div className="icons-grid">
        {userIconCategories['Individual Users'].map(({ name, component: IconComponent, description }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <IconComponent width={32} height={32} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">{name}</h3>
              <span className="icon-category body-small-mono-book">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const TeamsAndGroups: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">Teams & Groups</h1>
      </div>
      <div className="icons-grid">
        {userIconCategories['Teams & Groups'].map(({ name, component: IconComponent, description }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <IconComponent width={32} height={32} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">{name}</h3>
              <span className="icon-category body-small-mono-book">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const UserActions: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">User Actions</h1>
      </div>
      <div className="icons-grid">
        {userIconCategories['User Actions'].map(({ name, component: IconComponent, description }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <IconComponent width={32} height={32} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">{name}</h3>
              <span className="icon-category body-small-mono-book">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
