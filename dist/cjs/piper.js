/*
 * natron-vinyl
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.piper = piper;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _arrayFlatten = require("array-flatten");

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function piper(src) {
  for (var _len = arguments.length, tfs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    tfs[_key - 1] = arguments[_key];
  }

  if (src instanceof Array) {
    var _ref = [src];
    src = _ref[0];
    tfs = _ref.slice(1);
  }
  var stream = src;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _arrayFlatten2["default"])(tfs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var t = _step.value;

      stream = stream.pipe(t);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return stream;
}