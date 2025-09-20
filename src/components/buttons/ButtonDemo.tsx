import React, { useState } from 'react'
import IconButton from './IconButton'
import Button from './Button'
import SecondaryButton from './SecondaryButton'
import LinkButton from './LinkButton'
import ToggleButton from './ToggleButton'
import type { ToggleButtonMode } from './ToggleButton'

const ButtonDemo: React.FC = () => {
  const [toggleMode, setToggleMode] = useState<ToggleButtonMode>('table')

  return (
    <div style={{ 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '40px',
      fontFamily: 'Macan Mono Stencil Trial, -apple-system, Roboto, Helvetica, sans-serif'
    }}>
      
      {/* Title */}
      <h1 style={{
        color: '#072B56',
        fontFamily: 'Macan Mono Stencil Trial, -apple-system, Roboto, Helvetica, sans-serif',
        fontSize: '32px',
        fontWeight: '500',
        lineHeight: '120%',
        letterSpacing: '1.6px',
        textTransform: 'uppercase',
        margin: '0 0 20px 0'
      }}>
        Buttons
      </h1>

      {/* Icon Button Secondary - Gray */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Icon Button Secondary - Gray</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Default:</span>
            <IconButton variant="secondary" color="gray" size="big" />
            <IconButton variant="secondary" color="gray" size="medium" />
            <IconButton variant="secondary" color="gray" size="small" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Hover:</span>
            <IconButton variant="secondary" color="gray" size="big" state="hover" />
            <IconButton variant="secondary" color="gray" size="medium" state="hover" />
            <IconButton variant="secondary" color="gray" size="small" state="hover" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Danger:</span>
            <IconButton variant="secondary" color="gray" size="big" state="danger" />
            <IconButton variant="secondary" color="gray" size="medium" state="danger" />
            <IconButton variant="secondary" color="gray" size="small" state="danger" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Disabled:</span>
            <IconButton variant="secondary" color="gray" size="big" disabled />
            <IconButton variant="secondary" color="gray" size="medium" disabled />
            <IconButton variant="secondary" color="gray" size="small" disabled />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Selected:</span>
            <IconButton variant="secondary" color="gray" size="big" state="selected" />
            <IconButton variant="secondary" color="gray" size="medium" state="selected" />
            <IconButton variant="secondary" color="gray" size="small" state="selected" />
          </div>
        </div>
      </section>

      {/* Icon Button Secondary - White */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Icon Button Secondary - White</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          background: '#f0f0f0',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Default:</span>
            <IconButton variant="secondary" color="white" size="big" />
            <IconButton variant="secondary" color="white" size="medium" />
            <IconButton variant="secondary" color="white" size="small" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Danger:</span>
            <IconButton variant="secondary" color="white" size="big" state="danger" />
            <IconButton variant="secondary" color="white" size="medium" state="danger" />
            <IconButton variant="secondary" color="white" size="small" state="danger" />
          </div>
        </div>
      </section>

      {/* Icon Button Secondary - Red */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Icon Button Secondary - Red</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          background: '#d9322a',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#fff' }}>Default:</span>
            <IconButton variant="secondary" size="big" />
            <IconButton variant="secondary" size="medium" />
            <IconButton variant="secondary" size="small" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#fff' }}>Hover:</span>
            <IconButton variant="secondary" size="big" state="hover" />
            <IconButton variant="secondary" size="medium" state="hover" />
            <IconButton variant="secondary" size="small" state="hover" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#fff' }}>Disabled:</span>
            <IconButton variant="secondary" size="big" disabled />
            <IconButton variant="secondary" size="medium" disabled />
            <IconButton variant="secondary" size="small" disabled />
          </div>
        </div>
      </section>

      {/* Icon Button Main */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Icon Button Main</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Default:</span>
            <IconButton variant="main" size="big" />
            <IconButton variant="main" size="medium" />
            <IconButton variant="main" size="small" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Hover:</span>
            <IconButton variant="main" size="big" state="hover" />
            <IconButton variant="main" size="medium" state="hover" />
            <IconButton variant="main" size="small" state="hover" />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Disabled:</span>
            <IconButton variant="main" size="big" disabled />
            <IconButton variant="main" size="medium" disabled />
            <IconButton variant="main" size="small" disabled />
          </div>
        </div>
      </section>

      {/* Main Buttons */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Main Buttons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Big:</span>
            <Button variant="primary" size="big">Create scenario</Button>
            <Button variant="primary" size="big" state="hover">Create scenario</Button>
            <Button variant="primary" size="big" disabled>Create scenario</Button>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>Small:</span>
            <Button variant="primary" size="small">Create scenario</Button>
            <Button variant="primary" size="small" state="hover">Create scenario</Button>
            <Button variant="primary" size="small" disabled>Create scenario</Button>
          </div>
        </div>
      </section>

      {/* White Buttons */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>White Buttons</h3>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center',
          background: '#f0f0f0',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <Button variant="white">Create scenario</Button>
          <Button variant="white" state="hover">Create scenario</Button>
          <Button variant="white" disabled>Create scenario</Button>
        </div>
      </section>

      {/* Secondary Text Buttons */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Secondary Button Small</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SecondaryButton>Create scenario</SecondaryButton>
          <SecondaryButton state="hover">Create scenario</SecondaryButton>
          <SecondaryButton disabled>Create scenario</SecondaryButton>
        </div>
      </section>

      {/* Link Buttons */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Link Buttons</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <LinkButton>Button link</LinkButton>
          <LinkButton state="hover">Button link</LinkButton>
          <LinkButton disabled>Button link</LinkButton>
        </div>
      </section>

      {/* Toggle Button (Icon Button with switcher) */}
      <section>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Icon Button with Switcher</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <ToggleButton 
            mode={toggleMode} 
            onToggle={setToggleMode}
          />
          <ToggleButton mode="input" />
        </div>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
          Current mode: {toggleMode}
        </p>
      </section>

    </div>
  )
}

export default ButtonDemo
