/**
 * @function invokeMiddleware
 */

'use strict'

const co = require('co')

let intercept = (ctx, handlers) => co(function * () {
  for (let handler of [].concat(handlers || [])) {
    yield Promise.resolve(handler && handler.call(ctx, ctx.state))
  }
})

/** @lends invokeMiddleware */
function invokeMiddleware (config) {
  let { methods, before, after } = config
  return co.wrap(function * invokeMiddleware (ctx, next) {
    let module = new Proxy(ctx, {
      get (ctx, methodName) {
        let invokable = methods.hasOwnProperty(methodName)
        if (invokable) {
          return (...params) => {
            return ctx.invoke(methodName, params)
          }
        }
        return ctx[ methodName ]
      }
    })

    ctx.invoke = co.wrap(function * invoke (methodName, params) {
      let method = methods[ methodName ]
      if (!method) {
        throw new Error(`Method not found: ${methodName}`)
      }
      let returns
      yield intercept(ctx, before)

      returns = yield Promise.resolve(method.call(module, ...(params || [])))
      ctx.state = Object.assign(ctx.state, { returns })

      yield intercept(ctx, after)

      return returns
    })
    yield next()
  })
}

module.exports = invokeMiddleware
