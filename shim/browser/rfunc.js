/**
 * @class RFunc
 * @param {Object} modules - Modules configuration
 * @param {Object} [options] - Optional settings
 */
'use strict';

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _inherits = require("@babel/runtime/helpers/inherits");

var app = require('./app');

var _require = require('akoa'),
    AKoa = _require.AKoa;
/** @lends RFunc */


var RFunc =
/*#__PURE__*/
function (_AKoa) {
  _inherits(RFunc, _AKoa);

  function RFunc(modules) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RFunc);

    var _app = app(modules),
        middleware = _app.middleware;

    return _possibleConstructorReturn(this, (RFunc.__proto__ || _Object$getPrototypeOf(RFunc)).call(this, middleware, options));
  }

  return RFunc;
}(AKoa);

_Object$assign(RFunc, {});

module.exports = RFunc;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJmdW5jLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJBS29hIiwiUkZ1bmMiLCJtb2R1bGVzIiwib3B0aW9ucyIsIm1pZGRsZXdhcmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSxPQUFSLENBQVo7O2VBQ2lCQSxRQUFRLE1BQVIsQztJQUFUQyxJLFlBQUFBLEk7QUFFUjs7O0lBQ01DLEs7Ozs7O0FBQ0osaUJBQWFDLE9BQWIsRUFBb0M7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsZUFDYkwsSUFBSUksT0FBSixDQURhO0FBQUEsUUFDNUJFLFVBRDRCLFFBQzVCQSxVQUQ0Qjs7QUFBQSwwR0FFNUJBLFVBRjRCLEVBRWhCRCxPQUZnQjtBQUduQzs7O0VBSmlCSCxJOztBQU9wQixlQUFjQyxLQUFkLEVBQXFCLEVBQXJCOztBQUVBSSxPQUFPQyxPQUFQLEdBQWlCTCxLQUFqQiIsImZpbGUiOiJyZnVuYy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9saWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjbGFzcyBSRnVuY1xuICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZXMgLSBNb2R1bGVzIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBzZXR0aW5nc1xuICovXG4ndXNlIHN0cmljdCdcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi9hcHAnKVxuY29uc3QgeyBBS29hIH0gPSByZXF1aXJlKCdha29hJylcblxuLyoqIEBsZW5kcyBSRnVuYyAqL1xuY2xhc3MgUkZ1bmMgZXh0ZW5kcyBBS29hIHtcbiAgY29uc3RydWN0b3IgKG1vZHVsZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB7IG1pZGRsZXdhcmUgfSA9IGFwcChtb2R1bGVzKVxuICAgIHN1cGVyKG1pZGRsZXdhcmUsIG9wdGlvbnMpXG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihSRnVuYywge30pXG5cbm1vZHVsZS5leHBvcnRzID0gUkZ1bmNcblxuIl19