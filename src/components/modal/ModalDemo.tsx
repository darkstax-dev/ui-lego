import React, { useState } from 'react'
import CreateScenarioModal from './CreateScenarioModal'
import Button from '../buttons/Button'
import './ModalDemo.css'

const ModalDemo: React.FC = () => {
  const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] = useState(false)
  const [lastCreatedScenario, setLastCreatedScenario] = useState<{
    cloudProvider: string
    cloudCluster: string
  } | null>(null)

  const handleOpenModal = () => {
    setIsCreateScenarioModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateScenarioModalOpen(false)
  }

  const handleCreateScenario = (data: { cloudProvider: string; cloudCluster: string }) => {
    setLastCreatedScenario(data)
    console.log('Created scenario:', data)
  }

  return (
    <div className="modal-demo">
      <div className="modal-demo__container">
        <div className="modal-demo__header">
          <h2 className="modal-demo__title">Modal Components</h2>
          <p className="modal-demo__description">
            Interactive modal components with form fields and actions, styled to match the design system.
          </p>
        </div>

        <div className="modal-demo__controls">
          <div className="modal-demo__control-group">
            <h3 className="modal-demo__control-title">Create Scenario Modal</h3>
            <p className="modal-demo__control-description">
              A modal for creating cloud scenarios with provider and cluster selection.
            </p>
            <Button
              variant="primary"
              size="big"
              onClick={handleOpenModal}
            >
              Open Create Scenario Modal
            </Button>
          </div>

          {lastCreatedScenario && (
            <div className="modal-demo__result">
              <h4 className="modal-demo__result-title">Last Created Scenario:</h4>
              <div className="modal-demo__result-details">
                <p><strong>Cloud Provider:</strong> {lastCreatedScenario.cloudProvider}</p>
                <p><strong>Cloud Cluster:</strong> {lastCreatedScenario.cloudCluster}</p>
              </div>
            </div>
          )}
        </div>

        <CreateScenarioModal
          isOpen={isCreateScenarioModalOpen}
          onClose={handleCloseModal}
          onCreateScenario={handleCreateScenario}
        />
      </div>
    </div>
  )
}

export default ModalDemo
