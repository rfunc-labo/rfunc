/**
 * Create an app
 * @function app
 * @param {Object} api - API configuration
 * @param {Object} [options] - Optional settings
 * @param {function[]} [options.middlewares] - Middlewares
 * @returns {Koa} - Koa app
 */
'use strict'

const Koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const KoaRouter = require('koa-router')
const co = require('co')
const api = require('./api')
const defaults = require('defaults')
const { DEFAULT_URL } = require('../constants')

/** @lends app */
function app (config, options = {}) {
  let koa = new Koa()

  let { pathname } = defaults(options, {
    pathname: DEFAULT_URL
  })
  let middlewares = [
    co.wrap(function * uncaughtErrorHandler (ctx, next) {
      try {
        yield next()
      } catch (err) {
        console.error('Uncaught exception', err)
        ctx.status = 500
      }
    }),
    koaBodyparser({}),
    ...[].concat(options.middlewares || []),
    Object.keys(config || {}).reduce((router, name) =>
        router.use(`${pathname}/${name}`, ...api(name, config[ name ]))
      , new KoaRouter()).routes()
  ]

  for (let middleware of middlewares) {
    koa.use(middleware)
  }

  return koa
}

module.exports = app
