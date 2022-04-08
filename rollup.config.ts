import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { defineConfig } from 'rollup'
import pkg from './package.json'

const extensions = ['.js', '.ts']

export default defineConfig({
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
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  external: ['electron']
})
