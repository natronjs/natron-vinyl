/**
 * @module natron-vinyl
 */
import {Stream, Readable, PassThrough} from "readable-stream";

function promisifyStream(stream: Stream): Promise {
  return new Promise((resolve, reject) => {
    stream.on(stream._write ? "finish": "end", () => resolve({stream}));
    stream.on("error", (err) => reject(err));
  });
}

export function merge(streams: Array<Stream>, options?: Object): PassThrough {
  let through = new PassThrough({objectMode: true});
  let promise;
  if (options && options.preserveOrder) {
    promise = Promise.resolve();
    for (let stream of streams) {
      let p = promisifyStream(stream);
      promise = promise.then(() => {
        stream.pipe(through, {end: false});
        return p;
      });
    }
  } else {
    let promises = [];
    for (let stream of streams) {
      let p = promisifyStream(stream);
      stream.pipe(through, {end: false});
      promises.push(p);
    }
    promise = Promise.all(promises);
  }
  (promise
    .then(() => through.end())
    .catch((err) => through.emit("error", err))
  );
  return through;
}

export function awaitAll(streams: Array<Stream>): Promise {
  let promises = [];
  for (let stream of streams) {
    promises.push(promisifyStream(stream));
  }
  return Promise.all(promises);
}

export function fromPromise(promise: Promise): Readable {
  let promise_ = promise;
  return new class extends Readable {
    constructor() {
      super({objectMode: true});
    }
    _read(): void {
      if (!promise_) {
        return this.push(null);
      }
      (promise_ && promise_
        .then((val) => this.push(val))
        .catch((err) => this.emit("error", err))
      );
      promise_ = null;
    }
  };
}
