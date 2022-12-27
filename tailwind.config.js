/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        'sm-height': { raw: '(min-height: 550px)' },

        'md-height': { raw: '(min-height: 900px)' },

        'lg-height': { raw: '(min-height: 1200px)' },
      },
    },
  },
  plugins: [],
};
