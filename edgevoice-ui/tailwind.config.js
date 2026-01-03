/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'edgevoice-bg': '#3a0027',
        'edgevoice-accent': '#ff0080',
        'edgevoice-panel': '#1a0020',
      },
    },
  },
  plugins: [],
};
