/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/resources/views/layout/*.{pug, html}"],
  theme: {
    extend: {
      colors: {
        "primary-grey": "F7F6F9",
        "dark-grey": "8A8B93",
        "light-purple": "EFE9FF",
        "strong-purple": "6324FE",
      },
    },
  },
  plugins: [],
};
