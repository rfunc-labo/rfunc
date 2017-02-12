/**
 * Create an app
 * @function app
 * @param {Object} modules - API modules
 * @returns {Koa} - Koa app
 */
'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('akoa'),
    AKoa = _require.AKoa;

var co = require('co');
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
  var koa = AKoa.newApp([]);
  var router = AKoa.newRouter();
  modules = [].concat(modules || []);
  modules.forEach(function (modules) {
    var _modules$$pathname = modules.$pathname,
        $pathname = _modules$$pathname === undefined ? DEFAULT_URL : _modules$$pathname,
        _modules$$jsonLimit = modules.$jsonLimit,
        $jsonLimit = _modules$$jsonLimit === undefined ? '1mb' : _modules$$jsonLimit;

    // Register build-in middlewares

    {
      var middlewares = [exceptionMiddleware(), bodyMiddleware({
        jsonLimit: $jsonLimit
      })];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(middlewares), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var middleware = _step.value;

          router.use($pathname, middleware);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    // Register custom middlewares
    {
      var _modules$$middlewares = modules.$middlewares,
          $middlewares = _modules$$middlewares === undefined ? [] : _modules$$middlewares;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)($middlewares), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _middleware = _step2.value;

          router.use($pathname, _middleware);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    // Register custom server-level middlewares
    {
      var _modules$$serverMiddl = modules.$serverMiddlewares,
          $serverMiddlewares = _modules$$serverMiddl === undefined ? [] : _modules$$serverMiddl;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)($serverMiddlewares), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _middleware2 = _step3.value;

          koa.use(_middleware2);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    // Register api routes
    {
      (function () {
        var moduleNames = (0, _keys2.default)(modules).filter(function (name) {
          return !/^\$/.test(name);
        });
        var _modules$$before = modules.$before,
            $before = _modules$$before === undefined ? null : _modules$$before,
            _modules$$after = modules.$after,
            $after = _modules$$after === undefined ? null : _modules$$after;

        var moduleRouter = AKoa.newRouter();
        moduleRouter.head('/', co.wrap(_regenerator2.default.mark(function knock(ctx) {
          return _regenerator2.default.wrap(function knock$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  ctx.body = null;

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, knock, this);
        })));
        var $specs = moduleNames.reduce(function ($specs, moduleName) {
          return (0, _assign2.default)($specs, (0, _defineProperty3.default)({}, moduleName, moduleSpec(modules[moduleName])));
        }, {});
        moduleRouter.options('/', co.wrap(_regenerator2.default.mark(function specs(ctx) {
          var specId;
          return _regenerator2.default.wrap(function specs$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  specId = uuid.v4();

                  ctx.body = {
                    data: {
                      type: 'specs',
                      id: specId,
                      attributes: (0, _assign2.default)($specs, modules.$specs || {})
                    }
                  };

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, specs, this);
        })));

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, _getIterator3.default)(moduleNames), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var moduleName = _step4.value;

            var moduleApi = api(moduleName, modules[moduleName], {
              $before: $before, $after: $after
            });
            moduleRouter.use.apply(moduleRouter, ['/' + spinalcase(moduleName)].concat((0, _toConsumableArray3.default)(moduleApi)));
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        router.use($pathname, moduleRouter.routes(), moduleRouter.allowedMethods());
      })();
    }
  });
  koa.use(router.routes());

  return koa;
}

