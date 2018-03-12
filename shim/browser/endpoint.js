/**
 * Define an endpoint
 * @function endpoint
 */
'use strict';

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var aschema = require('aschema');

var _require = require('asenv'),
    isProduction = _require.isProduction;

var _require2 = require('rfunc-schemas'),
    InvokeSchema = _require2.InvokeSchema;
/** @lends endpoint */


function endpoint(moduleName, methodName) {
  return {
    knock: function () {
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
    }(),
    invoke: function () {
      var _invoke = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(ctx) {
        var _ctx$request$body, body, errors, _body$data, data, id, _data$attributes, attributes, _attributes$params, params, invocation, returns, _err$name, name, message, stack, _err$status, status, headersSent;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ctx.state = ctx.state || {};
                _ctx$request$body = ctx.request.body, body = _ctx$request$body === void 0 ? {} : _ctx$request$body;

                if (!(ctx.method === 'POST')) {
                  _context2.next = 8;
                  break;
                }

                errors = aschema(InvokeSchema).validate(body);

                if (!errors) {
                  _context2.next = 8;
                  break;
                }

                ctx.status = 400;
                ctx.body = {
                  errors: errors
                };
                return _context2.abrupt("return");

              case 8:
                _body$data = body.data, data = _body$data === void 0 ? {} : _body$data;
                id = data.id, _data$attributes = data.attributes, attributes = _data$attributes === void 0 ? {} : _data$attributes;
                _attributes$params = attributes.params, params = _attributes$params === void 0 ? [] : _attributes$params; // Make null to undefined so that default param works.

                params = [].concat(params || []).map(function (param) {
                  return param === null ? undefined : param;
                });
                invocation = {
                  module: moduleName,
                  method: methodName,
                  params: params
                };
                ctx.state = _Object$assign(ctx.state, {
                  invocation: invocation
                });
                _context2.prev = 14;
                _context2.next = 17;
                return ctx.invoke(methodName, params);

              case 17:
                returns = _context2.sent;
                _context2.next = 29;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](14);

                if (isProduction()) {
                  // No stack on production
                  delete _context2.t0.stack;
                }

                _err$name = _context2.t0.name, name = _err$name === void 0 ? 'RFuncInvokeError' : _err$name, message = _context2.t0.message, stack = _context2.t0.stack, _err$status = _context2.t0.status, status = _err$status === void 0 ? 500 : _err$status;

                if (typeof _context2.t0 === 'string') {
                  message = _context2.t0;
                }

                ctx.status = status;
                ctx.body = {
                  meta: {
                    invocation: invocation
                  },
                  errors: [_Object$assign({}, _context2.t0, {
                    name: name,
                    message: message,
                    stack: stack
                  })]
                };
                process.emit('rfunc:error', _context2.t0);
                return _context2.abrupt("return");

              case 29:
                headersSent = ctx.res.headersSent;

                if (!headersSent) {
                  _context2.next = 32;
                  break;
                }

                return _context2.abrupt("return");

              case 32:
                ctx.body = {
                  data: {
                    type: 'results',
                    attributes: {
                      invokeId: id,
                      returns: returns
                    }
                  }
                };

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[14, 20]]);
      }));

      return function invoke(_x2) {
        return _invoke.apply(this, arguments);
      };
    }()
  };
}

