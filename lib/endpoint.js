/**
 * Define an endpoint
 * @function endpoint
 */
'use strict'

const aschema = require('aschema')
const {isProduction} = require('asenv')
const {InvokeSchema} = require('rfunc-schemas')

/** @lends endpoint */
function endpoint (moduleName, methodName) {
  return {
    async knock (ctx) {
      ctx.body = null
    },
    async invoke (ctx) {
      ctx.state = ctx.state || {}
      const {body = {}} = ctx.request
      if (ctx.method === 'POST') {
        const errors = aschema(InvokeSchema).validate(body)
        if (errors) {
          ctx.status = 400
          ctx.body = {errors}
          return
        }
      }

      const {data = {}} = body
      const {id, attributes = {}} = data
      let {params = []} = attributes

      // Make null to undefined so that default param works.
      params = [].concat(params || [])
        .map((param) => param === null ? undefined : param)

      const invocation = {
        module: moduleName,
        method: methodName,
        params
      }

      ctx.state = Object.assign(ctx.state, {invocation})

      let returns
      try {
        returns = await ctx.invoke(methodName, params)
      } catch (err) {
        if (isProduction()) {
          // No stack on production
          delete err.stack
        }
        let {name = 'RFuncInvokeError', message, stack, status = 500} = err
        if (typeof err === 'string') {
          message = err
        }
        ctx.status = status
        ctx.body = {
          meta: {
            invocation
          },
          errors: [
            Object.assign({}, err, {name, message, stack})
          ]
        }
        process.emit('rfunc:error', err)
        return
      }
      let {headersSent} = ctx.res
      if (headersSent) {
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
    }
  }
}

module.exports = endpoint
