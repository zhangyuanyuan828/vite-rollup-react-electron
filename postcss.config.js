module.exports = {
  plugins: [
    require('postcss-each')({
      plugins: {
        beforeEach: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    })
  ]
}
