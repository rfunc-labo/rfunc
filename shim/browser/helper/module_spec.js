/**
 * @function moduleSpec
 * @param {Object} module - Module config
 * @returns {Object}
 */
'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var moduleNormalize = require('./module_normalize');
/** @lends moduleSpec */


function moduleSpec(module) {
  var _module = module,
      $spec = _module.$spec;

  var _ref = $spec || {},
      methods = _ref.methods;

  module = moduleNormalize(module);
  return _Object$assign({
    name: 'anonymous',
    version: 'unknown'
  }, $spec, {
    methods: _Object$assign({}, _Object$keys(module).filter(function (name) {
      return !/^[\$_]/.test(name);
    }).reduce(function (methods, name) {
      return _Object$assign(methods, _defineProperty({}, name, {
        desc: "".concat(name)
      }));
    }, {}), methods)
  });
}

module.exports = moduleSpec;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlci9tb2R1bGVfc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2R1bGVOb3JtYWxpemUiLCJyZXF1aXJlIiwibW9kdWxlU3BlYyIsIm1vZHVsZSIsIiRzcGVjIiwibWV0aG9kcyIsIm5hbWUiLCJ2ZXJzaW9uIiwiZmlsdGVyIiwidGVzdCIsInJlZHVjZSIsImRlc2MiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFLQTs7Ozs7Ozs7QUFFQSxJQUFNQSxrQkFBa0JDLFFBQVEsb0JBQVIsQ0FBeEI7QUFFQTs7O0FBQ0EsU0FBU0MsVUFBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFBQSxnQkFDWEEsTUFEVztBQUFBLE1BQ3JCQyxLQURxQixXQUNyQkEsS0FEcUI7O0FBQUEsYUFFVEEsU0FBUyxFQUZBO0FBQUEsTUFFckJDLE9BRnFCLFFBRXJCQSxPQUZxQjs7QUFHM0JGLFdBQVNILGdCQUFnQkcsTUFBaEIsQ0FBVDtBQUNBLFNBQU8sZUFBYztBQUNuQkcsVUFBTSxXQURhO0FBRW5CQyxhQUFTO0FBRlUsR0FBZCxFQUdKSCxLQUhJLEVBR0c7QUFDUkMsYUFBUyxlQUNQLEVBRE8sRUFFUCxhQUFZRixNQUFaLEVBQ0dLLE1BREgsQ0FDVSxVQUFDRixJQUFEO0FBQUEsYUFBVSxDQUFDLFNBQVNHLElBQVQsQ0FBY0gsSUFBZCxDQUFYO0FBQUEsS0FEVixFQUVHSSxNQUZILENBRVUsVUFBQ0wsT0FBRCxFQUFVQyxJQUFWO0FBQUEsYUFBbUIsZUFBY0QsT0FBZCxzQkFDeEJDLElBRHdCLEVBQ2pCO0FBQ05LLHdCQUFTTCxJQUFUO0FBRE0sT0FEaUIsRUFBbkI7QUFBQSxLQUZWLEVBTU0sRUFOTixDQUZPLEVBU1BELE9BVE87QUFERCxHQUhILENBQVA7QUFnQkQ7O0FBRURGLE9BQU9TLE9BQVAsR0FBaUJWLFVBQWpCIiwiZmlsZSI6ImhlbHBlci9tb2R1bGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9saWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmdW5jdGlvbiBtb2R1bGVTcGVjXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIC0gTW9kdWxlIGNvbmZpZ1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG1vZHVsZU5vcm1hbGl6ZSA9IHJlcXVpcmUoJy4vbW9kdWxlX25vcm1hbGl6ZScpXG5cbi8qKiBAbGVuZHMgbW9kdWxlU3BlYyAqL1xuZnVuY3Rpb24gbW9kdWxlU3BlYyAobW9kdWxlKSB7XG4gIGxldCB7ICRzcGVjIH0gPSBtb2R1bGVcbiAgbGV0IHsgbWV0aG9kcyB9ID0gJHNwZWMgfHwge31cbiAgbW9kdWxlID0gbW9kdWxlTm9ybWFsaXplKG1vZHVsZSlcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgIG5hbWU6ICdhbm9ueW1vdXMnLFxuICAgIHZlcnNpb246ICd1bmtub3duJ1xuICB9LCAkc3BlYywge1xuICAgIG1ldGhvZHM6IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIE9iamVjdC5rZXlzKG1vZHVsZSlcbiAgICAgICAgLmZpbHRlcigobmFtZSkgPT4gIS9eW1xcJF9dLy50ZXN0KG5hbWUpKVxuICAgICAgICAucmVkdWNlKChtZXRob2RzLCBuYW1lKSA9PiBPYmplY3QuYXNzaWduKG1ldGhvZHMsIHtcbiAgICAgICAgICBbbmFtZV06IHtcbiAgICAgICAgICAgIGRlc2M6IGAke25hbWV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfSksIHt9KSxcbiAgICAgIG1ldGhvZHNcbiAgICApXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlU3BlY1xuIl19