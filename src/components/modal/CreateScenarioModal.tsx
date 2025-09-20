import React, { useState } from 'react'
import Modal from './Modal'
import SelectField from './SelectField'

interface CreateScenarioModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel?: () => void
  onCreateScenario?: (data: { cloudProvider: string; cloudCluster: string }) => void
}

const CreateScenarioModal: React.FC<CreateScenarioModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onCreateScenario
}) => {
  const [cloudProvider, setCloudProvider] = useState('')
  const [cloudCluster, setCloudCluster] = useState('')

  const cloudProviderOptions = [
    { value: 'aws', label: 'Amazon Web Services (AWS)' },
    { value: 'azure', label: 'Microsoft Azure' },
    { value: 'gcp', label: 'Google Cloud Platform (GCP)' },
    { value: 'digitalocean', label: 'DigitalOcean' },
    { value: 'linode', label: 'Linode' }
  ]

  const cloudClusterOptions = [
    { value: 'dev-cluster', label: 'Development Cluster' },
    { value: 'staging-cluster', label: 'Staging Cluster' },
    { value: 'prod-cluster', label: 'Production Cluster' },
    { value: 'test-cluster', label: 'Test Cluster' }
  ]

  const handleCancel = () => {
    // Reset form
    setCloudProvider('')
    setCloudCluster('')
    
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  const handleCreateScenario = () => {
    if (cloudProvider && cloudCluster) {
      if (onCreateScenario) {
        onCreateScenario({
          cloudProvider,
          cloudCluster
        })
      }
      
      // Reset form
      setCloudProvider('')
      setCloudCluster('')
      onClose()
    }
  }

  const isFormValid = cloudProvider && cloudCluster

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create scenatio"
      showActions={false}
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
      
      <div className="modal-actions">
        <button 
          className="modal-button modal-button--secondary" 
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="modal-button modal-button--primary" 
          onClick={handleCreateScenario}
          disabled={!isFormValid}
        >
          Create scenario
        </button>
      </div>
    </Modal>
  )
}

export default CreateScenarioModal
