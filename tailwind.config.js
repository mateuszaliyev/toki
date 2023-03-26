const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("pink", ".pink &");
    }),
  ],
  theme: {
    colors: {
      ...colors,
      gray: {
        100: "rgb(var(--color-gray-100) / <alpha-value>)",
        300: "rgb(var(--color-gray-300) / <alpha-value>)",
        400: "rgb(var(--color-gray-400) / <alpha-value>)",
        600: "rgb(var(--color-gray-600) / <alpha-value>)",
        800: "rgb(var(--color-gray-800) / <alpha-value>)",
        900: "rgb(var(--color-gray-900) / <alpha-value>)",
      },
    },
    extend: {
      animation: {
        "fade-in": "fade-in 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      fontFamily: {
        sans: ["var(--font-supreme)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-bio-rhyme)", ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      spacing: {
        header: "8rem",
      },
    },
    zIndex: {
      header: "5",
      "list-item": "1",
      navigation: "6",
      "select-button": "4",
      "select-button-inactive": "2",
      "select-options": "3",
    },
  },
};

module.exports = tailwindCssConfig;
