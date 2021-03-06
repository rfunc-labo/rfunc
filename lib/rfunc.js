
'use strict'

const app = require('./app')
const { AKoa } = require('akoa')

/**
 * @class RFunc
 * @param {Object} modules - Modules configuration
 * @param {Object} [options] - Optional settings
 */
class RFunc extends AKoa {
  constructor (modules, options = {}) {
    const { middleware } = app(modules)
    super(middleware, options)
  }
}

Object.assign(RFunc, {})

module.exports = RFunc

