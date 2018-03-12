/**
 * Test case for rfunc.
 * Runs with mocha.
 */
'use strict'

const RFunc = require('../lib/rfunc.js')
const assert = require('assert')
const uuid = require('uuid')
const asleep = require('asleep')
const aport = require('aport')
const arequest = require('arequest')

describe('rfunc', function () {
  this.timeout(3000)
  let request = arequest.create({jar: true})
  let port
  let rfunc
  let baseUrl
  before(async () => {
    port = await aport()
    rfunc = new RFunc({
      greeting: {
        async hello (name) {
          const {state} = this
          const d = this._now()
          await asleep(100)
          assert.equal(state.msgFromBefore, 'hey,yo!')
          return {
            time: this._now() - d,
            message: 'hey!',
            to: name
          }
        },
        helloAlias (...args) {
          const s = this
          return s.hello(...args)
        },
        bye () {

        },
        circularJson () {
          let foo = {bar: 'baz'}
          return Object.assign(foo, {foo})
        },
        _now () {
          return new Date()
        },
        $before () {
          let s = this
          let {state} = s
          let {invocation} = state
          assert.equal(invocation.module, 'greeting')
          state.msgFromBefore = 'hey,yo!'
        },
        $after (methodName, params, returns) {
          let s = this
          if (methodName === 'hello') {
            assert.equal(returns.message, 'hey!')
          }
        },
        $spec: {
          name: 'hoge',
          methods: {
            hello: {desc: 'Say hello'},
            bye: {desc: 'Say bye'}
          }
        }
      },
      // Function as module
      now () {
        return new Date()
      },
      $middlewares: [
        async function (ctx, next) {
          ctx.set('hoge', 'This is the hoge')
          await
            next()
        }
      ],
      $endpoints: {
        '/api/foo/:id': { // Pass object to handle each HTTP verbs
          'POST': (ctx) => {
            const {id} = ctx.params
            ctx.body = `This is foo with id: "${id}"`
          }
        }
      }
    })
    await rfunc.listen(port)
    baseUrl = `http://localhost:${port}`
  })

  after(async () => {
    rfunc.close()
  })

  it('Rfunc', async () => {
    // Head for all api
    {
      const {statusCode, body, headers} = await request({
        url: `${baseUrl}/rfunc`,
        method: 'HEAD'
      })
      assert.equal(statusCode, 204)
    }
    // Options for all api
    {
      let {statusCode, body, headers} = await request({
        url: `${baseUrl}/rfunc`,
        method: 'OPTIONS'
      })
      assert.equal(statusCode, 200)
      assert.ok(body.data.attributes['greeting'])
    }
    // Head for api
    {
      let {statusCode, body, headers} = await request({
        url: `${baseUrl}/rfunc/greeting`,
        method: 'HEAD'
      })
      assert.equal(statusCode, 204)
      assert.ok(!body)
      assert.equal(headers.hoge, 'This is the hoge')
    }
    // Options for api
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/greeting`,
        method: 'OPTIONS'
      })
      assert.equal(statusCode, 200)
      assert.equal(body.data.attributes.name, 'hoge')
    }
    // Head for api method
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/greeting/hello`,
        method: 'HEAD'
      })
      assert.equal(statusCode, 204)
      assert.ok(!body)
    }

    // Say hello for api method
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/greeting/hello`,
        method: 'POST',
        json: true,
        body: {
          data: {
            type: 'invocations',
            id: uuid.v4(),
            attributes: {
              params: ['foo', 'bar']
            }
          }
        }
      })
      assert.equal(statusCode, 200)
      let {returns} = body.data.attributes
      assert.equal(returns.message, 'hey!')
      assert.equal(returns.to, 'foo')
    }

    // Say hello from alias for api method
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/greeting/hello-alias`,
        method: 'POST',
        json: true,
        body: {
          data: {
            type: 'invocations',
            id: uuid.v4(),
            attributes: {
              params: ['foo', 'bar']
            }
          }
        }
      })
      assert.equal(statusCode, 200)
      let {returns} = body.data.attributes
      assert.equal(returns.message, 'hey!')
      assert.equal(returns.to, 'foo')
    }

    // Try circular json
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/greeting/circular-json`,
        method: 'POST',
        json: true,
        body: {
          data: {
            attributes: {}
          }
        }
      })
      assert.equal(statusCode, 500)
      assert.ok(body.errors)
    }

    // Send invalid
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/greeting/hello`,
        method: 'POST',
        json: true,
        body: {}
      })
      assert.equal(statusCode, 400)
      let {errors} = body
      assert.ok(errors)
    }

    // Get function as module
    {
      let {statusCode, body} = await request({
        url: `${baseUrl}/rfunc/now/default`,
        method: 'POST',
        json: true,
        body: {
          data: {
            attributes: {}
          }
        }
      })
      assert.equal(statusCode, 200)
      assert.ok(body.data.attributes.returns)
    }
  })

  it('to middleware', () => {
    let middleware = rfunc.toMiddleware()
    assert.ok(middleware)
    assert.equal(typeof middleware, 'function')
  })

  it('DO endpoint', async () => {
    const {statusCode, body, headers} = await request({
      url: `${baseUrl}/api/foo/1`,
      method: 'POST'
    })
    assert.equal(statusCode, 200)
    assert.equal(body, 'This is foo with id: "1"')
  })
})

/* global describe, before, after, it */
