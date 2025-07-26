/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#3B82F6", // Calming blue
        "blue-light": "#60A5FA", // Lighter blue
        "blue-lighter": "#93C5FD", // Even lighter blue
        "orange-accent": "#F97316", // Muted warm tone for CTAs
        "coral-accent": "#FF7F50", // Another option for accent
        "green-success": "#22C55E", // Green for success/completion
        "red-error": "#EF4444", // Red for errors
        "yellow-warning": "#FACC15", // Yellow for warnings
        "gray-bg": "#F9FAFB", // Very light gray for backgrounds
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Use Inter font
      },
    },
  },
  plugins: [],
};
