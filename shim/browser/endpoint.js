/**
 * Define an endpoint
 * @function endpoint
 */
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var co = require('co');
var aschema = require('aschema');

var _require = require('asenv'),
    isProduction = _require.isProduction;

var _require2 = require('rfunc-schemas'),
    InvokeSchema = _require2.InvokeSchema;

/** @lends endpoint */


function endpoint(moduleName, methodName) {
  return {
    knock: co.wrap(_regenerator2.default.mark(function knock(ctx) {
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
    })),
    invoke: co.wrap(_regenerator2.default.mark(function invoke(ctx) {
      var _ctx$request$body, body, errors, _body$data, data, id, _data$attributes, attributes, _attributes$params, params, invocation, returns, _err$name, name, message, stack, _err$status, status, headersSent;

      return _regenerator2.default.wrap(function invoke$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ctx.state = ctx.state || {};
              _ctx$request$body = ctx.request.body, body = _ctx$request$body === undefined ? {} : _ctx$request$body;

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
              ctx.body = { errors: errors };
              return _context2.abrupt('return');

            case 8:
              _body$data = body.data, data = _body$data === undefined ? {} : _body$data;
              id = data.id, _data$attributes = data.attributes, attributes = _data$attributes === undefined ? {} : _data$attributes;
              _attributes$params = attributes.params, params = _attributes$params === undefined ? [] : _attributes$params;

              // Make null to undefined so that default param works.

              params = [].concat(params || []).map(function (param) {
                return param === null ? undefined : param;
              });

              invocation = {
                module: moduleName,
                method: methodName,
                params: params
              };


              ctx.state = (0, _assign2.default)(ctx.state, { invocation: invocation });

              returns = void 0;
              _context2.prev = 15;
              _context2.next = 18;
              return ctx.invoke(methodName, params);

            case 18:
              returns = _context2.sent;
              _context2.next = 30;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2['catch'](15);

              if (isProduction()) {
                // No stack on production
                delete _context2.t0.stack;
              }
              _err$name = _context2.t0.name, name = _err$name === undefined ? 'RFuncInvokeError' : _err$name, message = _context2.t0.message, stack = _context2.t0.stack, _err$status = _context2.t0.status, status = _err$status === undefined ? 500 : _err$status;

              if (typeof _context2.t0 === 'string') {
                message = _context2.t0;
              }
              ctx.status = status;
              ctx.body = {
                meta: {
                  invocation: invocation
                },
                errors: [(0, _assign2.default)({}, _context2.t0, { name: name, message: message, stack: stack })]
              };
              process.emit('rfunc:error', _context2.t0);
              return _context2.abrupt('return');

            case 30:
              headersSent = ctx.res.headersSent;

              if (!headersSent) {
                _context2.next = 33;
                break;
              }

              return _context2.abrupt('return');

            case 33:
              ctx.body = {
                data: {
                  type: 'results',
                  attributes: {
                    invokeId: id,
                    returns: returns
                  }
                }
              };

            case 34:
            case 'end':
              return _context2.stop();
          }
        }
      }, invoke, this, [[15, 21]]);
    }))
  };
}

