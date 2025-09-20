import React, { useState } from 'react'
import Menu from './Menu'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import MenuHeading from './MenuHeading'
import MenuSection from './MenuSection'
import MenuSeparator from './MenuSeparator'
import MenuShortcut from './MenuShortcut'

const MenuDemo: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'hover' | 'disabled'>('default')

  const starIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path 
        d="M9.99999 1.66669L12.575 6.88335L18.3333 7.72502L14.1667 11.7834L15.15 17.5167L9.99999 14.8084L4.84999 17.5167L5.83332 11.7834L1.66666 7.72502L7.42499 6.88335L9.99999 1.66669Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )

  const heartIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path 
        d="M17.3667 3.84167C16.941 3.41583 16.4357 3.077 15.8795 2.84235C15.3233 2.6077 14.7271 2.48206 14.125 2.48206C13.5229 2.48206 12.9267 2.6077 12.3705 2.84235C11.8143 3.077 11.309 3.41583 10.8833 3.84167L10 4.725L9.11668 3.84167C8.25668 2.98167 7.09168 2.48206 5.87501 2.48206C4.65834 2.48206 3.49334 2.98167 2.63334 3.84167C1.77334 4.70167 1.27373 5.86667 1.27373 7.08334C1.27373 8.3 1.77334 9.465 2.63334 10.325L3.51668 11.2083L10 17.6917L16.4833 11.2083L17.3667 10.325C17.7925 9.89937 18.1313 9.39405 18.366 8.83785C18.6006 8.28165 18.7263 7.68544 18.7263 7.08334C18.7263 6.48123 18.6006 5.88502 18.366 5.32882C18.1313 4.77262 17.7925 4.2673 17.3667 3.84167Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h2>Menu Component Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Controls</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setSelectedVariant('default')}
            style={{ 
              padding: '8px 16px', 
              background: selectedVariant === 'default' ? '#007bff' : '#f8f9fa',
              color: selectedVariant === 'default' ? 'white' : 'black',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Default
          </button>
          <button 
            onClick={() => setSelectedVariant('hover')}
            style={{ 
              padding: '8px 16px', 
              background: selectedVariant === 'hover' ? '#007bff' : '#f8f9fa',
              color: selectedVariant === 'hover' ? 'white' : 'black',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Hover
          </button>
          <button 
            onClick={() => setSelectedVariant('disabled')}
            style={{ 
              padding: '8px 16px', 
              background: selectedVariant === 'disabled' ? '#007bff' : '#f8f9fa',
              color: selectedVariant === 'disabled' ? 'white' : 'black',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Disabled
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        <div>
          <h3>Complete Menu Example (Figma Design)</h3>
          <Menu>
            <MenuHeader
              heading="Heading"
              subheading="Heading"
            />

            <MenuSeparator />

            <MenuSection>
              <MenuItem
                label="Menu Label"
                description="Menu description."
                icon={starIcon}
                shortcut="⇧A"
                state={selectedVariant}
                onClick={() => console.log('Menu item 1 clicked')}
              />

              <MenuItem
                label="Menu Label"
                description="Menu description."
                icon={starIcon}
                shortcut="⇧A"
                state={selectedVariant}
                onClick={() => console.log('Menu item 2 clicked')}
              />

              <MenuItem
                label="Menu Label"
                description="Menu description."
                icon={starIcon}
                shortcut="⇧A"
                state={selectedVariant}
                onClick={() => console.log('Menu item 3 clicked')}
              />
            </MenuSection>

            <MenuSeparator />

            <MenuSection>
              <MenuItem
                label="Menu Label"
                description="Menu description."
                icon={starIcon}
                shortcut="⇧A"
                state={selectedVariant}
                onClick={() => console.log('Menu item 4 clicked')}
              />

              <MenuItem
                label="Menu Label"
                description="Menu description."
                icon={starIcon}
                shortcut="⇧A"
                state={selectedVariant}
                onClick={() => console.log('Menu item 5 clicked')}
              />
            </MenuSection>
          </Menu>
        </div>

        <div>
          <h3>Individual Primitive Components</h3>

          <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
            <h4>Menu Header</h4>
            <MenuHeader
              heading="Heading"
              subheading="Heading"
            />
          </div>

          <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
            <h4>Menu Heading</h4>
            <MenuHeading>Heading</MenuHeading>
          </div>

          <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
            <h4>Menu Item ({selectedVariant})</h4>
            <MenuItem
              label="Menu Label"
              description="Menu description."
              icon={starIcon}
              shortcut="⇧A"
              state={selectedVariant}
              onClick={() => console.log('Menu item clicked')}
            />
          </div>

          <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
            <h4>Menu Separator</h4>
            <MenuSeparator />
          </div>

          <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
            <h4>Menu Shortcut</h4>
            <MenuShortcut shortcut="⇧A" />
          </div>

          <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
            <h4>Custom Example</h4>
            <Menu>
              <MenuHeader
                heading="Account Settings"
                subheading="Manage your account"
              />

              <MenuSection>
                <MenuItem
                  label="Profile"
                  description="Update your personal information"
                  icon={starIcon}
                  shortcut="⌘P"
                  state={selectedVariant}
                  onClick={() => console.log('Profile clicked')}
                />

                <MenuItem
                  label="Preferences"
                  description="Customize your experience"
                  icon={heartIcon}
                  shortcut="⌘,"
                  state={selectedVariant}
                  onClick={() => console.log('Preferences clicked')}
                />
              </MenuSection>

              <MenuSeparator />

              <MenuSection>
                <MenuItem
                  label="Sign Out"
                  description="Sign out of your account"
                  icon={starIcon}
                  shortcut="⇧⌘Q"
                  state={selectedVariant}
                  onClick={() => console.log('Sign out clicked')}
                />
              </MenuSection>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuDemo
