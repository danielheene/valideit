'use strict'

const shell = require('shelljs')
const semver = require('semver')

const fetchEngineVersion = (engine) => {
  if (engine === undefined || typeof engine !== 'string') return null

  const whichEngine = shell.which(engine)
  const engineExists = (whichEngine && whichEngine.stdout)

  if (engineExists) {
    const fetchedVersion = shell.exec(`${engine} --version`, {silent: true})
    const trimmedVersion = fetchedVersion.trim()

    return semver.clean(trimmedVersion)
  } else {
    return false
  }
}

module.exports = fetchEngineVersion
