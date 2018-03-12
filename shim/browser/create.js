/**
 * Create a RFunc instance.
 * @function create
 * @returns {Object}
 */
'use strict';

var RFunc = require('./rfunc');
/** @lends create */


function create() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(RFunc, [null].concat(args)))();
}

module.exports = create;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS5qcyJdLCJuYW1lcyI6WyJSRnVuYyIsInJlcXVpcmUiLCJjcmVhdGUiLCJhcmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxTQUFSLENBQWQ7QUFFQTs7O0FBQ0EsU0FBU0MsTUFBVCxHQUEwQjtBQUFBLG9DQUFOQyxJQUFNO0FBQU5BLFFBQU07QUFBQTs7QUFDeEIsNENBQVdILEtBQVgsZ0JBQW9CRyxJQUFwQjtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSCxNQUFqQiIsImZpbGUiOiJjcmVhdGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vbGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGUgYSBSRnVuYyBpbnN0YW5jZS5cbiAqIEBmdW5jdGlvbiBjcmVhdGVcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSRnVuYyA9IHJlcXVpcmUoJy4vcmZ1bmMnKVxuXG4vKiogQGxlbmRzIGNyZWF0ZSAqL1xuZnVuY3Rpb24gY3JlYXRlICguLi5hcmdzKSB7XG4gIHJldHVybiBuZXcgUkZ1bmMoLi4uYXJncylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVcbiJdfQ==