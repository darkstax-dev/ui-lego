import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import MonacoEditor, { MonacoEditorProps } from './MonacoEditor';
import './MonacoEditor.stories.css';

// Top-level spies (record compact payloads only)
const onChangeAction = fn();
const onMountAction = fn();
const onValidateAction = fn();

const meta: Meta<typeof MonacoEditor> = {
  title: 'Components/MonacoEditor',
  component: MonacoEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful code editor component based on Monaco Editor (the same engine that powers VS Code). Supports syntax highlighting, IntelliSense, themes, and extensive customization options.',
      },
    },
  },
  // Use wrappers to call spies with compact data only
  args: {
    onChange: (value?: string) => onChangeAction({ valueLength: (value || '').length }),
    onMount: () => onMountAction({ mounted: true }),
    onValidate: (markers: unknown[]) => onValidateAction({ count: Array.isArray(markers) ? markers.length : 0 }),
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Editor theme that matches your design system',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    language: {
      control: 'select',
      options: [
        'javascript', 'typescript', 'json', 'html', 'css', 'scss', 'less',
        'python', 'java', 'csharp', 'cpp', 'c', 'go', 'rust', 'php',
        'ruby', 'swift', 'kotlin', 'dart', 'scala', 'sql', 'xml',
        'yaml', 'markdown', 'plaintext'
      ],
      description: 'Programming language for syntax highlighting',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'javascript' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the editor',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '400' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the editor is read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Whether to show line numbers',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showMinimap: {
      control: 'boolean',
      description: 'Whether to show the minimap',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fontSize: {
      control: 'number',
      description: 'Font size in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '14' },
      },
    },
    tabSize: {
      control: 'number',
      description: 'Number of spaces per tab',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    wordWrap: {
      control: 'select',
      options: ['off', 'on', 'wordWrapColumn', 'bounded'],
      description: 'Word wrapping behavior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'on' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MonacoEditor>;

const sampleCode = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55`,

  typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(userData: Partial<User>): User {
  return {
    id: Math.random(),
    name: userData.name || 'Anonymous',
    email: userData.email || 'user@example.com',
    ...userData
  };
}

const user = createUser({ name: 'John Doe' });
console.log(user);`,

  json: `{
  "name": "ui-lego",
  "version": "1.1.0",
  "description": "A React component library",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "storybook": "storybook dev -p 6006"
  }
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Lego Components</title>
</head>
<body>
  <h1>Welcome to UI Lego</h1>
  <p>A comprehensive React component library.</p>
</body>
</html>`,

  css: `/* CSS Example */
.monaco-editor {
  border: 1px solid var(--sds-color-border-default-default);
  border-radius: var(--sds-size-radius-200, 0px);
  background: var(--surface-default);
}

.monaco-editor:focus-within {
  outline: 2px solid rgba(0, 114, 255, 0.2);
}`,
};

export const Default: Story = {
  args: {
    value: sampleCode.javascript,
    language: 'javascript',
    theme: 'light',
    height: 400,
  },
};

export const TypeScript: Story = {
  args: {
    value: sampleCode.typescript,
    language: 'typescript',
    theme: 'light',
    height: 400,
  },
};

export const JSON: Story = {
  args: {
    value: sampleCode.json,
    language: 'json',
    theme: 'light',
    height: 300,
  },
};

export const HTML: Story = {
  args: {
    value: sampleCode.html,
    language: 'html',
    theme: 'light',
    height: 300,
  },
};

export const CSS: Story = {
  args: {
    value: sampleCode.css,
    language: 'css',
    theme: 'light',
    height: 300,
  },
};

export const DarkTheme: Story = {
  args: {
    value: sampleCode.javascript,
    language: 'javascript',
    theme: 'dark',
    height: 400,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ReadOnly: Story = {
  args: {
    value: sampleCode.javascript,
    language: 'javascript',
    theme: 'light',
    readOnly: true,
    height: 400,
  },
};

export const NoLineNumbers: Story = {
  args: {
    value: sampleCode.javascript,
    language: 'javascript',
    theme: 'light',
    showLineNumbers: false,
    height: 400,
  },
};

export const NoMinimap: Story = {
  args: {
    value: sampleCode.javascript,
    language: 'javascript',
    theme: 'light',
    showMinimap: false,
    height: 400,
  },
};

export const Compact: Story = {
  args: {
    value: sampleCode.javascript,
    language: 'javascript',
    theme: 'light',
    height: 200,
    fontSize: 12,
    showMinimap: false,
  },
};

const InteractiveTemplate = (args: MonacoEditorProps) => {
  const [code, setCode] = useState(sampleCode.javascript);
  const [language, setLanguage] = useState<MonacoEditorProps['language']>('javascript');

  return (
    <div className="monaco-story-root">
      <div className="monaco-story-controls">
        <label className="monaco-story-label">
          Language:
          <select
            className="monaco-story-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as MonacoEditorProps['language'])}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </label>
        <button
          className="monaco-story-button"
          onClick={() => setCode(sampleCode[language as keyof typeof sampleCode] || sampleCode.javascript)}
        >
          Load Sample
        </button>
      </div>
      <MonacoEditor
        {...args}
        value={code}
        language={language}
        onChange={(value) => setCode(value || '')}
      />
      <div className="monaco-story-metadata">
        <strong>Character count:</strong> {code.length}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveTemplate,
  args: {
    theme: 'light',
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive editor with language switching and character count. Try editing the code!',
      },
    },
  },
};
