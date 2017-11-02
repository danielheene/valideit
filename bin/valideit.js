#!/usr/bin/env node

'use strict'

const valideit = require('../valideit')
const { name, description, version, homepage } = require('../package.json')

const argv = require('yargs')
  .usage(`\n${name} ${version}\n${description}`)
  .options({
    'path': {
      alias: 'p',
      describe: 'Path to a *.json or *.js file with an engines node',
      nargs: 1,
      requiresArg: true,
      type: 'string'
    },
    'warn': {
      alias: 'w',
      describe: 'Only write CLI warnings and exit without throwing an error',
      type: 'boolean'
    }
  })
  .epilogue(`For more informations, have a look at:\n${homepage}`)
  .version()
  .alias('version', 'v')
  .help()
  .alias('help', 'h')
  .strict()
  .argv

const userConfig = {}
if (argv.warn) userConfig.level = 'warn'
if (argv.path) userConfig.path = argv.path

valideit.validate(userConfig)
