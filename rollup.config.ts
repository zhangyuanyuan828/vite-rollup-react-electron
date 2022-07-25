import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = ['.js', '.ts']

export const mainOptions = defineConfig({
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
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    terser({
      compress: true,
      format: {
        comments: false
      }
    })
  ],
  external: ['electron', 'electron-devtools-installer']
})

export const preloadOptions = defineConfig({
  input: 'src/preload/index.ts',
  output: [
    {
      file: 'dist/preload/index.js',
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
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    terser({
      compress: true,
      format: {
        comments: false
      }
    })
  ],
  external: ['electron']
})

export default defineConfig([mainOptions, preloadOptions])
