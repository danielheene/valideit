import { SemVer } from "semver";

const semver = require('semver');

type Engine = {
  name: string,
  currentVersion: string,
  requiredVersion: string,
  semver: SemVer,
  satisfies: boolean,
}

class Valideit {
  constructor(userConfig?: Object) {

  }

  engines: Engine[];

  private getInstalledVersion() {

  }
}
 // new Valideit();

console.log(semver.coerce('GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin18)'));
console.log(semver.coerce('v8.16.0'));
console.log(semver.coerce('mysql  Ver 8.0.15 for macos10.14 on x86_64 (MySQL Community Server - GPL)\n'));
console.log(semver.coerce('1.16.0'));
console.log(semver.coerce('rsync  version 2.6.9  protocol version 29\n'))
//
// function validate(userConfig) {
//   const buildRuntimeConfig = require('./lib/buildRuntimeConfig')
//   const fetchEngineVersion = require('./lib/fetchEngineVersion')
//   const loadEnginesFromFile = require('./lib/loadEnginesFromFile')
//
//   const config = buildRuntimeConfig(userConfig)
//   const validatedEngines = []
//   const validationPromises = []
//   let loadEnginesResponse
//
//   if (userConfig.hasOwnProperty('path') && typeof userConfig.path === 'string') {
//     loadEnginesResponse = loadEnginesFromFile(userConfig.path)
//   } else {
//     loadEnginesResponse = loadEnginesFromFile()
//   }
//
//   if (loadEnginesResponse.hasOwnProperty('status') && loadEnginesResponse.status === 'ok') {
//     const requiredEnginesObject = loadEnginesResponse.engines
//
//     for (const requiredEngine in requiredEnginesObject) {
//       if (requiredEnginesObject.hasOwnProperty(requiredEngine)) {
//         const requiredVersion = requiredEnginesObject[requiredEngine]
//
//         validationPromises.push(new Promise(
//           function (resolve, reject) {
//             const currentVersion = fetchEngineVersion(requiredEngine)
//
//             if (currentVersion && currentVersion !== null) {
//               resolve(validateVersion(requiredEngine, currentVersion, requiredVersion))
//             } else {
//               reject(new Error('no correct engine'))
//             }
//           }
//         ))
//       }
//     }
//   }
//
//   function validateVersion(requiredEngine, currentVersion, requiredVersion) {
//     validatedEngines.push({
//       name: requiredEngine,
//       currentVersion: currentVersion,
//       requiredVersion: requiredVersion,
//       satisfies: satisfies(currentVersion, requiredVersion)
//     })
//   }
//
//   function printOutput(validatedEngines) {
//     for (const key in validatedEngines) {
//       if (validatedEngines.hasOwnProperty(key)) {
//         const currentEngine = validatedEngines[key]
//         const stringPrefix = (currentEngine.satisfies) ? '\x1b[34m' : '\x1b[31m'
//         const stringSuffix = '\x1b[0m'
//
//         process.stdout.write(`${stringPrefix}${currentEngine.name} ${(currentEngine.satisfies) ? 'matches' : 'doesn\'t match'} required version with ${currentEngine.currentVersion}. ${(!currentEngine.satisfies) ? 'Please change to version ' + currentEngine.requiredVersion + '!' : ''} ${stringSuffix}\n`)
//       }
//     }
//   }
//
//   Promise.all(validationPromises).then(() => {
//     printOutput(validatedEngines)
//
//     const hasInvalid = _.filter(validatedEngines, {satisfies: false})
//     const exitCode = (hasInvalid.length !== 0 && config.level !== 'warn') ? 1 : 0
//     process.exit(exitCode)
//   }).catch((error) => {
//     process.stdout.write(`${error.name}: ${error.message}\n`)
//   })
// }
//
// exports.validate = validate
