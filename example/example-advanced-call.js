#!/usr/bin/env node

/**
 * This is an example of rfunc client
 */
'use strict'

const rclient = require('rfunc/clinet')
const co = require('co')

co(function * () {
  let sign = yield rclient().connect('sign') 

  // Fetch the spec data
  let $spec = yield sign.describe()
  /* ... */
}).catch((err) => console.error(err))


