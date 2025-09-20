import React from 'react'
import Notification from './Notification'
import NotificationWithIcon from './NotificationWithIcon'
import FeaturedIcon from './FeaturedIcon'
import './NotificationDemo.css'

const NotificationDemo: React.FC = () => {
  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }

  const sampleAvatar = "https://api.builder.io/api/v1/image/assets/TEMP/a48d5bc2fd1b7d01958dc2614a4a8c974336e21d?width=80"

  return (
    <div className="notification-demo">
      <div className="notification-demo__section">
        <h2 className="notification-demo__section-title">Notifications with Avatars</h2>
        <div className="notification-demo__container">
          <Notification
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            avatar={sampleAvatar}
            variant="new"
            onClick={handleNotificationClick}
          />
          <Notification
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            avatar={sampleAvatar}
            variant="hover"
            onClick={handleNotificationClick}
          />
          <Notification
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            avatar={sampleAvatar}
            variant="read"
            hasNotificationDot={false}
            onClick={handleNotificationClick}
          />
        </div>
      </div>

      <div className="notification-demo__section">
        <h2 className="notification-demo__section-title">Notifications with Icons</h2>
        <div className="notification-demo__container">
          <NotificationWithIcon
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            variant="new"
            iconColor="warning"
            onClick={handleNotificationClick}
          />
          <NotificationWithIcon
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            variant="hover"
            iconColor="warning"
            onClick={handleNotificationClick}
          />
          <NotificationWithIcon
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            variant="read"
            iconColor="warning"
            onClick={handleNotificationClick}
          />
        </div>
      </div>

      <div className="notification-demo__section">
        <h3 className="notification-demo__subsection-title">Featured Icon Variants</h3>
        <div className="notification-demo__icons-grid">
          {(['error', 'warning', 'success'] as const).map((color) => (
            <div key={color} className="notification-demo__icon-group">
              <h4 className="notification-demo__icon-group-title">{color}</h4>
              <div className="notification-demo__icon-row">
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <div key={size} className="notification-demo__icon-item">
                    <FeaturedIcon size={size} color={color} />
                    <span className="notification-demo__icon-label">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationDemo
