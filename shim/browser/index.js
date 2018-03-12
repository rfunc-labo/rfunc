/**
 * Remote function call with async interface
 */
'use strict';

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var create = require('./create');

var RFunc = require('./rfunc');

var lib = create.bind(this);

_Object$assign(lib, create, {
  create: create,
  RFunc: RFunc
});

module.exports = lib;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsInJlcXVpcmUiLCJSRnVuYyIsImxpYiIsImJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBSUE7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjs7QUFDQSxJQUFNQyxRQUFRRCxRQUFRLFNBQVIsQ0FBZDs7QUFFQSxJQUFJRSxNQUFNSCxPQUFPSSxJQUFQLENBQVksSUFBWixDQUFWOztBQUVBLGVBQWNELEdBQWQsRUFBbUJILE1BQW5CLEVBQTJCO0FBQ3pCQSxnQkFEeUI7QUFFekJFO0FBRnlCLENBQTNCOztBQUtBRyxPQUFPQyxPQUFQLEdBQWlCSCxHQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9saWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlbW90ZSBmdW5jdGlvbiBjYWxsIHdpdGggYXN5bmMgaW50ZXJmYWNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNyZWF0ZSA9IHJlcXVpcmUoJy4vY3JlYXRlJylcbmNvbnN0IFJGdW5jID0gcmVxdWlyZSgnLi9yZnVuYycpXG5cbmxldCBsaWIgPSBjcmVhdGUuYmluZCh0aGlzKVxuXG5PYmplY3QuYXNzaWduKGxpYiwgY3JlYXRlLCB7XG4gIGNyZWF0ZSxcbiAgUkZ1bmNcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gbGliXG4iXX0=