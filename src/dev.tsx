import React from 'react'
import ReactDOM from 'react-dom/client'
import CheckboxField from './components/CheckboxField'
import RadioField from './components/RadioField'
import SwitchField from './components/SwitchField'
import './dev.css'

function App() {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)

  const [radioValue, setRadioValue] = React.useState('option1')
  const [radioValue2, setRadioValue2] = React.useState('')

  const [switch1, setSwitch1] = React.useState(false)
  const [switch2, setSwitch2] = React.useState(true)
  const [switch3, setSwitch3] = React.useState(false)
  const [switch4, setSwitch4] = React.useState(true)

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

      <section className="component-section">
        <h2>Radio Field</h2>

        <div className="demo-group">
          <h3>Default State - Group 1</h3>
          <RadioField
            name="demo-group-1"
            label="Option 1"
            description="This is the first option"
            value="option1"
            selectedValue={radioValue}
            onChange={setRadioValue}
          />

          <RadioField
            name="demo-group-1"
            label="Option 2"
            description="This is the second option"
            value="option2"
            selectedValue={radioValue}
            onChange={setRadioValue}
          />

          <RadioField
            name="demo-group-1"
            label="Option 3"
            description="This is the third option"
            value="option3"
            selectedValue={radioValue}
            onChange={setRadioValue}
          />
        </div>

        <div className="demo-group">
          <h3>Disabled State - Group 2</h3>
          <RadioField
            name="demo-group-2"
            label="Disabled Unchecked"
            description="This radio is disabled"
            value="disabled1"
            selectedValue={radioValue2}
            disabled
            onChange={setRadioValue2}
          />

          <RadioField
            name="demo-group-2"
            label="Disabled Checked"
            description="This radio is disabled and selected"
            value="disabled2"
            selectedValue="disabled2"
            disabled
            onChange={setRadioValue2}
          />
        </div>

        <div className="demo-group">
          <h3>Without Description</h3>
          <RadioField
            name="demo-group-3"
            label="Simple radio option"
            value="simple"
            selectedValue="simple"
            onChange={() => {}}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Switch Field</h2>

        <div className="demo-group">
          <h3>Label on Right (Default)</h3>
          <SwitchField
            label="Enable notifications"
            description="Get notified about important updates"
            checked={switch1}
            onChange={setSwitch1}
            labelPosition="right"
          />

          <SwitchField
            label="Remember me"
            description="Stay logged in for 30 days"
            checked={switch2}
            onChange={setSwitch2}
            labelPosition="right"
          />
        </div>

        <div className="demo-group">
          <h3>Label on Left</h3>
          <SwitchField
            label="Dark mode"
            description="Use dark theme for better night viewing"
            checked={switch3}
            onChange={setSwitch3}
            labelPosition="left"
          />

          <SwitchField
            label="Auto-save"
            description="Automatically save your work"
            checked={switch4}
            onChange={setSwitch4}
            labelPosition="left"
          />
        </div>

        <div className="demo-group">
          <h3>Disabled State</h3>
          <SwitchField
            label="Disabled Off"
            description="This switch is disabled"
            checked={false}
            disabled
            onChange={() => {}}
            labelPosition="right"
          />

          <SwitchField
            label="Disabled On"
            description="This switch is disabled and checked"
            checked={true}
            disabled
            onChange={() => {}}
            labelPosition="left"
          />
        </div>

        <div className="demo-group">
          <h3>Without Description</h3>
          <SwitchField
            label="Simple switch"
            checked={false}
            onChange={() => {}}
          />

          <SwitchField
            checked={true}
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
