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
    bodyMiddleware = _require3.bodyMiddleware,
    staticMiddleware = _require3.staticMiddleware;

var routeMiddleware = require('./middlewares/route_middleware');

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
        $jsonLimit = _modules$$jsonLimit === void 0 ? '4mb' : _modules$$jsonLimit,
        _modules$$endpoints = modules.$endpoints,
        $endpoints = _modules$$endpoints === void 0 ? {} : _modules$$endpoints,
        _modules$$static = modules.$static,
        $static = _modules$$static === void 0 ? 'public' : _modules$$static; // Register build-in middlewares

    {
      var middlewares = [staticMiddleware($static), exceptionMiddleware(), bodyMiddleware({
        jsonLimit: $jsonLimit
      }), routeMiddleware($endpoints)];

      for (var _i = 0; _i < middlewares.length; _i++) {
        var middleware = middlewares[_i];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator([].concat(middleware)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _m = _step.value;
            koa.use(_m);
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
      }
    } // Register custom middlewares

    {
      var _modules$$middlewares = modules.$middlewares,
          $middlewares = _modules$$middlewares === void 0 ? [] : _modules$$middlewares;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator($middlewares), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _middleware2 = _step2.value;
          router.use($pathname, _middleware2);
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
    } // Register custom server-level middlewares

    {
      var _modules$$serverMiddl = modules.$serverMiddlewares,
          $serverMiddlewares = _modules$$serverMiddl === void 0 ? [] : _modules$$serverMiddl;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator($serverMiddlewares), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _middleware4 = _step3.value;
          koa.use(_middleware4);
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
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _getIterator(moduleNames), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _moduleName = _step4.value;
          var moduleApi = api(_moduleName, modules[_moduleName], {
            $before: $before,
            $after: $after
          });
          moduleRouter.use.apply(moduleRouter, ["/".concat(spinalcase(_moduleName))].concat(_toConsumableArray(moduleApi)));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJyYW5nZSIsInJlcXVpcmUiLCJBS29hIiwidXVpZCIsImFzc2VydCIsImFwaSIsInNwaW5hbGNhc2UiLCJtb2R1bGVTcGVjIiwiZXhjZXB0aW9uTWlkZGxld2FyZSIsImJvZHlNaWRkbGV3YXJlIiwic3RhdGljTWlkZGxld2FyZSIsInJvdXRlTWlkZGxld2FyZSIsIkRFRkFVTFRfVVJMIiwiYXBwIiwibW9kdWxlcyIsIm9rIiwia29hIiwibmV3QXBwIiwicm91dGVyIiwibmV3Um91dGVyIiwiY29uY2F0IiwiZm9yRWFjaCIsIiRwYXRobmFtZSIsIiRqc29uTGltaXQiLCIkZW5kcG9pbnRzIiwiJHN0YXRpYyIsIm1pZGRsZXdhcmVzIiwianNvbkxpbWl0IiwibWlkZGxld2FyZSIsIm0iLCJ1c2UiLCIkbWlkZGxld2FyZXMiLCIkc2VydmVyTWlkZGxld2FyZXMiLCJtb2R1bGVOYW1lcyIsImZpbHRlciIsIm5hbWUiLCJ0ZXN0IiwiJGJlZm9yZSIsIiRhZnRlciIsIm1vZHVsZVJvdXRlciIsImhlYWQiLCJjdHgiLCJib2R5Iiwia25vY2siLCIkc3BlY3MiLCJyZWR1Y2UiLCJtb2R1bGVOYW1lIiwib3B0aW9ucyIsInNwZWNJZCIsInY0IiwiZGF0YSIsInR5cGUiLCJpZCIsImF0dHJpYnV0ZXMiLCJzcGVjcyIsIm1vZHVsZUFwaSIsInJvdXRlcyIsImFsbG93ZWRNZXRob2RzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxXQUFSLENBQWQ7O2VBQ2VBLFFBQVEsTUFBUixDO0lBQVJDLEksWUFBQUEsSTs7QUFDUCxJQUFNQyxPQUFPRixRQUFRLE1BQVIsQ0FBYjs7QUFDQSxJQUFNRyxTQUFTSCxRQUFRLFFBQVIsQ0FBZjs7QUFDQSxJQUFNSSxNQUFNSixRQUFRLE9BQVIsQ0FBWjs7Z0JBQ3FCQSxRQUFRLFlBQVIsQztJQUFk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LGNBQTNCYSxXQUEyQjtBQUNwQyxjQUFNUyxZQUFZbEQsSUFBSXlDLFdBQUosRUFBZ0JoQyxRQUFRZ0MsV0FBUixDQUFoQixFQUFxQztBQUNyRFQsNEJBRHFEO0FBQzVDQztBQUQ0QyxXQUFyQyxDQUFsQjtBQUdBQyx1QkFBYVQsR0FBYixpQ0FBcUJ4QixXQUFXd0MsV0FBWCxDQUFyQiw2QkFBa0RTLFNBQWxEO0FBQ0Q7QUE3Qkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE4QkVyQyxhQUFPWSxHQUFQLENBQVdSLFNBQVgsRUFBc0JpQixhQUFhaUIsTUFBYixFQUF0QixFQUE2Q2pCLGFBQWFrQixjQUFiLEVBQTdDO0FBQ0Q7QUFDRixHQTFFRDtBQTJFQXpDLE1BQUljLEdBQUosQ0FBUVosT0FBT3NDLE1BQVAsRUFBUjtBQUVBLFNBQU94QyxHQUFQO0FBQ0Q7O0FBRUQwQyxPQUFPQyxPQUFQLEdBQWlCOUMsR0FBakIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL2xpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlIGFuIGFwcFxuICogQGZ1bmN0aW9uIGFwcFxuICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZXMgLSBBUEkgbW9kdWxlc1xuICogQHJldHVybnMge0tvYX0gLSBLb2EgYXBwXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCByYW5nZSA9IHJlcXVpcmUoJ2tvYS1yYW5nZScpXG5jb25zdCB7QUtvYX0gPSByZXF1aXJlKCdha29hJylcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCBhcGkgPSByZXF1aXJlKCcuL2FwaScpXG5jb25zdCB7c3BpbmFsY2FzZX0gPSByZXF1aXJlKCdzdHJpbmdjYXNlJylcbmNvbnN0IG1vZHVsZVNwZWMgPSByZXF1aXJlKCcuL2hlbHBlci9tb2R1bGVfc3BlYycpXG5jb25zdCB7ZXhjZXB0aW9uTWlkZGxld2FyZSwgYm9keU1pZGRsZXdhcmUsIHN0YXRpY01pZGRsZXdhcmV9ID0gcmVxdWlyZSgnYWtvYS9taWRkbGV3YXJlcycpXG5jb25zdCByb3V0ZU1pZGRsZXdhcmUgPSByZXF1aXJlKCcuL21pZGRsZXdhcmVzL3JvdXRlX21pZGRsZXdhcmUnKVxuY29uc3Qge0RFRkFVTFRfVVJMfSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpXG5cbi8qKiBAbGVuZHMgYXBwICovXG5mdW5jdGlvbiBhcHAgKG1vZHVsZXMpIHtcbiAgYXNzZXJ0Lm9rKG1vZHVsZXMsICdtb2R1bGVzIGlzIHJlcXVpcmVkJylcbiAgY29uc3Qga29hID0gQUtvYS5uZXdBcHAoW3JhbmdlXSlcbiAgY29uc3Qgcm91dGVyID0gQUtvYS5uZXdSb3V0ZXIoKVxuICBtb2R1bGVzID0gW10uY29uY2F0KG1vZHVsZXMgfHwgW10pXG4gIG1vZHVsZXMuZm9yRWFjaCgobW9kdWxlcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICRwYXRobmFtZSA9IERFRkFVTFRfVVJMLFxuICAgICAgJGpzb25MaW1pdCA9ICc0bWInLFxuICAgICAgJGVuZHBvaW50cyA9IHt9LFxuICAgICAgJHN0YXRpYyA9ICdwdWJsaWMnXG4gICAgfSA9IG1vZHVsZXNcblxuICAgIC8vIFJlZ2lzdGVyIGJ1aWxkLWluIG1pZGRsZXdhcmVzXG4gICAge1xuICAgICAgY29uc3QgbWlkZGxld2FyZXMgPSBbXG4gICAgICAgIHN0YXRpY01pZGRsZXdhcmUoJHN0YXRpYyksXG4gICAgICAgIGV4Y2VwdGlvbk1pZGRsZXdhcmUoKSxcbiAgICAgICAgYm9keU1pZGRsZXdhcmUoe1xuICAgICAgICAgIGpzb25MaW1pdDogJGpzb25MaW1pdFxuICAgICAgICB9KSxcbiAgICAgICAgcm91dGVNaWRkbGV3YXJlKCRlbmRwb2ludHMpLFxuICAgICAgXVxuICAgICAgZm9yIChjb25zdCBtaWRkbGV3YXJlIG9mIG1pZGRsZXdhcmVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBbXS5jb25jYXQobWlkZGxld2FyZSkpIHtcbiAgICAgICAgICBrb2EudXNlKG0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWdpc3RlciBjdXN0b20gbWlkZGxld2FyZXNcbiAgICB7XG4gICAgICBjb25zdCB7JG1pZGRsZXdhcmVzID0gW119ID0gbW9kdWxlc1xuICAgICAgZm9yIChjb25zdCBtaWRkbGV3YXJlIG9mICRtaWRkbGV3YXJlcykge1xuICAgICAgICByb3V0ZXIudXNlKCRwYXRobmFtZSwgbWlkZGxld2FyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWdpc3RlciBjdXN0b20gc2VydmVyLWxldmVsIG1pZGRsZXdhcmVzXG4gICAge1xuICAgICAgY29uc3QgeyRzZXJ2ZXJNaWRkbGV3YXJlcyA9IFtdfSA9IG1vZHVsZXNcbiAgICAgIGZvciAoY29uc3QgbWlkZGxld2FyZSBvZiAkc2VydmVyTWlkZGxld2FyZXMpIHtcbiAgICAgICAga29hLnVzZShtaWRkbGV3YXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGFwaSByb3V0ZXNcbiAgICB7XG4gICAgICBjb25zdCBtb2R1bGVOYW1lcyA9IE9iamVjdC5rZXlzKG1vZHVsZXMpLmZpbHRlcigobmFtZSkgPT4gIS9eXFwkLy50ZXN0KG5hbWUpKVxuICAgICAgY29uc3Qge1xuICAgICAgICAkYmVmb3JlID0gbnVsbCxcbiAgICAgICAgJGFmdGVyID0gbnVsbFxuICAgICAgfSA9IG1vZHVsZXNcbiAgICAgIGNvbnN0IG1vZHVsZVJvdXRlciA9IEFLb2EubmV3Um91dGVyKClcbiAgICAgIG1vZHVsZVJvdXRlci5oZWFkKCcvJywgYXN5bmMgZnVuY3Rpb24ga25vY2sgKGN0eCkge1xuICAgICAgICBjdHguYm9keSA9IG51bGxcbiAgICAgIH0pXG4gICAgICBjb25zdCAkc3BlY3MgPSBtb2R1bGVOYW1lcy5yZWR1Y2UoKCRzcGVjcywgbW9kdWxlTmFtZSkgPT4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgJHNwZWNzLCB7W21vZHVsZU5hbWVdOiBtb2R1bGVTcGVjKG1vZHVsZXNbbW9kdWxlTmFtZV0pfVxuICAgICAgKSwge30pXG4gICAgICBtb2R1bGVSb3V0ZXIub3B0aW9ucygnLycsIGFzeW5jIGZ1bmN0aW9uIHNwZWNzIChjdHgpIHtcbiAgICAgICAgY29uc3Qgc3BlY0lkID0gdXVpZC52NCgpXG4gICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzcGVjcycsXG4gICAgICAgICAgICBpZDogc3BlY0lkLFxuICAgICAgICAgICAgYXR0cmlidXRlczogT2JqZWN0LmFzc2lnbigkc3BlY3MsIG1vZHVsZXMuJHNwZWNzIHx8IHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgZm9yIChjb25zdCBtb2R1bGVOYW1lIG9mIG1vZHVsZU5hbWVzKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZUFwaSA9IGFwaShtb2R1bGVOYW1lLCBtb2R1bGVzW21vZHVsZU5hbWVdLCB7XG4gICAgICAgICAgJGJlZm9yZSwgJGFmdGVyXG4gICAgICAgIH0pXG4gICAgICAgIG1vZHVsZVJvdXRlci51c2UoYC8ke3NwaW5hbGNhc2UobW9kdWxlTmFtZSl9YCwgLi4ubW9kdWxlQXBpKVxuICAgICAgfVxuICAgICAgcm91dGVyLnVzZSgkcGF0aG5hbWUsIG1vZHVsZVJvdXRlci5yb3V0ZXMoKSwgbW9kdWxlUm91dGVyLmFsbG93ZWRNZXRob2RzKCkpXG4gICAgfVxuICB9KVxuICBrb2EudXNlKHJvdXRlci5yb3V0ZXMoKSlcblxuICByZXR1cm4ga29hXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwXG4iXX0=