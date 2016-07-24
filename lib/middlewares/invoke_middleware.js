/**
 * @function invokeMiddleware
 */

'use strict'

const co = require('co')
const stringify = require('json-stringify-safe')

let intercept = (instance, handlers, ...args) => co(function * () {
  for (let handler of [].concat(handlers || [])) {
    yield Promise.resolve(handler && handler.call(instance, ...args))
  }
})

/** @lends invokeMiddleware */
function invokeMiddleware (config) {
  let { name, methods, before, after } = config
  let module = Object.assign({}, methods)
  return co.wrap(function * invokeMiddleware (ctx, next) {
    let instance = new Proxy({ name, ctx }, {
      get (scope, name) {
        if (name in module) {
          return module[ name ]
        }
        if (name in scope) {
          return scope
        }
        return ctx[ name ]
      }
    })
    ctx.invoke = co.wrap(function * invoke (methodName, params) {
      let method = methods[ methodName ]
      if (!method) {
        throw new Error(`Method not found: ${methodName}`)
      }
      let returns
      yield intercept(instance, before, methodName, params)

      returns = yield Promise.resolve(method.call(instance, ...(params || [])))
      // Resolve circular
      if (returns && typeof returns === 'object') {
        returns = JSON.parse(stringify(returns))
      }

      yield intercept(instance, after, methodName, params, returns)

      return returns
    })
    yield next()
  })
}

module.exports = invokeMiddleware
