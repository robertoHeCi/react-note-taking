/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '#EBFAFE',
        secondary: '#FBBF24',
        accent: '#F472B6',
        background: '#F9FAFB',
        text: '#111827',
      },
      boxShadow: {
        'drop-shadow': 'filter drop-shadow(0 0 2em #646cffaa)',
      },
      filter: {
        'brightness-125': 'brightness(1.25)',
        'drop-shadow': 'drop-shadow(0 0 2em #646cffaa)',
      },
      backgroundColor: {
        'light': '#EBFAFE',
        'dark': '#000000',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out'
      }
    },
  },
  plugins: [],
}