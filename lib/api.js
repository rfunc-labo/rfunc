/**
 * Api endpoint
 * @function api
 * @returns {function[]} - Koa handlers
 */
'use strict'

const KoaRouter = require('koa-router')
const co = require('co')
const { InvokeSchema } = require('./schemas')
const aschema = require('aschema')
const { spinalcase, camelcase } = require('stringcase')

/** @lends api */
function api (moduleName, methods) {
  let router = new KoaRouter()
  router.head('/', co.wrap(function * knock (ctx) {
    ctx.body = null
  }))
  let { $spec, $before, $after } = methods
  if ($spec) {
    router.options('/', co.wrap(function * spec (ctx) {
      ctx.body = $spec
    }))
  }
  for (let methodName of Object.keys(methods)) {
    let method = methods[ methodName ]
    router.head(`/${methodName}`, co.wrap(function * knock (ctx) {
      ctx.body = null
    }))

    router.post(`/${methodName}`, co.wrap(function * invoke (ctx) {
      ctx.state = ctx.state || {}
      let body = (ctx.request.body || {})
      let error = aschema(InvokeSchema).validate(body)
      if (error) {
        ctx.status = 400
        ctx.body = {
          errors: [].concat(error)
        }
        return
      }
      let { data } = body
      let { id, attributes } = (data || {})
      let { params } = (attributes || {})

      Object.assign(ctx.state, {
        module: spinalcase(moduleName),
        method: camelcase(methodName),
        params
      })

      if ($before) {
        yield Promise.resolve($before.call(ctx, ctx.state))
      }

      let returns = yield Promise.resolve(method.call(ctx, ...(params || [])))
      Object.assign(ctx.state, { returns })

      if ($after) {
        yield Promise.resolve($after.call(ctx, ctx.state))
      }

      ctx.body = {
        data: {
          type: 'results',
          attributes: {
            invokeId: id,
            returns
          }
        }
      }
    }))
  }
  return [
    router.routes(),
    router.allowedMethods()
  ]
}

module.exports = api
