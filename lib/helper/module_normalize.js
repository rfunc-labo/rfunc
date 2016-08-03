/**
 * @function moduleNormalize
 */
'use strict'

/** @lends moduleNormalize */
function moduleNormalize (module) {
  if (typeof module === 'function') {
    return Object.assign({}, module, { default: module })
  }
  return module
}

module.exports = moduleNormalize