module.exports = endpoint;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZHBvaW50LmpzIl0sIm5hbWVzIjpbImFzY2hlbWEiLCJyZXF1aXJlIiwiaXNQcm9kdWN0aW9uIiwiSW52b2tlU2NoZW1hIiwiZW5kcG9pbnQiLCJtb2R1bGVOYW1lIiwibWV0aG9kTmFtZSIsImtub2NrIiwiY3R4IiwiYm9keSIsImludm9rZSIsInN0YXRlIiwicmVxdWVzdCIsIm1ldGhvZCIsImVycm9ycyIsInZhbGlkYXRlIiwic3RhdHVzIiwiZGF0YSIsImlkIiwiYXR0cmlidXRlcyIsInBhcmFtcyIsImNvbmNhdCIsIm1hcCIsInBhcmFtIiwidW5kZWZpbmVkIiwiaW52b2NhdGlvbiIsIm1vZHVsZSIsInJldHVybnMiLCJzdGFjayIsIm5hbWUiLCJtZXNzYWdlIiwibWV0YSIsInByb2Nlc3MiLCJlbWl0IiwiaGVhZGVyc1NlbnQiLCJyZXMiLCJ0eXBlIiwiaW52b2tlSWQiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBOzs7Ozs7OztBQUVBLElBQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjs7ZUFDdUJBLFFBQVEsT0FBUixDO0lBQWhCQyxZLFlBQUFBLFk7O2dCQUNnQkQsUUFBUSxlQUFSLEM7SUFBaEJFLFksYUFBQUEsWTtBQUVQOzs7QUFDQSxTQUFTQyxRQUFULENBQW1CQyxVQUFuQixFQUErQkMsVUFBL0IsRUFBMkM7QUFDekMsU0FBTztBQUNDQyxTQUREO0FBQUE7QUFBQTtBQUFBLGdEQUNRQyxHQURSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFSEEsb0JBQUlDLElBQUosR0FBVyxJQUFYOztBQUZHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUNDLFVBSkQ7QUFBQTtBQUFBO0FBQUEsaURBSVNGLEdBSlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtIQSxvQkFBSUcsS0FBSixHQUFZSCxJQUFJRyxLQUFKLElBQWEsRUFBekI7QUFMRyxvQ0FNaUJILElBQUlJLE9BTnJCLENBTUlILElBTkosRUFNSUEsSUFOSixrQ0FNVyxFQU5YOztBQUFBLHNCQU9DRCxJQUFJSyxNQUFKLEtBQWUsTUFQaEI7QUFBQTtBQUFBO0FBQUE7O0FBUUtDLHNCQVJMLEdBUWNkLFFBQVFHLFlBQVIsRUFBc0JZLFFBQXRCLENBQStCTixJQUEvQixDQVJkOztBQUFBLHFCQVNHSyxNQVRIO0FBQUE7QUFBQTtBQUFBOztBQVVDTixvQkFBSVEsTUFBSixHQUFhLEdBQWI7QUFDQVIsb0JBQUlDLElBQUosR0FBVztBQUFDSztBQUFELGlCQUFYO0FBWEQ7O0FBQUE7QUFBQSw2QkFnQmlCTCxJQWhCakIsQ0FnQklRLElBaEJKLEVBZ0JJQSxJQWhCSiwyQkFnQlcsRUFoQlg7QUFpQklDLGtCQWpCSixHQWlCMkJELElBakIzQixDQWlCSUMsRUFqQkoscUJBaUIyQkQsSUFqQjNCLENBaUJRRSxVQWpCUixFQWlCUUEsVUFqQlIsaUNBaUJxQixFQWpCckI7QUFBQSxxQ0FrQmlCQSxVQWxCakIsQ0FrQkVDLE1BbEJGLEVBa0JFQSxNQWxCRixtQ0FrQlcsRUFsQlgsdUJBb0JIOztBQUNBQSx5QkFBUyxHQUFHQyxNQUFILENBQVVELFVBQVUsRUFBcEIsRUFDTkUsR0FETSxDQUNGLFVBQUNDLEtBQUQ7QUFBQSx5QkFBV0EsVUFBVSxJQUFWLEdBQWlCQyxTQUFqQixHQUE2QkQsS0FBeEM7QUFBQSxpQkFERSxDQUFUO0FBR01FLDBCQXhCSCxHQXdCZ0I7QUFDakJDLDBCQUFRckIsVUFEUztBQUVqQlEsMEJBQVFQLFVBRlM7QUFHakJjO0FBSGlCLGlCQXhCaEI7QUE4QkhaLG9CQUFJRyxLQUFKLEdBQVksZUFBY0gsSUFBSUcsS0FBbEIsRUFBeUI7QUFBQ2M7QUFBRCxpQkFBekIsQ0FBWjtBQTlCRztBQUFBO0FBQUEsdUJBa0NlakIsSUFBSUUsTUFBSixDQUFXSixVQUFYLEVBQXVCYyxNQUF2QixDQWxDZjs7QUFBQTtBQWtDRE8sdUJBbENDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBb0NELG9CQUFJekIsY0FBSixFQUFvQjtBQUNsQjtBQUNBLHlCQUFPLGFBQUkwQixLQUFYO0FBQ0Q7O0FBdkNBLHlDQXdDSUMsSUF4Q0osRUF3Q0lBLElBeENKLDBCQXdDVyxrQkF4Q1gsY0F3QytCQyxPQXhDL0IsZ0JBd0MrQkEsT0F4Qy9CLEVBd0N3Q0YsS0F4Q3hDLGdCQXdDd0NBLEtBeEN4Qyw2QkF3QytDWixNQXhDL0MsRUF3QytDQSxNQXhDL0MsNEJBd0N3RCxHQXhDeEQ7O0FBeUNELG9CQUFJLHdCQUFlLFFBQW5CLEVBQTZCO0FBQzNCYztBQUNEOztBQUNEdEIsb0JBQUlRLE1BQUosR0FBYUEsTUFBYjtBQUNBUixvQkFBSUMsSUFBSixHQUFXO0FBQ1RzQix3QkFBTTtBQUNKTjtBQURJLG1CQURHO0FBSVRYLDBCQUFRLENBQ04sZUFBYyxFQUFkLGdCQUF1QjtBQUFDZSw4QkFBRDtBQUFPQyxvQ0FBUDtBQUFnQkY7QUFBaEIsbUJBQXZCLENBRE07QUFKQyxpQkFBWDtBQVFBSSx3QkFBUUMsSUFBUixDQUFhLGFBQWI7QUFyREM7O0FBQUE7QUF3REVDLDJCQXhERixHQXdEaUIxQixJQUFJMkIsR0F4RHJCLENBd0RFRCxXQXhERjs7QUFBQSxxQkF5RENBLFdBekREO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBNERIMUIsb0JBQUlDLElBQUosR0FBVztBQUNUUSx3QkFBTTtBQUNKbUIsMEJBQU0sU0FERjtBQUVKakIsZ0NBQVk7QUFDVmtCLGdDQUFVbkIsRUFEQTtBQUVWUztBQUZVO0FBRlI7QUFERyxpQkFBWDs7QUE1REc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFQO0FBdUVEOztBQUVERCxPQUFPWSxPQUFQLEdBQWlCbEMsUUFBakIiLCJmaWxlIjoiZW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vbGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEZWZpbmUgYW4gZW5kcG9pbnRcbiAqIEBmdW5jdGlvbiBlbmRwb2ludFxuICovXG4ndXNlIHN0cmljdCdcblxuY29uc3QgYXNjaGVtYSA9IHJlcXVpcmUoJ2FzY2hlbWEnKVxuY29uc3Qge2lzUHJvZHVjdGlvbn0gPSByZXF1aXJlKCdhc2VudicpXG5jb25zdCB7SW52b2tlU2NoZW1hfSA9IHJlcXVpcmUoJ3JmdW5jLXNjaGVtYXMnKVxuXG4vKiogQGxlbmRzIGVuZHBvaW50ICovXG5mdW5jdGlvbiBlbmRwb2ludCAobW9kdWxlTmFtZSwgbWV0aG9kTmFtZSkge1xuICByZXR1cm4ge1xuICAgIGFzeW5jIGtub2NrIChjdHgpIHtcbiAgICAgIGN0eC5ib2R5ID0gbnVsbFxuICAgIH0sXG4gICAgYXN5bmMgaW52b2tlIChjdHgpIHtcbiAgICAgIGN0eC5zdGF0ZSA9IGN0eC5zdGF0ZSB8fCB7fVxuICAgICAgY29uc3Qge2JvZHkgPSB7fX0gPSBjdHgucmVxdWVzdFxuICAgICAgaWYgKGN0eC5tZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICBjb25zdCBlcnJvcnMgPSBhc2NoZW1hKEludm9rZVNjaGVtYSkudmFsaWRhdGUoYm9keSlcbiAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgIGN0eC5zdGF0dXMgPSA0MDBcbiAgICAgICAgICBjdHguYm9keSA9IHtlcnJvcnN9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qge2RhdGEgPSB7fX0gPSBib2R5XG4gICAgICBjb25zdCB7aWQsIGF0dHJpYnV0ZXMgPSB7fX0gPSBkYXRhXG4gICAgICBsZXQge3BhcmFtcyA9IFtdfSA9IGF0dHJpYnV0ZXNcblxuICAgICAgLy8gTWFrZSBudWxsIHRvIHVuZGVmaW5lZCBzbyB0aGF0IGRlZmF1bHQgcGFyYW0gd29ya3MuXG4gICAgICBwYXJhbXMgPSBbXS5jb25jYXQocGFyYW1zIHx8IFtdKVxuICAgICAgICAubWFwKChwYXJhbSkgPT4gcGFyYW0gPT09IG51bGwgPyB1bmRlZmluZWQgOiBwYXJhbSlcblxuICAgICAgY29uc3QgaW52b2NhdGlvbiA9IHtcbiAgICAgICAgbW9kdWxlOiBtb2R1bGVOYW1lLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZE5hbWUsXG4gICAgICAgIHBhcmFtc1xuICAgICAgfVxuXG4gICAgICBjdHguc3RhdGUgPSBPYmplY3QuYXNzaWduKGN0eC5zdGF0ZSwge2ludm9jYXRpb259KVxuXG4gICAgICBsZXQgcmV0dXJuc1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJucyA9IGF3YWl0IGN0eC5pbnZva2UobWV0aG9kTmFtZSwgcGFyYW1zKVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChpc1Byb2R1Y3Rpb24oKSkge1xuICAgICAgICAgIC8vIE5vIHN0YWNrIG9uIHByb2R1Y3Rpb25cbiAgICAgICAgICBkZWxldGUgZXJyLnN0YWNrXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHtuYW1lID0gJ1JGdW5jSW52b2tlRXJyb3InLCBtZXNzYWdlLCBzdGFjaywgc3RhdHVzID0gNTAwfSA9IGVyclxuICAgICAgICBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBtZXNzYWdlID0gZXJyXG4gICAgICAgIH1cbiAgICAgICAgY3R4LnN0YXR1cyA9IHN0YXR1c1xuICAgICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICBpbnZvY2F0aW9uXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcnM6IFtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGVyciwge25hbWUsIG1lc3NhZ2UsIHN0YWNrfSlcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzcy5lbWl0KCdyZnVuYzplcnJvcicsIGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQge2hlYWRlcnNTZW50fSA9IGN0eC5yZXNcbiAgICAgIGlmIChoZWFkZXJzU2VudCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdHlwZTogJ3Jlc3VsdHMnLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIGludm9rZUlkOiBpZCxcbiAgICAgICAgICAgIHJldHVybnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmRwb2ludFxuIl19