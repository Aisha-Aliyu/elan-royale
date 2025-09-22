/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F6F4",
        charcoal: "#0B0B0B",
        accentGold: "#C9A23E",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        ui: ["Inter", "sans-serif"],
      }
    }
  },
  plugins: []
}