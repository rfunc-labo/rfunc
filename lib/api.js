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
  let { $spec } = methods
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
      ctx.state = Object.assign(ctx.state || {}, {
        module: spinalcase(moduleName),
        method: camelcase(methodName)
      })
      let returns = yield Promise.resolve(method.call(ctx, ...(params || [])))
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
