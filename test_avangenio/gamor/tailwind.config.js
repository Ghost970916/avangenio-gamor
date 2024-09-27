/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#ff7849',
          600: '#e66a41',
        },
        purple: {
          600: '#7e22ce',
          700: '#6b21a8',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}