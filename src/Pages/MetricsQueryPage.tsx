import React, { useState } from 'react'
import '../tokens.css'
import './MetricsQueryPage.css'

import { TopBar } from '../components/bar'
import InputField from '../components/inputs/InputField'
import SelectField from '../components/inputs/SelectField'
import Button from '../components/buttons/Button'
import BackButton from '../components/buttons/BackButton'
import MonacoEditor from '../components/monaco-editor/MonacoEditor'

// Type definitions
type Option = { value: string; label: string }

const chartHeightOptions: Option[] = [
  { value: '300', label: '300' },
  { value: '400', label: '400' },
  { value: '500', label: '500' },
  { value: '600', label: '600' }
]

const areaOptions: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' }
]

const MetricsQueryPage: React.FC = () => {
  // Form state
  const [title, setTitle] = useState('CPU Usage (Seconds)')
  const [description, setDescription] = useState('CPU Usage (Seconds)')
  const [autoRefreshInterval, setAutoRefreshInterval] = useState('60')
  const [chartHeight, setChartHeight] = useState('300')
  const [area, setArea] = useState('no')
  
  // Accessor fields
  const [xAccessorUsage, setXAccessorUsage] = useState('')
  const [yAccessorTime, setYAccessorTime] = useState('')
  const [xLabelUsage, setXLabelUsage] = useState('')
  const [yLabelTime, setYLabelTime] = useState('')

  // Monaco Editor query
  const [query, setQuery] = useState(`rate(container_cpu_usage_seconds_total{pod=~".*", service=~".*"}[5m])`)

  const handleQueryChange = (value: string | undefined) => {
    setQuery(value || '')
  }

  const handleBack = () => {
    console.log('Back to metrics dashboard')
  }

  const handleSave = () => {
    console.log('Save metrics query', {
      title,
      description,
      autoRefreshInterval,
      chartHeight,
      area,
      xAccessorUsage,
      yAccessorTime,
      xLabelUsage,
      yLabelTime,
      query
    })
  }

  const handleRun = () => {
    console.log('Run metrics query', { query })
  }

  return (
    <div className="metrics-query-page">
      <TopBar activeSection="dashboard" />
      
      <div className="metrics-query-back-section">
        <BackButton onClick={handleBack} label="Back to Metrics" />
      </div>

      <main className="metrics-query-content">
        <section className="metrics-query-header">
          <h2 className="metrics-query-title">Create Metrics Query</h2>
        </section>

        <section className="metrics-query-form">
          <div className="metrics-query-form-grid">
            <InputField
              label="Title"
              value={title}
              onChange={setTitle}
              placeholder="Enter title"
              leadingIcon={null}
            />
            
            <InputField
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Enter description"
              leadingIcon={null}
            />
            
            <InputField
              label="Auto Refresh Interval (In seconds)"
              value={autoRefreshInterval}
              onChange={setAutoRefreshInterval}
              placeholder="60"
              type="number"
              leadingIcon={null}
            />
            
            <SelectField
              label="Chart Height"
              value={chartHeight}
              onChange={setChartHeight}
              options={chartHeightOptions}
            />
            
            <SelectField
              label="Area?"
              value={area}
              onChange={setArea}
              options={areaOptions}
            />
            
            <InputField
              label="X Accessor Usage"
              value={xAccessorUsage}
              onChange={setXAccessorUsage}
              placeholder="Enter usage accessor"
              leadingIcon={null}
            />
            
            <InputField
              label="Y Accessor Time"
              value={yAccessorTime}
              onChange={setYAccessorTime}
              placeholder="Enter time accessor"
              leadingIcon={null}
            />
            
            <InputField
              label="X Label Usage"
              value={xLabelUsage}
              onChange={setXLabelUsage}
              placeholder="Enter usage label"
              leadingIcon={null}
            />
            
            <InputField
              label="Y Label Time"
              value={yLabelTime}
              onChange={setYLabelTime}
              placeholder="Enter time label"
              leadingIcon={null}
            />
          </div>

          {/* Chart Query Section */}
          <div className="metrics-query-editor-section">
            <h3 className="metrics-query-section-title">Chart Query</h3>
            <div className="metrics-query-editor-container">
              <MonacoEditor
                value={query}
                onChange={handleQueryChange}
                language="javascript"
                height="200px"
                showMinimap={false}
                fontSize={14}
                wordWrap="on"
              />
            </div>
          </div>

          <section className="metrics-query-footer">
            <Button variant="secondary" size="sm" onClick={handleSave}>
              SAVE
            </Button>
            <Button variant="primary-simple" size="sm" onClick={handleRun}>
              RUN
            </Button>
          </section>
        </section>
      </main>
    </div>
  )
}

export default MetricsQueryPage
export { MetricsQueryPage }
