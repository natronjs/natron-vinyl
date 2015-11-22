"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromPromise = exports.awaitAll = exports.merge = exports.transformer = exports.Transformer = exports.symlink = exports.dest = exports.src = exports.isVinyl = exports.File = undefined;

var _vinylFs = require("vinyl-fs");

Object.defineProperty(exports, "src", {
  enumerable: true,
  get: function get() {
    return _vinylFs.src;
  }
});
Object.defineProperty(exports, "dest", {
  enumerable: true,
  get: function get() {
    return _vinylFs.dest;
  }
});
Object.defineProperty(exports, "symlink", {
  enumerable: true,
  get: function get() {
    return _vinylFs.symlink;
  }
});

var _vinylTransformer = require("vinyl-transformer");

Object.defineProperty(exports, "Transformer", {
  enumerable: true,
  get: function get() {
    return _vinylTransformer.Transformer;
  }
});
Object.defineProperty(exports, "transformer", {
  enumerable: true,
  get: function get() {
    return _vinylTransformer.transformer;
  }
});

var _helper = require("./helper");

Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function get() {
    return _helper.merge;
  }
});
Object.defineProperty(exports, "awaitAll", {
  enumerable: true,
  get: function get() {
    return _helper.awaitAll;
  }
});
Object.defineProperty(exports, "fromPromise", {
  enumerable: true,
  get: function get() {
    return _helper.fromPromise;
  }
});

var _vinyl = require("vinyl");

var _vinyl2 = _interopRequireDefault(_vinyl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isVinyl = _vinyl2.default.isVinyl; /**
                                        * @module natron-vinyl
                                        */
// export {default as File, isVinyl} from "vinyl";

exports.File = _vinyl2.default;
exports.isVinyl = isVinyl;