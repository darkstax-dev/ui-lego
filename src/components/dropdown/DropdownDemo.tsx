import React from 'react'
import { Dropdown, DropdownItem } from './index'
import ImageIcon from '../icons/ImageIcon'

const DropdownDemo: React.FC = () => {
  return (
    <div style={{ padding: '50px', display: 'flex', gap: '50px', flexWrap: 'wrap', background: '#F5F5F5' }}>
      
      {/* Basic Dropdown - Default Big Size */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>Drop Down (Big Size)</h3>
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

      {/* Scrollable Dropdown */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>Drop Down with Scroll</h3>
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
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Component States - Big Size */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>States - Big Size</h3>
        <Dropdown>
          <DropdownItem size="big" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="hover">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="danger">
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Component States - Small Size */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>States - Small Size</h3>
        <Dropdown>
          <DropdownItem size="small" variant="default">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="small" variant="hover">
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="small" variant="danger">
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Without Leading Icon */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>Without Leading Icon</h3>
        <Dropdown>
          <DropdownItem size="big" variant="default" showLeadingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default" showLeadingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default" showLeadingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Without Trailing Icon */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>Without Trailing Icon</h3>
        <Dropdown>
          <DropdownItem size="big" variant="default" showTrailingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default" showTrailingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
          <DropdownItem size="big" variant="default" showTrailingIcon={false}>
            Kubernetes dashboard
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Without Both Icons */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>Without Icons</h3>
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

      {/* Compact Dropdown */}
      <div>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Macan', color: '#00112B' }}>Compact Dropdown</h3>
        <Dropdown size="compact">
          <DropdownItem size="small" variant="default">
            Item 1
          </DropdownItem>
          <DropdownItem size="small" variant="default">
            Item 2
          </DropdownItem>
          <DropdownItem size="small" variant="danger">
            Delete Item
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}

export default DropdownDemo
