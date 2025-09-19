import React from 'react'
import { Dropdown, DropdownItem } from './index'
import ImageIcon from '../icons/ImageIcon'

const DropdownDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div>
        <h3>Basic Dropdown</h3>
        <Dropdown>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      <div>
        <h3>Scrollable Dropdown</h3>
        <Dropdown scrollable maxHeight={258}>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      <div>
        <h3>Item Variants - Small Size</h3>
        <Dropdown>
          <DropdownItem size="small" variant="default">
            Default State
          </DropdownItem>
          <DropdownItem size="small" variant="hover">
            Hover State
          </DropdownItem>
          <DropdownItem size="small" variant="danger">
            Danger State
          </DropdownItem>
        </Dropdown>
      </div>

      <div>
        <h3>Item Variants - Big Size</h3>
        <Dropdown>
          <DropdownItem size="big" variant="default">
            Default State
          </DropdownItem>
          <DropdownItem size="big" variant="hover">
            Hover State
          </DropdownItem>
          <DropdownItem size="big" variant="danger">
            Danger State
          </DropdownItem>
        </Dropdown>
      </div>

      <div>
        <h3>Without Icons</h3>
        <Dropdown>
          <DropdownItem size="big" variant="default" showLeadingIcon={false} showTrailingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default" showLeadingIcon={false} showTrailingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default" showLeadingIcon={false} showTrailingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      <div>
        <h3>Custom Icons</h3>
        <Dropdown>
          <DropdownItem 
            size="big" 
            variant="default"
            leadingIcon={<ImageIcon fill="#2563EB" />}
            trailingIcon={<ImageIcon fill="#059669" />}
          >
            Custom Icons
          </DropdownItem>
          <DropdownItem 
            size="big" 
            variant="default"
            leadingIcon={<ImageIcon fill="#DC2626" />}
            showTrailingIcon={false}
          >
            Leading Only
          </DropdownItem>
          <DropdownItem 
            size="big" 
            variant="default"
            showLeadingIcon={false}
            trailingIcon={<ImageIcon fill="#7C3AED" />}
          >
            Trailing Only
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}

export default DropdownDemo
