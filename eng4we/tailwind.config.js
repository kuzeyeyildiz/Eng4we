/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // if you're using React or JS in `src`
    "./index.html", // if your root HTML file is here
    "./*.{js,ts,jsx,tsx}", // catch top-level files like App.jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
