/**
 * Define an api
 * @function api
 * @param {string} moduleName - Name of module
 * @param {object} methods - Method definitions
 * @param {Object} [options] - Optional settings
 * @returns {function[]} - Koa handlers
 */
'use strict';

var _getIterator = require("@babel/runtime/core-js/get-iterator");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _require = require('akoa'),
    AKoa = _require.AKoa;

var uuid = require('uuid');

var _require2 = require('stringcase'),
    spinalcase = _require2.spinalcase,
    camelcase = _require2.camelcase;

var moduleSpec = require('./helper/module_spec');

var moduleNormalize = require('./helper/module_normalize');

var _require3 = require('../constants'),
    RESERVED_METHODS = _require3.RESERVED_METHODS;

var invokeMiddleware = require('./middlewares/invoke_middleware');

var endpoint = require('./endpoint');
/** @lends api */


function api(moduleName, module) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  module = moduleNormalize(module);
  var router = AKoa.newRouter();
  router.head('/',
  /*#__PURE__*/
  function () {
    var _knock = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(ctx) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.body = null;

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function knock(_x) {
      return _knock.apply(this, arguments);
    };
  }());
  var $moduleBefore = options.$before;
  var $moduleAfter = options.$after;
  var _module = module,
      $before = _module.$before,
      $after = _module.$after,
      $middlewares = _module.$middlewares;
  var specId = uuid.v4();
  router.options('/',
  /*#__PURE__*/
  function () {
    var _spec = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(ctx) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ctx.body = {
                data: {
                  type: 'specs',
                  id: specId,
                  attributes: moduleSpec(module)
                }
              };

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function spec(_x2) {
      return _spec.apply(this, arguments);
    };
  }());

  var methodNames = _Object$keys(module).filter(function (name) {
    return !/^\$/.test(name);
  });

  var methods = methodNames.reduce(function (methods, name) {
    return _Object$assign(methods, _defineProperty({}, name, module[name]));
  }, {});
  router.use(invokeMiddleware({
    name: moduleName,
    methods: methods,
    before: [$moduleBefore, $before],
    after: [$after, $moduleAfter]
  }));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator($middlewares || []), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _middleware = _step.value;
      router.use(_middleware);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(methodNames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _methodName = _step2.value;
      var isReserved = !!~RESERVED_METHODS.split(',').indexOf(_methodName);

      if (isReserved) {
        throw new Error("[rfunc] Method name \"".concat(_methodName, "\" is reserved and you cannot override it."));
      }

      var isPrivate = /^_/.test(_methodName);

      if (isPrivate) {
        // Do not expose private methods
        continue;
      }

      var spinalUrl = "/".concat(spinalcase(_methodName));
      var camelUrl = "/".concat(camelcase(_methodName));

      var _endpoint = endpoint(moduleName, _methodName),
          knock = _endpoint.knock,
          invoke = _endpoint.invoke;

      router.head(spinalUrl, knock);
      router.get(spinalUrl, invoke);
      router.post(spinalUrl, invoke);
      router.redirect(camelUrl, spinalUrl);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return [router.routes(), router.allowedMethods()];
}

