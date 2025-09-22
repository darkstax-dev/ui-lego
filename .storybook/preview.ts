import type { Preview } from '@storybook/react-vite';
import '../src/dev.css';

// Using a plain object for Storybook theme to avoid type import issues.
// This mirrors our design tokens where possible.
const theme: any = {
  base: 'light',
  brandTitle: 'UI Lego',
  brandUrl: 'https://',
  brandImage: undefined,
  // Map to design tokens (hardcoded equivalents)
  colorPrimary: '#D9322A', // --color-red-600 / --btn-primary-red-fill
  colorSecondary: '#00112B', // --color-blue-dark-950
  appBg: '#ECECEC', // --color-gray-100 (surface default fallback)
  appContentBg: '#DFDFDF', // --color-gray-200 (surface card)
  appBorderColor: '#C8C8C8', // --divider-light
  textColor: '#1E1E1E', // --sds-color-text-default-default
  textInverseColor: '#DFDFDF',
  barBg: '#00112B', // nav main bg
  barTextColor: '#DFDFDF',
  barSelectedColor: '#D9322A',
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    a11y: {
      context: '#storybook-root',
      manual: false,
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },
    docs: {
      toc: true,
      theme,
    },
    theme,
  },
};

export default preview;
