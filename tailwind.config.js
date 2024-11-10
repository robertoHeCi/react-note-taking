/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '#EBFAFE', // Example primary color
        secondary: '#FBBF24', // Example secondary color
        accent: '#F472B6', // Example accent color
        background: '#F9FAFB', // Example background color
        text: '#111827', // Example text color
        // Add more colors as needed
      },
      boxShadow: {
        'drop-shadow': 'filter drop-shadow(0 0 2em #646cffaa)',
      },
      backgroundColor: {
        'light': '#EBFAFE',
        'white': '#FFFFFF',
        'dark': '#000000',
      },
    },
  },
  plugins: [],
}