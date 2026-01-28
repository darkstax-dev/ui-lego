/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue scale - using CSS variables for theme support
        'blue-dark-950': 'var(--color-blue-dark-950)',
        'blue-medium-950': 'var(--color-blue-medium-950)',
        'blue-950': 'var(--color-blue-950)',
        'blue-800': 'var(--color-blue-800)',
        'blue-700': 'var(--color-blue-700)',
        'blue-gray-600': 'var(--color-blue-gray-600)',
        'blue-gray-500': 'var(--color-blue-gray-500)',
        'blue-gray-400': 'var(--color-blue-gray-400)',

        // Gray scale
        'gray-500': 'var(--color-gray-500)',
        'gray-400': 'var(--color-gray-400)',
        'gray-300': 'var(--color-gray-300)',
        'gray-200': 'var(--color-gray-200)',
        'gray-100': 'var(--color-gray-100)',
        'gray-50': 'var(--color-gray-50)',

        // Red scale
        'red-700': 'var(--color-red-700)',
        'red-600': 'var(--color-red-600)',
        'red-500': 'var(--color-red-500)',
        'red-400': 'var(--color-red-400)',

        // Green scale
        'green-800': 'var(--color-green-800)',
        'green-600': 'var(--color-green-600)',
        'green-500': 'var(--color-green-500)',

        // Yellow scale
        'yellow-600': 'var(--color-yellow-600)',
        'yellow-500': 'var(--color-yellow-500)',

        // Semantic colors
        'surface-default': 'var(--surface-default)',
        'surface-card': 'var(--surface-card)',
        'text-primary': 'var(--text-blue-main)',
        'text-secondary': 'var(--text-gray-main)',
        'nav-bg': 'var(--nav-main-bg)',
        'nav-secondary': 'var(--nav-secondary-bg)',
        'divider': 'var(--divider-light)',
      },
      fontFamily: {
        'macan': ['Macan', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'macan-mono': ['Macan Mono Trial', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'macan-mono-stencil': ['Macan Mono Stencil Trial', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
