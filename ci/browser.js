#!/usr/bin/env node

/**
 * Compile to browser source
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const apeCompiling = require('ape-compiling')
const filedel = require('filedel')
const co = require('co')

apeTasking.runTasks('browser', [
  () => filedel('sims/browser/**/*.js'),
  () => co(function * () {
    let filenames = [ 'client.js', 'lib/constants.js' ]
    for (let filename of filenames) {
      yield apeCompiling.compileToEs5(filename, {
        cwd: '.',
        out: 'sims/browser'
      })
    }
  })
], true)
