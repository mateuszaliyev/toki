const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    colors: {
      ...colors,
      gray: {
        100: "#e2fcfc",
        300: "#cee5e5",
        400: "#aabebe",
        600: "#555f5f",
        800: "#2b2f2f",
        900: "#0e1010",
      },
    },
    extend: {
      animation: {
        "fade-in": "fade-in 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      fontFamily: {
        sans: ["var(--font-supreme)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    zIndex: {
      header: "5",
      "list-item": "1",
      "select-button": "4",
      "select-button-inactive": "2",
      "select-options": "3",
    },
  },
};

module.exports = tailwindCssConfig;
