import React, { useState } from 'react'
import '../tokens.css'
import './CreateScenarioPage.css'

import { TopBar } from '../components/bar'
import { SecondaryNavigation } from '../components/navigation'
import InputField from '../components/inputs/InputField'
import SelectField from '../components/inputs/SelectField'
import Checkbox from '../components/checkbox/Checkbox'
import SearchField from '../components/inputs/SearchField'
import Button from '../components/buttons/Button'
import BackButton from '../components/buttons/BackButton'
import { KubernetesPod } from '../components/icons/kubernetes'
import { ActivityModelCard } from '../components/modeling'

// Simple type for option lists
type Option = { value: string; label: string }

const cloudProviders: Option[] = [
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'GCP' },
]

const clusters: Option[] = [
  { value: 'k8s-dev', label: 'k8s dev Development' },
  { value: 'k8s-stg', label: 'k8s staging' },
  { value: 'k8s-prod', label: 'k8s production' },
]

const deploymentOptions: Option[] = [
  { value: 'select', label: 'Select' },
  { value: 'rolling', label: 'Rolling' },
  { value: 'bluegreen', label: 'Blue/Green' },
]

const resourceAllocations: Option[] = [
  { value: 'select', label: 'Select' },
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

const CreateScenarioPage: React.FC = () => {
  const [folderPath, setFolderPath] = useState('default')
  const [scenarioName, setScenarioName] = useState('')
  const [namespace, setNamespace] = useState('')
  const [cloudProvider, setCloudProvider] = useState('kubernetes')
  const [cloudCluster, setCloudCluster] = useState('k8s-dev')
  const [tasks, setTasks] = useState('')
  const [deployment, setDeployment] = useState('select')
  const [resourceType, setResourceType] = useState('select')
  const [autoDeploy, setAutoDeploy] = useState(false)
  const [searchActivities, setSearchActivities] = useState('')

  // Example selected activity models; could be empty [] by default
  const [selectedModels, setSelectedModels] = useState([
    { id: 'test12356', template: 'etbase', type: 'Pod' },
    { id: 'api-server', template: 'base', type: 'Deployment' },
    { id: 'metrics-agent', template: 'observability', type: 'DaemonSet' },
  ])

  const removeModel = (id: string) => {
    setSelectedModels(prev => prev.filter(m => m.id !== id))
  }

  const handleCreate = () => {
    // no-op for UI demo
    // eslint-disable-next-line no-console
    console.log('Create Scenario', {
      folderPath,
      scenarioName,
      namespace,
      cloudProvider,
      cloudCluster,
      tasks,
      deployment,
      resourceType,
      autoDeploy,
      selectedModels,
    })
  }

  const handleBack = () => {
    // no-op for UI demo
    // eslint-disable-next-line no-console
    console.log('Back button clicked')
  }

  return (
    <div className="scenario-page">
      <TopBar activeSection="template" />

      <SecondaryNavigation
        variant="default"
        scenarioTitle="EVENT ORCHESTRATION PLAN"
        showLockedToggle={false}
        onSearch={() => {}}
      />
      
      <div className="scenario-back-section">
        <BackButton onClick={handleBack} label="Back to Scenarios" />
      </div>
      
      <main className="scenario-content">
        <section className="scenario-header">
          <h2 className="scenario-title">Create Activity Model Scenario</h2>
        </section>

        <section className="scenario-form">
          <div className="form-grid">
            <InputField label="Folder Path" value={folderPath} onChange={setFolderPath} placeholder="default" leadingIcon={null} />
            <InputField label="Scenario Name" value={scenarioName} onChange={setScenarioName} placeholder="" leadingIcon={null} />
            <InputField label="Namespace" value={namespace} onChange={setNamespace} placeholder="" leadingIcon={null} />

            <SelectField
              label="Cloud Provider"
              value={cloudProvider}
              onChange={setCloudProvider}
              options={cloudProviders}
              placeholder="Select"
            />

            <SelectField
              label="Cloud Cluster"
              value={cloudCluster}
              onChange={setCloudCluster}
              options={clusters}
              placeholder="Select"
            />

            <InputField label="Tasks" value={tasks} onChange={setTasks} placeholder="Press Enter to Add" leadingIcon={null} />

            <SelectField
              label="Deployment Option"
              value={deployment}
              onChange={setDeployment}
              options={deploymentOptions}
              placeholder="Select"
            />

            <SelectField
              label="Resource / Allocation Type"
              value={resourceType}
              onChange={setResourceType}
              options={resourceAllocations}
              placeholder="Select"
            />

            <div className="form-checkbox">
              <Checkbox
                label="Auto Deploy"
                checked={autoDeploy}
                onChange={(checked: boolean) => setAutoDeploy(checked)}
              />
            </div>
          </div>
        </section>

        <section className="scenario-selected">
          <div className="selected-controls">
            <SearchField value={searchActivities} onChange={setSearchActivities} placeholder="Search activities..." />
          </div>
          <div className="selected-header">
            <h3 className="selected-title">Selected Activity Models ({selectedModels.length})</h3>
          </div>

          <div className="selected-list">
            {selectedModels.map((m) => (
              <ActivityModelCard key={m.id} id={m.id} template={m.template} type={m.type} onRemove={removeModel} icon={<KubernetesPod width={36} height={36} />} />
            ))}
          </div>
        </section>

        <section className="scenario-footer">
          <Button variant="primary-simple" size="sm" onClick={handleCreate}>Create Scenario</Button>
        </section>
      </main>
    </div>
  )
}

export default CreateScenarioPage
export { CreateScenarioPage }
