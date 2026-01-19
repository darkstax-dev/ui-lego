import React, { useState } from 'react'
import '../tokens.css'
import './ContainerModalPage.css'

import { TopBar } from '../components/bar'
import InputField from '../components/inputs/InputField'
import SelectField from '../components/inputs/SelectField'
import Checkbox from '../components/checkbox/Checkbox'
import Button from '../components/buttons/Button'
import Accordion from '../components/accordion/Accordion'
import AccordionItem from '../components/accordion/AccordionItem'

// Types
type Port = {
  id: string
  containerPort: string
  protocol: string
}

type EnvVar = {
  id: string
  name: string
  value: string
  valueFrom: string
}

type Label = {
  id: string
  key: string
  value: string
}

// Options
const pullPolicyOptions = [
  { value: 'IfNotPresent', label: 'IfNotPresent' },
  { value: 'Always', label: 'Always' },
  { value: 'Never', label: 'Never' },
]

const protocolOptions = [
  { value: 'TCP', label: 'TCP' },
  { value: 'UDP', label: 'UDP' },
]

const valueFromOptions = [
  { value: 'Default', label: 'Default' },
  { value: 'ConfigMap', label: 'ConfigMap' },
  { value: 'Secret', label: 'Secret' },
]

const ContainerModalPage: React.FC = () => {
  // General State
  const [name, setName] = useState('modelstore-frontend-app')
  const [image, setImage] = useState('harbor.darkstax.dev/dstax-app/ep-emane-plus-ol9:latest')
  const [command, setCommand] = useState('/dstax-apps/AdHocResearch.Cognitive.Agent')
  const [args, setArgs] = useState('')
  const [pullPolicy, setPullPolicy] = useState('IfNotPresent')

  // Resources State
  const [reqMem, setReqMem] = useState('')
  const [reqCpu, setReqCpu] = useState('')
  const [limitMem, setLimitMem] = useState('')
  const [limitCpu, setLimitCpu] = useState('')

  // Security State
  const [capabilities, setCapabilities] = useState('')
  const [capAdd, setCapAdd] = useState('')
  const [capDrop, setCapDrop] = useState('')
  const [appArmor, setAppArmor] = useState('')
  const [privileged, setPrivileged] = useState(false)
  const [allowEscalation, setAllowEscalation] = useState(false)
  const [stdin, setStdin] = useState(true)
  const [stdinOnce, setStdinOnce] = useState(true)
  const [tty, setTty] = useState(true)

  // Probes State
  const [livenessPath, setLivenessPath] = useState('')
  const [livenessPort, setLivenessPort] = useState('')
  const [livenessDelay, setLivenessDelay] = useState('')
  const [livenessPeriod, setLivenessPeriod] = useState('')
  
  const [readinessPath, setReadinessPath] = useState('')
  const [readinessPort, setReadinessPort] = useState('')
  const [readinessDelay, setReadinessDelay] = useState('')
  const [readinessPeriod, setReadinessPeriod] = useState('')

  // Dynamic Lists State
  const [labels, setLabels] = useState<Label[]>([])
  const [ports, setPorts] = useState<Port[]>([])
  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { id: '1', name: 'AHR_DS_NODE_ID', value: 'bddfcc2a-66db-4104-9ea6-4b8465c1a5dc', valueFrom: 'Default' },
    { id: '2', name: 'AHR_DS_AGENT_ROLE', value: 'modelstore-frontend', valueFrom: 'Default' }
  ])

  // Handlers
  const addLabel = () => {
    setLabels([...labels, { id: Math.random().toString(), key: '', value: '' }])
  }

  const removeLabel = (id: string) => {
    setLabels(labels.filter(l => l.id !== id))
  }

  const addPort = () => {
    setPorts([...ports, { id: Math.random().toString(), containerPort: '', protocol: 'TCP' }])
  }

  const removePort = (id: string) => {
    setPorts(ports.filter(p => p.id !== id))
  }

  const addEnvVar = () => {
    setEnvVars([...envVars, { id: Math.random().toString(), name: '', value: '', valueFrom: 'Default' }])
  }

  const removeEnvVar = (id: string) => {
    setEnvVars(envVars.filter(e => e.id !== id))
  }

  const handleSave = () => {
    // eslint-disable-next-line no-console
    console.log('Saving Container Configuration...')
  }

  return (
    <div className="container-page">
      <TopBar activeSection="template" />
      
      <div className="container-scroll-area">
        <div className="container-content">
          <div className="container-header-section">
            <h1 className="container-title">Configure Container</h1>
          </div>

          {/* General Information Section */}
          <section className="form-section">
            <h3 className="form-section-title">General Information</h3>
            <div className="form-grid-2">
               <InputField label="Name" value={name} onChange={setName} placeholder="Container Name" />
               <SelectField label="Image Pull Policy" value={pullPolicy} onChange={setPullPolicy} options={pullPolicyOptions} />
            </div>
            <InputField label="Image" value={image} onChange={setImage} placeholder="Image URL" leadingIcon={null} />
            
            <div className="dynamic-list-container">
               <div className="add-button-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                 <span className="input-field__label">Labels</span>
                 <Button variant="secondary" size="sm" onClick={addLabel} icon={null}>+ Add Label</Button>
               </div>
               {labels.map(label => (
                 <div key={label.id} className="dynamic-list-row">
                   <InputField value={label.key} onChange={(v) => {
                     const newLabels = [...labels]
                     newLabels.find(l => l.id === label.id)!.key = v
                     setLabels(newLabels)
                   }} placeholder="Key" />
                   <InputField value={label.value} onChange={(v) => {
                     const newLabels = [...labels]
                     newLabels.find(l => l.id === label.id)!.value = v
                     setLabels(newLabels)
                   }} placeholder="Value" />
                   <Button variant="white" size="sm" onClick={() => removeLabel(label.id)} icon={null}>🗑️</Button>
                 </div>
               ))}
            </div>
          </section>

          {/* Runtime Section */}
          <section className="form-section">
            <h3 className="form-section-title">Runtime & Execution</h3>
            <InputField label="Command" value={command} onChange={setCommand} placeholder="/bin/sh" />
            <InputField label="Args" value={args} onChange={setArgs} placeholder="arguments..." />
            
            <div className="checkbox-group">
               <Checkbox label="Privileged" checked={privileged} onChange={setPrivileged} />
               <Checkbox label="Allow Privilege Escalation" checked={allowEscalation} onChange={setAllowEscalation} />
               <Checkbox label="stdin" checked={stdin} onChange={setStdin} />
               <Checkbox label="stdinOnce" checked={stdinOnce} onChange={setStdinOnce} />
               <Checkbox label="TTY" checked={tty} onChange={setTty} />
            </div>
          </section>

          {/* Advanced Settings in Accordion */}
          <Accordion className="container-accordion">
            
            {/* Resources */}
            <AccordionItem title="Resources" content={
              <div className="form-grid-2">
                <div>
                   <h4 className="input-field__label" style={{marginBottom: 8}}>Requests</h4>
                   <div className="form-grid-2">
                      <InputField label="Memory" value={reqMem} onChange={setReqMem} placeholder="e.g. 512Mi" />
                      <InputField label="CPU" value={reqCpu} onChange={setReqCpu} placeholder="e.g. 500m" />
                   </div>
                </div>
                <div>
                   <h4 className="input-field__label" style={{marginBottom: 8}}>Limits</h4>
                   <div className="form-grid-2">
                      <InputField label="Memory" value={limitMem} onChange={setLimitMem} placeholder="e.g. 1Gi" />
                      <InputField label="CPU" value={limitCpu} onChange={setLimitCpu} placeholder="e.g. 1000m" />
                   </div>
                </div>
              </div>
            } />

            {/* Probes */}
            <AccordionItem title="Health Probes" content={
              <div className="form-grid-2">
                <div>
                   <h4 className="input-field__label" style={{marginBottom: 8}}>Liveness Probe</h4>
                   <div className="form-grid-2">
                      <InputField label="Path" value={livenessPath} onChange={setLivenessPath} placeholder="/healthz" />
                      <InputField label="Port" value={livenessPort} onChange={setLivenessPort} placeholder="8080" />
                      <InputField label="Initial Delay (s)" value={livenessDelay} onChange={setLivenessDelay} placeholder="30" />
                      <InputField label="Period (s)" value={livenessPeriod} onChange={setLivenessPeriod} placeholder="10" />
                   </div>
                </div>
                <div>
                   <h4 className="input-field__label" style={{marginBottom: 8}}>Readiness Probe</h4>
                   <div className="form-grid-2">
                      <InputField label="Path" value={readinessPath} onChange={setReadinessPath} placeholder="/ready" />
                      <InputField label="Port" value={readinessPort} onChange={setReadinessPort} placeholder="8080" />
                      <InputField label="Initial Delay (s)" value={readinessDelay} onChange={setReadinessDelay} placeholder="30" />
                      <InputField label="Period (s)" value={readinessPeriod} onChange={setReadinessPeriod} placeholder="10" />
                   </div>
                </div>
              </div>
            } />

            {/* Security */}
            <AccordionItem title="Security Context" content={
              <div className="form-grid-2">
                 <InputField label="Capabilities" value={capabilities} onChange={setCapabilities} placeholder="e.g. NET_ADMIN" />
                 <InputField label="AppArmor Profile" value={appArmor} onChange={setAppArmor} placeholder="runtime/default" />
                 <InputField label="Capabilities Add" value={capAdd} onChange={setCapAdd} placeholder="Enter to add" />
                 <InputField label="Capabilities Drop" value={capDrop} onChange={setCapDrop} placeholder="Enter to drop" />
              </div>
            } />

            {/* Environment */}
            <AccordionItem title="Environment Variables" content={
              <div className="dynamic-list-container">
                 <div className="add-button-row">
                   <Button variant="secondary" size="sm" onClick={addEnvVar} icon={null}>+ Add Variable</Button>
                 </div>
                 {envVars.map(env => (
                   <div key={env.id} className="dynamic-list-row">
                     <div style={{flex: 1}}>
                        <SelectField options={valueFromOptions} value={env.valueFrom} onChange={(v) => {
                           const newEnv = [...envVars]
                           newEnv.find(e => e.id === env.id)!.valueFrom = v
                           setEnvVars(newEnv)
                        }} placeholder="Source" />
                     </div>
                     <div style={{flex: 1}}>
                        <InputField value={env.name} onChange={(v) => {
                           const newEnv = [...envVars]
                           newEnv.find(e => e.id === env.id)!.name = v
                           setEnvVars(newEnv)
                        }} placeholder="Name" />
                     </div>
                     <div style={{flex: 2}}>
                        <InputField value={env.value} onChange={(v) => {
                           const newEnv = [...envVars]
                           newEnv.find(e => e.id === env.id)!.value = v
                           setEnvVars(newEnv)
                        }} placeholder="Value" />
                     </div>
                     <Button variant="white" size="sm" onClick={() => removeEnvVar(env.id)} icon={null}>🗑️</Button>
                   </div>
                 ))}
              </div>
            } />

            {/* Ports */}
            <AccordionItem title="Network Ports" content={
               <div className="dynamic-list-container">
                 <div className="add-button-row">
                   <Button variant="secondary" size="sm" onClick={addPort} icon={null}>+ Add Port</Button>
                 </div>
                 {ports.map(port => (
                   <div key={port.id} className="dynamic-list-row">
                     <div style={{flex: 2}}>
                       <InputField value={port.containerPort} onChange={(v) => {
                         const newPorts = [...ports]
                         newPorts.find(p => p.id === port.id)!.containerPort = v
                         setPorts(newPorts)
                       }} placeholder="Container Port" />
                     </div>
                     <div style={{flex: 1}}>
                       <SelectField options={protocolOptions} value={port.protocol} onChange={(v) => {
                         const newPorts = [...ports]
                         newPorts.find(p => p.id === port.id)!.protocol = v
                         setPorts(newPorts)
                       }} placeholder="Protocol" />
                     </div>
                     <Button variant="white" size="sm" onClick={() => removePort(port.id)} icon={null}>🗑️</Button>
                   </div>
                 ))}
                 {ports.length === 0 && <div className="text-secondary text-sm">No ports defined.</div>}
               </div>
            } />
          </Accordion>

        </div>
      </div>

      <div className="page-footer">
        <Button variant="secondary" onClick={() => {}}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

export default ContainerModalPage
export { ContainerModalPage }
