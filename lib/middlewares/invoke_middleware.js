/**
 * @function invokeMiddleware
 */

'use strict'

const co = require('co')
const load = require('rfunc-client/load')

/** @lends invokeMiddleware */
function invokeMiddleware (config) {
  let { name, methods, before, after } = config

  return co.wrap(function * invokeMiddleware (ctx, next) {
    let module = Object.assign({}, methods, {
      $before: before,
      $after: after
    })
    let instance = yield load(module, {
      $$name: name,
      $$ctx: ctx
    })

    ctx.invoke = co.wrap(function * invoke (methodName, params = []) {
      let method = instance[ methodName ]
      if (!method) {
        throw new Error(`[rfunc] Method not found: ${methodName}`)
      }
      return instance[ methodName ](...params)
    })
    yield next()
  })
}

module.exports = invokeMiddleware
