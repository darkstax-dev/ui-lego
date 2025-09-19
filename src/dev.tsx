import React from 'react'
import ReactDOM from 'react-dom/client'
import CheckboxField from './components/inputs/CheckboxField'
import RadioField from './components/inputs/RadioField'
import SwitchField from './components/inputs/SwitchField'
import RadioGroup from './components/inputs/RadioGroup'
import CheckboxGroup from './components/inputs/CheckboxGroup'
import SelectField from './components/inputs/SelectField'
import InputField from './components/inputs/InputField'
import TextareaField from './components/inputs/TextareaField'
import SearchField from './components/inputs/SearchField'
import SliderField from './components/inputs/SliderField'
import FileUpload from './components/inputs/FileUpload'
import LoginInput from './components/inputs/LoginInput'
import Icons from './components/icons/Icons'
import { Pagination } from './components/pagination'
import Snackbar from './components/snackbar/Snackbar'
import DropdownDemo from './components/dropdown/DropdownDemo'
import ModelingDemo from './components/modeling/ModelingDemo'
import ModalDemo from './components/modal/ModalDemo'
import NotificationDemo from './components/notifications/NotificationDemo'
import ButtonDemo from './components/buttons/ButtonDemo'
import TabsDemo from './components/tabs/TabsDemo'
import NavigationDemo from './components/navigation/NavigationDemo'
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

  // Group component states
  const [radioGroupValue, setRadioGroupValue] = React.useState('choice1')
  const [checkboxGroupValues, setCheckboxGroupValues] = React.useState(['feature1', 'feature3'])

  // Input component states
  const [selectValue, setSelectValue] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')
  const [textareaValue, setTextareaValue] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [sliderValue, setSliderValue] = React.useState<[number, number]>([25, 75])
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentPage2, setCurrentPage2] = React.useState(5)
  const [currentPage3, setCurrentPage3] = React.useState(1)

  // Login input states
  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')
  const [loginActive, setLoginActive] = React.useState('Active|')
  const [loginFilled, setLoginFilled] = React.useState('Filled')
  const [loginError, setLoginError] = React.useState('Mistake')

  return (
    <div className="app">
      <h1>Input Components</h1>

      <section className="component-section">
        <h2 style={{
          color: '#072B56',
          fontFamily: 'Macan Mono Stencil Trial, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: '32px',
          fontWeight: '500',
          lineHeight: '1.2',
          letterSpacing: '1.6px',
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Inputs for Login
        </h2>

        <div className="demo-group">
          <h3>Default State</h3>
          <LoginInput
            label="Label"
            value=""
            onChange={() => {}}
            placeholder="Default"
          />
        </div>

        <div className="demo-group">
          <h3>Active State</h3>
          <LoginInput
            label="Label"
            value={loginActive}
            onChange={setLoginActive}
          />
        </div>

        <div className="demo-group">
          <h3>Filled State</h3>
          <LoginInput
            label="Label"
            value={loginFilled}
            onChange={setLoginFilled}
          />
        </div>

        <div className="demo-group">
          <h3>Error State</h3>
          <LoginInput
            label="Label"
            value={loginError}
            onChange={setLoginError}
            error="Validation error"
            helperText="Helper text"
          />
        </div>

        <div className="demo-group">
          <h3>Disabled State</h3>
          <LoginInput
            label="Label"
            value=""
            onChange={() => {}}
            disabled
          />
        </div>

        <div className="demo-group">
          <h3>Login Form Example</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
            <LoginInput
              label="Email"
              value={loginEmail}
              onChange={setLoginEmail}
              type="email"
              placeholder="Enter your email"
            />
            <LoginInput
              label="Password"
              value={loginPassword}
              onChange={setLoginPassword}
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
      </section>

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

      <section className="component-section">
        <h2>Radio Group</h2>

        <div className="demo-group">
          <h3>Multiple Choice Selection</h3>
          <RadioGroup
            name="preferences"
            options={[
              {
                value: 'choice1',
                label: 'Email notifications',
                description: 'Receive updates via email'
              },
              {
                value: 'choice2',
                label: 'SMS notifications',
                description: 'Receive updates via text message'
              },
              {
                value: 'choice3',
                label: 'Push notifications',
                description: 'Receive updates in your browser'
              }
            ]}
            selectedValue={radioGroupValue}
            onChange={setRadioGroupValue}
          />
        </div>

        <div className="demo-group">
          <h3>With Disabled Options</h3>
          <RadioGroup
            name="subscription"
            options={[
              {
                value: 'free',
                label: 'Free Plan',
                description: 'Basic features included'
              },
              {
                value: 'pro',
                label: 'Pro Plan',
                description: 'Advanced features and priority support'
              },
              {
                value: 'enterprise',
                label: 'Enterprise Plan',
                description: 'Custom solutions for large teams',
                disabled: true
              }
            ]}
            selectedValue="free"
            onChange={() => {}}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Checkbox Group</h2>

        <div className="demo-group">
          <h3>Multiple Selection</h3>
          <CheckboxGroup
            options={[
              {
                value: 'feature1',
                label: 'Advanced Analytics',
                description: 'Detailed insights and reporting'
              },
              {
                value: 'feature2',
                label: 'Custom Branding',
                description: 'Personalize with your brand colors'
              },
              {
                value: 'feature3',
                label: 'API Access',
                description: 'Integrate with your existing tools'
              }
            ]}
            selectedValues={checkboxGroupValues}
            onChange={setCheckboxGroupValues}
          />
        </div>

        <div className="demo-group">
          <h3>With Disabled Options</h3>
          <CheckboxGroup
            options={[
              {
                value: 'basic1',
                label: 'Email Support',
                description: 'Get help via email'
              },
              {
                value: 'basic2',
                label: 'Phone Support',
                description: 'Talk to our support team',
                disabled: true
              },
              {
                value: 'basic3',
                label: 'Chat Support',
                description: 'Real-time assistance'
              }
            ]}
            selectedValues={['basic1']}
            onChange={() => {}}
          />
        </div>

        <div className="demo-group">
          <h3>Fixed Width (240px - Figma Design)</h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <RadioGroup
              name="design-demo"
              className="radio-group--fixed-width"
              options={[
                {
                  value: 'opt1',
                  label: 'Option 1',
                  description: 'First choice available'
                },
                {
                  value: 'opt2',
                  label: 'Option 2',
                  description: 'Second choice available'
                },
                {
                  value: 'opt3',
                  label: 'Option 3',
                  description: 'Third choice available'
                }
              ]}
              selectedValue="opt1"
              onChange={() => {}}
            />

            <CheckboxGroup
              className="checkbox-group--fixed-width"
              options={[
                {
                  value: 'item1',
                  label: 'Feature A',
                  description: 'Enable this feature'
                },
                {
                  value: 'item2',
                  label: 'Feature B',
                  description: 'Enable this feature'
                },
                {
                  value: 'item3',
                  label: 'Feature C',
                  description: 'Enable this feature'
                }
              ]}
              selectedValues={['item1', 'item2', 'item3']}
              onChange={() => {}}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Input Components</h2>

        <div className="demo-group">
          <h3>Select Field</h3>
          <SelectField
            label="Country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'au', label: 'Australia' }
            ]}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Choose a country"
          />

          <SelectField
            label="Priority"
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
            value="high"
            onChange={() => {}}
            error="Please select a valid priority level"
          />

          <SelectField
            label="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
            value="active"
            onChange={() => {}}
            success="Status updated successfully"
          />

          <SelectField
            label="Disabled Select"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
            value=""
            onChange={() => {}}
            disabled
            supportingText="This field is currently disabled"
          />
        </div>

        <div className="demo-group">
          <h3>Input Field</h3>
          <InputField
            label="Username"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter your username"
            supportingText="Choose a unique username"
          />

          <InputField
            label="Email"
            value="invalid-email"
            onChange={() => {}}
            placeholder="Enter your email"
            type="email"
            error="Please enter a valid email address"
          />

          <InputField
            label="Website"
            value="https://example.com"
            onChange={() => {}}
            placeholder="Enter website URL"
            type="url"
            success="URL format is valid"
          />

          <InputField
            label="Disabled Input"
            value="Cannot edit this"
            onChange={() => {}}
            disabled
            supportingText="This field cannot be modified"
          />
        </div>

        <div className="demo-group">
          <h3>Textarea Field</h3>
          <TextareaField
            label="Message"
            value={textareaValue}
            onChange={setTextareaValue}
            placeholder="Enter your message here..."
            supportingText="Maximum 500 characters"
            rows={4}
          />

          <TextareaField
            label="Comments"
            value="This field has an error"
            onChange={() => {}}
            error="Comment contains inappropriate content"
            rows={3}
          />

          <TextareaField
            label="Feedback"
            value="Thank you for your feedback!"
            onChange={() => {}}
            success="Feedback submitted successfully"
            rows={2}
          />

          <TextareaField
            label="Disabled Textarea"
            value="This content cannot be edited"
            onChange={() => {}}
            disabled
            rows={3}
          />
        </div>

        <div className="demo-group">
          <h3>Search Field</h3>
          <SearchField
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search products..."
          />

          <SearchField
            value="Filled search term"
            onChange={() => {}}
            placeholder="Search..."
          />

          <SearchField
            value=""
            onChange={() => {}}
            placeholder="Disabled search"
            disabled
          />
        </div>

        <div className="demo-group">
          <h3>Slider Field</h3>
          <SliderField
            label="Price Range"
            description="Select your preferred price range"
            value={sliderValue}
            onChange={setSliderValue}
            min={0}
            max={100}
            prefix="$"
          />

          <SliderField
            label="Disabled Range"
            description="This slider is disabled"
            value={[20, 80]}
            onChange={() => {}}
            min={0}
            max={100}
            prefix="$"
            disabled
          />
        </div>

        <div className="demo-group">
          <h3>File Upload</h3>
          <FileUpload
            onFileSelect={(files) => {
              if (files) {
                setUploadedFiles(Array.from(files))
              }
            }}
            accept="image/*,.pdf,.doc,.docx"
            multiple
            title="Upload Documents"
            description="Click to upload or drag and drop"
          />

          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <h4>Uploaded Files:</h4>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</li>
                ))}
              </ul>
            </div>
          )}

          <FileUpload
            onFileSelect={() => {}}
            title="Disabled Upload"
            description="File upload is disabled"
            disabled
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Pagination Components</h2>

        <div className="demo-group">
          <h3>Basic Pagination</h3>
          <p>Navigate through pages with previous/next buttons</p>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            Current page: {currentPage} of 10
          </p>
        </div>

        <div className="demo-group">
          <h3>Large Dataset Pagination</h3>
          <p>Pagination with gaps for large page counts (similar to Figma design)</p>
          <Pagination
            currentPage={currentPage2}
            totalPages={68}
            onPageChange={setCurrentPage2}
          />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            Current page: {currentPage2} of 68
          </p>
        </div>

        <div className="demo-group">
          <h3>Small Dataset Pagination</h3>
          <p>Pagination without gaps when few pages</p>
          <Pagination
            currentPage={currentPage3}
            totalPages={5}
            onPageChange={setCurrentPage3}
          />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            Current page: {currentPage3} of 5
          </p>
        </div>

        <div className="demo-group">
          <h3>Pagination Without Previous/Next</h3>
          <p>Page numbers only</p>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            showPrevNext={false}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Snackbar Components</h2>

        <div className="demo-group">
          <h3>Success Snackbar</h3>
          <Snackbar
            variant="success"
            title="Success message"
            message="The information in the table was successfully updated."
            onClose={() => console.log('Success snackbar closed')}
          />
        </div>

        <div className="demo-group">
          <h3>Error Snackbar</h3>
          <Snackbar
            variant="error"
            title="Error message"
            message="Update failed. Please refresh the page and try again."
            onClose={() => console.log('Error snackbar closed')}
          />
        </div>

        <div className="demo-group">
          <h3>Without Close Button</h3>
          <Snackbar
            variant="success"
            title="Auto-dismissing notification"
            message="This snackbar will auto-dismiss after a few seconds."
          />
        </div>

        <div className="demo-group">
          <h3>Custom Messages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Snackbar
              variant="success"
              title="Profile Updated"
              message="Your profile information has been saved successfully."
              onClose={() => console.log('Profile update closed')}
            />

            <Snackbar
              variant="error"
              title="Connection Failed"
              message="Unable to connect to the server. Check your internet connection and try again."
              onClose={() => console.log('Connection error closed')}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <NotificationDemo />
      </section>

      <section className="component-section">
        <h2>Dropdown Components</h2>
        <DropdownDemo />
      </section>

      <section className="component-section">
        <Icons />
      </section>

      <section className="component-section">
        <ModelingDemo />
      </section>

      <section className="component-section">
        <h1>Modal</h1>
        <h2>Interactive modal dialog for creating scenarios</h2>
        <ModalDemo />
      </section>

      <section className="component-section">
        <h1>Button Components</h1>
        <h2>Comprehensive button library with multiple variants and states</h2>
        <ButtonDemo />
      </section>

      <section className="component-section">
        <h1>Tab Components</h1>
        <h2>Interactive tab navigation with multiple states</h2>
        <TabsDemo />
      </section>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
