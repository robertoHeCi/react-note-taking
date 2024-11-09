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
    },
  },
  plugins: [],
}