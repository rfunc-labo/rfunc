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
  let { before, after } = config
  return co.wrap(function * invokeMiddleware (ctx, next) {
    ctx.invoke = co.wrap(function * invoke (method, params) {
      let returns

      yield intercept(ctx, before)

      returns = yield Promise.resolve(method.call(ctx, ...(params || [])))
      ctx.state = Object.assign(ctx.state, { returns })

      yield intercept(ctx, after)

      return returns
    })
    yield next()
  })
}

module.exports = invokeMiddleware
