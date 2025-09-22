import type { Meta } from '@storybook/react-vite';

// A simple, renderable component for the Introduction page
const WelcomeContent = () => (
  <div style={{ padding: 24, lineHeight: 1.6 }}>
    <h1>Welcome</h1>
    <p>
      This is the UI Lego component library. Use the sidebar to browse components and their
      stories. Each story demonstrates different states, variants, and usage patterns.
    </p>
    <p>
      If you are running Chromatic, this Introduction story exists to ensure a valid
      component is provided to Storybook and can be rendered without errors.
    </p>
  </div>
);

const meta = {
  title: 'Introduction',
  component: WelcomeContent,
} satisfies Meta<typeof WelcomeContent>;

export default meta;

export const Welcome = {
  render: () => <WelcomeContent />,
};
