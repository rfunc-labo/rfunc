#!/usr/bin/env node

/**
 * This is an example of rfunc client
 */
'use strict'

const rclient = require('rfunc/clinet')
const co = require('co')

co(function * () {
  let sign = yield rclient().connect('sign') // Define a client

  // Call remote api and receive the result
  let { success } = yield sign.signin('foo', 'bar1234')
  console.log('success:', success)

}).catch((err) => console.error(err))


