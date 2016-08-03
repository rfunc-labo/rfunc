/**
 * Api endpoint
 * @function api
 * @param {string} moduleName - Name of module
 * @param {object} methods - Method definitions
 * @param {Object} [options] - Optional settings
 * @returns {function[]} - Koa handlers
 */
'use strict'

const { AKoa } = require('akoa')
const co = require('co')
const { InvokeSchema } = require('rfunc-schemas')
const uuid = require('uuid')
const aschema = require('aschema')
const { spinalcase, camelcase } = require('stringcase')
const moduleSpec = require('./helper/module_spec')
const moduleNormalize = require('./helper/module_normalize')

const { RESERVED_METHODS } = require('../constants')
const invokeMiddleware = require('./middlewares/invoke_middleware')

/** @lends api */
function api (moduleName, module, options = {}) {
  module = moduleNormalize(module)

  let router = AKoa.newRouter()
  router.head('/', co.wrap(function * knock (ctx) {
    ctx.body = null
  }))
  let $moduleBefore = options.$before
  let $moduleAfter = options.$after
  let {
    $before,
    $after,
    $middlewares
  } = module
  let specId = uuid.v4()
  router.options('/', co.wrap(function * spec (ctx) {
    ctx.body = {
      data: {
        type: 'specs',
        id: specId,
        attributes: moduleSpec(module)
      }
    }
  }))
  let methodNames = Object.keys(module).filter((name) => !/^\$/.test(name))
  let methods = methodNames.reduce((methods, name) => Object.assign(methods, {
    [name]: module[ name ]
  }), {})

  router.use(invokeMiddleware({
    name: moduleName,
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
    let isReserved = !!~RESERVED_METHODS.split(',').indexOf(methodName)
    if (isReserved) {
      throw new Error(`[rfunc] Method name "${methodName}" is reserved and you cannot override it.`)
    }
    let isPrivate = /^_/.test(methodName)
    if (isPrivate) {
      // Do not expose private methods
      continue
    }
    let spinalUrl = `/${spinalcase(methodName)}`
    let camelUrl = `/${camelcase(methodName)}`

    router.head(spinalUrl, co.wrap(function * knock (ctx) {
      ctx.body = null
    }))

    router.post(spinalUrl, co.wrap(function * invoke (ctx) {
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

      // Make null to undefined so that default param works.
      params = [].concat(params || [])
        .map((param) => param === null ? undefined : param)

      let invocation = {
        module: moduleName,
        method: methodName,
        params
      }

      ctx.state = Object.assign(ctx.state, { invocation })

      let returns
      try {
        returns = yield ctx.invoke(methodName, params)
      } catch (err) {
        let { message, errors } = (err || {})
        ctx.status = 500
        ctx.body = {
          meta: {
            invocation
          },
          errors: errors || [ {
            title: message
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
    router.redirect(camelUrl, spinalUrl)
  }
  return [
    router.routes(),
    router.allowedMethods()
  ]
}

module.exports = api
