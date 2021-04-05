const { colors: defaultColors } = require('tailwindcss/defaultTheme');
const colors = require("tailwindcss/colors")

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultColors,
      ...colors,
      ...{
        background: "#FFFFFF",
        primary: "#1C63CE",
        accent: "#09B94F",
        secondary: "#213A61",
        secondaryLight: "#637897",
        lightBlue: "#F2F8FA"
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      display: ['Inter', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
