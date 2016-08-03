/**
 * Define an api
 * @function api
 * @param {string} moduleName - Name of module
 * @param {object} methods - Method definitions
 * @param {Object} [options] - Optional settings
 * @returns {function[]} - Koa handlers
 */
'use strict'

const { AKoa } = require('akoa')
const co = require('co')
const uuid = require('uuid')

const { spinalcase, camelcase } = require('stringcase')
const moduleSpec = require('./helper/module_spec')
const moduleNormalize = require('./helper/module_normalize')

const { RESERVED_METHODS } = require('../constants')
const invokeMiddleware = require('./middlewares/invoke_middleware')

const endpoint = require('./endpoint')

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

    let { knock, invoke } = endpoint(moduleName, methodName)

    router.head(spinalUrl, knock)
    router.get(spinalUrl, invoke)
    router.post(spinalUrl, invoke)
    router.redirect(camelUrl, spinalUrl)
  }
  return [
    router.routes(),
    router.allowedMethods()
  ]
}

module.exports = api
