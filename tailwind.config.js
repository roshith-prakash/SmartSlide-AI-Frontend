/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkbg: "#181818",
        secondarydarkbg: "#1e1e1e",
        darkmodetext: "#E4E4E4",
        cta: "#9b0ced",
        hovercta: "#7123b0",
        darkmodeCTA: "#b458ff",
      },
      backgroundImage: {
        wave: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729152471/bg_zgv44p.svg')",
        wave2:
          "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729160362/wave_lnx7xt.svg')",
        word: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729232280/wordPattern_rxmhv6.png')",
        ppt: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1729232965/pptPattern1_kj2fho.png')",

        home: "url('https://res.cloudinary.com/do8rpl9l4/image/upload/v1724056003/homeWave_q0kg6s.webp')",
        animatedWave: "url('./assets/animatedWave.svg')",
        animatedWaveDark: "url('./assets/animatedWaveDark.svg')",
      },
    },
  },
  plugins: [],
};
