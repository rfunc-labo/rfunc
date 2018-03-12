/**
 * Test case for client.
 * Runs with mocha.
 */
'use strict'

const client = require('../client.js')
const RFunc = require('../lib/rfunc.js')
const asleep = require('asleep')
const aport = require('aport')
const assert = require('assert')

describe('client', function () {
  const BASE_URL = '/testing-api/rfunc'
  this.timeout(3000)
  let port
  let rfunc
  let baseUrl
  before(async () => {
    port = await aport()
    rfunc = new RFunc({
      foo: {
        async bar (text) {
          let d = new Date()
          await asleep(100)
          return {
            time: new Date() - d,
            text
          }
        },
        $spec: {
          name: 'foo-api',
          methods: {
            hello: {desc: 'Say hello'},
            bye: {desc: 'Say bye'}
          }
        }
      },
      $pathname: BASE_URL
    })
    rfunc.listen(port)
    baseUrl = `http://localhost:${port}${BASE_URL}`
  })

  after(async () => {
    rfunc.close()
  })

  it('Send client', async () => {
    // Get description
    {
      let desc = await client(baseUrl).describe('foo')
      assert.ok(desc.name, 'foo-api')
    }
    {
      let foo = await client(baseUrl).connect('foo')
      let hoge = await foo.bar('hoge')
      console.log(hoge)
    }
  })
})

/* global describe, before, after, it */
