import React from 'react'
import ReactDOM from 'react-dom/client'
import CheckboxField from './components/CheckboxField'
import './dev.css'

function App() {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)

  return (
    <div className="app">
      <h1>UI Lego Components</h1>
      
      <section className="component-section">
        <h2>Checkbox Field</h2>
        
        <div className="demo-group">
          <h3>Default State</h3>
          <CheckboxField
            label="Unchecked Option"
            description="This is an unchecked checkbox"
            checked={checked1}
            onChange={setChecked1}
          />
          
          <CheckboxField
            label="Checked Option"
            description="This is a checked checkbox"
            checked={checked2}
            onChange={setChecked2}
          />
        </div>

        <div className="demo-group">
          <h3>Disabled State</h3>
          <CheckboxField
            label="Disabled Unchecked"
            description="This checkbox is disabled"
            checked={false}
            disabled
            onChange={() => {}}
          />
          
          <CheckboxField
            label="Disabled Checked"
            description="This checkbox is disabled and checked"
            checked={true}
            disabled
            onChange={() => {}}
          />
        </div>

        <div className="demo-group">
          <h3>Without Description</h3>
          <CheckboxField
            label="Simple checkbox"
            checked={false}
            onChange={() => {}}
          />
        </div>
      </section>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
