import chalk from 'chalk';
import { execSync } from 'child_process';
import { Stats } from 'fs';
import { resolve } from 'path'
import * as semver from 'semver';
import * as findRoot from 'find-root';

const cmd = execSync('mysql --version').toString();
console.log(cmd.toString());

declare namespace Valideit {
  export type Engine = {
    name: string,
    currentVersion: string,
    requiredVersion: string,
    semver: semver.SemVer,
    satisfies: boolean,
  }

  export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

  export interface Config {
    failOnError: boolean,
    logLevel: LogLevel,
    path?: string,
  }
}

class Valideit {
  constructor(userConfiguration?: Valideit.Config) {

    this.loadInstanceConfiguration(userConfiguration);
  }

  config: Valideit.Config;
  engines: Valideit.Engine[];

  private getInstalledVersion() {

  }

  private printLog(message: string, level: Valideit.LogLevel): void {
    const isLogLevelDebug = this.config.logLevel === 'debug' && level === 'debug';
    const isLogLevelWarn = this.config.logLevel === 'debug' && level === 'debug';

    if (isLogLevelDebug) {
      process.stdout.write(`${chalk.green('[debug]')} ${message}\n`);
    }
  }

  private loadInstanceConfiguration(userConfiguration?: Valideit.Config): void {
    const failOnError = true;
    const logLevel = 'warn';
    const path = '';

    const defaultConfiguration = Object.freeze({
      failOnError,
      logLevel,
      path,
    });

    this.config = Object.assign({}, defaultConfiguration, userConfiguration)

    this.printLog('instance configuration loaded', 'debug');
  }

  private getEngineVersionOutput(engineName: string): string {
    return execSync(`${engineName} --version`).toString();
  }
}

new Valideit({
  failOnError: false,
  logLevel: 'debug' as Valideit.LogLevel,
  path: 'test.j/sjjss',
});


//
// console.log(SemVer.coerce('GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin18)'));
// console.log(SemVer.coerce('v8.16.0'));
// console.log(SemVer.coerce('mysql  Ver 8.0.15 for macos10.14 on x86_64 (MySQL Community Server - GPL)\n'));
// console.log(SemVer.coerce('1.16.0'));
// console.log(SemVer.coerce('rsync  version 2.6.9  protocol version 29\n'))
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
