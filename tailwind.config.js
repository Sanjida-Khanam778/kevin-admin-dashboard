/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "serif"],
        outfit: ["Outfit", "serif"],
      },
      colors: {
        primary: "#3A4646",
        secondary: "#B0D6DB",
        sidebar: "#F0F0F0",
        neutral: "#263133",
        background: "#F9F9FA",
        outline: "#c9c9c9",
        dark: "#222A2C"
      },
    },
  },
  plugins: [],
};
