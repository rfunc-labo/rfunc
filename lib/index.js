/**
 * Remote function call with async interface
 */

'use strict'

const create = require('./create')
const RFunc = require('./rfunc')

let lib = create.bind(this)

Object.assign(lib, create, {
  create,
  RFunc
})

module.exports = lib
