import React, { useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import SelectField from '../components/inputs/SelectField'
import '../tokens.css'
import './DarkstaxDashboard.css'

const DarkstaxDashboard: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState('k8s-dev')
  const [selectedScenarioStatus, setSelectedScenarioStatus] = useState('running')

  // Mock data for the chart
  const chartData = [
    {
      id: "usage",
      color: "hsl(22, 70%, 50%)",
      data: [
        { x: "0", y: 45 },
        { x: "5", y: 78 },
        { x: "10", y: 56 },
        { x: "15", y: 89 },
        { x: "20", y: 65 },
        { x: "25", y: 72 },
        { x: "30", y: 50 },
        { x: "35", y: 85 },
        { x: "40", y: 60 },
        { x: "45", y: 75 },
        { x: "50", y: 55 },
        { x: "55", y: 20 },
      ]
    }
  ]

  return (
    <div className="darkstax-dashboard">
      {/* Main Navigation */}
      <nav className="main-navigation">
        <div className="nav-content">
          <div className="nav-left">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/5d0155b05c24ecc87886e45f209b42d1795a48fa?width=240" 
              alt="DARKSTAX Logo" 
              className="logo"
            />
            <div className="menu-items">
              <button className="menu-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.8333 17.5V9.16667H17.5V17.5H10.8333ZM2.5 10.8333V2.5H9.16667V10.8333H2.5ZM7.5 9.16667V4.16667H4.16667V9.16667H7.5ZM2.5 17.5V12.5H9.16667V17.5H2.5ZM4.16667 15.8333H7.5V14.1667H4.16667V15.8333ZM12.5 15.8333H15.8333V10.8333H12.5V15.8333ZM10.8333 2.5H17.5V7.5H10.8333V2.5ZM12.5 4.16667V5.83333H15.8333V4.16667H12.5Z" fill="currentColor"/>
                </svg>
                <span>Dashboard</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16699 9.16602V4.16602H10.8337V9.16602H15.8337V10.8327H10.8337V15.8327H9.16699V10.8327H4.16699V9.16602H9.16699Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="menu-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14.167 2.50065H17.5003C17.7213 2.50065 17.9333 2.58845 18.0896 2.74473C18.2459 2.90101 18.3337 3.11297 18.3337 3.33398V16.6673C18.3337 16.8883 18.2459 17.1003 18.0896 17.2566C17.9333 17.4129 17.7213 17.5007 17.5003 17.5007H2.50033C2.27931 17.5007 2.06735 17.4129 1.91107 17.2566C1.75479 17.1003 1.66699 16.8883 1.66699 16.6673V3.33398C1.66699 3.11297 1.75479 2.90101 1.91107 2.74473C2.06735 2.58845 2.27931 2.50065 2.50033 2.50065H5.83366V0.833984H7.50033V2.50065H12.5003V0.833984H14.167V2.50065ZM12.5003 4.16732H7.50033V5.83398H5.83366V4.16732H3.33366V7.50065H16.667V4.16732H14.167V5.83398H12.5003V4.16732ZM16.667 9.16732H3.33366V15.834H16.667V9.16732Z" fill="currentColor"/>
                </svg>
                <span>events</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16699 9.16602V4.16602H10.8337V9.16602H15.8337V10.8327H10.8337V15.8327H9.16699V10.8327H4.16699V9.16602H9.16699Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="menu-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.7218 2.50061L18.6602 16.2506C18.7333 16.3773 18.7718 16.521 18.7718 16.6673C18.7718 16.8136 18.7333 16.9573 18.6602 17.0839C18.587 17.2106 18.4818 17.3158 18.3552 17.389C18.2285 17.4621 18.0848 17.5006 17.9385 17.5006H2.06183C1.91555 17.5006 1.77185 17.4621 1.64517 17.389C1.51849 17.3158 1.41329 17.2106 1.34016 17.0839C1.26702 16.9573 1.22851 16.8136 1.22852 16.6673C1.22852 16.521 1.26702 16.3773 1.34016 16.2506L9.27849 2.50061C9.35164 2.37394 9.45683 2.26875 9.58351 2.19562C9.71019 2.12249 9.85389 2.08398 10.0002 2.08398C10.1464 2.08398 10.2901 2.12249 10.4168 2.19562C10.5435 2.26875 10.6487 2.37394 10.7218 2.50061ZM3.50516 15.8339H16.4952L10.0002 4.58395L3.50516 15.8339ZM9.16683 13.3339H10.8335V15.0006H9.16683V13.3339ZM9.16683 7.50061H10.8335V11.6673H9.16683V7.50061Z" fill="currentColor"/>
                </svg>
                <span>Alerts</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16699 9.16602V4.16602H10.8337V9.16602H15.8337V10.8327H10.8337V15.8327H9.16699V10.8327H4.16699V9.16602H9.16699Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="nav-right">
            <div className="server-indicator">
              <div className="diamond-grid">
                {Array.from({ length: 81 }).map((_, i) => (
                  <div key={i} className={`diamond ${i % 3 === 1 ? 'small' : 'large'}`} />
                ))}
              </div>
              <span>Cognitive server</span>
            </div>
            <div className="divider-vertical" />
            <div className="nav-actions">
              <button className="icon-button" aria-label="Toggle dark mode">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10 7C9.9998 8.39064 10.4138 9.74983 11.1892 10.9042C11.9646 12.0586 13.0663 12.9559 14.3538 13.4816C15.6412 14.0073 17.0561 14.1376 18.4179 13.8559C19.7797 13.5742 21.0268 12.8933 22 11.9V12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2H12.1C11.434 2.65113 10.9051 3.42896 10.5445 4.28768C10.1838 5.1464 9.99869 6.06862 10 7ZM4 12C3.99927 13.785 4.59553 15.5189 5.69389 16.926C6.79226 18.333 8.32963 19.3323 10.0614 19.7648C11.7932 20.1974 13.6199 20.0383 15.2508 19.313C16.8818 18.5876 18.2233 17.3377 19.062 15.762C17.5694 16.1136 16.0118 16.0781 14.5368 15.6587C13.0619 15.2394 11.7185 14.4501 10.6342 13.3658C9.54992 12.2815 8.76065 10.9381 8.34128 9.46318C7.92192 7.98821 7.88636 6.43056 8.238 4.938C6.95758 5.62014 5.88678 6.63766 5.14026 7.88164C4.39373 9.12562 3.99958 10.5492 4 12Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="icon-button" aria-label="Security">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10.0006H20C20.2652 10.0006 20.5196 10.1059 20.7071 10.2935C20.8946 10.481 21 10.7354 21 11.0006V21.0006C21 21.2658 20.8946 21.5201 20.7071 21.7077C20.5196 21.8952 20.2652 22.0006 20 22.0006H4C3.73478 22.0006 3.48043 21.8952 3.29289 21.7077C3.10536 21.5201 3 21.2658 3 21.0006V11.0006C3 10.7354 3.10536 10.481 3.29289 10.2935C3.48043 10.1059 3.73478 10.0006 4 10.0006H5V9.00058C4.99943 7.42328 5.53158 5.89202 6.51019 4.65501C7.4888 3.418 8.8565 2.54776 10.3916 2.18534C11.9267 1.82292 13.5392 1.98958 14.9677 2.65829C16.3963 3.327 17.5571 4.45857 18.262 5.86958L16.473 6.76358C15.9695 5.7556 15.1403 4.94723 14.1198 4.46953C13.0994 3.99183 11.9475 3.8728 10.8509 4.13176C9.7543 4.39071 8.77733 5.01245 8.07836 5.89619C7.37939 6.77992 6.9994 7.87384 7 9.00058V10.0006ZM5 12.0006V20.0006H19V12.0006H5ZM10 15.0006H14V17.0006H10V15.0006Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="icon-button" aria-label="Settings">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.653V16.347L12 20.689L19.5 16.347V7.653L12 3.311ZM12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="icon-button" aria-label="Notifications">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 17H22V19H2V17H4V10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10V17ZM18 17V10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10V17H18ZM9 21H15V23H9V21Z" fill="currentColor"/>
                </svg>
              </button>
              <div className="avatar">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/7a8fb04b5ca54e9884a707f0e07948962690b52b?width=80" alt="User avatar" />
                <div className="avatar-indicator" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="secondary-navigation">
        <h1 className="page-title">Darkstax Dashboard</h1>
        <div className="secondary-nav-actions">
          <label className="toggle-field">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider" />
            <span className="toggle-label">Only locked records</span>
          </label>
          <div className="search-field">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12.0208 11.0787L14.8762 13.9333L13.9328 14.8767L11.0782 12.0213C10.016 12.8728 8.69483 13.3359 7.3335 13.334C4.0215 13.334 1.3335 10.646 1.3335 7.33398C1.3335 4.02198 4.0215 1.33398 7.3335 1.33398C10.6455 1.33398 13.3335 4.02198 13.3335 7.33398C13.3354 8.69532 12.8723 10.0165 12.0208 11.0787ZM10.6835 10.584C11.5296 9.71391 12.0021 8.5476 12.0002 7.33398C12.0002 4.75532 9.9115 2.66732 7.3335 2.66732C4.75483 2.66732 2.66683 4.75532 2.66683 7.33398C2.66683 9.91198 4.75483 12.0007 7.3335 12.0007C8.54712 12.0026 9.71342 11.5301 10.5835 10.684L10.6835 10.584Z" fill="currentColor"/>
            </svg>
            <input type="text" placeholder="Search" />
          </div>
          <button className="refresh-button" aria-label="Refresh">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.55234 3.69352C6.06447 2.38324 7.99899 1.66323 9.99984 1.66602C14.6023 1.66602 18.3332 5.39686 18.3332 9.99936C18.3332 11.7794 17.7748 13.4294 16.8248 14.7827L14.1665 9.99936H16.6665C16.6666 8.69238 16.2825 7.41419 15.5621 6.32374C14.8416 5.23328 13.8164 4.37866 12.6142 3.86613C11.4119 3.3536 10.0854 3.20578 8.7998 3.44104C7.51417 3.6763 6.32605 4.28427 5.38317 5.18936L4.55234 3.69352ZM15.4473 16.3052C13.9352 17.6155 12.0007 18.3355 9.99984 18.3327C5.39734 18.3327 1.6665 14.6019 1.6665 9.99936C1.6665 8.21936 2.22484 6.56936 3.17484 5.21602L5.83317 9.99936H3.33317C3.33306 11.3063 3.71713 12.5845 4.43762 13.675C5.1581 14.7654 6.18323 15.6201 7.38552 16.1326C8.58782 16.6451 9.91424 16.7929 11.1999 16.5577C12.4855 16.3224 13.6736 15.7144 14.6165 14.8094L15.4473 16.3052Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="divider-horizontal" />

      {/* Stats Cards Grid - New Layout */}
      <div className="stats-grid">
        
        {/* Row 1, Col 1: Cloud Clusters */}
        <div className="stat-card stat-card-primary cloud-clusters-card">
          <div className="stat-header">Cloud Clusters</div>
          <div className="cloud-cluster-content">
            <div className="cluster-item">
              <div className="cluster-label">
                <span className="status-dot status-dot-success"></span>
                <span className="cluster-name">Kubernetes</span>
              </div>
              <div className="cluster-subtext success">K8s-Development</div>
            </div>
            <div className="cluster-item">
              <div className="cluster-label">
                <span className="status-dot status-dot-error"></span>
                <span className="cluster-name">Azure</span>
              </div>
              <div className="cluster-subtext error">Azure-Development</div>
            </div>
          </div>
        </div>

        {/* Row 1, Col 2: Activity Models Info */}
        <div className="stat-card stat-card-primary activity-models-card">
          <div className="stat-header">Activity Models Info</div>
          <div className="activity-stats">
            <div className="activity-stat">
              <span className="activity-label activity-finished">Finished</span>
              <span className="activity-value">22</span>
            </div>
            <div className="activity-stat">
              <span className="activity-label activity-error">Error</span>
              <span className="activity-value">8</span>
            </div>
            <div className="activity-stat">
              <span className="activity-label activity-running">Running</span>
              <span className="activity-value">12</span>
            </div>
            <div className="activity-stat">
              <span className="activity-label activity-pending">Pending</span>
              <span className="activity-value">12</span>
            </div>
          </div>
        </div>

        {/* Row 1, Col 3: Deployment Info */}
        <div className="stat-card stat-card-primary scenario-deployment-card">
          <div className="stat-header">Deployment Info: Deployed</div>
          <div className="deployment-info-content">
            <div className="deployment-value">2</div>
            <div className="deployment-trend">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 18.002L18.29 15.712L13.41 10.832L9.41 14.832L2 7.41195L3.41 6.00195L9.41 12.002L13.41 8.00195L19.71 14.292L22 12.002V18.002H16Z" fill="#FF3B31"/>
              </svg>
              <span className="deployment-percentage">-7%</span>
            </div>
          </div>
        </div>

        {/* Row 2, Col 1: Scenarios Deployed */}
        <div className="stat-card stat-card-primary scenarios-deployed-card">
          <div className="card-top-bar">
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div className="stat-header">Scenarios Deployed</div>
               <div style={{ width: 140 }}>
                  <SelectField
                    options={[
                      { value: 'running', label: 'Running' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'failed', label: 'Failed' }
                    ]}
                    value={selectedScenarioStatus}
                    onChange={setSelectedScenarioStatus}
                  />
               </div>
             </div>
             <div className={`count-badge status-${selectedScenarioStatus}`}>7</div>
          </div>
          <div className="scenario-list-scroll">
            <div className={`scenario-item status-${selectedScenarioStatus}`}>traffic-light-uat</div>
            <div className={`scenario-item status-${selectedScenarioStatus}`}>open5gs-test</div>
            <div className={`scenario-item status-${selectedScenarioStatus}`}>rtest</div>
            <div className={`scenario-item status-${selectedScenarioStatus}`}>all-test-dev</div>
            <div className={`scenario-item status-${selectedScenarioStatus}`}>traffic-light-uat</div>
            <div className={`scenario-item status-${selectedScenarioStatus}`}>open5gs-test</div>
            <div className={`scenario-item status-${selectedScenarioStatus}`}>rtest</div>
          </div>
        </div>

        {/* Row 2, Col 2 & 3: Cluster Metrics */}
        <div className="stat-card stat-card-primary cluster-metrics-card">
          <div className="card-top-bar">
            <div className="stat-header">Cluster Metrics</div>
            <div style={{ width: 200 }}>
              <SelectField
                options={[
                  { value: 'k8s-dev', label: 'K8s dev Development' },
                  { value: 'azure-dev', label: 'Azure Development' }
                ]}
                value={selectedCluster}
                onChange={setSelectedCluster}
              />
            </div>
          </div>
          <div className="cluster-metrics-scroll-content">
            <div className="chart-container">
              <ResponsiveLine
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                  }}
                  axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                  }}
                  pointSize={4}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  theme={{
                    axis: {
                      ticks: {
                        text: { fill: '#DFDFDF' }
                      }
                    },
                    grid: {
                      line: { stroke: '#444' }
                    }
                  }}
                  colors={['#ED8B30']}
              />
            </div>
            {/* Duplicate chart to demonstrate scrolling */}
            <div className="chart-container">
              <ResponsiveLine
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                  }}
                  axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                  }}
                  pointSize={4}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  theme={{
                    axis: {
                      ticks: {
                        text: { fill: '#DFDFDF' }
                      }
                    },
                    grid: {
                      line: { stroke: '#444' }
                    }
                  }}
                  colors={['#23A45A']}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DarkstaxDashboard
