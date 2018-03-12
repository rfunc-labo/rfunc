#!/usr/bin/env node

/**
 * This is an example to invoke rfunc server
 */
'use strict'

const rfunc = require('rfunc')

void async function () {
  // Setup server for remote call
  await  rfunc({
    // Define APIs
    'sign': {
      async signin (username, password) {
        /* ... */
        return {success: true}
      },
      async signout () {
        /* ... */
      }
    }
  }).listen(3000)
}().catch((err) => console.error(err))

