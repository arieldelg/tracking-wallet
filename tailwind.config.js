import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ultraWide: "1800px",
        xs: "450px",
        // "2xl": "1537px",
      },
      maxWidth: {
        1920: "1670px",
      },
      maxHeight: {
        890: "890px",
      },
      animation: {
        active: " 0.3s ease-out infinite",
        fadeIn: "fadeIn 1s linear 1",
        fadeInBillModal: "fadeIn 0.3s ease 1",
        translateImg: "translateX 0.5s linear 1 forwards",
        translateCard: "translateXCard 0.3s linear 1 forwards",
        translateDescDown: "translateYD 0.3s linear 1 forwards",
        translateDescDownButton: "translateYDButton 0.3s linear 1 forwards",
        translateDescUpButton: "translateYUButton 0.3s linear 1 forwards",
        translateDescUp: "translateYU 0.3s linear 1 forwards",
        rotate0_180: "rotate0_180 0.3s linear 1 forwards",
        rotate180_0: "rotate180_0 0.3s linear 1 forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        translateX: {
          "100%": { transform: "translateX(100%)" },
        },
        translateXCard: {
          "100%": { transform: "translateX(5%)" },
        },
        translateYD: {
          "100%": { transform: "translateY(60%)" },
        },
        translateYU: {
          "0%": { transform: "translateY(60%)" },
        },
        translateYDButton: {
          "100%": { transform: "translateY(98%)" },
        },
        translateYUButton: {
          "0%": { transform: "translateY(98%)" },
        },
        rotate0_180: {
          "100%": { transform: "rotate(180deg)" },
        },
        rotate180_0: {
          "0%": { transform: "rotate(180deg)" },
        },
      },
      width: {
        homeIncomeExpense: "304px",
      },
      backgroundColor: {
        customGreen: "#78C760",
        customRed: "#FB9F9F",
        customBGDark1: "#363A45",
        customBGDark2: "#282c34",
        customBlue: "#60AFC7",
      },
      ringColor: {
        customGreen: "#66FF37",
        customRed: "#FF3737",
      },
    },
  },
  plugins: [],
};
