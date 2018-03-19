/**
 * Create an app
 * @function app
 * @param {Object} modules - API modules
 * @returns {Koa} - Koa app
 */
'use strict'

const range = require('koa-range')
const {AKoa} = require('akoa')
const uuid = require('uuid')
const assert = require('assert')
const api = require('./api')
const {spinalcase} = require('stringcase')
const moduleSpec = require('./helper/module_spec')
const {exceptionMiddleware, bodyMiddleware, staticMiddleware} = require('akoa/middlewares')
const routeMiddleware = require('./middlewares/route_middleware')
const {DEFAULT_URL} = require('../constants')

/** @lends app */
function app (modules) {
  assert.ok(modules, 'modules is required')
  const koa = AKoa.newApp([range])
  const router = AKoa.newRouter()
  modules = [].concat(modules || [])
  modules.forEach((modules) => {
    const {
      $pathname = DEFAULT_URL,
      $jsonLimit = '4mb',
      $endpoints = {},
      $static = 'public'
    } = modules

    // Register build-in middlewares
    {
      const middlewares = [
        staticMiddleware($static),
        exceptionMiddleware(),
        bodyMiddleware({
          jsonLimit: $jsonLimit
        }),
      ]
      for (const middleware of middlewares) {
        for (const m of [].concat(middleware)) {
          koa.use(m)
        }
      }
    }

    // Register custom middlewares
    {
      const {$middlewares = []} = modules
      for (const middleware of $middlewares) {
        router.use($pathname, middleware)
      }
    }

    // Register custom server-level middlewares
    {
      const {$serverMiddlewares = []} = modules
      for (const middleware of $serverMiddlewares) {
        koa.use(middleware)
      }
      for (const middleware of routeMiddleware($endpoints)) {
        koa.use(middleware)
      }
    }

    // Register api routes
    {
      const moduleNames = Object.keys(modules).filter((name) => !/^\$/.test(name))
      const {
        $before = null,
        $after = null
      } = modules
      const moduleRouter = AKoa.newRouter()
      moduleRouter.head('/', async function knock (ctx) {
        ctx.body = null
      })
      const $specs = moduleNames.reduce(($specs, moduleName) => Object.assign(
        $specs, {[moduleName]: moduleSpec(modules[moduleName])}
      ), {})
      moduleRouter.options('/', async function specs (ctx) {
        const specId = uuid.v4()
        ctx.body = {
          data: {
            type: 'specs',
            id: specId,
            attributes: Object.assign($specs, modules.$specs || {})
          }
        }
      })

      for (const moduleName of moduleNames) {
        const moduleApi = api(moduleName, modules[moduleName], {
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
