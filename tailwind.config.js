/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030712', // Deep slate/black
        primary: '#6366f1',    // Indigo
        secondary: '#a855f7',  // Purple
        accent: '#22d3ee',     // Cyan
      }
    },
  },
  plugins: [],
}
