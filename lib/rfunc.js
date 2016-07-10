/**
 * Async RCP server
 * @class RFunc
 * @param {Object} modules - MOdules configuration
 * @param {Object} [options] - Optional settings
 */
'use strict'

const app = require('./app')
const http = require('http')

/** @lends RFunc */
class RFunc {
  constructor (modules, options = {}) {
    const s = this
    s.app = app(modules, options)
  }

  /**
   * Listen to port
   * @param {number} port
   * @returns {Promise.<RFunc>}
   */
  listen (port) {
    const s = this
    let server = http.createServer()
    s.attachTo(server)
    return new Promise((resolve) =>
      server.listen(port, () => resolve())
    ).then(() => s)
  }

  /**
   * Close server
   * @returns {Promise.<RFunc>}
   */
  close () {
    const s = this
    let { server } = s
    if (!server) {
      return Promise.reject(new Error('Nothing to close!'))
    }
    return new Promise((resolve) =>
      server.close(() => {
        delete s.server
        resolve()
      })
    ).then(() => s)
  }

  /**
   * Attach rfunc to http server
   * @param {http.Server} server - A server instance
   * @returns {Promise.<RFunc>}
   */
  attachTo (server) {
    const s = this
    let { app } = s
    s.server = server
    server.addListener('request', app.callback())
    return Promise.resolve(s)
  }

}

Object.assign(RFunc, {})

module.exports = RFunc

