'use strict'

const loadEnginesFromFile = (file) => {
  const returnObject = {}
  let engines

  if (file && typeof file === 'string') {
    // load custom file
    if (checkIfFileExists(file) && checkIfFileIsRequireable(file)) {
      engines = loadEnginesPropertyFromFile(file)
    } else {
      createInvalidReturnObject('can\'t load file. wrong path or file extension.')
    }
  } else {
    // fallback to local package.json
    const rootPackageFile = getRootPackageFile()
    if (checkIfFileExists(rootPackageFile)) {
      engines = loadEnginesPropertyFromFile(rootPackageFile)
    } else {
      createInvalidReturnObject('can\'t load package.json from project root.')
    }
  }

  if (engines) createValidReturnObject(engines)
  return returnObject

  function checkIfFileExists (file) {
    const fs = require('fs')
    return fs.existsSync(file)
  }

  function checkIfFileIsRequireable (file) {
    const path = require('path')
    const fileExtension = path.extname(file)
    const validExtensions = ['.js', '.json']

    return validExtensions.includes(fileExtension)
  }

  function createInvalidReturnObject (message) {
    returnObject.status = 'error'
    returnObject.message = message
  }

  function createValidReturnObject (engines) {
    returnObject.status = 'ok'
    returnObject.engines = engines
  }

  function getRootPackageFile () {
    const findRoot = require('find-root')
    const workingDirectory = process.cwd()
    const rootDirectory = findRoot(workingDirectory)

    return rootDirectory + '/package.json'
  }

  function loadEnginesPropertyFromFile (file) {
    const fileContent = require(file)

    if (!fileContent.hasOwnProperty('engines')) {
      createInvalidReturnObject('file has no engines property.')
      return false
    }

    return fileContent.engines
  }
}

module.exports = loadEnginesFromFile
