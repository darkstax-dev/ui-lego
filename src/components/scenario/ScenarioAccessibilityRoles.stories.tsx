import type { Meta, StoryObj } from '@storybook/react'
import ScenarioAccessibilityRoles from './ScenarioAccessibilityRoles'
import type { AccessibilityRole } from './ScenarioAccessibilityRoles'

const meta: Meta<typeof ScenarioAccessibilityRoles> = {
  title: 'Components/Scenario/ScenarioAccessibilityRoles',
  component: ScenarioAccessibilityRoles,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal component for selecting accessibility roles in scenarios. Features a clean list of checkboxes with save and close functionality.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible'
    },
    title: {
      control: 'text',
      description: 'The title displayed at the top of the modal'
    },
    roles: {
      control: 'object',
      description: 'Array of accessibility roles to display'
    },
    onSave: {
      action: 'saved',
      description: 'Callback fired when save button is clicked'
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when close button is clicked'
    },
    onRolesChange: {
      action: 'roles-changed',
      description: 'Callback fired when role selection changes'
    }
  }
}

export default meta
type Story = StoryObj<typeof ScenarioAccessibilityRoles>

const defaultRoles: AccessibilityRole[] = [
  { id: 'blue', name: 'Blue', checked: false },
  { id: 'meet-role-test', name: 'MEET-ROLE-TEST', checked: false },
  { id: 'red', name: 'Red', checked: false },
  { id: 'test', name: 'TEST', checked: false },
  { id: 'test-role-1', name: 'TEST-ROLE-1', checked: false },
  { id: 'test-role-1-20250818-110459', name: 'TEST-ROLE-1_20250818_110459', checked: false },
  { id: 'test-role-1-20250818-110810', name: 'TEST-ROLE-1_20250818_110810', checked: false }
]

const selectedRoles: AccessibilityRole[] = [
  { id: 'blue', name: 'Blue', checked: true },
  { id: 'meet-role-test', name: 'MEET-ROLE-TEST', checked: false },
  { id: 'red', name: 'Red', checked: true },
  { id: 'test', name: 'TEST', checked: false },
  { id: 'test-role-1', name: 'TEST-ROLE-1', checked: true },
  { id: 'test-role-1-20250818-110459', name: 'TEST-ROLE-1_20250818_110459', checked: false },
  { id: 'test-role-1-20250818-110810', name: 'TEST-ROLE-1_20250818_110810', checked: false }
]

const minimalRoles: AccessibilityRole[] = [
  { id: 'admin', name: 'Admin', checked: false },
  { id: 'user', name: 'User', checked: false },
  { id: 'guest', name: 'Guest', checked: false }
]

export const Default: Story = {
  args: {
    isOpen: true,
    roles: defaultRoles,
    title: 'Scenario Accessibility Roles'
  }
}

export const WithSelectedRoles: Story = {
  args: {
    isOpen: true,
    roles: selectedRoles,
    title: 'Scenario Accessibility Roles'
  }
}

export const MinimalRoles: Story = {
  args: {
    isOpen: true,
    roles: minimalRoles,
    title: 'Select User Roles'
  }
}

export const CustomTitle: Story = {
  args: {
    isOpen: true,
    roles: defaultRoles,
    title: 'Configure Access Permissions'
  }
}

export const EmptyRoles: Story = {
  args: {
    isOpen: true,
    roles: [],
    title: 'No Roles Available'
  }
}

export const LongRoleNames: Story = {
  args: {
    isOpen: true,
    roles: [
      { id: 'role1', name: 'VERY-LONG-ROLE-NAME-THAT-MIGHT-WRAP-TO-MULTIPLE-LINES', checked: false },
      { id: 'role2', name: 'ANOTHER-EXTREMELY-LONG-ROLE-NAME-FOR-TESTING-PURPOSES', checked: true },
      { id: 'role3', name: 'SHORT', checked: false },
      { id: 'role4', name: 'MEDIUM-LENGTH-ROLE-NAME', checked: true }
    ],
    title: 'Roles with Long Names'
  }
}

export const ManyRoles: Story = {
  args: {
    isOpen: true,
    roles: Array.from({ length: 20 }, (_, i) => ({
      id: `role-${i}`,
      name: `ROLE-${i + 1}`,
      checked: i % 3 === 0
    })),
    title: 'Many Accessibility Roles'
  }
}

export const Interactive: Story = {
  args: {
    isOpen: true,
    roles: defaultRoles,
    title: 'Interactive Demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version where you can select roles and see the callbacks in the Actions panel.'
      }
    }
  }
}
