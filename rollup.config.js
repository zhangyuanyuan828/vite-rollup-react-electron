const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const eslint = require('@rollup/plugin-eslint')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const rollup = require('rollup')
const pkg = require('./package.json')

const extensions = ['.ts', '.js']

module.exports = rollup.defineConfig({
  input: 'src/main/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    eslint(),
    nodeResolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      include: 'src/**/*',
      babelHelpers: 'runtime'
    })
  ],
  external: ['electron']
})
