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
      sourcemap: true
    }
  ],
  external: [
    'fs',
    'path',
    'lodash',
    'shelljs',
    'semver'
  ],
  plugins: [
    external(),
    typescript({
      lib: ['es5', 'es6', 'dom'],
      strict: true,
      target: 'es5'
    }),
    commonjs({
      extensions: ['.js', '.ts']
    }),
    cleanup({})
  ]
}
