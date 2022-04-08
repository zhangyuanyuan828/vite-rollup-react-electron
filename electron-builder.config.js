const pkg = require('./package.json')

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: 'com.example.app',
  productName: 'AppName',
  copyright: 'Copyright © 2022 ${author}',
  asar: true,
  directories: {
    output: 'build'
  },
  files: [
    ...Object.keys(pkg.dependencies).map(dependency => `!**/node_modules/${dependency}/*`),
    'dist',
    'package.json',
  ]
}
