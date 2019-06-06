/* global describe, it */

'use strict'

const assert = require('assert')
const buildRuntimeConfig = require('./buildRuntimeConfig')
const defaultConfig = require('./_defaultConfig')

describe('buildRuntimeConfig()', () => {
  it(`no prameter should return false defaultConfig`, () => {
    const runtimeConfig = buildRuntimeConfig()
    assert.deepEqual(runtimeConfig, defaultConfig)
  })

  it(`empty object parameter should return defaultConfig`, () => {
    const userConfig = {}
    const runtimeConfig = buildRuntimeConfig(userConfig)
    assert.deepEqual(runtimeConfig, defaultConfig)
  })

  it(`an object should return merged object`, () => {
    const userConfig = { mocha: 'value' }
    defaultConfig.mocha = 'value'
    const runtimeConfig = buildRuntimeConfig(userConfig)
    assert.deepEqual(runtimeConfig, defaultConfig)
  })

  it(`userConfig should overwrite defaultConfig`, () => {
    const userConfig = { level: 'test' }
    const runtimeConfig = buildRuntimeConfig(userConfig)
    assert.equal(runtimeConfig.level, 'test')
  })
})
