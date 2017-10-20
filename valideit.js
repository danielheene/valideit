'use strict'

const { exec } = require('child_process')
const findRoot = require('find-root')
const { satisfies } = require('semver')
const rootDir = findRoot(process.cwd())
const { engines } = require(rootDir + '/package.json')

function validate () {
  const validatedEngines = []
  const validationPromises = []
  const requiredEnginesObject = engines

  for (const requiredEngine in requiredEnginesObject) {
    if (requiredEnginesObject.hasOwnProperty(requiredEngine)) {
      const requiredVersion = requiredEnginesObject[requiredEngine]

      validationPromises.push(new Promise(
        function (resolve, reject) {
          exec(requiredEngine + ' --version', function (error, stdout, stderr) {
            const currentVersion = stdout.replace(/\n$/, '')
            if (error) {
              reject(error, stderr)
            } else {
              resolve(validateVersion(requiredEngine, currentVersion, requiredVersion))
            }
          })
        }
      ))
    }
  }

  function validateVersion (requiredEngine, currentVersion, requiredVersion) {
    validatedEngines.push({
      name: requiredEngine,
      currentVersion: currentVersion,
      requiredVersion: requiredVersion,
      satisfies: satisfies(currentVersion, requiredVersion)
    })
  }

  function printOutput (validatedEngines) {
    for (const key in validatedEngines) {
      if (validatedEngines.hasOwnProperty(key)) {
        const currentEngine = validatedEngines[key]
        const stringPrefix = (currentEngine.satisfies) ? '\x1b[34m' : '\x1b[31m'
        const stringSuffix = '\x1b[0m'

        process.stdout.write(`${stringPrefix}${currentEngine.name} ${(currentEngine.satisfies) ? 'matches' : 'doesn\'t match'} required version with ${currentEngine.currentVersion}. ${(!currentEngine.satisfies) ? 'Please upgrade to version ' + currentEngine.requiredVersion + '!' : ''} ${stringSuffix}\n`)
      }
    }
  }

  Promise.all(validationPromises).then(() => {
    printOutput(validatedEngines)
  })
}

exports.validate = validate
