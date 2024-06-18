const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        normalFont: ["NormalFont", "sans-serif"],
        cuteFont: ["CuteFont"],
      },
    },
  },
  plugins: [
    require("daisyui"),
    iconsPlugin({
      // https://icones.js.org/
      collections: getIconCollections(["ph", "simple-icons"]),
    }),
  ],
};
