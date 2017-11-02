/* global describe, it */

'use strict'

const assert = require('assert')
const path = require('path')
const writeJson = require('write-json')
const rimraf = require('rimraf')
const loadEnginesFromFile = require('./loadEnginesFromFile')

describe('loadEnginesFromFile()', () => {
  it(`error should return error object`, () => {
    const loadedEngines = loadEnginesFromFile('forceError')

    assert.equal(typeof loadedEngines, 'object')
    assert.equal(loadedEngines.hasOwnProperty('status'), true)
    assert.equal(typeof loadedEngines.status, 'string')
    assert.equal(loadedEngines.hasOwnProperty('message'), true)
    assert.equal(typeof loadedEngines.message, 'string')
  })

  it(`whithout parameter should load local package file`, () => {
    const loadedEngines = loadEnginesFromFile().engines
    const packageEngines = require('../package.json').engines

    assert.deepEqual(loadedEngines, packageEngines)
  })

  it(`invalid file extension should return an error`, () => {
    const loadedEngines = loadEnginesFromFile('package.rar')

    assert.equal(loadedEngines.status, 'error')
    assert.equal(loadedEngines.message, 'can\'t load file. wrong path or file extension.')
  })

  it(`unresolveable file should return an error`, () => {
    const loadedEngines = loadEnginesFromFile('./wrongpath/package.json')

    assert.equal(loadedEngines.status, 'error')
    assert.equal(loadedEngines.message, 'can\'t load file. wrong path or file extension.')
  })

  it(`file without engine property should return an error`, () => {
    const mockContent = {}
    const mockFile = path.join(__dirname, '/../.tmp/package.json')

    writeJson(mockFile, mockContent, () => {
      const loadedEngines = loadEnginesFromFile(mockFile)

      assert.equal(loadedEngines.status, 'error')
      assert.equal(loadedEngines.message, 'file has no engines property.')

      rimraf.sync(path.dirname(mockFile))
    })
  })
})
