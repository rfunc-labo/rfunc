#!/usr/bin/env node

/**
 * Advanced usage of the server
 */
'use strict'

const rfunc = require('rfunc')
const http = require('http')

void async function () {
  const server = http.createServer()
  rfunc({
    'sign': {
      async signin (username, password) {
        const {state} = this // Access state property of koa
        console.log(state)
        /* ... */
      },
      async signout () { /* ... */ },
      // Callback before a method invoked
      async $before (methodName, params) {
        const {state} = this
        if (state.somethingIsWrong) {
          throw new Error('Something wrong!') // Throw error to reject invoking
        }
        state.hey = 'Say hey from before' // Set state value to share something with methods
        /* ... */
      },
      // Callback after a method invoked
      async $after (methodName, params, returns) {
        let {state} = this
        /* ... */
      },
      // Describe api specification
      $spec: {
        name: 'sign-api',
        version: '1.0.0',
        desc: 'Remote API for user sign procedures',
        methods: {
          signin: {
            desc: 'Signin in to the application',
            params: [
              {name: 'username', desc: 'Name of user to signin'},
              {name: 'password', desc: 'User password'}
            ],
            returns: {
              type: 'object'
            }
          },
          signout: {/* ... */}
        }
      }
    },
    // Koa middlewares
    $middlewares: [
      async function customMW (ctx, next) {
        // Called before handling
        /* ... */
        await next()
      }
    ],
    $jsonLimit: '4mb',
    $endpoints: {
      '/api/foo/:id': { // Pass object to handle each HTTP verbs
        'POST': (ctx) => {
          const {id} = ctx.params
          ctx.body = `This is foo with id: "${id}"`
        }
      },
    },
    $static: '/opt/www/public'
  }).applyTo(server) // Apply to existing http server
  server.listen(3000)
}().catch((err) => console.error(err))
