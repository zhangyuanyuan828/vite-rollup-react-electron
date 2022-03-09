import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import pkg from './package.json'

const extensions = ['.ts', '.js']

export default defineConfig({
  input: 'src/main/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      include: 'src/**/*',
      babelHelpers: 'runtime'
    })
  ],
  external: ['electron', 'electron-devtools-installer']
})
