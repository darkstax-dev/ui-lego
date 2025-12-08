import React from 'react'
import '../tokens.css'
import './ResourceListingPage.css'

import { TopBar } from '../components/bar'
import { SecondaryNavigation } from '../components/navigation'

const ResourceListingPage: React.FC = () => {
  return (
    <div className="resource-page">
      <TopBar activeSection="template" />

      <SecondaryNavigation
        variant="default"
        scenarioTitle="RESOURCE LISTING"
        showLockedToggle={false}
        onSearch={() => {}}
      />

      <main className="resource-content">
        <section className="resource-header">
          <h2 className="resource-title">Resource Listing</h2>
          <p className="resource-subtitle">
            Browse and manage your activity models and related resources.
          </p>
        </section>

        <section className="resource-body">
          <div className="resource-empty-state">
            <div className="resource-empty-icon" aria-hidden="true" />
            <div className="resource-empty-text">
              <h3 className="resource-empty-title">No resources found</h3>
              <p className="resource-empty-description">
                Use the navigation actions above to upload, download, or create new scenarios.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ResourceListingPage
export { ResourceListingPage }
