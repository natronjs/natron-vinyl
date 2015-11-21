"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = promisify;
exports.merge = merge;
exports.awaitAll = awaitAll;
exports.fromPromise = fromPromise;

var _readableStream = require("readable-stream");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module natron-vinyl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function promisify(stream) {
  if (!(stream instanceof _readableStream.Stream)) {
    throw new TypeError(stream + " is not a Stream");
  }
  return new Promise(function (resolve, reject) {
    stream.on(stream._write ? "finish" : "end", function () {
      return resolve({ stream: stream });
    });
    stream.on("error", function (err) {
      return reject(err);
    });
  });
}

function merge(streams, options) {
  var through = new _readableStream.PassThrough({ objectMode: true });
  var promise = undefined;
  if (options && options.preserveOrder) {
    promise = Promise.resolve();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var stream = _step.value;

        var p = promisify(stream);
        promise = promise.then(function () {
          stream.pipe(through, { end: false });
          return p;
        });
      };

      for (var _iterator = streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    var promises = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = streams[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _stream = _step2.value;

        var _p = promisify(_stream);
        _stream.pipe(through, { end: false });
        promises.push(_p);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    promise = Promise.all(promises);
  }
  promise.then(function () {
    return through.end();
  }).catch(function (err) {
    return through.emit("error", err);
  });
  return through;
}

function awaitAll(streams) {
  var promises = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = streams[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _stream2 = _step3.value;

      promises.push(promisify(_stream2));
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return Promise.all(promises);
}

function fromPromise(promise) {
  return new ((function (_Readable) {
    _inherits(_class, _Readable);

    function _class() {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, { objectMode: true }));

      promise.then(function (value) {
        _this.push(value);
        _this.push(null);
      }).catch(function (err) {
        _this.emit("error", err);
        _this.push(null);
      });
      return _this;
    }

    _createClass(_class, [{
      key: "_read",
      value: function _read() {}
    }]);

    return _class;
  })(_readableStream.Readable))();
}