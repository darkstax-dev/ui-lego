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
import { MainNavigation } from './components/navigation/MainNavigation'
import { TopBarDemo } from './components/bar'
import TagBadgeDemo from './components/tag-badges/TagBadgeDemo'
import MenuDemo from './components/menu/MenuDemo'
import TooltipDemo from './components/tooltip/TooltipDemo'
import { EffectsDemo } from './components/effects'
import AccordionDemo from './components/accordion/AccordionDemo'
import './dev.css'
import './tokens.css'

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
      <NavigationDemo />

      <section className="component-section component-section--white">
        <h1>Main Navigation Component</h1>
        <h2>Responsive navigation bar with menu items and user actions - Updated with Design Tokens</h2>

        <div className="section-block">
          <h3>Default State</h3>
          <p>Standard navigation with all menu items in default state</p>
          <MainNavigation variant="default" />
        </div>

        <div className="section-block">
          <h3>Modeling Active State (Variant 3)</h3>
          <p>Navigation with "Modeling" item in active state (red color, minus icon)</p>
          <MainNavigation variant="modeling-active" />
        </div>

        <div className="section-block">
          <h3>Hub Variant</h3>
          <p>Navigation showing hub-specific menu items: Dashboard, Administration, Settings</p>
          <MainNavigation variant="hub" />
        </div>

        <div className="feature-card">
          <h3 className="feature-card__title">Design Token Updates & New Features</h3>
          <ul className="feature-card__list">
            <li><strong>Typography:</strong> Now uses proper Macan Mono Trial font with token-based sizing</li>
            <li><strong>Colors:</strong> Updated to use semantic color tokens (--color-red-600, --color-gray-200, etc.)</li>
            <li><strong>Spacing:</strong> All gaps and padding use standardized spacing tokens</li>
            <li><strong>Hub Icon:</strong> Simplified diamond pattern matching Figma design</li>
            <li><strong>Responsive Design:</strong> Maintained with token-based breakpoints</li>
            <li><strong>Active States:</strong> Properly styled with red accent color for selected items</li>
            <li><strong>NEW - Dropdown Menus:</strong> Interactive dropdowns matching Figma design specs</li>
            <li><strong>NEW - Accessibility:</strong> Full keyboard navigation and ARIA support</li>
            <li><strong>NEW - Mobile Responsive:</strong> Adaptive dropdown positioning for all screen sizes</li>
          </ul>
        </div>

        <div className="compliance-card">
          <h3 className="compliance-card__title">🎯 Figma Design Compliance</h3>
          <p className="compliance-card__lead">
            Click the <strong>+</strong> icons next to menu items above to see the exact Figma behavior:
          </p>
          <ul className="compliance-card__list">
            <li><strong>Default state:</strong> All elements (icon, text, expand) are gray (#DFDFDF)</li>
            <li><strong>Open state:</strong> All elements turn red (#D9322A) with minus icon</li>
            <li><strong>Typography:</strong> Macan Mono Trial, 16px, 600 weight, 110% line height, 1.6px letter spacing, uppercase</li>
            <li><strong>Interactive:</strong> Plus icons transform to minus icons when dropdowns open</li>
          </ul>
          <p className="compliance-card__note">
            ✨ The implementation now matches the Figma "Menu item" component specification exactly,
            including the two variants: "Default" and "Open" states with precise color transitions.
          </p>
        </div>
      </section>

      <h1>Input Components</h1>

      <section className="component-section component-section--white">
        <h2 className="section-title-mono-stencil">
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
          <div className="form-vertical form-vertical--narrow">
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

      <section className="component-section component-section--white">
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

      <section className="component-section component-section--white">
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

      <section className="component-section component-section--white">
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

      <section className="component-section component-section--white">
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

      <section className="component-section component-section--white">
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
          <div className="example-row">
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

      <section className="component-section component-section--white">
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
            <div className="mt-300">
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

      <section className="component-section component-section--white">
        <h2>Pagination Components</h2>

        <div className="demo-group">
          <h3>Basic Pagination</h3>
          <p>Navigate through pages with previous/next buttons</p>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
          <p className="caption-text">
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
          <p className="caption-text">
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
          <p className="caption-text">
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

      <section className="component-section component-section--white">
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
          <div className="stack stack--400">
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

      <section className="component-section component-section--white">
        <h1>Tooltip Components</h1>
        <h2>Interactive tooltips with multiple placements and content options</h2>
        <TooltipDemo />
      </section>

      <section className="component-section component-section--white">
        <NotificationDemo />
      </section>

      <section className="component-section component-section--white">
        <h2>Dropdown Components</h2>
        <DropdownDemo />
      </section>

      <section className="component-section component-section--white">
        <Icons />
      </section>

      <section className="component-section component-section--white">
        <ModelingDemo />
      </section>

      <section className="component-section component-section--white">
        <h1>Modal</h1>
        <h2>Interactive modal dialog for creating scenarios</h2>
        <ModalDemo />
      </section>

      <section className="component-section component-section--white">
        <h1>Button Components</h1>
        <h2>Comprehensive button library with multiple variants and states</h2>
        <ButtonDemo />
      </section>

      <section className="component-section component-section--white">
        <h1>Tab Components</h1>
        <h2>Interactive tab navigation with multiple states</h2>
        <TabsDemo />
      </section>

      <section className="component-section">
        <h1>Tag & Badge Components</h1>
        <h2>Interactive tags, toggles, and status badges with multiple variants</h2>
        <TagBadgeDemo />
      </section>

      <section className="component-section">
        <h1>Menu Components</h1>
        <h2>Context menus and dropdown menu items with states and shortcuts</h2>
        <MenuDemo />
      </section>

      <section className="component-section">
        <h1>Accordion Components</h1>
        <h2>Collapsible content sections with expand/collapse functionality</h2>
        <AccordionDemo />
      </section>

      <section className="component-section">
        <h1>Effects</h1>
        <h2>Drop shadows, inner shadows, and blur effects showcase</h2>
        <EffectsDemo />
      </section>
    </div>
  )
}

import type { Root } from 'react-dom/client'

const container = document.getElementById('root')!
const ROOT_KEY = '__ui_lego_root__'
let root = (globalThis as any)[ROOT_KEY] as Root | undefined

if (!root) {
  root = ReactDOM.createRoot(container)
  ;(globalThis as any)[ROOT_KEY] = root
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Cleanup on HMR to avoid memory leaks and allow re-creation
// Vite provides import.meta.hot in dev
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta && import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.dispose(() => {
    const existing = (globalThis as any)[ROOT_KEY] as Root | undefined
    existing?.unmount()
    ;(globalThis as any)[ROOT_KEY] = undefined
  })
}