module.exports = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQUtvYSIsImNvIiwidXVpZCIsImFzc2VydCIsImFwaSIsInNwaW5hbGNhc2UiLCJtb2R1bGVTcGVjIiwiZXhjZXB0aW9uTWlkZGxld2FyZSIsImJvZHlNaWRkbGV3YXJlIiwiREVGQVVMVF9VUkwiLCJhcHAiLCJtb2R1bGVzIiwib2siLCJrb2EiLCJuZXdBcHAiLCJyb3V0ZXIiLCJuZXdSb3V0ZXIiLCJjb25jYXQiLCJmb3JFYWNoIiwiJHBhdGhuYW1lIiwiJGpzb25MaW1pdCIsIm1pZGRsZXdhcmVzIiwianNvbkxpbWl0IiwibWlkZGxld2FyZSIsInVzZSIsIiRtaWRkbGV3YXJlcyIsIiRzZXJ2ZXJNaWRkbGV3YXJlcyIsIm1vZHVsZU5hbWVzIiwiZmlsdGVyIiwibmFtZSIsInRlc3QiLCIkYmVmb3JlIiwiJGFmdGVyIiwibW9kdWxlUm91dGVyIiwiaGVhZCIsIndyYXAiLCJrbm9jayIsImN0eCIsImJvZHkiLCIkc3BlY3MiLCJyZWR1Y2UiLCJtb2R1bGVOYW1lIiwib3B0aW9ucyIsInNwZWNzIiwic3BlY0lkIiwidjQiLCJkYXRhIiwidHlwZSIsImlkIiwiYXR0cmlidXRlcyIsIm1vZHVsZUFwaSIsInJvdXRlcyIsImFsbG93ZWRNZXRob2RzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBRWlCQSxRQUFRLE1BQVIsQztJQUFUQyxJLFlBQUFBLEk7O0FBQ1IsSUFBTUMsS0FBS0YsUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNRyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1JLFNBQVNKLFFBQVEsUUFBUixDQUFmO0FBQ0EsSUFBTUssTUFBTUwsUUFBUSxPQUFSLENBQVo7O2dCQUN1QkEsUUFBUSxZQUFSLEM7SUFBZk0sVSxhQUFBQSxVOztBQUNSLElBQU1DLGFBQWFQLFFBQVEsc0JBQVIsQ0FBbkI7O2dC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LEdBQVA7QUFDRDs7QUFFRHdDLE9BQU9DLE9BQVAsR0FBaUI1QyxHQUFqQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoibGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGUgYW4gYXBwXG4gKiBAZnVuY3Rpb24gYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlcyAtIEFQSSBtb2R1bGVzXG4gKiBAcmV0dXJucyB7S29hfSAtIEtvYSBhcHBcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgQUtvYSB9ID0gcmVxdWlyZSgnYWtvYScpXG5jb25zdCBjbyA9IHJlcXVpcmUoJ2NvJylcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCBhcGkgPSByZXF1aXJlKCcuL2FwaScpXG5jb25zdCB7IHNwaW5hbGNhc2UgfSA9IHJlcXVpcmUoJ3N0cmluZ2Nhc2UnKVxuY29uc3QgbW9kdWxlU3BlYyA9IHJlcXVpcmUoJy4vaGVscGVyL21vZHVsZV9zcGVjJylcbmNvbnN0IHsgZXhjZXB0aW9uTWlkZGxld2FyZSwgYm9keU1pZGRsZXdhcmUgfSA9IHJlcXVpcmUoJ2Frb2EvbWlkZGxld2FyZXMnKVxuY29uc3QgeyBERUZBVUxUX1VSTCB9ID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJylcblxuLyoqIEBsZW5kcyBhcHAgKi9cbmZ1bmN0aW9uIGFwcCAobW9kdWxlcykge1xuICBhc3NlcnQub2sobW9kdWxlcywgJ21vZHVsZXMgaXMgcmVxdWlyZWQnKVxuICBsZXQga29hID0gQUtvYS5uZXdBcHAoW10pXG4gIGxldCByb3V0ZXIgPSBBS29hLm5ld1JvdXRlcigpXG4gIG1vZHVsZXMgPSBbXS5jb25jYXQobW9kdWxlcyB8fCBbXSlcbiAgbW9kdWxlcy5mb3JFYWNoKChtb2R1bGVzKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgICRwYXRobmFtZSA9IERFRkFVTFRfVVJMLFxuICAgICAgJGpzb25MaW1pdCA9ICcxbWInXG4gICAgfSA9IG1vZHVsZXNcblxuICAgIC8vIFJlZ2lzdGVyIGJ1aWxkLWluIG1pZGRsZXdhcmVzXG4gICAge1xuICAgICAgbGV0IG1pZGRsZXdhcmVzID0gW1xuICAgICAgICBleGNlcHRpb25NaWRkbGV3YXJlKCksXG4gICAgICAgIGJvZHlNaWRkbGV3YXJlKHtcbiAgICAgICAgICBqc29uTGltaXQ6ICRqc29uTGltaXRcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICAgIGZvciAobGV0IG1pZGRsZXdhcmUgb2YgbWlkZGxld2FyZXMpIHtcbiAgICAgICAgcm91dGVyLnVzZSgkcGF0aG5hbWUsIG1pZGRsZXdhcmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVnaXN0ZXIgY3VzdG9tIG1pZGRsZXdhcmVzXG4gICAge1xuICAgICAgbGV0IHsgJG1pZGRsZXdhcmVzID0gW10gfSA9IG1vZHVsZXNcbiAgICAgIGZvciAobGV0IG1pZGRsZXdhcmUgb2YgJG1pZGRsZXdhcmVzKSB7XG4gICAgICAgIHJvdXRlci51c2UoJHBhdGhuYW1lLCBtaWRkbGV3YXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGN1c3RvbSBzZXJ2ZXItbGV2ZWwgbWlkZGxld2FyZXNcbiAgICB7XG4gICAgICBsZXQgeyAkc2VydmVyTWlkZGxld2FyZXMgPSBbXSB9ID0gbW9kdWxlc1xuICAgICAgZm9yIChsZXQgbWlkZGxld2FyZSBvZiAkc2VydmVyTWlkZGxld2FyZXMpIHtcbiAgICAgICAga29hLnVzZShtaWRkbGV3YXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGFwaSByb3V0ZXNcbiAgICB7XG4gICAgICBsZXQgbW9kdWxlTmFtZXMgPSBPYmplY3Qua2V5cyhtb2R1bGVzKS5maWx0ZXIoKG5hbWUpID0+ICEvXlxcJC8udGVzdChuYW1lKSlcbiAgICAgIGxldCB7XG4gICAgICAgICRiZWZvcmUgPSBudWxsLFxuICAgICAgICAkYWZ0ZXIgPSBudWxsXG4gICAgICB9ID0gbW9kdWxlc1xuICAgICAgbGV0IG1vZHVsZVJvdXRlciA9IEFLb2EubmV3Um91dGVyKClcbiAgICAgIG1vZHVsZVJvdXRlci5oZWFkKCcvJywgY28ud3JhcChmdW5jdGlvbiAqIGtub2NrIChjdHgpIHtcbiAgICAgICAgY3R4LmJvZHkgPSBudWxsXG4gICAgICB9KSlcbiAgICAgIGxldCAkc3BlY3MgPSBtb2R1bGVOYW1lcy5yZWR1Y2UoKCRzcGVjcywgbW9kdWxlTmFtZSkgPT4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgJHNwZWNzLCB7IFttb2R1bGVOYW1lXTogbW9kdWxlU3BlYyhtb2R1bGVzWyBtb2R1bGVOYW1lIF0pIH1cbiAgICAgICksIHt9KVxuICAgICAgbW9kdWxlUm91dGVyLm9wdGlvbnMoJy8nLCBjby53cmFwKGZ1bmN0aW9uICogc3BlY3MgKGN0eCkge1xuICAgICAgICBsZXQgc3BlY0lkID0gdXVpZC52NCgpXG4gICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzcGVjcycsXG4gICAgICAgICAgICBpZDogc3BlY0lkLFxuICAgICAgICAgICAgYXR0cmlidXRlczogT2JqZWN0LmFzc2lnbigkc3BlY3MsIG1vZHVsZXMuJHNwZWNzIHx8IHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpXG5cbiAgICAgIGZvciAobGV0IG1vZHVsZU5hbWUgb2YgbW9kdWxlTmFtZXMpIHtcbiAgICAgICAgbGV0IG1vZHVsZUFwaSA9IGFwaShtb2R1bGVOYW1lLCBtb2R1bGVzWyBtb2R1bGVOYW1lIF0sIHtcbiAgICAgICAgICAkYmVmb3JlLCAkYWZ0ZXJcbiAgICAgICAgfSlcbiAgICAgICAgbW9kdWxlUm91dGVyLnVzZShgLyR7c3BpbmFsY2FzZShtb2R1bGVOYW1lKX1gLCAuLi5tb2R1bGVBcGkpXG4gICAgICB9XG4gICAgICByb3V0ZXIudXNlKCRwYXRobmFtZSwgbW9kdWxlUm91dGVyLnJvdXRlcygpLCBtb2R1bGVSb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKSlcbiAgICB9XG4gIH0pXG4gIGtvYS51c2Uocm91dGVyLnJvdXRlcygpKVxuXG4gIHJldHVybiBrb2Fcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcHBcbiJdfQ==