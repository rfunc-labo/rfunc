/**
 * @function invokeMiddleware
 */

'use strict'

const load = require('rfunc-client/load')

/** @lends invokeMiddleware */
function invokeMiddleware (config) {
  const {name, methods, before, after} = config

  return async function invokeMiddleware (ctx, next) {
    const module = Object.assign({}, methods, {
      $before: before,
      $after: after
    })
    const instance = await load(module, {
      $$name: name,
      $$ctx: ctx
    })

    ctx.invoke = async function invoke (methodName, params = []) {
      let method = instance[methodName]
      if (!method) {
        throw new Error(`[rfunc] Method not found: ${methodName}`)
      }
      return instance[methodName](...params)
    }
    await next()
  }
}

module.exports = invokeMiddleware
