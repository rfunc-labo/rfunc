/**
 * Create a routing middleware
 * @function routeMiddleware
 * @param {Object} routes - Routing settings
 * @returns {function[]} - Routing middlewares
 */
'use strict'

const KoaRouter = require('koa-router')

/** @lends routeMiddleware */
function routeMiddleware (routes) {
  const router = new KoaRouter()
  for (const pathname of Object.keys(routes)) {
    for (const route of [].concat(routes[pathname])) {

      switch (typeof route) {
        case 'function': {
          router.all(pathname, route)
          break
        }
        case 'string': {
          router.redirect(pathname, route)
          break
        }
        default: {
          const methods = Object.keys(route).filter((method) => !method.match(/^[\$_]/))
          for (const method of methods) {
            const name = String(method).toLowerCase()
            if (!router[name]) {
              throw new Error(`Unknown method: ${method}`)
            }
            router[name](pathname, route[method])
          }
          break
        }
      }
    }
  }
  return [
    router.routes(),
    router.allowedMethods()
  ]
}

module.exports = routeMiddleware
