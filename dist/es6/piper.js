/*
 * natron-vinyl
 */
"use strict";

export { piper };
import flatten from "array-flatten";

function piper(src, ...tfs) {
  if (src instanceof Array) {
    [src, ...tfs] = [src];
  }
  let stream = src;
  for (let t of flatten(tfs)) {
    stream = stream.pipe(t);
  }
  return stream;
}