/**
 * Create a RFunc instance.
 * @function create
 * @returns {Object}
 */
'use strict'

const RFunc = require('./rfunc')

/** @lends create */
function create (...args) {
  return new RFunc(...args)
}

module.exports = create
