/**
 * Api endpoint
 * @function api
 * @param {string} moduleName - Name of module
 * @param {object} methods - Method definitions
 * @param {Object} [options] - Optional settings
 * @returns {function[]} - Koa handlers
 */
'use strict'

const KoaRouter = require('koa-router')
const co = require('co')
const { InvokeSchema } = require('rfunc-schemas')
const uuid = require('uuid')
const aschema = require('aschema')
const { spinalcase, camelcase } = require('stringcase')

const reservedMethods = [ 'then', 'inspect', 'toJSON' ]
const invokeMiddleware = require('./middlewares/invoke_middleware')

/** @lends api */
function api (moduleName, module, options = {}) {
  let router = new KoaRouter()
  router.head('/', co.wrap(function * knock (ctx) {
    ctx.body = null
  }))
  let $moduleBefore = options.$before
  let $moduleAfter = options.$after
  let { $spec, $before, $after, $middlewares } = module
  let specId = uuid.v4()
  router.options('/', co.wrap(function * spec (ctx) {
    ctx.body = {
      data: {
        type: 'specs',
        id: specId,
        attributes: $spec
      }
    }
  }))
  let methodNames = Object.keys(module).filter((name) => !/^\$/.test(name))
  let methods = methodNames.reduce((methods, name) => Object.assign(methods, {
    [name]: module[ name ]
  }), {})

  router.use(invokeMiddleware({
    methods,
    before: [
      $moduleBefore,
      $before
    ],
    after: [
      $after,
      $moduleAfter
    ]
  }))

  for (let middleware of $middlewares || []) {
    router.use(middleware)
  }

  for (let methodName of methodNames) {
    let isReserved = !!~reservedMethods.indexOf(methodName)
    if (isReserved) {
      throw new Error(`[rfunc] Method name "${methodName}" is reserved and you cannot override it.`)
    }
    router.head(`/${spinalcase(methodName)}`, co.wrap(function * knock (ctx) {
      ctx.body = null
    }))

    router.post(`/${spinalcase(methodName)}`, co.wrap(function * invoke (ctx) {
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

      let invocation = {
        module: spinalcase(moduleName),
        method: camelcase(methodName),
        params
      }
      ctx.state = Object.assign(ctx.state, invocation)

      let returns
      try {
        returns = yield ctx.invoke(methodName, params)
      } catch (err) {
        ctx.status = 400
        ctx.body = {
          meta: {
            invocation
          },
          errors: [ {
            title: err.message
          } ]
        }
        return
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
