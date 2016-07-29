/**
 * @class RFunc
 * @param {Object} modules - Modules configuration
 * @param {Object} [options] - Optional settings
 */
'use strict'

const app = require('./app')
const { AKoa } = require('akoa')

/** @lends RFunc */
class RFunc extends AKoa {
  constructor (modules, options = {}) {
    let { middleware } = app(modules)
    super(middleware, options)
  }
}

Object.assign(RFunc, {})

module.exports = RFunc