module.exports = endpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZHBvaW50LmpzIl0sIm5hbWVzIjpbImNvIiwicmVxdWlyZSIsImFzY2hlbWEiLCJpc1Byb2R1Y3Rpb24iLCJJbnZva2VTY2hlbWEiLCJlbmRwb2ludCIsIm1vZHVsZU5hbWUiLCJtZXRob2ROYW1lIiwia25vY2siLCJ3cmFwIiwiY3R4IiwiYm9keSIsImludm9rZSIsInN0YXRlIiwicmVxdWVzdCIsIm1ldGhvZCIsImVycm9ycyIsInZhbGlkYXRlIiwic3RhdHVzIiwiZGF0YSIsImlkIiwiYXR0cmlidXRlcyIsInBhcmFtcyIsImNvbmNhdCIsIm1hcCIsInBhcmFtIiwidW5kZWZpbmVkIiwiaW52b2NhdGlvbiIsIm1vZHVsZSIsInJldHVybnMiLCJzdGFjayIsIm5hbWUiLCJtZXNzYWdlIiwibWV0YSIsInByb2Nlc3MiLCJlbWl0IiwiaGVhZGVyc1NlbnQiLCJyZXMiLCJ0eXBlIiwiaW52b2tlSWQiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLQyxRQUFRLElBQVIsQ0FBWDtBQUNBLElBQU1DLFVBQVVELFFBQVEsU0FBUixDQUFoQjs7ZUFDeUJBLFFBQVEsT0FBUixDO0lBQWpCRSxZLFlBQUFBLFk7O2dCQUNpQkYsUUFBUSxlQUFSLEM7SUFBakJHLFksYUFBQUEsWTs7QUFFUjs7O0FBQ0EsU0FBU0MsUUFBVCxDQUFtQkMsVUFBbkIsRUFBK0JDLFVBQS9CLEVBQTJDO0FBQ3pDLFNBQU87QUFDTEMsV0FBT1IsR0FBR1MsSUFBSCw0QkFBUSxTQUFXRCxLQUFYLENBQWtCRSxHQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JBLGtCQUFJQyxJQUFKLEdBQVcsSUFBWDs7QUFEYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBV0gsS0FBWDtBQUFBLEtBQVIsRUFERjtBQUlMSSxZQUFRWixHQUFHUyxJQUFILDRCQUFRLFNBQVdHLE1BQVgsQ0FBbUJGLEdBQW5CO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDZEEsa0JBQUlHLEtBQUosR0FBWUgsSUFBSUcsS0FBSixJQUFhLEVBQXpCO0FBRGMsa0NBRU1ILElBQUlJLE9BRlYsQ0FFUkgsSUFGUSxFQUVSQSxJQUZRLHFDQUVELEVBRkM7O0FBQUEsb0JBR1ZELElBQUlLLE1BQUosS0FBZSxNQUhMO0FBQUE7QUFBQTtBQUFBOztBQUlSQyxvQkFKUSxHQUlDZCxRQUFRRSxZQUFSLEVBQXNCYSxRQUF0QixDQUErQk4sSUFBL0IsQ0FKRDs7QUFBQSxtQkFLUkssTUFMUTtBQUFBO0FBQUE7QUFBQTs7QUFNVk4sa0JBQUlRLE1BQUosR0FBYSxHQUFiO0FBQ0FSLGtCQUFJQyxJQUFKLEdBQVcsRUFBRUssY0FBRixFQUFYO0FBUFU7O0FBQUE7QUFBQSwyQkFZTUwsSUFaTixDQVlSUSxJQVpRLEVBWVJBLElBWlEsOEJBWUQsRUFaQztBQWFSQyxnQkFiUSxHQWFnQkQsSUFiaEIsQ0FhUkMsRUFiUSxxQkFhZ0JELElBYmhCLENBYUpFLFVBYkksRUFhSkEsVUFiSSxvQ0FhUyxFQWJUO0FBQUEsbUNBY1FBLFVBZFIsQ0FjUkMsTUFkUSxFQWNSQSxNQWRRLHNDQWNDLEVBZEQ7O0FBZ0JkOztBQUNBQSx1QkFBUyxHQUFHQyxNQUFILENBQVVELFVBQVUsRUFBcEIsRUFDTkUsR0FETSxDQUNGLFVBQUNDLEtBQUQ7QUFBQSx1QkFBV0EsVUFBVSxJQUFWLEdBQWlCQyxTQUFqQixHQUE2QkQsS0FBeEM7QUFBQSxlQURFLENBQVQ7O0FBR0lFLHdCQXBCVSxHQW9CRztBQUNmQyx3QkFBUXRCLFVBRE87QUFFZlMsd0JBQVFSLFVBRk87QUFHZmU7QUFIZSxlQXBCSDs7O0FBMEJkWixrQkFBSUcsS0FBSixHQUFZLHNCQUFjSCxJQUFJRyxLQUFsQixFQUF5QixFQUFFYyxzQkFBRixFQUF6QixDQUFaOztBQUVJRSxxQkE1QlU7QUFBQTtBQUFBO0FBQUEscUJBOEJJbkIsSUFBSUUsTUFBSixDQUFXTCxVQUFYLEVBQXVCZSxNQUF2QixDQTlCSjs7QUFBQTtBQThCWk8scUJBOUJZO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBZ0NaLGtCQUFJMUIsY0FBSixFQUFvQjtBQUNsQjtBQUNBLHVCQUFPLGFBQUkyQixLQUFYO0FBQ0Q7QUFuQ1csdUNBb0NOQyxJQXBDTSxFQW9DTkEsSUFwQ00sNkJBb0NDLGtCQXBDRCxjQW9DcUJDLE9BcENyQixnQkFvQ3FCQSxPQXBDckIsRUFvQzhCRixLQXBDOUIsZ0JBb0M4QkEsS0FwQzlCLDZCQW9DcUNaLE1BcENyQyxFQW9DcUNBLE1BcENyQywrQkFvQzhDLEdBcEM5Qzs7QUFxQ1osa0JBQUksd0JBQWUsUUFBbkIsRUFBNkI7QUFDM0JjO0FBQ0Q7QUFDRHRCLGtCQUFJUSxNQUFKLEdBQWFBLE1BQWI7QUFDQVIsa0JBQUlDLElBQUosR0FBVztBQUNUc0Isc0JBQU07QUFDSk47QUFESSxpQkFERztBQUlUWCx3QkFBUSxDQUNOLHNCQUFjLEVBQWQsZ0JBQXVCLEVBQUVlLFVBQUYsRUFBUUMsZ0JBQVIsRUFBaUJGLFlBQWpCLEVBQXZCLENBRE07QUFKQyxlQUFYO0FBUUFJLHNCQUFRQyxJQUFSLENBQWEsYUFBYjtBQWpEWTs7QUFBQTtBQW9EUkMseUJBcERRLEdBb0RRMUIsSUFBSTJCLEdBcERaLENBb0RSRCxXQXBEUTs7QUFBQSxtQkFxRFZBLFdBckRVO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBd0RkMUIsa0JBQUlDLElBQUosR0FBVztBQUNUUSxzQkFBTTtBQUNKbUIsd0JBQU0sU0FERjtBQUVKakIsOEJBQVk7QUFDVmtCLDhCQUFVbkIsRUFEQTtBQUVWUztBQUZVO0FBRlI7QUFERyxlQUFYOztBQXhEYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBV2pCLE1BQVg7QUFBQSxLQUFSO0FBSkgsR0FBUDtBQXVFRDs7QUFFRGdCLE9BQU9ZLE9BQVAsR0FBaUJuQyxRQUFqQiIsImZpbGUiOiJlbmRwb2ludC5qcyIsInNvdXJjZVJvb3QiOiJsaWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmluZSBhbiBlbmRwb2ludFxuICogQGZ1bmN0aW9uIGVuZHBvaW50XG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjbyA9IHJlcXVpcmUoJ2NvJylcbmNvbnN0IGFzY2hlbWEgPSByZXF1aXJlKCdhc2NoZW1hJylcbmNvbnN0IHsgaXNQcm9kdWN0aW9uIH0gPSByZXF1aXJlKCdhc2VudicpXG5jb25zdCB7IEludm9rZVNjaGVtYSB9ID0gcmVxdWlyZSgncmZ1bmMtc2NoZW1hcycpXG5cbi8qKiBAbGVuZHMgZW5kcG9pbnQgKi9cbmZ1bmN0aW9uIGVuZHBvaW50IChtb2R1bGVOYW1lLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiB7XG4gICAga25vY2s6IGNvLndyYXAoZnVuY3Rpb24gKiBrbm9jayAoY3R4KSB7XG4gICAgICBjdHguYm9keSA9IG51bGxcbiAgICB9KSxcbiAgICBpbnZva2U6IGNvLndyYXAoZnVuY3Rpb24gKiBpbnZva2UgKGN0eCkge1xuICAgICAgY3R4LnN0YXRlID0gY3R4LnN0YXRlIHx8IHt9XG4gICAgICBsZXQgeyBib2R5ID0ge30gfSA9IGN0eC5yZXF1ZXN0XG4gICAgICBpZiAoY3R4Lm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIGxldCBlcnJvcnMgPSBhc2NoZW1hKEludm9rZVNjaGVtYSkudmFsaWRhdGUoYm9keSlcbiAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgIGN0eC5zdGF0dXMgPSA0MDBcbiAgICAgICAgICBjdHguYm9keSA9IHsgZXJyb3JzIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgeyBkYXRhID0ge30gfSA9IGJvZHlcbiAgICAgIGxldCB7IGlkLCBhdHRyaWJ1dGVzID0ge30gfSA9IGRhdGFcbiAgICAgIGxldCB7IHBhcmFtcyA9IFtdIH0gPSBhdHRyaWJ1dGVzXG5cbiAgICAgIC8vIE1ha2UgbnVsbCB0byB1bmRlZmluZWQgc28gdGhhdCBkZWZhdWx0IHBhcmFtIHdvcmtzLlxuICAgICAgcGFyYW1zID0gW10uY29uY2F0KHBhcmFtcyB8fCBbXSlcbiAgICAgICAgLm1hcCgocGFyYW0pID0+IHBhcmFtID09PSBudWxsID8gdW5kZWZpbmVkIDogcGFyYW0pXG5cbiAgICAgIGxldCBpbnZvY2F0aW9uID0ge1xuICAgICAgICBtb2R1bGU6IG1vZHVsZU5hbWUsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgICAgcGFyYW1zXG4gICAgICB9XG5cbiAgICAgIGN0eC5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oY3R4LnN0YXRlLCB7IGludm9jYXRpb24gfSlcblxuICAgICAgbGV0IHJldHVybnNcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybnMgPSB5aWVsZCBjdHguaW52b2tlKG1ldGhvZE5hbWUsIHBhcmFtcylcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoaXNQcm9kdWN0aW9uKCkpIHtcbiAgICAgICAgICAvLyBObyBzdGFjayBvbiBwcm9kdWN0aW9uXG4gICAgICAgICAgZGVsZXRlIGVyci5zdGFja1xuICAgICAgICB9XG4gICAgICAgIGxldCB7IG5hbWUgPSAnUkZ1bmNJbnZva2VFcnJvcicsIG1lc3NhZ2UsIHN0YWNrLCBzdGF0dXMgPSA1MDAgfSA9IGVyclxuICAgICAgICBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBtZXNzYWdlID0gZXJyXG4gICAgICAgIH1cbiAgICAgICAgY3R4LnN0YXR1cyA9IHN0YXR1c1xuICAgICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICBpbnZvY2F0aW9uXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcnM6IFtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGVyciwgeyBuYW1lLCBtZXNzYWdlLCBzdGFjayB9KVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzLmVtaXQoJ3JmdW5jOmVycm9yJywgZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCB7IGhlYWRlcnNTZW50IH0gPSBjdHgucmVzXG4gICAgICBpZiAoaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6ICdyZXN1bHRzJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBpbnZva2VJZDogaWQsXG4gICAgICAgICAgICByZXR1cm5zXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZHBvaW50XG4iXX0=