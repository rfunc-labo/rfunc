/**
 * Create an app
 * @function app
 * @param {Object} modules - API modules
 * @returns {Koa} - Koa app
 */
'use strict'

const { AKoa } = require('akoa')
const co = require('co')
const uuid = require('uuid')
const assert = require('assert')
const api = require('./api')
const { spinalcase } = require('stringcase')
const defaults = require('defaults')
const { exceptionMiddleware, bodyMiddleware } = require('akoa/middlewares')
const { DEFAULT_URL } = require('../constants')

/** @lends app */
function app (modules) {
  assert.ok(modules, 'modules is required')
  let koa = AKoa.newApp([])
  let router = AKoa.newRouter()
  modules = [].concat(modules || [])
  modules.forEach((modules) => {
    let { $pathname } = defaults(modules, {
      $pathname: DEFAULT_URL,
      $middlewares: [],
      $before: null,
      $after: null,
      $specs: {}
    })

    // Register build-in middlewares
    {
      let middlewares = [
        exceptionMiddleware(),
        bodyMiddleware()
      ]
      for (let middleware of middlewares) {
        router.use($pathname, middleware)
      }
    }

    // Register custom middlewares
    {
      let { $middlewares } = modules
      for (let middleware of $middlewares) {
        router.use($pathname, middleware)
      }
    }

    // Register api routes
    {
      let moduleNames = Object.keys(modules).filter((name) => !/^\$/.test(name))
      let { $before, $after } = modules
      let moduleRouter = AKoa.newRouter()
      moduleRouter.head('/', co.wrap(function * knock (ctx) {
        ctx.body = null
      }))
      let $specs = moduleNames.reduce(($specs, moduleName) => Object.assign(
        $specs, { [moduleName]: modules[ moduleName ].$spec }
      ), {})
      moduleRouter.options('/', co.wrap(function * specs (ctx) {
        let specId = uuid.v4()
        ctx.body = {
          data: {
            type: 'specs',
            id: specId,
            attributes: Object.assign($specs, modules.$specs)
          }
        }
      }))

      for (let moduleName of moduleNames) {
        let moduleApi = api(moduleName, modules[ moduleName ], {
          $before, $after
        })
        moduleRouter.use(`/${spinalcase(moduleName)}`, ...moduleApi)
      }
      router.use($pathname, moduleRouter.routes(), moduleRouter.allowedMethods())
    }
  })
  koa.use(router.routes())

  return koa
}

module.exports = app
