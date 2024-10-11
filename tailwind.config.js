/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ultraWide: "1800px",
        // "2xl": "1537px",
      },
      maxWidth: {
        1920: "1670px",
      },
      animation: {
        active: " 0.3s ease-out infinite",
        fadeIn: "fadeIn 1s linear 1",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      width: {
        homeIncomeExpense: "304px",
      },
      backgroundColor: {
        customGreen: "#78C760",
        customRed: "#FB9F9F",
        customBGDark1: "#363A45",
      },
      ringColor: {
        customGreen: "#66FF37",
        customRed: "#FF3737",
      },
    },
  },
  plugins: [],
};
