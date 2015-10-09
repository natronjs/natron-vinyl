/*
 * natron-vinyl
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

var _vinyl = require("vinyl");

exports.File = _interopRequire(_vinyl);
Object.defineProperty(exports, "isVinyl", {
  enumerable: true,
  get: function get() {
    return _vinyl.isVinyl;
  }
});

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

var _piper = require("./piper");

Object.defineProperty(exports, "piper", {
  enumerable: true,
  get: function get() {
    return _piper.piper;
  }
});