module.exports = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQUtvYSIsInV1aWQiLCJzcGluYWxjYXNlIiwiY2FtZWxjYXNlIiwibW9kdWxlU3BlYyIsIm1vZHVsZU5vcm1hbGl6ZSIsIlJFU0VSVkVEX01FVEhPRFMiLCJpbnZva2VNaWRkbGV3YXJlIiwiZW5kcG9pbnQiLCJhcGkiLCJtb2R1bGVOYW1lIiwibW9kdWxlIiwib3B0aW9ucyIsInJvdXRlciIsIm5ld1JvdXRlciIsImhlYWQiLCJjdHgiLCJib2R5Iiwia25vY2siLCIkbW9kdWxlQmVmb3JlIiwiJGJlZm9yZSIsIiRtb2R1bGVBZnRlciIsIiRhZnRlciIsIiRtaWRkbGV3YXJlcyIsInNwZWNJZCIsInY0IiwiZGF0YSIsInR5cGUiLCJpZCIsImF0dHJpYnV0ZXMiLCJzcGVjIiwibWV0aG9kTmFtZXMiLCJmaWx0ZXIiLCJuYW1lIiwidGVzdCIsIm1ldGhvZHMiLCJyZWR1Y2UiLCJ1c2UiLCJiZWZvcmUiLCJhZnRlciIsIm1pZGRsZXdhcmUiLCJtZXRob2ROYW1lIiwiaXNSZXNlcnZlZCIsInNwbGl0IiwiaW5kZXhPZiIsIkVycm9yIiwiaXNQcml2YXRlIiwic3BpbmFsVXJsIiwiY2FtZWxVcmwiLCJpbnZva2UiLCJnZXQiLCJwb3N0IiwicmVkaXJlY3QiLCJyb3V0ZXMiLCJhbGxvd2VkTWV0aG9kcyIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7OztlQUVlQSxRQUFRLE1BQVIsQztJQUFSQyxJLFlBQUFBLEk7O0FBQ1AsSUFBTUMsT0FBT0YsUUFBUSxNQUFSLENBQWI7O2dCQUNnQ0EsUUFBUSxZQUFSLEM7SUFBekJHLFUsYUFBQUEsVTtJQUFZQyxTLGFBQUFBLFM7O0FBQ25CLElBQU1DLGFBQWFMLFFBQVEsc0JBQVIsQ0FBbkI7O0FBQ0EsSUFBTU0sa0JBQWtCTixRQUFRLDJCQUFSLENBQXhCOztnQkFFMkJBLFFBQVEsY0FBUixDO0lBQXBCTyxnQixhQUFBQSxn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Qjs7QUFDQSxVQUFJSyxTQUFKLEVBQWU7QUFDYjtBQUNBO0FBQ0Q7O0FBQ0QsVUFBTUMsdUJBQWdCN0MsV0FBV3VDLFdBQVgsQ0FBaEIsQ0FBTjtBQUNBLFVBQU1PLHNCQUFlN0MsVUFBVXNDLFdBQVYsQ0FBZixDQUFOOztBQVhvQyxzQkFhWmpDLFNBQVNFLFVBQVQsRUFBcUIrQixXQUFyQixDQWJZO0FBQUEsVUFhN0J2QixLQWI2QixhQWE3QkEsS0FiNkI7QUFBQSxVQWF0QitCLE1BYnNCLGFBYXRCQSxNQWJzQjs7QUFlcENwQyxhQUFPRSxJQUFQLENBQVlnQyxTQUFaLEVBQXVCN0IsS0FBdkI7QUFDQUwsYUFBT3FDLEdBQVAsQ0FBV0gsU0FBWCxFQUFzQkUsTUFBdEI7QUFDQXBDLGFBQU9zQyxJQUFQLENBQVlKLFNBQVosRUFBdUJFLE1BQXZCO0FBQ0FwQyxhQUFPdUMsUUFBUCxDQUFnQkosUUFBaEIsRUFBMEJELFNBQTFCO0FBQ0Q7QUFqRTZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0U5QyxTQUFPLENBQ0xsQyxPQUFPd0MsTUFBUCxFQURLLEVBRUx4QyxPQUFPeUMsY0FBUCxFQUZLLENBQVA7QUFJRDs7QUFFRDNDLE9BQU80QyxPQUFQLEdBQWlCOUMsR0FBakIiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL2xpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVmaW5lIGFuIGFwaVxuICogQGZ1bmN0aW9uIGFwaVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZU5hbWUgLSBOYW1lIG9mIG1vZHVsZVxuICogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHMgLSBNZXRob2QgZGVmaW5pdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBzZXR0aW5nc1xuICogQHJldHVybnMge2Z1bmN0aW9uW119IC0gS29hIGhhbmRsZXJzXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7QUtvYX0gPSByZXF1aXJlKCdha29hJylcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IHtzcGluYWxjYXNlLCBjYW1lbGNhc2V9ID0gcmVxdWlyZSgnc3RyaW5nY2FzZScpXG5jb25zdCBtb2R1bGVTcGVjID0gcmVxdWlyZSgnLi9oZWxwZXIvbW9kdWxlX3NwZWMnKVxuY29uc3QgbW9kdWxlTm9ybWFsaXplID0gcmVxdWlyZSgnLi9oZWxwZXIvbW9kdWxlX25vcm1hbGl6ZScpXG5cbmNvbnN0IHtSRVNFUlZFRF9NRVRIT0RTfSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpXG5jb25zdCBpbnZva2VNaWRkbGV3YXJlID0gcmVxdWlyZSgnLi9taWRkbGV3YXJlcy9pbnZva2VfbWlkZGxld2FyZScpXG5cbmNvbnN0IGVuZHBvaW50ID0gcmVxdWlyZSgnLi9lbmRwb2ludCcpXG5cbi8qKiBAbGVuZHMgYXBpICovXG5mdW5jdGlvbiBhcGkgKG1vZHVsZU5hbWUsIG1vZHVsZSwgb3B0aW9ucyA9IHt9KSB7XG4gIG1vZHVsZSA9IG1vZHVsZU5vcm1hbGl6ZShtb2R1bGUpXG5cbiAgY29uc3Qgcm91dGVyID0gQUtvYS5uZXdSb3V0ZXIoKVxuICByb3V0ZXIuaGVhZCgnLycsIGFzeW5jIGZ1bmN0aW9uIGtub2NrIChjdHgpIHtcbiAgICBjdHguYm9keSA9IG51bGxcbiAgfSlcbiAgY29uc3QgJG1vZHVsZUJlZm9yZSA9IG9wdGlvbnMuJGJlZm9yZVxuICBjb25zdCAkbW9kdWxlQWZ0ZXIgPSBvcHRpb25zLiRhZnRlclxuICBjb25zdCB7XG4gICAgJGJlZm9yZSxcbiAgICAkYWZ0ZXIsXG4gICAgJG1pZGRsZXdhcmVzXG4gIH0gPSBtb2R1bGVcbiAgY29uc3Qgc3BlY0lkID0gdXVpZC52NCgpXG4gIHJvdXRlci5vcHRpb25zKCcvJywgYXN5bmMgZnVuY3Rpb24gc3BlYyAoY3R4KSB7XG4gICAgY3R4LmJvZHkgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHR5cGU6ICdzcGVjcycsXG4gICAgICAgIGlkOiBzcGVjSWQsXG4gICAgICAgIGF0dHJpYnV0ZXM6IG1vZHVsZVNwZWMobW9kdWxlKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgY29uc3QgbWV0aG9kTmFtZXMgPSBPYmplY3Qua2V5cyhtb2R1bGUpLmZpbHRlcigobmFtZSkgPT4gIS9eXFwkLy50ZXN0KG5hbWUpKVxuICBjb25zdCBtZXRob2RzID0gbWV0aG9kTmFtZXMucmVkdWNlKChtZXRob2RzLCBuYW1lKSA9PiBPYmplY3QuYXNzaWduKG1ldGhvZHMsIHtcbiAgICBbbmFtZV06IG1vZHVsZVtuYW1lXVxuICB9KSwge30pXG5cbiAgcm91dGVyLnVzZShpbnZva2VNaWRkbGV3YXJlKHtcbiAgICBuYW1lOiBtb2R1bGVOYW1lLFxuICAgIG1ldGhvZHMsXG4gICAgYmVmb3JlOiBbXG4gICAgICAkbW9kdWxlQmVmb3JlLFxuICAgICAgJGJlZm9yZVxuICAgIF0sXG4gICAgYWZ0ZXI6IFtcbiAgICAgICRhZnRlcixcbiAgICAgICRtb2R1bGVBZnRlclxuICAgIF1cbiAgfSkpXG5cbiAgZm9yIChjb25zdCBtaWRkbGV3YXJlIG9mICRtaWRkbGV3YXJlcyB8fCBbXSkge1xuICAgIHJvdXRlci51c2UobWlkZGxld2FyZSlcbiAgfVxuXG4gIGZvciAoY29uc3QgbWV0aG9kTmFtZSBvZiBtZXRob2ROYW1lcykge1xuICAgIGNvbnN0IGlzUmVzZXJ2ZWQgPSAhIX5SRVNFUlZFRF9NRVRIT0RTLnNwbGl0KCcsJykuaW5kZXhPZihtZXRob2ROYW1lKVxuICAgIGlmIChpc1Jlc2VydmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtyZnVuY10gTWV0aG9kIG5hbWUgXCIke21ldGhvZE5hbWV9XCIgaXMgcmVzZXJ2ZWQgYW5kIHlvdSBjYW5ub3Qgb3ZlcnJpZGUgaXQuYClcbiAgICB9XG4gICAgY29uc3QgaXNQcml2YXRlID0gL15fLy50ZXN0KG1ldGhvZE5hbWUpXG4gICAgaWYgKGlzUHJpdmF0ZSkge1xuICAgICAgLy8gRG8gbm90IGV4cG9zZSBwcml2YXRlIG1ldGhvZHNcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGNvbnN0IHNwaW5hbFVybCA9IGAvJHtzcGluYWxjYXNlKG1ldGhvZE5hbWUpfWBcbiAgICBjb25zdCBjYW1lbFVybCA9IGAvJHtjYW1lbGNhc2UobWV0aG9kTmFtZSl9YFxuXG4gICAgY29uc3Qge2tub2NrLCBpbnZva2V9ID0gZW5kcG9pbnQobW9kdWxlTmFtZSwgbWV0aG9kTmFtZSlcblxuICAgIHJvdXRlci5oZWFkKHNwaW5hbFVybCwga25vY2spXG4gICAgcm91dGVyLmdldChzcGluYWxVcmwsIGludm9rZSlcbiAgICByb3V0ZXIucG9zdChzcGluYWxVcmwsIGludm9rZSlcbiAgICByb3V0ZXIucmVkaXJlY3QoY2FtZWxVcmwsIHNwaW5hbFVybClcbiAgfVxuICByZXR1cm4gW1xuICAgIHJvdXRlci5yb3V0ZXMoKSxcbiAgICByb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKVxuICBdXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpXG4iXX0=