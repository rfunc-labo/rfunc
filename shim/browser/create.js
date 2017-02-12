/**
 * Create a RFunc instance.
 * @function create
 * @returns {Object}
 */
'use strict';

var RFunc = require('./rfunc');

/** @lends create */
function create() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(RFunc, [null].concat(args)))();
}

module.exports = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS5qcyJdLCJuYW1lcyI6WyJSRnVuYyIsInJlcXVpcmUiLCJjcmVhdGUiLCJhcmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxTQUFSLENBQWQ7O0FBRUE7QUFDQSxTQUFTQyxNQUFULEdBQTBCO0FBQUEsb0NBQU5DLElBQU07QUFBTkEsUUFBTTtBQUFBOztBQUN4Qiw0Q0FBV0gsS0FBWCxnQkFBb0JHLElBQXBCO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJILE1BQWpCIiwiZmlsZSI6ImNyZWF0ZS5qcyIsInNvdXJjZVJvb3QiOiJsaWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZSBhIFJGdW5jIGluc3RhbmNlLlxuICogQGZ1bmN0aW9uIGNyZWF0ZVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJGdW5jID0gcmVxdWlyZSgnLi9yZnVuYycpXG5cbi8qKiBAbGVuZHMgY3JlYXRlICovXG5mdW5jdGlvbiBjcmVhdGUgKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBSRnVuYyguLi5hcmdzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVxuIl19