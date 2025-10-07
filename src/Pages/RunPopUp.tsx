import React, { useState } from 'react'
import '../tokens.css'
import './RunPopUp.css'
import Button from '../components/buttons/Button'
import TextareaField from '../components/inputs/TextareaField'
import Accordion from '../components/accordion/Accordion'
import AccordionItem from '../components/accordion/AccordionItem'
import Checkbox from '../components/checkbox/Checkbox'

export interface RunPopUpProps {
  isOpen: boolean
  onClose: () => void
  onRun?: () => void
  variant?: 'dark' | 'light'
}

interface AgentStatus {
  name: string
  url: string
  up: number
  down: number
  joining: number
  exiting: number
  removed: number
  weakLoop: number
  unknown: number
}

const RunPopUp: React.FC<RunPopUpProps> = ({
  isOpen,
  onClose,
  onRun,
  variant = 'dark'
}) => {
  const [selectedUAT, setSelectedUAT] = useState<string | null>(null)
  const [remarks, setRemarks] = useState('')
  const [logLevels, setLogLevels] = useState({
    info: true,
    trace: false,
    warning: true,
    error: true,
    fatal: true
  })

  // Available UAT options
  const uatOptions = [
    {
      id: 'uat-1',
      name: 'UAT',
      url: 'https://cs-web-uat.darkstax.dev',
      up: 0,
      down: 0,
      joining: 0,
      exiting: 0,
      removed: 0,
      weakLoop: 0,
      unknown: 1
    },
    {
      id: 'uat-2', 
      name: 'UAT-2',
      url: 'https://cs-web-uat2.darkstax.dev',
      up: 1,
      down: 0,
      joining: 0,
      exiting: 0,
      removed: 0,
      weakLoop: 0,
      unknown: 0
    }
  ]

  const selectedAgent = uatOptions.find(agent => agent.id === selectedUAT)

  const handleLogLevelChange = (level: keyof typeof logLevels, checked: boolean) => {
    setLogLevels(prev => ({ ...prev, [level]: checked }))
  }

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="run-popup-overlay" onClick={handleOverlayClick}>
      <div className={`run-popup ${variant === 'light' ? 'run-popup--light' : 'run-popup--dark'}`}>
        {/* Header */}
        <div className="run-popup__header">
          <h2 className="run-popup__title">UAT</h2>
          <button className="run-popup__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Content with UAT Selection Accordion */}
        <div className="run-popup__content">
          <Accordion className="run-popup__accordion">
            <AccordionItem
              title="Select UAT Environment"
              content={(
                <div className="run-popup__uat-selection">
                  {uatOptions.map((uat) => (
                    <div key={uat.id} className="run-popup__uat-option">
                      <Checkbox
                        checked={selectedUAT === uat.id}
                        onChange={(checked) => setSelectedUAT(checked ? uat.id : null)}
                        label={`${uat.name} - ${uat.url}`}
                      />
                    </div>
                  ))}
                </div>
              )}
              defaultOpen={false}
            />
          </Accordion>

          {/* Display selected UAT information outside accordion */}
          {selectedAgent && (
            <div className="run-popup__selected-info">
              <div className="run-popup__table-container">
                <table className="run-popup__table">
                  <thead>
                    <tr>
                      <th>AGENT STATUS ON</th>
                      <th>UP</th>
                      <th>DOWN</th>
                      <th>JOINING</th>
                      <th>EXITING</th>
                      <th>REMOVED</th>
                      <th>WEAK-LOOP</th>
                      <th>UNKNOWN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="run-popup__agent-cell">
                          <div className="run-popup__status-indicator run-popup__status-indicator--online"></div>
                          <div className="run-popup__agent-info">
                            <div className="run-popup__agent-name">{selectedAgent.name}</div>
                            <div className="run-popup__agent-url">{selectedAgent.url}</div>
                          </div>
                        </div>
                      </td>
                      <td>{selectedAgent.up}</td>
                      <td>{selectedAgent.down}</td>
                      <td>{selectedAgent.joining}</td>
                      <td>{selectedAgent.exiting}</td>
                      <td>{selectedAgent.removed}</td>
                      <td>{selectedAgent.weakLoop}</td>
                      <td>{selectedAgent.unknown}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Remarks Section */}
              <div className="run-popup__remarks">
                <h3 className="run-popup__remarks-title">Remarks</h3>

                <div className="run-popup__remarks-textarea">
                  <TextareaField
                    value={remarks}
                    onChange={setRemarks}
                    placeholder="Enter remarks..."
                    rows={3}
                    resize={false}
                  />
                </div>

                <div className="run-popup__log-section">
                  <div className="run-popup__log-title">Enable Log</div>
                  
                  <div className="run-popup__log-levels">
                    <Checkbox
                      label="Info"
                      checked={logLevels.info}
                      onChange={(checked) => handleLogLevelChange('info', checked)}
                    />
                    <Checkbox
                      label="Trace"
                      checked={logLevels.trace}
                      onChange={(checked) => handleLogLevelChange('trace', checked)}
                    />
                    <Checkbox
                      label="Warning"
                      checked={logLevels.warning}
                      onChange={(checked) => handleLogLevelChange('warning', checked)}
                    />
                    <Checkbox
                      label="Error"
                      checked={logLevels.error}
                      onChange={(checked) => handleLogLevelChange('error', checked)}
                    />
                    <Checkbox
                      label="Fatal"
                      checked={logLevels.fatal}
                      onChange={(checked) => handleLogLevelChange('fatal', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="run-popup__footer">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary-simple" size="sm" onClick={onRun}>
            Run
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RunPopUp
export { RunPopUp }
