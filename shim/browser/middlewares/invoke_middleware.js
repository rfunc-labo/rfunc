/**
 * @function invokeMiddleware
 */

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var co = require('co');
var load = require('rfunc-client/load');

/** @lends invokeMiddleware */
function invokeMiddleware(config) {
  var name = config.name,
      methods = config.methods,
      before = config.before,
      after = config.after;


  return co.wrap(_regenerator2.default.mark(function invokeMiddleware(ctx, next) {
    var module, instance;
    return _regenerator2.default.wrap(function invokeMiddleware$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            module = (0, _assign2.default)({}, methods, {
              $before: before,
              $after: after
            });
            _context2.next = 3;
            return load(module, {
              $$name: name,
              $$ctx: ctx
            });

          case 3:
            instance = _context2.sent;


            ctx.invoke = co.wrap(_regenerator2.default.mark(function invoke(methodName) {
              var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
              var method;
              return _regenerator2.default.wrap(function invoke$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      method = instance[methodName];

                      if (method) {
                        _context.next = 3;
                        break;
                      }

                      throw new Error('[rfunc] Method not found: ' + methodName);

                    case 3:
                      return _context.abrupt('return', instance[methodName].apply(instance, (0, _toConsumableArray3.default)(params)));

                    case 4:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, invoke, this);
            }));
            _context2.next = 7;
            return next();

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, invokeMiddleware, this);
  }));
}

module.exports = invokeMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludm9rZV9taWRkbGV3YXJlLmpzIl0sIm5hbWVzIjpbImNvIiwicmVxdWlyZSIsImxvYWQiLCJpbnZva2VNaWRkbGV3YXJlIiwiY29uZmlnIiwibmFtZSIsIm1ldGhvZHMiLCJiZWZvcmUiLCJhZnRlciIsIndyYXAiLCJjdHgiLCJuZXh0IiwibW9kdWxlIiwiJGJlZm9yZSIsIiRhZnRlciIsIiQkbmFtZSIsIiQkY3R4IiwiaW5zdGFuY2UiLCJpbnZva2UiLCJtZXRob2ROYW1lIiwicGFyYW1zIiwibWV0aG9kIiwiRXJyb3IiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBS0MsUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLG1CQUFSLENBQWI7O0FBRUE7QUFDQSxTQUFTRSxnQkFBVCxDQUEyQkMsTUFBM0IsRUFBbUM7QUFBQSxNQUMzQkMsSUFEMkIsR0FDTUQsTUFETixDQUMzQkMsSUFEMkI7QUFBQSxNQUNyQkMsT0FEcUIsR0FDTUYsTUFETixDQUNyQkUsT0FEcUI7QUFBQSxNQUNaQyxNQURZLEdBQ01ILE1BRE4sQ0FDWkcsTUFEWTtBQUFBLE1BQ0pDLEtBREksR0FDTUosTUFETixDQUNKSSxLQURJOzs7QUFHakMsU0FBT1IsR0FBR1MsSUFBSCw0QkFBUSxTQUFXTixnQkFBWCxDQUE2Qk8sR0FBN0IsRUFBa0NDLElBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxrQkFEUyxHQUNBLHNCQUFjLEVBQWQsRUFBa0JOLE9BQWxCLEVBQTJCO0FBQ3RDTyx1QkFBU04sTUFENkI7QUFFdENPLHNCQUFRTjtBQUY4QixhQUEzQixDQURBO0FBQUE7QUFBQSxtQkFLUU4sS0FBS1UsTUFBTCxFQUFhO0FBQ2hDRyxzQkFBUVYsSUFEd0I7QUFFaENXLHFCQUFPTjtBQUZ5QixhQUFiLENBTFI7O0FBQUE7QUFLVE8sb0JBTFM7OztBQVViUCxnQkFBSVEsTUFBSixHQUFhbEIsR0FBR1MsSUFBSCw0QkFBUSxTQUFXUyxNQUFYLENBQW1CQyxVQUFuQjtBQUFBLGtCQUErQkMsTUFBL0IsdUVBQXdDLEVBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNmQyw0QkFEZSxHQUNOSixTQUFVRSxVQUFWLENBRE07O0FBQUEsMEJBRWRFLE1BRmM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNEJBR1gsSUFBSUMsS0FBSixnQ0FBdUNILFVBQXZDLENBSFc7O0FBQUE7QUFBQSx1REFLWkYsU0FBVUUsVUFBVixtREFBMEJDLE1BQTFCLEVBTFk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFXRixNQUFYO0FBQUEsYUFBUixFQUFiO0FBVmE7QUFBQSxtQkFpQlBQLE1BakJPOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFXUixnQkFBWDtBQUFBLEdBQVIsRUFBUDtBQW1CRDs7QUFFRFMsT0FBT1csT0FBUCxHQUFpQnBCLGdCQUFqQiIsImZpbGUiOiJpbnZva2VfbWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiJsaWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmdW5jdGlvbiBpbnZva2VNaWRkbGV3YXJlXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvID0gcmVxdWlyZSgnY28nKVxuY29uc3QgbG9hZCA9IHJlcXVpcmUoJ3JmdW5jLWNsaWVudC9sb2FkJylcblxuLyoqIEBsZW5kcyBpbnZva2VNaWRkbGV3YXJlICovXG5mdW5jdGlvbiBpbnZva2VNaWRkbGV3YXJlIChjb25maWcpIHtcbiAgbGV0IHsgbmFtZSwgbWV0aG9kcywgYmVmb3JlLCBhZnRlciB9ID0gY29uZmlnXG5cbiAgcmV0dXJuIGNvLndyYXAoZnVuY3Rpb24gKiBpbnZva2VNaWRkbGV3YXJlIChjdHgsIG5leHQpIHtcbiAgICBsZXQgbW9kdWxlID0gT2JqZWN0LmFzc2lnbih7fSwgbWV0aG9kcywge1xuICAgICAgJGJlZm9yZTogYmVmb3JlLFxuICAgICAgJGFmdGVyOiBhZnRlclxuICAgIH0pXG4gICAgbGV0IGluc3RhbmNlID0geWllbGQgbG9hZChtb2R1bGUsIHtcbiAgICAgICQkbmFtZTogbmFtZSxcbiAgICAgICQkY3R4OiBjdHhcbiAgICB9KVxuXG4gICAgY3R4Lmludm9rZSA9IGNvLndyYXAoZnVuY3Rpb24gKiBpbnZva2UgKG1ldGhvZE5hbWUsIHBhcmFtcyA9IFtdKSB7XG4gICAgICBsZXQgbWV0aG9kID0gaW5zdGFuY2VbIG1ldGhvZE5hbWUgXVxuICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbcmZ1bmNdIE1ldGhvZCBub3QgZm91bmQ6ICR7bWV0aG9kTmFtZX1gKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGluc3RhbmNlWyBtZXRob2ROYW1lIF0oLi4ucGFyYW1zKVxuICAgIH0pXG4gICAgeWllbGQgbmV4dCgpXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52b2tlTWlkZGxld2FyZVxuIl19