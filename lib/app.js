/**
 * Create an app
 * @function app
 * @param {Object} modules - API modules
 * @param {Object} [options] - Optional settings
 * @param {function[]} [options.middlewares] - Middlewares
 * @returns {Koa} - Koa app
 */
'use strict'

const Koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const KoaRouter = require('koa-router')
const co = require('co')
const assert = require('assert')
const api = require('./api')
const defaults = require('defaults')
const { DEFAULT_URL } = require('../constants')

/** @lends app */
function app (modules, options = {}) {
  assert.ok(modules, 'modules is required')
  let koa = new Koa()
  let { pathname } = defaults(options, {
    pathname: DEFAULT_URL
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
    koa.use(errorHandler)
  }

  // Register body parser
  {
    let bodyparser = koaBodyparser({})
    koa.use(bodyparser)
  }

  // Register custom middlewares
  {
    let $middlewares = [].concat(modules.$middlewares || [])
    for (let middleware of $middlewares) {
      koa.use(middleware)
    }
  }

  // Register api routes
  {
    let moduleNames = Object.keys(modules).filter((name) => !/^\$/.test(name))
    let { $before, $after } = modules
    let router = new KoaRouter()
    router.head(`${pathname}`, co.wrap(function * knock (ctx) {
      ctx.body = null
    }))
    let $specs = moduleNames.reduce(($specs, moduleName) => Object.assign(
      $specs, { [moduleName]: modules[ moduleName ].$spec }
    ), {})
    router.options(`${pathname}`, co.wrap(function * specs (ctx) {
      ctx.body = Object.assign($specs, modules.$specs)
    }))

    for (let moduleName of moduleNames) {
      let moduleApi = api(moduleName, modules[ moduleName ], {
        $before, $after
      })
      router.use(`${pathname}/${moduleName}`, ...moduleApi)
    }
    koa.use(router.routes())
  }

  return koa
}

module.exports = app
