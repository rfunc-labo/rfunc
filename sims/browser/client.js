/**
 * Http client
 * @function client
 * @returns {RFuncClint}
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var co = require('co');

var _require = require('./lib/constants');

var DEFAULT_URL = _require.DEFAULT_URL;

var superagent = require('superagent');
var superagentPromisePlugin = require('superagent-promise-plugin');

/**
 * @class RFuncClint
 */

var RFuncClint = function () {
  function RFuncClint() {
    var baseUrl = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_URL : arguments[0];

    _classCallCheck(this, RFuncClint);

    var s = this;
    s.baseUrl = baseUrl;
  }

  /**
   * Connect to remote api
   * @param {string} name - Name of api
   * @returns {Promise}
   */


  _createClass(RFuncClint, [{
    key: 'connect',
    value: function connect(name) {
      var s = this;
      return co(regeneratorRuntime.mark(function _callee() {
        var api;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                api = new Proxy({}, {
                  get: function get(target, method) {
                    return s.invoke.bind(s, method);
                  }
                });
                return _context.abrupt('return', api);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }

    /**
     * Invoke a method
     * @param {string} method - Name of method to invoke
     * @param {...*} params - Parameters
     */

  }, {
    key: 'invoke',
    value: function invoke(method) {}
  }]);

  return RFuncClint;
}();

/** @lends client */


function client() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(RFuncClint, [null].concat(args)))();
}

module.exports = client;