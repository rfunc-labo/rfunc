/**
 * Define an endpoint
 * @function endpoint
 */
'use strict'

const co = require('co')
const aschema = require('aschema')
const { InvokeSchema } = require('rfunc-schemas')

/** @lends endpoint */
function endpoint (moduleName, methodName) {
  return {
    knock: co.wrap(function * knock (ctx) {
      ctx.body = null
    }),
    invoke: co.wrap(function * invoke (ctx) {
      ctx.state = ctx.state || {}
      let body = (ctx.request.body || {})
      if (ctx.method === 'POST') {
        let error = aschema(InvokeSchema).validate(body)
        if (error) {
          ctx.status = 400
          ctx.body = {
            errors: [].concat(error)
          }
          return
        }
      }

      let { data } = (body || {})
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
    })
  }
}

module.exports = endpoint
