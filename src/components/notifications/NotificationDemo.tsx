import React from 'react'
import Notification from './Notification'
import NotificationWithIcon from './NotificationWithIcon'
import FeaturedIcon from './FeaturedIcon'

const NotificationDemo: React.FC = () => {
  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }

  const sampleAvatar = "https://api.builder.io/api/v1/image/assets/TEMP/a48d5bc2fd1b7d01958dc2614a4a8c974336e21d?width=80"

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Notification Components</h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>Basic Notifications</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <Notification
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            avatar={sampleAvatar}
            variant="new"
            onClick={handleNotificationClick}
          />
          <div style={{ borderTop: '1px solid #e0e0e0' }}>
            <Notification
              title="Scenario deployment"
              body="Body text."
              date="DATE [TIME]"
              avatar={sampleAvatar}
              variant="hover"
              onClick={handleNotificationClick}
            />
          </div>
          <div style={{ borderTop: '1px solid #e0e0e0' }}>
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
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Notifications with Icons</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <NotificationWithIcon
            title="Scenario deployment"
            body="Body text."
            date="DATE [TIME]"
            variant="new"
            iconColor="warning"
            onClick={handleNotificationClick}
          />
          <div style={{ borderTop: '1px solid #e0e0e0' }}>
            <NotificationWithIcon
              title="Scenario deployment"
              body="Body text."
              date="DATE [TIME]"
              variant="hover"
              iconColor="error"
              onClick={handleNotificationClick}
            />
          </div>
          <div style={{ borderTop: '1px solid #e0e0e0' }}>
            <NotificationWithIcon
              title="Scenario deployment"
              body="Body text."
              date="DATE [TIME]"
              variant="read"
              iconColor="success"
              onClick={handleNotificationClick}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Featured Icons</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <FeaturedIcon size="xs" color="error" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>XS Error</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FeaturedIcon size="sm" color="warning" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>SM Warning</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FeaturedIcon size="md" color="success" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>MD Success</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FeaturedIcon size="lg" color="error" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>LG Error</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FeaturedIcon size="xl" color="warning" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>XL Warning</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationDemo
