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
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      <section>
        <h3>Icon Buttons - Secondary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 60px)', gap: '10px', marginBottom: '20px' }}>
          {/* Gray variants */}
          <IconButton variant="secondary" color="gray" size="big" />
          <IconButton variant="secondary" color="gray" size="medium" />
          <IconButton variant="secondary" color="gray" size="small" />
          <IconButton variant="secondary" color="gray" size="big" disabled />
          <IconButton variant="secondary" color="gray" size="medium" disabled />
          <IconButton variant="secondary" color="gray" size="small" disabled />
          
          {/* Dark variants */}
          <IconButton variant="secondary" size="big" />
          <IconButton variant="secondary" size="medium" />
          <IconButton variant="secondary" size="small" />
          <IconButton variant="secondary" size="big" disabled />
          <IconButton variant="secondary" size="medium" disabled />
          <IconButton variant="secondary" size="small" disabled />
          
          {/* Red variants */}
          <IconButton variant="secondary" state="danger" size="big" />
          <IconButton variant="secondary" state="danger" size="medium" />
          <IconButton variant="secondary" state="danger" size="small" />
          <IconButton variant="secondary" state="danger" color="white" size="big" />
          <IconButton variant="secondary" state="danger" color="white" size="medium" />
          <IconButton variant="secondary" state="danger" color="white" size="small" />
        </div>
      </section>

      <section>
        <h3>Icon Buttons - Main</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <IconButton variant="main" size="big" />
          <IconButton variant="main" size="medium" />
          <IconButton variant="main" size="small" />
          <IconButton variant="main" size="big" disabled />
          <IconButton variant="main" size="medium" disabled />
          <IconButton variant="main" size="small" disabled />
        </div>
      </section>

      <section>
        <h3>Main Buttons with Text</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Button variant="primary" size="big">Create scenario</Button>
            <Button variant="primary" size="big" disabled>Create scenario</Button>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Button variant="secondary" size="small">Create scenario</Button>
            <Button variant="secondary" size="small" disabled>Create scenario</Button>
          </div>
        </div>
      </section>

      <section>
        <h3>White Buttons</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#f0f0f0', padding: '20px' }}>
          <Button variant="white">Create scenario</Button>
          <Button variant="white" disabled>Create scenario</Button>
        </div>
      </section>

      <section>
        <h3>Secondary Text Buttons</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <SecondaryButton>Create scenario</SecondaryButton>
          <SecondaryButton state="hover">Create scenario</SecondaryButton>
          <SecondaryButton disabled>Create scenario</SecondaryButton>
        </div>
      </section>

      <section>
        <h3>Link Buttons</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <LinkButton>Button link</LinkButton>
          <LinkButton state="hover">Button link</LinkButton>
          <LinkButton disabled>Button link</LinkButton>
          <LinkButton showIcon={false}>Button link without icon</LinkButton>
        </div>
      </section>

      <section>
        <h3>Toggle Button</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <ToggleButton 
            mode={toggleMode} 
            onToggle={setToggleMode}
          />
          <ToggleButton mode="input" disabled />
        </div>
        <p>Current mode: {toggleMode}</p>
      </section>

    </div>
  )
}

export default ButtonDemo
