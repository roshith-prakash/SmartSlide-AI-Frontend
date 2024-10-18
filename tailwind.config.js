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
        wave: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729152471/bg_zgv44p.svg')",
        wave2: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729160362/wave_lnx7xt.svg')",
        word: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729232280/wordPattern_rxmhv6.png')",
        ppt: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729232965/pptPattern1_kj2fho.png')"
      }
    },
  },
  plugins: [],
}