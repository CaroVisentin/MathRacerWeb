/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",         
    "./src/**/*.{js,ts,jsx,tsx}" // todos tus componentes React
  ],
  theme: {
    extend: {
      colors: {
        cyanCustom: "#5df9f9",
        pinkCustom: "#f95ec8",
        tealCustom: "#00a0a0",
      },
      fontFamily: {
        jersey: ["Jersey 10", "sans serif"],
        audiowide: ["Audiowide", "sans serif"],
      },
     
    },
  },
  plugins: [],
};
