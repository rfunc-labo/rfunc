/**
 * Define an api
 * @function api
 * @param {string} moduleName - Name of module
 * @param {object} methods - Method definitions
 * @param {Object} [options] - Optional settings
 * @returns {function[]} - Koa handlers
 */
'use strict'

const {AKoa} = require('akoa')
const uuid = require('uuid')
const {spinalcase, camelcase} = require('stringcase')
const moduleSpec = require('./helper/module_spec')
const moduleNormalize = require('./helper/module_normalize')

const {RESERVED_METHODS} = require('../constants')
const invokeMiddleware = require('./middlewares/invoke_middleware')

const endpoint = require('./endpoint')

/** @lends api */
function api (moduleName, module, options = {}) {
  module = moduleNormalize(module)

  const router = AKoa.newRouter()
  router.head('/', async function knock (ctx) {
    ctx.body = null
  })
  const $moduleBefore = options.$before
  const $moduleAfter = options.$after
  const {
    $before,
    $after,
    $middlewares
  } = module
  const specId = uuid.v4()
  router.options('/', async function spec (ctx) {
    ctx.body = {
      data: {
        type: 'specs',
        id: specId,
        attributes: moduleSpec(module)
      }
    }
  })
  const methodNames = Object.keys(module).filter((name) => !/^\$/.test(name))
  const methods = methodNames.reduce((methods, name) => Object.assign(methods, {
    [name]: module[name]
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

  for (const middleware of $middlewares || []) {
    router.use(middleware)
  }

  for (const methodName of methodNames) {
    const isReserved = !!~RESERVED_METHODS.split(',').indexOf(methodName)
    if (isReserved) {
      throw new Error(`[rfunc] Method name "${methodName}" is reserved and you cannot override it.`)
    }
    const isPrivate = /^_/.test(methodName)
    if (isPrivate) {
      // Do not expose private methods
      continue
    }
    const spinalUrl = `/${spinalcase(methodName)}`
    const camelUrl = `/${camelcase(methodName)}`

    const {knock, invoke} = endpoint(moduleName, methodName)

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
