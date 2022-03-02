import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/main/index.ts',
  output: [
    {
      file: 'dist/main/index.js',
      format: 'esm'
    }
  ]
})
