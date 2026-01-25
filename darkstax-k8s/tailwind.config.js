/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue scale
        'blue-dark-950': '#00112b',
        'blue-medium-950': '#071f42',
        'blue-950': '#072b56',
        'blue-800': '#0451a4',
        'blue-700': '#0072ff',
        'blue-gray-600': '#868d97',
        'blue-gray-500': '#a3aab1',
        'blue-gray-400': '#b9b9b9',
        
        // Gray scale
        'gray-500': '#78797a',
        'gray-400': '#adadad',
        'gray-300': '#cecece',
        'gray-200': '#dfdfdf',
        'gray-100': '#ececec',
        'gray-50': '#F8F8F8',
        
        // Red scale
        'red-700': '#b6261f',
        'red-600': '#d9322a',
        'red-500': '#ff3b31',
        'red-400': '#ff6c64',
        
        // Green scale
        'green-800': '#108541',
        'green-600': '#23a45a',
        'green-500': '#2eb969',
        
        // Yellow scale
        'yellow-600': '#dd6a19',
        'yellow-500': '#ed8b30',
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
