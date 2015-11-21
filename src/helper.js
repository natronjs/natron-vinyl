/**
 * @module natron-vinyl
 */
import {Stream, Readable, PassThrough} from "readable-stream";

export function promisify(stream: Stream): Promise {
  if (!(stream instanceof Stream)) {
    throw new TypeError(`${stream} is not a Stream`);
  }
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
      let p = promisify(stream);
      promise = promise.then(() => {
        stream.pipe(through, {end: false});
        return p;
      });
    }
  } else {
    let promises = [];
    for (let stream of streams) {
      let p = promisify(stream);
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
    promises.push(promisify(stream));
  }
  return Promise.all(promises);
}

export function fromPromise(promise: Promise): Readable {
  return new class extends Readable {
    constructor() {
      super({objectMode: true});
      (promise
        .then((value) => {
          this.push(value);
          this.push(null);
        })
        .catch((err) => {
          this.emit("error", err);
          this.push(null);
        })
      );
    }
    _read(): void {}
  };
}
