import React, { useState } from 'react'
import Tag from './Tag'
import TagToggle from './TagToggle'
import Badge from './Badge'

const TagBadgeDemo: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    label1: true,
    label2: false,
    label3: false,
    label4: false,
    label5: false,
    label6: false,
    label7: false,
  })

  const [activeTags, setActiveTags] = useState({
    brand: true,
    danger: true,
    positive: true,
    warning: true,
    neutral: true,
  })

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleRemoveTag = (scheme: string) => {
    setActiveTags(prev => ({
      ...prev,
      [scheme]: false
    }))
  }

  return (
    <div style={{ 
      padding: '40px', 
      background: 'var(--bg-default)', 
      minHeight: '100vh',
      fontFamily: 'var(--font-family-macan)' 
    }}>
      <h1 style={{ 
        marginBottom: '40px',
        color: 'var(--text-blue-main)',
        fontSize: '32px',
        fontWeight: '600'
      }}>
        Tag and Badge Components
      </h1>
      
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          marginBottom: '20px',
          color: 'var(--text-blue-main)',
          fontSize: '20px',
          fontWeight: '500'
        }}>
          Tags - Primary Variant (Default States)
        </h2>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap',
          marginBottom: '20px',
          padding: '20px',
          background: 'var(--bg-card)',
          borderRadius: '8px'
        }}>
          {activeTags.brand && (
            <Tag 
              scheme="brand" 
              onRemove={() => handleRemoveTag('brand')}
            >
              Tag
            </Tag>
          )}
          {activeTags.danger && (
            <Tag 
              scheme="danger" 
              onRemove={() => handleRemoveTag('danger')}
            >
              Tag
            </Tag>
          )}
          {activeTags.positive && (
            <Tag 
              scheme="positive" 
              onRemove={() => handleRemoveTag('positive')}
            >
              Tag
            </Tag>
          )}
          {activeTags.warning && (
            <Tag 
              scheme="warning" 
              onRemove={() => handleRemoveTag('warning')}
            >
              Tag
            </Tag>
          )}
          {activeTags.neutral && (
            <Tag 
              scheme="neutral" 
              onRemove={() => handleRemoveTag('neutral')}
            >
              Tag
            </Tag>
          )}
        </div>
        
        <h3 style={{ 
          marginBottom: '20px',
          color: 'var(--text-blue-main)',
          fontSize: '18px',
          fontWeight: '500'
        }}>
          Tags - Hover States
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap',
          padding: '20px',
          background: 'var(--bg-card)',
          borderRadius: '8px'
        }}>
          <Tag scheme="brand" state="hover">Tag</Tag>
          <Tag scheme="danger" state="hover">Tag</Tag>
          <Tag scheme="positive" state="hover">Tag</Tag>
          <Tag scheme="warning" state="hover">Tag</Tag>
          <Tag scheme="neutral" state="hover">Tag</Tag>
        </div>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          marginBottom: '20px',
          color: 'var(--text-blue-main)',
          fontSize: '20px',
          fontWeight: '500'
        }}>
          Tag Toggle Group
        </h2>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--sds-size-space-200)', 
          flexWrap: 'wrap',
          padding: '20px',
          background: 'var(--bg-card)',
          borderRadius: '8px'
        }}>
          <TagToggle 
            state={toggleStates.label1 ? 'on' : 'off'}
            onClick={() => handleToggle('label1')}
          >
            Label
          </TagToggle>
          <TagToggle 
            state={toggleStates.label2 ? 'on' : 'off'}
            onClick={() => handleToggle('label2')}
          >
            Label
          </TagToggle>
          <TagToggle 
            state={toggleStates.label3 ? 'on' : 'off'}
            onClick={() => handleToggle('label3')}
          >
            Label
          </TagToggle>
          <TagToggle 
            state={toggleStates.label4 ? 'on' : 'off'}
            onClick={() => handleToggle('label4')}
          >
            Label
          </TagToggle>
          <TagToggle 
            state={toggleStates.label5 ? 'on' : 'off'}
            onClick={() => handleToggle('label5')}
          >
            Label
          </TagToggle>
          <TagToggle 
            state={toggleStates.label6 ? 'on' : 'off'}
            onClick={() => handleToggle('label6')}
          >
            Label
          </TagToggle>
          <TagToggle 
            state={toggleStates.label7 ? 'on' : 'off'}
            onClick={() => handleToggle('label7')}
          >
            Label
          </TagToggle>
        </div>
      </div>

      <div>
        <h2 style={{ 
          marginBottom: '20px',
          color: 'var(--text-blue-main)',
          fontSize: '20px',
          fontWeight: '500'
        }}>
          Badges
        </h2>
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          flexWrap: 'wrap',
          padding: '20px',
          background: 'var(--bg-card)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Badge status="active" />
            <span style={{ fontSize: '12px', color: 'var(--text-blue-secondary)' }}>Active</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Badge status="canceled" />
            <span style={{ fontSize: '12px', color: 'var(--text-blue-secondary)' }}>Canceled</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Badge status="pending" />
            <span style={{ fontSize: '12px', color: 'var(--text-blue-secondary)' }}>Pending</span>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '40px',
        padding: '20px',
        background: 'var(--bg-card)',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'var(--text-blue-secondary)'
      }}>
        <p><strong>Note:</strong> All components strictly use design tokens from the token system and match the Figma design specifications.</p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Tags support Brand, Danger, Positive, Warning, and Neutral color schemes</li>
          <li>TagToggles have On/Off states for filtering functionality</li>
          <li>Badges show status with distinctive flag shapes and color coding</li>
        </ul>
      </div>
    </div>
  )
}

export default TagBadgeDemo
