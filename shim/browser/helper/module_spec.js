/**
 * @function moduleSpec
 * @param {Object} module - Module config
 * @returns {Object}
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleNormalize = require('./module_normalize');

/** @lends moduleSpec */
function moduleSpec(module) {
  var _module = module,
      $spec = _module.$spec;

  var _ref = $spec || {},
      methods = _ref.methods;

  module = moduleNormalize(module);
  return (0, _assign2.default)({
    name: 'anonymous',
    version: 'unknown'
  }, $spec, {
    methods: (0, _assign2.default)({}, (0, _keys2.default)(module).filter(function (name) {
      return !/^[\$_]/.test(name);
    }).reduce(function (methods, name) {
      return (0, _assign2.default)(methods, (0, _defineProperty3.default)({}, name, {
        desc: '' + name
      }));
    }, {}), methods)
  });
}

module.exports = moduleSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZV9zcGVjLmpzIl0sIm5hbWVzIjpbIm1vZHVsZU5vcm1hbGl6ZSIsInJlcXVpcmUiLCJtb2R1bGVTcGVjIiwibW9kdWxlIiwiJHNwZWMiLCJtZXRob2RzIiwibmFtZSIsInZlcnNpb24iLCJmaWx0ZXIiLCJ0ZXN0IiwicmVkdWNlIiwiZGVzYyIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCQyxRQUFRLG9CQUFSLENBQXhCOztBQUVBO0FBQ0EsU0FBU0MsVUFBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFBQSxnQkFDWEEsTUFEVztBQUFBLE1BQ3JCQyxLQURxQixXQUNyQkEsS0FEcUI7O0FBQUEsYUFFVEEsU0FBUyxFQUZBO0FBQUEsTUFFckJDLE9BRnFCLFFBRXJCQSxPQUZxQjs7QUFHM0JGLFdBQVNILGdCQUFnQkcsTUFBaEIsQ0FBVDtBQUNBLFNBQU8sc0JBQWM7QUFDbkJHLFVBQU0sV0FEYTtBQUVuQkMsYUFBUztBQUZVLEdBQWQsRUFHSkgsS0FISSxFQUdHO0FBQ1JDLGFBQVMsc0JBQ1AsRUFETyxFQUVQLG9CQUFZRixNQUFaLEVBQ0dLLE1BREgsQ0FDVSxVQUFDRixJQUFEO0FBQUEsYUFBVSxDQUFDLFNBQVNHLElBQVQsQ0FBY0gsSUFBZCxDQUFYO0FBQUEsS0FEVixFQUVHSSxNQUZILENBRVUsVUFBQ0wsT0FBRCxFQUFVQyxJQUFWO0FBQUEsYUFBbUIsc0JBQWNELE9BQWQsb0NBQ3hCQyxJQUR3QixFQUNqQjtBQUNOSyxtQkFBU0w7QUFESCxPQURpQixFQUFuQjtBQUFBLEtBRlYsRUFNTSxFQU5OLENBRk8sRUFTUEQsT0FUTztBQURELEdBSEgsQ0FBUDtBQWdCRDs7QUFFREYsT0FBT1MsT0FBUCxHQUFpQlYsVUFBakIiLCJmaWxlIjoibW9kdWxlX3NwZWMuanMiLCJzb3VyY2VSb290IjoibGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZnVuY3Rpb24gbW9kdWxlU3BlY1xuICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSAtIE1vZHVsZSBjb25maWdcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtb2R1bGVOb3JtYWxpemUgPSByZXF1aXJlKCcuL21vZHVsZV9ub3JtYWxpemUnKVxuXG4vKiogQGxlbmRzIG1vZHVsZVNwZWMgKi9cbmZ1bmN0aW9uIG1vZHVsZVNwZWMgKG1vZHVsZSkge1xuICBsZXQgeyAkc3BlYyB9ID0gbW9kdWxlXG4gIGxldCB7IG1ldGhvZHMgfSA9ICRzcGVjIHx8IHt9XG4gIG1vZHVsZSA9IG1vZHVsZU5vcm1hbGl6ZShtb2R1bGUpXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICBuYW1lOiAnYW5vbnltb3VzJyxcbiAgICB2ZXJzaW9uOiAndW5rbm93bidcbiAgfSwgJHNwZWMsIHtcbiAgICBtZXRob2RzOiBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICBPYmplY3Qua2V5cyhtb2R1bGUpXG4gICAgICAgIC5maWx0ZXIoKG5hbWUpID0+ICEvXltcXCRfXS8udGVzdChuYW1lKSlcbiAgICAgICAgLnJlZHVjZSgobWV0aG9kcywgbmFtZSkgPT4gT2JqZWN0LmFzc2lnbihtZXRob2RzLCB7XG4gICAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICBkZXNjOiBgJHtuYW1lfWBcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCB7fSksXG4gICAgICBtZXRob2RzXG4gICAgKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZVNwZWNcbiJdfQ==