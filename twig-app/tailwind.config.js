/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.twig", "./public/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
