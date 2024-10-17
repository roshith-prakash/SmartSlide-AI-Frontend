/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cta: "#791dcc",
        hovercta: "#7c0ea0"
      },
      backgroundImage: {
        wave: "url('./assets/bg.svg')"
      }
    },
  },
  plugins: [],
}