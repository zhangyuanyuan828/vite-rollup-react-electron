const pkg = require('./package.json')

module.exports = {
  appId: 'com.example.demo',
  asar: true,
  productName: 'electron demo',
  directories: {
    output: 'build'
  },
  files: [
    ...Object.keys(pkg.dependencies).map(dependency => `!**/node_modules/${dependency}/*`),
    'dist',
    'package.json',
  ]
}
