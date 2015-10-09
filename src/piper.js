/*
 * natron-vinyl
 */
import flatten from "array-flatten";

export function piper(src: Transform, ...tfs: Transform): Transform {
  if (src instanceof Array) {
    [src, ...tfs] = [src];
  }
  let stream = src;
  for (let t of flatten(tfs)) {
    stream = stream.pipe(t);
  }
  return stream;
}
