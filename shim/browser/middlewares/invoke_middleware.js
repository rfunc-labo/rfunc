/**
 * @function invokeMiddleware
 */
'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var load = require('rfunc-client/load');
/** @lends invokeMiddleware */


function invokeMiddleware(config) {
  var name = config.name,
      methods = config.methods,
      before = config.before,
      after = config.after;
  return (
    /*#__PURE__*/
    function () {
      var _invokeMiddleware = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(ctx, next) {
        var module, instance;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                module = _Object$assign({}, methods, {
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

                ctx.invoke =
                /*#__PURE__*/
                function () {
                  var _invoke = _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee(methodName) {
                    var params,
                        method,
                        _args = arguments;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
                            method = instance[methodName];

                            if (method) {
                              _context.next = 4;
                              break;
                            }

                            throw new Error("[rfunc] Method not found: ".concat(methodName));

                          case 4:
                            return _context.abrupt("return", instance[methodName].apply(instance, _toConsumableArray(params)));

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function invoke(_x3) {
                    return _invoke.apply(this, arguments);
                  };
                }();

                _context2.next = 7;
                return next();

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function invokeMiddleware(_x, _x2) {
        return _invokeMiddleware.apply(this, arguments);
      };
    }()
  );
}

module.exports = invokeMiddleware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmVzL2ludm9rZV9taWRkbGV3YXJlLmpzIl0sIm5hbWVzIjpbImxvYWQiLCJyZXF1aXJlIiwiaW52b2tlTWlkZGxld2FyZSIsImNvbmZpZyIsIm5hbWUiLCJtZXRob2RzIiwiYmVmb3JlIiwiYWZ0ZXIiLCJjdHgiLCJuZXh0IiwibW9kdWxlIiwiJGJlZm9yZSIsIiRhZnRlciIsIiQkbmFtZSIsIiQkY3R4IiwiaW5zdGFuY2UiLCJpbnZva2UiLCJtZXRob2ROYW1lIiwicGFyYW1zIiwibWV0aG9kIiwiRXJyb3IiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBSUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLG1CQUFSLENBQWI7QUFFQTs7O0FBQ0EsU0FBU0MsZ0JBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DO0FBQUEsTUFDMUJDLElBRDBCLEdBQ01ELE1BRE4sQ0FDMUJDLElBRDBCO0FBQUEsTUFDcEJDLE9BRG9CLEdBQ01GLE1BRE4sQ0FDcEJFLE9BRG9CO0FBQUEsTUFDWEMsTUFEVyxHQUNNSCxNQUROLENBQ1hHLE1BRFc7QUFBQSxNQUNIQyxLQURHLEdBQ01KLE1BRE4sQ0FDSEksS0FERztBQUdqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBQU8sa0JBQWlDQyxHQUFqQyxFQUFzQ0MsSUFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0NDLHNCQURELEdBQ1UsZUFBYyxFQUFkLEVBQWtCTCxPQUFsQixFQUEyQjtBQUN4Q00sMkJBQVNMLE1BRCtCO0FBRXhDTSwwQkFBUUw7QUFGZ0MsaUJBQTNCLENBRFY7QUFBQTtBQUFBLHVCQUtrQlAsS0FBS1UsTUFBTCxFQUFhO0FBQ2xDRywwQkFBUVQsSUFEMEI7QUFFbENVLHlCQUFPTjtBQUYyQixpQkFBYixDQUxsQjs7QUFBQTtBQUtDTyx3QkFMRDs7QUFVTFAsb0JBQUlRLE1BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJDQUFhLGlCQUF1QkMsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQ0Msa0NBQW5DLDJEQUE0QyxFQUE1QztBQUNMQyxrQ0FESyxHQUNJSixTQUFTRSxVQUFULENBREo7O0FBQUEsZ0NBRU5FLE1BRk07QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0NBR0gsSUFBSUMsS0FBSixxQ0FBdUNILFVBQXZDLEVBSEc7O0FBQUE7QUFBQSw2REFLSkYsU0FBU0UsVUFBVCxxQ0FBd0JDLE1BQXhCLEVBTEk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWI7O0FBQUEsa0NBQTRCRixNQUE1QjtBQUFBO0FBQUE7QUFBQTs7QUFWSztBQUFBLHVCQWlCQ1AsTUFqQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBUDs7QUFBQSxzQkFBc0JQLGdCQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbUJEOztBQUVEUSxPQUFPVyxPQUFQLEdBQWlCbkIsZ0JBQWpCIiwiZmlsZSI6Im1pZGRsZXdhcmVzL2ludm9rZV9taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL2xpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZ1bmN0aW9uIGludm9rZU1pZGRsZXdhcmVcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuY29uc3QgbG9hZCA9IHJlcXVpcmUoJ3JmdW5jLWNsaWVudC9sb2FkJylcblxuLyoqIEBsZW5kcyBpbnZva2VNaWRkbGV3YXJlICovXG5mdW5jdGlvbiBpbnZva2VNaWRkbGV3YXJlIChjb25maWcpIHtcbiAgY29uc3Qge25hbWUsIG1ldGhvZHMsIGJlZm9yZSwgYWZ0ZXJ9ID0gY29uZmlnXG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGludm9rZU1pZGRsZXdhcmUgKGN0eCwgbmV4dCkge1xuICAgIGNvbnN0IG1vZHVsZSA9IE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHtcbiAgICAgICRiZWZvcmU6IGJlZm9yZSxcbiAgICAgICRhZnRlcjogYWZ0ZXJcbiAgICB9KVxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgbG9hZChtb2R1bGUsIHtcbiAgICAgICQkbmFtZTogbmFtZSxcbiAgICAgICQkY3R4OiBjdHhcbiAgICB9KVxuXG4gICAgY3R4Lmludm9rZSA9IGFzeW5jIGZ1bmN0aW9uIGludm9rZSAobWV0aG9kTmFtZSwgcGFyYW1zID0gW10pIHtcbiAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW21ldGhvZE5hbWVdXG4gICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtyZnVuY10gTWV0aG9kIG5vdCBmb3VuZDogJHttZXRob2ROYW1lfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gaW5zdGFuY2VbbWV0aG9kTmFtZV0oLi4ucGFyYW1zKVxuICAgIH1cbiAgICBhd2FpdCBuZXh0KClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZU1pZGRsZXdhcmVcbiJdfQ==