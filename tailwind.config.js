/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/resources/views/layout/*.{pug, html}",
    "./src/resources/views/customer/*.{pug, html}",
    "./src/resources/views/shipper/*.{pug, html}",
    "./src/resources/views/menu/*.{pug, html}",
    "./src/resources/views/order/*.{pug, html}",
    "./src/resources/views/*.{pug, html}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-grey": "#F7F6F9",
        "dark-grey": "#8A8B95",
        "primary-dark": "#575663",
        "light-purple": "#EFE9FF",
        "strong-purple": "#6324FE",
      },
    },
  },
  plugins: [],
};
