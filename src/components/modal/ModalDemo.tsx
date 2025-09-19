import React, { useState } from 'react'
import Modal from './Modal'
import SelectField from './SelectField'

const ModalDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cloudProvider, setCloudProvider] = useState('')
  const [cloudCluster, setCloudCluster] = useState('')

  const cloudProviderOptions = [
    { value: 'aws', label: 'Amazon Web Services (AWS)' },
    { value: 'azure', label: 'Microsoft Azure' },
    { value: 'gcp', label: 'Google Cloud Platform (GCP)' },
    { value: 'digitalocean', label: 'DigitalOcean' }
  ]

  const cloudClusterOptions = [
    { value: 'cluster-1', label: 'Production Cluster' },
    { value: 'cluster-2', label: 'Staging Cluster' },
    { value: 'cluster-3', label: 'Development Cluster' },
    { value: 'cluster-4', label: 'Testing Cluster' }
  ]

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirm = () => {
    console.log('Creating scenario with:', { cloudProvider, cloudCluster })
    // Reset form
    setCloudProvider('')
    setCloudCluster('')
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    // Reset form
    setCloudProvider('')
    setCloudCluster('')
    setIsModalOpen(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={handleOpenModal}
        style={{
          padding: '10px 20px',
          background: '#D9322A',
          color: '#DFDFDF',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Macan, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: '16px',
          fontWeight: '500'
        }}
      >
        Open Create Scenario Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create scenario"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        cancelText="Cancel"
        confirmText="Create scenario"
      >
        <SelectField
          label="Cloud provider"
          value={cloudProvider}
          onChange={setCloudProvider}
          placeholder="Select cloud provider"
          options={cloudProviderOptions}
        />
        
        <SelectField
          label="Cloud cluster"
          value={cloudCluster}
          onChange={setCloudCluster}
          placeholder="Select cluster"
          options={cloudClusterOptions}
        />
      </Modal>
    </div>
  )
}

export default ModalDemo
