/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./*.html",

    "./pages/**/*.html",

    "./components/**/*.js"

  ],

  theme: {

    extend: {

      colors: {

        brand: {

          primary: '#1E45A1',

          secondary: '#666666'

        }

      }

    }

  },

  plugins: []

}