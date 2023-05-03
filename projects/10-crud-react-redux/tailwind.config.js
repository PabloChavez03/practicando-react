/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Path to the tremor module
    "./node_modules/.vite/deps/@tremor_react.js",
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

