/* global describe, it */

'use strict'

const assert = require('assert')
const fetchEngineVersion = require('./fetchEngineVersion')
const nodeEnvVersion = '8.7.0'

describe('fetchEngineVersion()', () => {
  it(`no parameter should return null`, () => {
    const fetchedVersion = fetchEngineVersion()
    assert.equal(fetchedVersion, null)
  })

  it(`integer parameter should return null`, () => {
    const fetchedVersion = fetchEngineVersion(8)
    assert.equal(fetchedVersion, null)
  })

  it(`node paramter should return ${nodeEnvVersion}`, () => {
    const fetchedVersion = fetchEngineVersion('node')
    assert.equal(fetchedVersion, nodeEnvVersion)
  })

  it(`wrong paramter should return false`, () => {
    const fetchedVersion = fetchEngineVersion('asdfghjkl')
    assert.equal(fetchedVersion, false)
  })
})
