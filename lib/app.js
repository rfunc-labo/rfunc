/**
 * Create an app
 * @function app
 * @param {Object} modules - API modules
 * @returns {Koa} - Koa app
 */
'use strict'

const Koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const KoaRouter = require('koa-router')
const co = require('co')
const uuid = require('uuid')
const assert = require('assert')
const api = require('./api')
const { spinalcase } = require('stringcase')
const defaults = require('defaults')
const { DEFAULT_URL } = require('../constants')

/** @lends app */
function app (modules) {
  assert.ok(modules, 'scope is required')
  let koa = new Koa()
  let router = new KoaRouter()
  for (let scope of [].concat(modules)) {
    let { $pathname } = defaults(scope, {
      $pathname: DEFAULT_URL,
      $middlewares: [],
      $before: null,
      $after: null,
      $specs: {}
    })

    // Register error handler
    {
      let errorHandler = co.wrap(function * uncaughtErrorHandler (ctx, next) {
        try {
          yield next()
        } catch (err) {
          console.error('Uncaught exception', err)
          ctx.status = 500
        }
      })
      router.use($pathname, errorHandler)
    }

    // Register body parser
    {
      let bodyparser = koaBodyparser({})
      router.use($pathname, bodyparser)
    }

    // Register custom middlewares
    {
      let { $middlewares } = scope
      for (let middleware of $middlewares) {
        router.use($pathname, middleware)
      }
    }

    // Register api routes
    {
      let moduleNames = Object.keys(scope).filter((name) => !/^\$/.test(name))
      let { $before, $after } = scope
      let moduleRouter = new KoaRouter()
      moduleRouter.head('/', co.wrap(function * knock (ctx) {
        ctx.body = null
      }))
      let $specs = moduleNames.reduce(($specs, moduleName) => Object.assign(
        $specs, { [moduleName]: scope[ moduleName ].$spec }
      ), {})
      moduleRouter.options('/', co.wrap(function * specs (ctx) {
        let specId = uuid.v4()
        ctx.body = {
          data: {
            type: 'specs',
            id: specId,
            attributes: Object.assign($specs, scope.$specs)
          }
        }
      }))

      for (let moduleName of moduleNames) {
        let moduleApi = api(moduleName, scope[ moduleName ], {
          $before, $after
        })
        moduleRouter.use(`/${spinalcase(moduleName)}`, ...moduleApi)
      }
      router.use($pathname, moduleRouter.routes())
    }
  }
  koa.use(router.routes())

  return koa
}

module.exports = app
