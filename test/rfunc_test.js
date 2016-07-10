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
const co = require('co')

describe('rfunc', function () {
  this.timeout(3000)
  let request = arequest.create({ jar: true })
  let port
  let rfunc
  let baseUrl
  before(() => co(function * () {
    port = yield aport()
    rfunc = new RFunc({
      greeting: {
        hello (name) {
          let { state } = this
          return co(function * () {
            let d = new Date()
            yield asleep(100)
            assert.equal(state.msgFromBefore, 'hey,yo!')
            return {
              time: new Date() - d,
              message: 'hey!',
              to: name
            }
          })
        },
        bye () {

        },
        $before (state) {
          let { module } = state
          assert.equal(module, 'greeting')
          state.msgFromBefore = 'hey,yo!'
        },
        $after (state) {
          let { returns } = state
          assert.equal(returns.message, 'hey!')
        },
        $spec: {
          name: 'hoge',
          methods: {
            hello: { desc: 'Say hello' },
            bye: { desc: 'Say bye' }
          }
        }
      },
      $middlewares: [
        co.wrap(function * hoge (ctx, next) {
          ctx.set('hoge', 'This is the hoge')
          yield next()
        })
      ]
    })
    rfunc.listen(port)
    baseUrl = `http://localhost:${port}`
  }))

  after(() => co(function * () {
    rfunc.close()
  }))

  it('Rfunc', () => co(function * () {
    // Head for all api
    {
      let { statusCode, body, headers } = yield request({
        url: `${baseUrl}/rfunc`,
        method: 'HEAD'
      })
      assert.equal(statusCode, 204)
    }
    // Options for all api
    {
      let { statusCode, body, headers } = yield request({
        url: `${baseUrl}/rfunc`,
        method: 'OPTIONS'
      })
      assert.equal(statusCode, 200)
      assert.ok(body.data.attributes[ 'greeting' ])
    }
    // Head for api
    {
      let { statusCode, body, headers } = yield request({
        url: `${baseUrl}/rfunc/greeting`,
        method: 'HEAD'
      })
      assert.equal(statusCode, 204)
      assert.ok(!body)
      assert.equal(headers.hoge, 'This is the hoge')
    }
    // Options for api
    {
      let { statusCode, body } = yield request({
        url: `${baseUrl}/rfunc/greeting`,
        method: 'OPTIONS'
      })
      assert.equal(statusCode, 200)
      assert.equal(body.data.attributes.name, 'hoge')
    }
    // Head for api method
    {
      let { statusCode, body } = yield request({
        url: `${baseUrl}/rfunc/greeting/hello`,
        method: 'HEAD'
      })
      assert.equal(statusCode, 204)
      assert.ok(!body)
    }

    // Say hello for api method
    {
      let { statusCode, body } = yield request({
        url: `${baseUrl}/rfunc/greeting/hello`,
        method: 'POST',
        json: true,
        body: {
          data: {
            type: 'invocations',
            id: uuid.v4(),
            attributes: {
              params: [ 'foo', 'bar' ]
            }
          }
        }
      })
      assert.equal(statusCode, 200)
      let { returns } = body.data.attributes
      assert.equal(returns.message, 'hey!')
      assert.equal(returns.to, 'foo')
    }

    // Send invalid
    {
      let { statusCode, body } = yield request({
        url: `${baseUrl}/rfunc/greeting/hello`,
        method: 'POST',
        json: true,
        body: {}
      })
      assert.equal(statusCode, 400)
      let { errors } = body
      assert.ok(errors)
    }
  }))
})

/* global describe, before, after, it */
