/**
 * @function moduleNormalize
 */
'use strict';

/** @lends moduleNormalize */

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function moduleNormalize(module) {
  if (typeof module === 'function') {
    return (0, _assign2.default)({}, module, { default: module });
  }
  return module;
}

module.exports = moduleNormalize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZV9ub3JtYWxpemUuanMiXSwibmFtZXMiOlsibW9kdWxlTm9ybWFsaXplIiwibW9kdWxlIiwiZGVmYXVsdCIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQTs7QUFFQTs7Ozs7Ozs7QUFDQSxTQUFTQSxlQUFULENBQTBCQyxNQUExQixFQUFrQztBQUNoQyxNQUFJLE9BQU9BLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDaEMsV0FBTyxzQkFBYyxFQUFkLEVBQWtCQSxNQUFsQixFQUEwQixFQUFFQyxTQUFTRCxNQUFYLEVBQTFCLENBQVA7QUFDRDtBQUNELFNBQU9BLE1BQVA7QUFDRDs7QUFFREEsT0FBT0UsT0FBUCxHQUFpQkgsZUFBakIiLCJmaWxlIjoibW9kdWxlX25vcm1hbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiJsaWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmdW5jdGlvbiBtb2R1bGVOb3JtYWxpemVcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbi8qKiBAbGVuZHMgbW9kdWxlTm9ybWFsaXplICovXG5mdW5jdGlvbiBtb2R1bGVOb3JtYWxpemUgKG1vZHVsZSkge1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtb2R1bGUsIHsgZGVmYXVsdDogbW9kdWxlIH0pXG4gIH1cbiAgcmV0dXJuIG1vZHVsZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZU5vcm1hbGl6ZVxuIl19