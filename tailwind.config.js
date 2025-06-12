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
        primary: "#007A8C",
        secondary: "#B0D6DB",
        accent: "#ECECEC",
        neutral: "#3E3E3E",
        footer: "#002B31",
      },
    },
  },
  plugins: [],
};
