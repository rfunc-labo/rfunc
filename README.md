rfunc
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/rfunc-labo/rfunc
[bd_travis_url]: http://travis-ci.org/rfunc-labo/rfunc
[bd_travis_shield_url]: http://img.shields.io/travis/rfunc-labo/rfunc.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/rfunc-labo/rfunc
[bd_travis_com_shield_url]: https://api.travis-ci.com/rfunc-labo/rfunc.svg?token=
[bd_license_url]: https://github.com/rfunc-labo/rfunc/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/rfunc-labo/rfunc
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/rfunc-labo/rfunc.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/rfunc-labo/rfunc.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/rfunc-labo/rfunc
[bd_gemnasium_shield_url]: https://gemnasium.com/rfunc-labo/rfunc.svg
[bd_npm_url]: http://www.npmjs.org/package/rfunc
[bd_npm_shield_url]: http://img.shields.io/npm/v/rfunc.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Remote function call with async interface

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install rfunc --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

Define functions on server side.

```javascript
#!/usr/bin/env node

/**
 * This is an example to invoke rfunc server
 */
'use strict'

const rfunc = require('rfunc')

void async function () {
  // Setup server for remote call
  await  rfunc({
    // Define APIs
    'sign': {
      async signin (username, password) {
        /* ... */
        return {success: true}
      },
      async signout () {
        /* ... */
      }
    }
  }).listen(3000)
}().catch((err) => console.error(err))


```

rfunc client create the function dynamically on client side and you can just call it.

```javascript
#!/usr/bin/env node

/**
 * This is an example of rfunc client
 */
'use strict'

const rclient = require('rfunc-clinet')

void async function () {
  const sign = await rclient().connect('sign') // Define a client

  // Call remote api and receive the result
  const {success} = await sign.signin('foo', 'bar1234')
  console.log('success:', success)
}().catch((err) => console.error(err))

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Advanced Usage.md.hbs" Start -->

<a name="section-doc-guides-03-advanced-usage-md"></a>

Advanced Usage
---------

To be more specific about api, provide `$spec` on server side.

```javascript
#!/usr/bin/env node

/**
 * Advanced usage of the server
 */
'use strict'

const rfunc = require('rfunc')
const http = require('http')

void async function () {
  const server = http.createServer()
  rfunc({
    'sign': {
      async signin (username, password) {
        const {state} = this // Access state property of koa
        console.log(state)
        /* ... */
      },
      async signout () { /* ... */ },
      // Callback before a method invoked
      async $before (methodName, params) {
        const {state} = this
        if (state.somethingIsWrong) {
          throw new Error('Something wrong!') // Throw error to reject invoking
        }
        state.hey = 'Say hey from before' // Set state value to share something with methods
        /* ... */
      },
      // Callback after a method invoked
      async $after (methodName, params, returns) {
        let {state} = this
        /* ... */
      },
      // Describe api specification
      $spec: {
        name: 'sign-api',
        version: '1.0.0',
        desc: 'Remote API for user sign procedures',
        methods: {
          signin: {
            desc: 'Signin in to the application',
            params: [
              {name: 'username', desc: 'Name of user to signin'},
              {name: 'password', desc: 'User password'}
            ],
            returns: {
              type: 'object'
            }
          },
          signout: {/* ... */}
        }
      }
    },
    // Koa middlewares
    $middlewares: [
      async function customMW (ctx, next) {
        // Called before handling
        /* ... */
        await next()
      }
    ],
    $jsonLimit: '4mb',
    $endpoints: {
      '/api/foo/:id': { // Pass object to handle each HTTP verbs
        'POST': (ctx) => {
          const {id} = ctx.params
          ctx.body = `This is foo with id: "${id}"`
        }
      },
    },
    $static: '/opt/www/public'
  }).applyTo(server) // Apply to existing http server
  server.listen(3000)
}().catch((err) => console.error(err))

```

Then you can fetch the spec data via `.describe()` method on client side.

```javascript
#!/usr/bin/env node

/**
 * This is an example of rfunc client
 */
'use strict'

const rclient = require('rfunc/clinet')

void async function () {
  let sign = await rclient().connect('sign')

  // Fetch the spec data
  let $spec = await sign.describe()
  /* ... */
}().catch((err) => console.error(err))



```

This cloud be useful to generate API documentations.


<!-- Section from "doc/guides/03.Advanced Usage.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/rfunc-labo/rfunc/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [rfunc-client][rfunc_client_url]
+ [rfunc-labo][rfunc_labo_url]

[rfunc_client_url]: https://github.com/rfunc-labo/rfunc-client
[rfunc_labo_url]: https://github.com/rfunc-labo

<!-- Links End -->
