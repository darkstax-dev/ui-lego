/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        topology: {
          host: '#0072ff',
          container: '#2eb969',
          pod: '#ed8b30',
          network: '#ff3b31',
          service: '#00112b',
        },
      },
    },
  },
  plugins: [],
}
