'use strict'

const _ = require('lodash')

const buildRuntimeConfig = (userConfig) => {
  const defaultConfig = require('./_defaultConfig')

  if (typeof userConfig !== 'object') {
    return defaultConfig
  }

  return _.merge(defaultConfig, userConfig)
}

module.exports = buildRuntimeConfig
