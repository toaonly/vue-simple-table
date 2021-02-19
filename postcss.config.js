const purgecss = require('@fullhuman/postcss-purgecss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    purgecss({
      content: ['**/*.vue'],
      css: ['**/*.scss']
    })
  ],
}
