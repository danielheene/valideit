import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import external from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: false
    }
  ],
  external: [
    'child_process',
    'find-root',
    'fs',
    'path',
    'semver'
  ],
  plugins: [
    external(),
    typescript({
      lib: ['es5', 'es6'],
      strict: true,
      target: 'es5'
    }),
    commonjs({
      extensions: ['.js', '.ts']
    }),
    cleanup({})
  ]
}
