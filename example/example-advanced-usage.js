#!/usr/bin/env node

/**
 * Advanced usage of the server
 */
'use strict'

const rfunc = require('rfunc')
const co = require('co')
const http = require('http')

co(function * () {
  let server = http.createServer()
  rfunc(
    {
      'sign': {
        signin (username, password) { /* ... */ },
        signout () { /* ... */ },
        // Describe api specification
        $spec: {
          name: 'sign-api',
          version: '1.0.0',
          desc: 'Remote API for user sign procedures',
          methods: {
            signin: {
              desc: 'Signin in to the application',
              params: [
                { name: 'username', desc: 'Name of user to signin' },
                { name: 'password', desc: 'User password' }
              ],
              returns: {
                type: 'object'
              }
            },
            signout: { /* ... */ }
          }
        }
      }
    },
    // Optional settings
    {
      // Koa middlewares
      middlewares: [
        co.wrap(function * customMW (ctx, next) {
          // Called before handling
          /* ... */
          yield next()
        })
      ]
    }
  ).applyTo(server) // Apply to existing http server
  server.listen(3000)
}).catch((err) => console.error(err))
