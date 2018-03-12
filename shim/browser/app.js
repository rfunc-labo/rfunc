/**
 * Create an app
 * @function app
 * @param {Object} modules - API modules
 * @returns {Koa} - Koa app
 */
'use strict';

var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _getIterator = require("@babel/runtime/core-js/get-iterator");

var range = require('koa-range');

var _require = require('akoa'),
    AKoa = _require.AKoa;

var uuid = require('uuid');

var assert = require('assert');

var api = require('./api');

var _require2 = require('stringcase'),
    spinalcase = _require2.spinalcase;

var moduleSpec = require('./helper/module_spec');

var _require3 = require('akoa/middlewares'),
    exceptionMiddleware = _require3.exceptionMiddleware,
    bodyMiddleware = _require3.bodyMiddleware;

var _require4 = require('../constants'),
    DEFAULT_URL = _require4.DEFAULT_URL;
/** @lends app */


function app(modules) {
  assert.ok(modules, 'modules is required');
  var koa = AKoa.newApp([range]);
  var router = AKoa.newRouter();
  modules = [].concat(modules || []);
  modules.forEach(function (modules) {
    var _modules$$pathname = modules.$pathname,
        $pathname = _modules$$pathname === void 0 ? DEFAULT_URL : _modules$$pathname,
        _modules$$jsonLimit = modules.$jsonLimit,
        $jsonLimit = _modules$$jsonLimit === void 0 ? '4mb' : _modules$$jsonLimit; // Register build-in middlewares

    {
      var middlewares = [exceptionMiddleware(), bodyMiddleware({
        jsonLimit: $jsonLimit
      })];

      for (var _i = 0; _i < middlewares.length; _i++) {
        var middleware = middlewares[_i];
        router.use($pathname, middleware);
      }
    } // Register custom middlewares

    {
      var _modules$$middlewares = modules.$middlewares,
          $middlewares = _modules$$middlewares === void 0 ? [] : _modules$$middlewares;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator($middlewares), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _middleware2 = _step.value;
          router.use($pathname, _middleware2);
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
    } // Register custom server-level middlewares

    {
      var _modules$$serverMiddl = modules.$serverMiddlewares,
          $serverMiddlewares = _modules$$serverMiddl === void 0 ? [] : _modules$$serverMiddl;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator($serverMiddlewares), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _middleware4 = _step2.value;
          koa.use(_middleware4);
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
    } // Register api routes

    {
      var moduleNames = _Object$keys(modules).filter(function (name) {
        return !/^\$/.test(name);
      });

      var _modules$$before = modules.$before,
          $before = _modules$$before === void 0 ? null : _modules$$before,
          _modules$$after = modules.$after,
          $after = _modules$$after === void 0 ? null : _modules$$after;
      var moduleRouter = AKoa.newRouter();
      moduleRouter.head('/',
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
      var $specs = moduleNames.reduce(function ($specs, moduleName) {
        return _Object$assign($specs, _defineProperty({}, moduleName, moduleSpec(modules[moduleName])));
      }, {});
      moduleRouter.options('/',
      /*#__PURE__*/
      function () {
        var _specs = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee2(ctx) {
          var specId;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  specId = uuid.v4();
                  ctx.body = {
                    data: {
                      type: 'specs',
                      id: specId,
                      attributes: _Object$assign($specs, modules.$specs || {})
                    }
                  };

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function specs(_x2) {
          return _specs.apply(this, arguments);
        };
      }());
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(moduleNames), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _moduleName = _step3.value;
          var moduleApi = api(_moduleName, modules[_moduleName], {
            $before: $before,
            $after: $after
          });
          moduleRouter.use.apply(moduleRouter, ["/".concat(spinalcase(_moduleName))].concat(_toConsumableArray(moduleApi)));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      router.use($pathname, moduleRouter.routes(), moduleRouter.allowedMethods());
    }
  });
  koa.use(router.routes());
  return koa;
}

module.exports = app;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJyYW5nZSIsInJlcXVpcmUiLCJBS29hIiwidXVpZCIsImFzc2VydCIsImFwaSIsInNwaW5hbGNhc2UiLCJtb2R1bGVTcGVjIiwiZXhjZXB0aW9uTWlkZGxld2FyZSIsImJvZHlNaWRkbGV3YXJlIiwiREVGQVVMVF9VUkwiLCJhcHAiLCJtb2R1bGVzIiwib2siLCJrb2EiLCJuZXdBcHAiLCJyb3V0ZXIiLCJuZXdSb3V0ZXIiLCJjb25jYXQiLCJmb3JFYWNoIiwiJHBhdGhuYW1lIiwiJGpzb25MaW1pdCIsIm1pZGRsZXdhcmVzIiwianNvbkxpbWl0IiwibWlkZGxld2FyZSIsInVzZSIsIiRtaWRkbGV3YXJlcyIsIiRzZXJ2ZXJNaWRkbGV3YXJlcyIsIm1vZHVsZU5hbWVzIiwiZmlsdGVyIiwibmFtZSIsInRlc3QiLCIkYmVmb3JlIiwiJGFmdGVyIiwibW9kdWxlUm91dGVyIiwiaGVhZCIsImN0eCIsImJvZHkiLCJrbm9jayIsIiRzcGVjcyIsInJlZHVjZSIsIm1vZHVsZU5hbWUiLCJvcHRpb25zIiwic3BlY0lkIiwidjQiLCJkYXRhIiwidHlwZSIsImlkIiwiYXR0cmlidXRlcyIsInNwZWNzIiwibW9kdWxlQXBpIiwicm91dGVzIiwiYWxsb3dlZE1ldGhvZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLFdBQVIsQ0FBZDs7ZUFDZUEsUUFBUSxNQUFSLEM7SUFBUkMsSSxZQUFBQSxJOztBQUNQLElBQU1DLE9BQU9GLFFBQVEsTUFBUixDQUFiOztBQUNBLElBQU1HLFNBQVNILFFBQVEsUUFBUixDQUFmOztBQUNBLElBQU1JLE1BQU1KLFFBQVEsT0FBUixDQUFaOztnQkFDcUJBLFFBQVEsWUFBUixDO0lBQWRLLFUsYUFBQUEsVTs7QUFDUCxJQUFNQyxhQUFhTixRQUFRLHNCQUFSLENBQW5COztnQkFDOENBLFFBQVEsa0JB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LCJzb3VyY2VSb290IjoiLi4vLi4vbGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGUgYW4gYXBwXG4gKiBAZnVuY3Rpb24gYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlcyAtIEFQSSBtb2R1bGVzXG4gKiBAcmV0dXJucyB7S29hfSAtIEtvYSBhcHBcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHJhbmdlID0gcmVxdWlyZSgna29hLXJhbmdlJylcbmNvbnN0IHtBS29hfSA9IHJlcXVpcmUoJ2Frb2EnKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IGFwaSA9IHJlcXVpcmUoJy4vYXBpJylcbmNvbnN0IHtzcGluYWxjYXNlfSA9IHJlcXVpcmUoJ3N0cmluZ2Nhc2UnKVxuY29uc3QgbW9kdWxlU3BlYyA9IHJlcXVpcmUoJy4vaGVscGVyL21vZHVsZV9zcGVjJylcbmNvbnN0IHtleGNlcHRpb25NaWRkbGV3YXJlLCBib2R5TWlkZGxld2FyZX0gPSByZXF1aXJlKCdha29hL21pZGRsZXdhcmVzJylcbmNvbnN0IHtERUZBVUxUX1VSTH0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG4vKiogQGxlbmRzIGFwcCAqL1xuZnVuY3Rpb24gYXBwIChtb2R1bGVzKSB7XG4gIGFzc2VydC5vayhtb2R1bGVzLCAnbW9kdWxlcyBpcyByZXF1aXJlZCcpXG4gIGNvbnN0IGtvYSA9IEFLb2EubmV3QXBwKFtyYW5nZV0pXG4gIGNvbnN0IHJvdXRlciA9IEFLb2EubmV3Um91dGVyKClcbiAgbW9kdWxlcyA9IFtdLmNvbmNhdChtb2R1bGVzIHx8IFtdKVxuICBtb2R1bGVzLmZvckVhY2goKG1vZHVsZXMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAkcGF0aG5hbWUgPSBERUZBVUxUX1VSTCxcbiAgICAgICRqc29uTGltaXQgPSAnNG1iJ1xuICAgIH0gPSBtb2R1bGVzXG5cbiAgICAvLyBSZWdpc3RlciBidWlsZC1pbiBtaWRkbGV3YXJlc1xuICAgIHtcbiAgICAgIGNvbnN0IG1pZGRsZXdhcmVzID0gW1xuICAgICAgICBleGNlcHRpb25NaWRkbGV3YXJlKCksXG4gICAgICAgIGJvZHlNaWRkbGV3YXJlKHtcbiAgICAgICAgICBqc29uTGltaXQ6ICRqc29uTGltaXRcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICAgIGZvciAoY29uc3QgbWlkZGxld2FyZSBvZiBtaWRkbGV3YXJlcykge1xuICAgICAgICByb3V0ZXIudXNlKCRwYXRobmFtZSwgbWlkZGxld2FyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWdpc3RlciBjdXN0b20gbWlkZGxld2FyZXNcbiAgICB7XG4gICAgICBjb25zdCB7JG1pZGRsZXdhcmVzID0gW119ID0gbW9kdWxlc1xuICAgICAgZm9yIChjb25zdCBtaWRkbGV3YXJlIG9mICRtaWRkbGV3YXJlcykge1xuICAgICAgICByb3V0ZXIudXNlKCRwYXRobmFtZSwgbWlkZGxld2FyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWdpc3RlciBjdXN0b20gc2VydmVyLWxldmVsIG1pZGRsZXdhcmVzXG4gICAge1xuICAgICAgY29uc3QgeyRzZXJ2ZXJNaWRkbGV3YXJlcyA9IFtdfSA9IG1vZHVsZXNcbiAgICAgIGZvciAoY29uc3QgbWlkZGxld2FyZSBvZiAkc2VydmVyTWlkZGxld2FyZXMpIHtcbiAgICAgICAga29hLnVzZShtaWRkbGV3YXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGFwaSByb3V0ZXNcbiAgICB7XG4gICAgICBjb25zdCBtb2R1bGVOYW1lcyA9IE9iamVjdC5rZXlzKG1vZHVsZXMpLmZpbHRlcigobmFtZSkgPT4gIS9eXFwkLy50ZXN0KG5hbWUpKVxuICAgICAgY29uc3Qge1xuICAgICAgICAkYmVmb3JlID0gbnVsbCxcbiAgICAgICAgJGFmdGVyID0gbnVsbFxuICAgICAgfSA9IG1vZHVsZXNcbiAgICAgIGNvbnN0IG1vZHVsZVJvdXRlciA9IEFLb2EubmV3Um91dGVyKClcbiAgICAgIG1vZHVsZVJvdXRlci5oZWFkKCcvJywgYXN5bmMgZnVuY3Rpb24ga25vY2sgKGN0eCkge1xuICAgICAgICBjdHguYm9keSA9IG51bGxcbiAgICAgIH0pXG4gICAgICBjb25zdCAkc3BlY3MgPSBtb2R1bGVOYW1lcy5yZWR1Y2UoKCRzcGVjcywgbW9kdWxlTmFtZSkgPT4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgJHNwZWNzLCB7W21vZHVsZU5hbWVdOiBtb2R1bGVTcGVjKG1vZHVsZXNbbW9kdWxlTmFtZV0pfVxuICAgICAgKSwge30pXG4gICAgICBtb2R1bGVSb3V0ZXIub3B0aW9ucygnLycsIGFzeW5jIGZ1bmN0aW9uIHNwZWNzIChjdHgpIHtcbiAgICAgICAgY29uc3Qgc3BlY0lkID0gdXVpZC52NCgpXG4gICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzcGVjcycsXG4gICAgICAgICAgICBpZDogc3BlY0lkLFxuICAgICAgICAgICAgYXR0cmlidXRlczogT2JqZWN0LmFzc2lnbigkc3BlY3MsIG1vZHVsZXMuJHNwZWNzIHx8IHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgZm9yIChjb25zdCBtb2R1bGVOYW1lIG9mIG1vZHVsZU5hbWVzKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZUFwaSA9IGFwaShtb2R1bGVOYW1lLCBtb2R1bGVzW21vZHVsZU5hbWVdLCB7XG4gICAgICAgICAgJGJlZm9yZSwgJGFmdGVyXG4gICAgICAgIH0pXG4gICAgICAgIG1vZHVsZVJvdXRlci51c2UoYC8ke3NwaW5hbGNhc2UobW9kdWxlTmFtZSl9YCwgLi4ubW9kdWxlQXBpKVxuICAgICAgfVxuICAgICAgcm91dGVyLnVzZSgkcGF0aG5hbWUsIG1vZHVsZVJvdXRlci5yb3V0ZXMoKSwgbW9kdWxlUm91dGVyLmFsbG93ZWRNZXRob2RzKCkpXG4gICAgfVxuICB9KVxuICBrb2EudXNlKHJvdXRlci5yb3V0ZXMoKSlcblxuICByZXR1cm4ga29hXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwXG4iXX0=