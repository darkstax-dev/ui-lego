import React, { useState } from 'react'
import Tag from './Tag'
import TagToggle from './TagToggle'
import Badge from './Badge'

const TagBadgeDemo: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    label1: false,
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
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2>Tag Components</h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>Tags - Primary Variant</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
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
        
        <h3>Tags - Hover States</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <Tag scheme="brand" state="hover">Tag</Tag>
          <Tag scheme="danger" state="hover">Tag</Tag>
          <Tag scheme="positive" state="hover">Tag</Tag>
          <Tag scheme="warning" state="hover">Tag</Tag>
          <Tag scheme="neutral" state="hover">Tag</Tag>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Tag Toggle Group</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
        <h3>Badges</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Badge status="active" />
          <Badge status="canceled" />
          <Badge status="pending" />
        </div>
      </div>
    </div>
  )
}

export default TagBadgeDemo
