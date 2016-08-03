/**
 * @function moduleSpec
 * @param {Object} module - Module config
 * @returns {Object}
 */
'use strict'

const moduleNormalize = require('./module_normalize')

/** @lends moduleSpec */
function moduleSpec (module) {
  let { $spec } = module
  let { methods } = $spec || {}
  module = moduleNormalize(module)
  return Object.assign({
    name: 'anonymous',
    version: 'unknown'
  }, $spec, {
    methods: Object.assign(
      {},
      Object.keys(module)
        .filter((name) => !/^[\$_]/.test(name))
        .reduce((methods, name) => Object.assign(methods, {
          [name]: {
            desc: `${name}`
          }
        }), {}),
      methods
    )
  })
}

module.exports = moduleSpec
