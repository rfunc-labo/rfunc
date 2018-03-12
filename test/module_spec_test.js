/**
 * Test case for moduleSpec.
 * Runs with mocha.
 */
'use strict'

const moduleSpec = require('../lib/helper/module_spec.js')
const assert = require('assert')


describe('module-spec', function () {
  this.timeout(3000)

  before(async () =>  {

  })

  after(async () =>  {

  })

  it('Module spec', async () =>  {
    {
      let spec = moduleSpec({
        foo () {},
        bar () {}
      })
      assert.ok(spec.methods.foo)
      assert.ok(spec.methods.bar)
    }
    {
      let spec = moduleSpec({
        foo () {},
        bar () {},
        $spec: {
          methods: {
            foo: { desc: 'This is the foo' },
            bar: { desc: 'This is the bar' }
          }
        }
      })
      assert.equal(spec.methods.foo.desc, 'This is the foo')
    }
  })
})

/* global describe, before, after, it */
