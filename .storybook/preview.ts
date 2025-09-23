import type { Preview } from '@storybook/react';

import '../src/tokens.css';
import '../src/dev.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true, // Shows table of contents
      description: {
        component: `## Framework Integration Guide

### React + Next.js + Tailwind CSS Setup

#### 1. Installation
\`\`\`bash
npm install ui-lego
# or
yarn add ui-lego
\`\`\`

#### 2. Import Components
\`\`\`tsx
import { Button, InputField, Modal } from 'ui-lego';
import 'ui-lego/dist/style.css'; // Import compiled CSS
\`\`\`

#### 3. Tailwind CSS Configuration
Add to your \`tailwind.config.js\`:
\`\`\`js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/ui-lego/dist/**/*.{js,ts,jsx,tsx}',
    // ... your other content paths
  ],
  // ... rest of config
}
\`\`\`

#### 4. Next.js Configuration
For Next.js 13+ with app directory:
\`\`\`tsx
// app/layout.tsx
import 'ui-lego/dist/style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

#### 5. Component Usage Examples

**Button with Next.js Link:**
\`\`\`tsx
import { Button } from 'ui-lego';
import Link from 'next/link';

export function MyComponent() {
  return (
    <Link href="/dashboard" passHref>
      <Button asChild>
        Go to Dashboard
      </Button>
    </Link>
  );
}
\`\`\`

**Form with InputField:**
\`\`\`tsx
'use client';
import { InputField, Button } from 'ui-lego';
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  return (
    <form className="space-y-4">
      <InputField
        label="Name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        placeholder="Enter your name"
      />
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        placeholder="Enter your email"
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
\`\`\`

#### 6. Tailwind CSS Customization
Override component styles using Tailwind utilities:
\`\`\`tsx
<Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
  Custom Styled Button
</Button>
\`\`\`

#### 7. Best Practices

- **Client Components**: Mark components using hooks/events as client components in Next.js
- **TypeScript**: All components include full TypeScript definitions
- **Accessibility**: Components follow WCAG guidelines with proper ARIA attributes
- **Performance**: Tree-shakeable imports supported
- **Styling**: CSS custom properties available for theme customization

#### 8. Common Patterns

**Modal with Form:**
\`\`\`tsx
'use client';
import { Modal, Button, InputField } from 'ui-lego';
import { useState } from 'react';

export function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Create Project
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Project"
        onConfirm={() => {
          // Handle project creation
          setIsOpen(false);
        }}
        confirmText="Create Project"
      >
        <InputField
          label="Project Name"
          value={projectName}
          onChange={setProjectName}
          placeholder="Enter project name"
        />
      </Modal>
    </>
  );
}
\`\`\`

Configure component descriptions in Meta`,
      },
      canvas: {
        sourceState: 'shown', // Show source code by default
      },
      source: {
        type: 'dynamic', // Show actual rendered source
        language: 'tsx',
      },
    },
  },
};

export default preview;
