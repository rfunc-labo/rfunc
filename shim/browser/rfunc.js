/**
 * @class RFunc
 * @param {Object} modules - Modules configuration
 * @param {Object} [options] - Optional settings
 */
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('./app');

var _require = require('akoa'),
    AKoa = _require.AKoa;

/** @lends RFunc */


var RFunc = function (_AKoa) {
  (0, _inherits3.default)(RFunc, _AKoa);

  function RFunc(modules) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, RFunc);

    var _app = app(modules),
        middleware = _app.middleware;

    return (0, _possibleConstructorReturn3.default)(this, (RFunc.__proto__ || (0, _getPrototypeOf2.default)(RFunc)).call(this, middleware, options));
  }

  return RFunc;
}(AKoa);

(0, _assign2.default)(RFunc, {});

module.exports = RFunc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJmdW5jLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJBS29hIiwiUkZ1bmMiLCJtb2R1bGVzIiwib3B0aW9ucyIsIm1pZGRsZXdhcmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSxPQUFSLENBQVo7O2VBQ2lCQSxRQUFRLE1BQVIsQztJQUFUQyxJLFlBQUFBLEk7O0FBRVI7OztJQUNNQyxLOzs7QUFDSixpQkFBYUMsT0FBYixFQUFvQztBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTtBQUFBOztBQUFBLGVBQ2JMLElBQUlJLE9BQUosQ0FEYTtBQUFBLFFBQzVCRSxVQUQ0QixRQUM1QkEsVUFENEI7O0FBQUEsK0hBRTVCQSxVQUY0QixFQUVoQkQsT0FGZ0I7QUFHbkM7OztFQUppQkgsSTs7QUFPcEIsc0JBQWNDLEtBQWQsRUFBcUIsRUFBckI7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJMLEtBQWpCIiwiZmlsZSI6InJmdW5jLmpzIiwic291cmNlUm9vdCI6ImxpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNsYXNzIFJGdW5jXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlcyAtIE1vZHVsZXMgY29uZmlndXJhdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIHNldHRpbmdzXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuL2FwcCcpXG5jb25zdCB7IEFLb2EgfSA9IHJlcXVpcmUoJ2Frb2EnKVxuXG4vKiogQGxlbmRzIFJGdW5jICovXG5jbGFzcyBSRnVuYyBleHRlbmRzIEFLb2Ege1xuICBjb25zdHJ1Y3RvciAobW9kdWxlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHsgbWlkZGxld2FyZSB9ID0gYXBwKG1vZHVsZXMpXG4gICAgc3VwZXIobWlkZGxld2FyZSwgb3B0aW9ucylcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFJGdW5jLCB7fSlcblxubW9kdWxlLmV4cG9ydHMgPSBSRnVuY1xuXG4iXX0=