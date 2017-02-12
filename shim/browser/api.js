/**
 * Define an api
 * @function api
 * @param {string} moduleName - Name of module
 * @param {object} methods - Method definitions
 * @param {Object} [options] - Optional settings
 * @returns {function[]} - Koa handlers
 */
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('akoa'),
    AKoa = _require.AKoa;

var co = require('co');
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
  router.head('/', co.wrap(_regenerator2.default.mark(function knock(ctx) {
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
  var $moduleBefore = options.$before;
  var $moduleAfter = options.$after;
  var _module = module,
      $before = _module.$before,
      $after = _module.$after,
      $middlewares = _module.$middlewares;

  var specId = uuid.v4();
  router.options('/', co.wrap(_regenerator2.default.mark(function spec(ctx) {
    return _regenerator2.default.wrap(function spec$(_context2) {
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
          case 'end':
            return _context2.stop();
        }
      }
    }, spec, this);
  })));
  var methodNames = (0, _keys2.default)(module).filter(function (name) {
    return !/^\$/.test(name);
  });
  var methods = methodNames.reduce(function (methods, name) {
    return (0, _assign2.default)(methods, (0, _defineProperty3.default)({}, name, module[name]));
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
    for (var _iterator = (0, _getIterator3.default)($middlewares || []), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var middleware = _step.value;

      router.use(middleware);
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(methodNames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var methodName = _step2.value;

      var isReserved = !!~RESERVED_METHODS.split(',').indexOf(methodName);
      if (isReserved) {
        throw new Error('[rfunc] Method name "' + methodName + '" is reserved and you cannot override it.');
      }
      var isPrivate = /^_/.test(methodName);
      if (isPrivate) {
        // Do not expose private methods
        continue;
      }
      var spinalUrl = '/' + spinalcase(methodName);
      var camelUrl = '/' + camelcase(methodName);

      var _endpoint = endpoint(moduleName, methodName),
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
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQUtvYSIsImNvIiwidXVpZCIsInNwaW5hbGNhc2UiLCJjYW1lbGNhc2UiLCJtb2R1bGVTcGVjIiwibW9kdWxlTm9ybWFsaXplIiwiUkVTRVJWRURfTUVUSE9EUyIsImludm9rZU1pZGRsZXdhcmUiLCJlbmRwb2ludCIsImFwaSIsIm1vZHVsZU5hbWUiLCJtb2R1bGUiLCJvcHRpb25zIiwicm91dGVyIiwibmV3Um91dGVyIiwiaGVhZCIsIndyYXAiLCJrbm9jayIsImN0eCIsImJvZHkiLCIkbW9kdWxlQmVmb3JlIiwiJGJlZm9yZSIsIiRtb2R1bGVBZnRlciIsIiRhZnRlciIsIiRtaWRkbGV3YXJlcyIsInNwZWNJZCIsInY0Iiwic3BlYyIsImRhdGEiLCJ0eXBlIiwiaWQiLCJhdHRyaWJ1dGVzIiwibWV0aG9kTmFtZXMiLCJmaWx0ZXIiLCJuYW1lIiwidGVzdCIsIm1ldGhvZHMiLCJyZWR1Y2UiLCJ1c2UiLCJiZWZvcmUiLCJhZnRlciIsIm1pZGRsZXdhcmUiLCJtZXRob2ROYW1lIiwiaXNSZXNlcnZlZCIsInNwbGl0IiwiaW5kZXhPZiIsIkVycm9yIiwiaXNQcml2YXRlIiwic3BpbmFsVXJsIiwiY2FtZWxVcmwiLCJpbnZva2UiLCJnZXQiLCJwb3N0IiwicmVkaXJlY3QiLCJyb3V0ZXMiLCJhbGxvd2VkTWV0aG9kcyIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFFaUJBLFFBQVEsTUFBUixDO0lBQVRDLEksWUFBQUEsSTs7QUFDUixJQUFNQyxLQUFLRixRQUFRLElBQVIsQ0FBWDtBQUNBLElBQU1HLE9BQU9ILFFBQVEsTUFBUixDQUFiOztnQkFFa0NBLFFBQVEsWUFBUixDO0lBQTFCSSxVLGFBQUFBLFU7SUFBWUMsUyxhQUFBQSxTOztBQUNwQixJQUFNQyxhQUFhTixRQUFRLHNCQUFSLENBQW5CO0FBQ0EsSUFBTU8sa0JBQWtCUCxR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LEtBQUtaLElBQUwsQ0FBVU8sVUFBVixDQUFoQjtBQUNBLFVBQUlLLFNBQUosRUFBZTtBQUNiO0FBQ0E7QUFDRDtBQUNELFVBQUlDLGtCQUFnQjlDLFdBQVd3QyxVQUFYLENBQXBCO0FBQ0EsVUFBSU8saUJBQWU5QyxVQUFVdUMsVUFBVixDQUFuQjs7QUFYa0Msc0JBYVZsQyxTQUFTRSxVQUFULEVBQXFCZ0MsVUFBckIsQ0FiVTtBQUFBLFVBYTVCekIsS0FiNEIsYUFhNUJBLEtBYjRCO0FBQUEsVUFhckJpQyxNQWJxQixhQWFyQkEsTUFicUI7O0FBZWxDckMsYUFBT0UsSUFBUCxDQUFZaUMsU0FBWixFQUF1Qi9CLEtBQXZCO0FBQ0FKLGFBQU9zQyxHQUFQLENBQVdILFNBQVgsRUFBc0JFLE1BQXRCO0FBQ0FyQyxhQUFPdUMsSUFBUCxDQUFZSixTQUFaLEVBQXVCRSxNQUF2QjtBQUNBckMsYUFBT3dDLFFBQVAsQ0FBZ0JKLFFBQWhCLEVBQTBCRCxTQUExQjtBQUNEO0FBakU2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtFOUMsU0FBTyxDQUNMbkMsT0FBT3lDLE1BQVAsRUFESyxFQUVMekMsT0FBTzBDLGNBQVAsRUFGSyxDQUFQO0FBSUQ7O0FBRUQ1QyxPQUFPNkMsT0FBUCxHQUFpQi9DLEdBQWpCIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZVJvb3QiOiJsaWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmluZSBhbiBhcGlcbiAqIEBmdW5jdGlvbiBhcGlcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIC0gTmFtZSBvZiBtb2R1bGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzIC0gTWV0aG9kIGRlZmluaXRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgc2V0dGluZ3NcbiAqIEByZXR1cm5zIHtmdW5jdGlvbltdfSAtIEtvYSBoYW5kbGVyc1xuICovXG4ndXNlIHN0cmljdCdcblxuY29uc3QgeyBBS29hIH0gPSByZXF1aXJlKCdha29hJylcbmNvbnN0IGNvID0gcmVxdWlyZSgnY28nKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuXG5jb25zdCB7IHNwaW5hbGNhc2UsIGNhbWVsY2FzZSB9ID0gcmVxdWlyZSgnc3RyaW5nY2FzZScpXG5jb25zdCBtb2R1bGVTcGVjID0gcmVxdWlyZSgnLi9oZWxwZXIvbW9kdWxlX3NwZWMnKVxuY29uc3QgbW9kdWxlTm9ybWFsaXplID0gcmVxdWlyZSgnLi9oZWxwZXIvbW9kdWxlX25vcm1hbGl6ZScpXG5cbmNvbnN0IHsgUkVTRVJWRURfTUVUSE9EUyB9ID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJylcbmNvbnN0IGludm9rZU1pZGRsZXdhcmUgPSByZXF1aXJlKCcuL21pZGRsZXdhcmVzL2ludm9rZV9taWRkbGV3YXJlJylcblxuY29uc3QgZW5kcG9pbnQgPSByZXF1aXJlKCcuL2VuZHBvaW50JylcblxuLyoqIEBsZW5kcyBhcGkgKi9cbmZ1bmN0aW9uIGFwaSAobW9kdWxlTmFtZSwgbW9kdWxlLCBvcHRpb25zID0ge30pIHtcbiAgbW9kdWxlID0gbW9kdWxlTm9ybWFsaXplKG1vZHVsZSlcblxuICBsZXQgcm91dGVyID0gQUtvYS5uZXdSb3V0ZXIoKVxuICByb3V0ZXIuaGVhZCgnLycsIGNvLndyYXAoZnVuY3Rpb24gKiBrbm9jayAoY3R4KSB7XG4gICAgY3R4LmJvZHkgPSBudWxsXG4gIH0pKVxuICBsZXQgJG1vZHVsZUJlZm9yZSA9IG9wdGlvbnMuJGJlZm9yZVxuICBsZXQgJG1vZHVsZUFmdGVyID0gb3B0aW9ucy4kYWZ0ZXJcbiAgbGV0IHtcbiAgICAkYmVmb3JlLFxuICAgICRhZnRlcixcbiAgICAkbWlkZGxld2FyZXNcbiAgfSA9IG1vZHVsZVxuICBsZXQgc3BlY0lkID0gdXVpZC52NCgpXG4gIHJvdXRlci5vcHRpb25zKCcvJywgY28ud3JhcChmdW5jdGlvbiAqIHNwZWMgKGN0eCkge1xuICAgIGN0eC5ib2R5ID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICB0eXBlOiAnc3BlY3MnLFxuICAgICAgICBpZDogc3BlY0lkLFxuICAgICAgICBhdHRyaWJ1dGVzOiBtb2R1bGVTcGVjKG1vZHVsZSlcbiAgICAgIH1cbiAgICB9XG4gIH0pKVxuICBsZXQgbWV0aG9kTmFtZXMgPSBPYmplY3Qua2V5cyhtb2R1bGUpLmZpbHRlcigobmFtZSkgPT4gIS9eXFwkLy50ZXN0KG5hbWUpKVxuICBsZXQgbWV0aG9kcyA9IG1ldGhvZE5hbWVzLnJlZHVjZSgobWV0aG9kcywgbmFtZSkgPT4gT2JqZWN0LmFzc2lnbihtZXRob2RzLCB7XG4gICAgW25hbWVdOiBtb2R1bGVbIG5hbWUgXVxuICB9KSwge30pXG5cbiAgcm91dGVyLnVzZShpbnZva2VNaWRkbGV3YXJlKHtcbiAgICBuYW1lOiBtb2R1bGVOYW1lLFxuICAgIG1ldGhvZHMsXG4gICAgYmVmb3JlOiBbXG4gICAgICAkbW9kdWxlQmVmb3JlLFxuICAgICAgJGJlZm9yZVxuICAgIF0sXG4gICAgYWZ0ZXI6IFtcbiAgICAgICRhZnRlcixcbiAgICAgICRtb2R1bGVBZnRlclxuICAgIF1cbiAgfSkpXG5cbiAgZm9yIChsZXQgbWlkZGxld2FyZSBvZiAkbWlkZGxld2FyZXMgfHwgW10pIHtcbiAgICByb3V0ZXIudXNlKG1pZGRsZXdhcmUpXG4gIH1cblxuICBmb3IgKGxldCBtZXRob2ROYW1lIG9mIG1ldGhvZE5hbWVzKSB7XG4gICAgbGV0IGlzUmVzZXJ2ZWQgPSAhIX5SRVNFUlZFRF9NRVRIT0RTLnNwbGl0KCcsJykuaW5kZXhPZihtZXRob2ROYW1lKVxuICAgIGlmIChpc1Jlc2VydmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtyZnVuY10gTWV0aG9kIG5hbWUgXCIke21ldGhvZE5hbWV9XCIgaXMgcmVzZXJ2ZWQgYW5kIHlvdSBjYW5ub3Qgb3ZlcnJpZGUgaXQuYClcbiAgICB9XG4gICAgbGV0IGlzUHJpdmF0ZSA9IC9eXy8udGVzdChtZXRob2ROYW1lKVxuICAgIGlmIChpc1ByaXZhdGUpIHtcbiAgICAgIC8vIERvIG5vdCBleHBvc2UgcHJpdmF0ZSBtZXRob2RzXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBsZXQgc3BpbmFsVXJsID0gYC8ke3NwaW5hbGNhc2UobWV0aG9kTmFtZSl9YFxuICAgIGxldCBjYW1lbFVybCA9IGAvJHtjYW1lbGNhc2UobWV0aG9kTmFtZSl9YFxuXG4gICAgbGV0IHsga25vY2ssIGludm9rZSB9ID0gZW5kcG9pbnQobW9kdWxlTmFtZSwgbWV0aG9kTmFtZSlcblxuICAgIHJvdXRlci5oZWFkKHNwaW5hbFVybCwga25vY2spXG4gICAgcm91dGVyLmdldChzcGluYWxVcmwsIGludm9rZSlcbiAgICByb3V0ZXIucG9zdChzcGluYWxVcmwsIGludm9rZSlcbiAgICByb3V0ZXIucmVkaXJlY3QoY2FtZWxVcmwsIHNwaW5hbFVybClcbiAgfVxuICByZXR1cm4gW1xuICAgIHJvdXRlci5yb3V0ZXMoKSxcbiAgICByb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKVxuICBdXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpXG4iXX0=