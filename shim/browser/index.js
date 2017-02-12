/**
 * Remote function call with async interface
 */

'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = require('./create');
var RFunc = require('./rfunc');

var lib = create.bind(undefined);

(0, _assign2.default)(lib, create, {
  create: create,
  RFunc: RFunc
});

module.exports = lib;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsInJlcXVpcmUiLCJSRnVuYyIsImxpYiIsImJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBOzs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUSxTQUFSLENBQWQ7O0FBRUEsSUFBSUUsTUFBTUgsT0FBT0ksSUFBUCxXQUFWOztBQUVBLHNCQUFjRCxHQUFkLEVBQW1CSCxNQUFuQixFQUEyQjtBQUN6QkEsZ0JBRHlCO0FBRXpCRTtBQUZ5QixDQUEzQjs7QUFLQUcsT0FBT0MsT0FBUCxHQUFpQkgsR0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoibGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZW1vdGUgZnVuY3Rpb24gY2FsbCB3aXRoIGFzeW5jIGludGVyZmFjZVxuICovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjcmVhdGUgPSByZXF1aXJlKCcuL2NyZWF0ZScpXG5jb25zdCBSRnVuYyA9IHJlcXVpcmUoJy4vcmZ1bmMnKVxuXG5sZXQgbGliID0gY3JlYXRlLmJpbmQodGhpcylcblxuT2JqZWN0LmFzc2lnbihsaWIsIGNyZWF0ZSwge1xuICBjcmVhdGUsXG4gIFJGdW5jXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpYlxuIl19