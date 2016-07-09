/**
 * Schema definitions
 * @module schemas
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get InvokeSchema () { return d(require('./invoke_schema')) }
}
