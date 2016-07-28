#!/usr/bin/env node

/**
 * This is an example to invoke rfunc server
 */
'use strict'

const rfunc = require('rfunc')
const co = require('co')

co(function * () {
  // Setup server for remote call
  yield rfunc({
    // Define APIs
    'sign': {
      signin (username, password) {
        return co(function * () { // Returns a promise
          /* ... */
          return { success: true }
        })
      },
      signout () {
        /* ... */
      }
    }
  }).listen(3000)
}).catch((err) => console.error(err))

